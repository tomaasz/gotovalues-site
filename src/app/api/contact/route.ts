import { NextResponse } from 'next/server';
import { Resend } from 'resend';

import { brandName } from '@/content/site';
import { buildContactEmail, contactFormSchema } from '@/lib/contact';

// Prosty in-memory rate limiting map. Uwaga: Działa to na instancję V8 isolate w Cloudflare Workers / Node, resetuje się przy starcie, jednak jest wystarczające na podstawowy spam.
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_MAX = 3; // Max zgłoszeń
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minut

export async function POST(request: Request) {
  // --- Simple Rate Limiting ---
  // Pozyskujemy IP, fall-back na generyczne 'unknown' dla testów/lokalnie.
  // Sentinel: Zawsze priorytetyzuj nagłówek cf-connecting-ip.
  // Usuwamy x-forwarded-for, ponieważ może on zostać podrobiony (spoofed) przez klienta w celu ominięcia limitu.
  const ip = request.headers.get('cf-connecting-ip') || 'unknown';

  const now = Date.now();

  // ⚡ Bolt: Prevent memory leak/exhaustion in V8 isolate using O(1) LRU strategy
  // 🎯 Why: Unbounded Map growth from unique spoofed IPs can cause OOM crashes.
  // By maintaining max 2000 entries and dropping the oldest via `keys().next().value` (Map insertion order),
  // we ensure deterministic O(1) eviction without blocking the main thread during high traffic.

  let rateLimitData = rateLimitMap.get(ip);

  if (rateLimitData) {
    // Freshen entry to move it to the end of the Map (LRU behavior)
    rateLimitMap.delete(ip);

    if (now - rateLimitData.lastReset > RATE_LIMIT_WINDOW_MS) {
      rateLimitData = { count: 1, lastReset: now };
    } else {
      if (rateLimitData.count >= RATE_LIMIT_MAX) {
        rateLimitMap.set(ip, rateLimitData);
        return NextResponse.json(
          { message: 'Przekroczono limit zapytań. Spróbuj ponownie później.' },
          { status: 429 },
        );
      }
      rateLimitData.count += 1;
    }
    rateLimitMap.set(ip, rateLimitData);
  } else {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
  }

  // Enforce Map size limit (evict oldest)
  if (rateLimitMap.size > 2000) {
    rateLimitMap.delete(rateLimitMap.keys().next().value!);
  }
  // --- Rate Limiting End ---

  let payload;
  try {
    payload = await request.json();
  } catch (error) {
    console.error('Błąd parsowania JSON:', error);
    return NextResponse.json({ message: 'Nieprawidłowy format danych.' }, { status: 400 });
  }

  const parsed = contactFormSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: 'Uzupełnij poprawnie wszystkie wymagane pola formularza.',
        issues: parsed.error.flatten(),
      },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || `${brandName} <onboarding@resend.dev>`;

  if (!apiKey || !to) {
    console.error(
      'Formularz nie jest jeszcze skonfigurowany po stronie serwera. Ustaw RESEND_API_KEY i CONTACT_TO_EMAIL.',
    );
    return NextResponse.json(
      {
        message: 'Serwer jest chwilowo niedostępny. Spróbuj ponownie później.',
      },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const email = buildContactEmail(parsed.data);

  try {
    const { error: resendError } = await resend.emails.send({
      from,
      to,
      replyTo: parsed.data.email,
      subject: email.subject,
      text: email.text,
      html: email.html,
    });

    if (resendError) {
      console.error('Błąd wysyłki e-maila:', resendError);
      return NextResponse.json(
        { message: 'Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.' },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error('Błąd wysyłki e-maila (wyjątek):', error);
    return NextResponse.json(
      { message: 'Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.' },
      { status: 500 },
    );
  }

  return NextResponse.json({
    message: 'Dziękuję. Wrócę z krótką oceną i propozycją następnego kroku.',
  });
}
