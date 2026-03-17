import { NextResponse } from "next/server";
import { Resend } from "resend";

import { buildContactEmail, contactFormSchema } from "@/lib/contact";

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = contactFormSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Uzupełnij poprawnie wszystkie wymagane pola formularza.",
        issues: parsed.error.flatten(),
      },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "GoToValues <onboarding@resend.dev>";

  if (!apiKey || !to) {
    return NextResponse.json(
      {
        message:
          "Formularz nie jest jeszcze skonfigurowany po stronie serwera. Ustaw RESEND_API_KEY i CONTACT_TO_EMAIL.",
      },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const email = buildContactEmail(parsed.data);

  await resend.emails.send({
    from,
    to,
    replyTo: parsed.data.email,
    subject: email.subject,
    text: email.text,
    html: email.html,
  });

  return NextResponse.json({
    message: "Dziękuję. Wiadomość została wysłana.",
  });
}
