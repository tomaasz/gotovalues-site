import { z } from 'zod';

import { brandName } from '@/content/site';

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, 'Podaj imię.'),
  email: z.email('Podaj poprawny adres e-mail.'),
  company: z.string().trim().max(120).optional().default(''),
  message: z.string().trim().min(20, 'Opisz krótko, czego potrzebujesz.'),
  // Sentinel: Server-side honeypot validation to prevent bots from bypassing client-side checks via direct API POSTs.
  bot_field: z.string().max(0, 'Spam detected').optional().default(''),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export function buildContactEmail(data: ContactFormData): {
  subject: string;
  text: string;
  html: string;
} {
  const companyLine = data.company ? `Firma: ${data.company}` : 'Firma: nie podano';
  const subject = `[${brandName}] Nowe zgłoszenie od ${data.name}`;
  const text = [
    `Nowe zgłoszenie ze strony ${brandName}`,
    '',
    `Imię: ${data.name}`,
    `E-mail: ${data.email}`,
    companyLine,
    '',
    'Wiadomość:',
    data.message,
  ].join('\n');

  const html = [
    `<h1>Nowe zgłoszenie ze strony ${brandName}</h1>`,
    `<p><strong>Imię:</strong> ${escapeHtml(data.name)}</p>`,
    `<p><strong>E-mail:</strong> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>`,
    `<p><strong>Firma:</strong> ${escapeHtml(data.company || 'nie podano')}</p>`,
    `<p><strong>Wiadomość:</strong></p>`,
    `<p>${escapeHtml(data.message).replaceAll('\n', '<br />')}</p>`,
  ].join('');

  return { subject, text, html };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
