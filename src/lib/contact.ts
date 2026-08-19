import { z } from 'zod';

import { brandName } from '@/content/site';

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, 'Podaj imię.').max(100, 'Imię jest za długie.'),
  email: z.string().trim().email('Podaj poprawny adres e-mail.').max(255, 'E-mail jest za długi.'),
  company: z.string().trim().max(120).optional().default(''),
  supportSystem: z.string().trim().max(120).optional().default(''),
  weeklyTicketVolume: z.string().trim().max(60).optional().default(''),
  pilotInterest: z.string().trim().max(120).optional().default(''),
  message: z.string().trim().min(20, 'Opisz krótko, czego potrzebujesz.').max(5000, 'Wiadomość jest za długa.'),
  // Sentinel: Server-side honeypot validation to prevent bots from bypassing client-side checks via direct API POSTs.
  bot_field: z.string().max(0, 'Spam detected').optional().default(''),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export function buildContactEmail(data: ContactFormData): {
  subject: string;
  text: string;
  html: string;
} {
  const fields = [
    { label: 'Imię', value: data.name },
    { label: 'E-mail', value: data.email, isEmail: true },
    { label: 'Firma', value: data.company || 'nie podano' },
    { label: 'System wsparcia', value: data.supportSystem || 'nie podano' },
    { label: 'Zgłoszenia tygodniowo', value: data.weeklyTicketVolume || 'nie podano' },
    { label: 'Program pilotażowy', value: data.pilotInterest || 'nie podano' },
  ];
  const subject = `[${brandName}] Nowe zgłoszenie od ${data.name}`;
  const text = [
    `Nowe zgłoszenie ze strony ${brandName}`,
    '',
    ...fields.map(({ label, value }) => `${label}: ${value}`),
    '',
    'Wiadomość:',
    data.message,
  ].join('\n');

  const html = [
    `<h1>Nowe zgłoszenie ze strony ${brandName}</h1>`,
    ...fields.map(({ label, value, isEmail }) => {
      const escapedValue = escapeHtml(value);
      const content = isEmail ? `<a href="mailto:${escapedValue}">${escapedValue}</a>` : escapedValue;
      return `<p><strong>${label}:</strong> ${content}</p>`;
    }),
    `<p><strong>Wiadomość:</strong></p>`,
    `<p>${escapeHtml(data.message).replaceAll('\n', '<br />')}</p>`,
  ].join('');

  return { subject, text, html };
}

const htmlMap: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '`': '&#x60;',
  '=': '&#x3D;',
  '/': '&#x2F;',
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>"'`=/]/g, (s) => htmlMap[s]);
}
