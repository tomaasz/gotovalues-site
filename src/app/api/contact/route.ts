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
  // Pozyskujemy IP, priorytetyzując 'cf-connecting-ip' przed 'x-forwarded-for' aby zapobiec spoofingowi.
  const ip = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || 'unknown';

  const now = Date.now();

  // ⚡ Bolt: Prevent memory leaks in the rate limiter Map.
  // 🎯 Why: An unbounded Map in a long-running V8 isolate causes linear memory growth if flooded with unique IPs, leading to GC pauses and OOM crashes.
  // 📊 Impact: Bounds memory usage to a safe limit, reducing Garbage Collection pressure.
  if (rateLimitMap.size > 1000) {
    for (const [key, val] of rateLimitMap.entries()) {
      if (now - val.lastReset > RATE_LIMIT_WINDOW_MS) {
        rateLimitMap.delete(key);
      }
    }
    if (rateLimitMap.size > 2000) {
      rateLimitMap.clear();
    }
  }

  const rateLimitData = rateLimitMap.get(ip);

  if (rateLimitData) {
    if (now - rateLimitData.lastReset > RATE_LIMIT_WINDOW_MS) {
      rateLimitMap.set(ip, { count: 1, lastReset: now });
    } else {
      rateLimitData.count += 1;
      if (rateLimitData.count > RATE_LIMIT_MAX) {
        return NextResponse.json(
          { message: 'Przekroczono limit zapytań. Spróbuj ponownie później.' },
          { status: 429 }
        );
      }
    }
  } else {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
  }
  // --- Rate Limiting End ---

  let payload;
  try {
    payload = await request.json();
  } catch {
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
    await resend.emails.send({
      from,
      to,
      replyTo: parsed.data.email,
      subject: email.subject,
      text: email.text,
      html: email.html,
    });
  } catch (error) {
    console.error('Błąd wysyłki e-maila:', error);
    return NextResponse.json(
      { message: 'Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.' },
      { status: 500 },
    );
  }

  return NextResponse.json({
    message: 'Dziękuję. Wrócę z krótką oceną i propozycją następnego kroku.',
  });
}
