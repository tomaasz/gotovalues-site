import { NextResponse } from 'next/server';
import { Resend } from 'resend';

import { brandName } from '@/content/site';
import { buildContactEmail, contactFormSchema } from '@/lib/contact';

export async function POST(request: Request) {
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
