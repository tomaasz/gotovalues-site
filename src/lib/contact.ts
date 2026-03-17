import { z } from "zod";

const serviceLabels = {
  analytics: "Analityka i automatyzacja",
  apps: "Aplikacje webowe i AI",
  both: "Oba obszary",
} as const;

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Podaj imię i nazwisko."),
  email: z.email("Podaj poprawny adres e-mail."),
  company: z.string().trim().max(120).optional().default(""),
  service: z.enum(["analytics", "apps", "both"]),
  message: z.string().trim().min(20, "Opisz krótko, czego potrzebujesz."),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export function getServiceLabel(service: ContactFormData["service"]): string {
  return serviceLabels[service];
}

export function buildContactEmail(data: ContactFormData): {
  subject: string;
  text: string;
  html: string;
} {
  const serviceLabel = getServiceLabel(data.service);
  const companyLine = data.company ? `Firma: ${data.company}` : "Firma: nie podano";
  const subject = `[GoToValues] ${data.name} - ${serviceLabel}`;
  const text = [
    "Nowe zgłoszenie ze strony GoToValues",
    "",
    `Usługa: ${serviceLabel}`,
    `Imię i nazwisko: ${data.name}`,
    `E-mail: ${data.email}`,
    companyLine,
    "",
    "Wiadomość:",
    data.message,
  ].join("\n");

  const html = [
    "<h1>Nowe zgłoszenie ze strony GoToValues</h1>",
    `<p><strong>Usługa:</strong> ${serviceLabel}</p>`,
    `<p><strong>Imię i nazwisko:</strong> ${data.name}</p>`,
    `<p><strong>E-mail:</strong> <a href="mailto:${data.email}">${data.email}</a></p>`,
    `<p><strong>Firma:</strong> ${data.company || "nie podano"}</p>`,
    `<p><strong>Wiadomość:</strong></p>`,
    `<p>${escapeHtml(data.message).replaceAll("\n", "<br />")}</p>`,
  ].join("");

  return { subject, text, html };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
