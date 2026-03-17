"use client";

import { startTransition, useState } from "react";

const initialState = {
  status: "idle" as "idle" | "success" | "error",
  message: "",
};

export function ContactForm() {
  const [state, setState] = useState(initialState);
  const [pending, setPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    setState(initialState);

    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      company: String(formData.get("company") ?? ""),
      service: String(formData.get("service") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "Nie udało się wysłać formularza.");
      }

      startTransition(() => {
        setState({
          status: "success",
          message: result.message || "Dziękuję. Odpowiem możliwie szybko.",
        });
      });
    } catch (error) {
      startTransition(() => {
        setState({
          status: "error",
          message:
            error instanceof Error
              ? error.message
              : "Wystąpił problem podczas wysyłki formularza.",
        });
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      className="contact-form"
      action={async (formData) => {
        await handleSubmit(formData);
      }}
    >
      <div className="field-grid">
        <label className="field">
          <span>Imię i nazwisko</span>
          <input name="name" type="text" placeholder="Tomasz Gołaszewski" required />
        </label>
        <label className="field">
          <span>E-mail</span>
          <input name="email" type="email" placeholder="twoj@firma.pl" required />
        </label>
        <label className="field">
          <span>Firma</span>
          <input name="company" type="text" placeholder="Nazwa firmy" />
        </label>
        <label className="field">
          <span>Obszar</span>
          <select name="service" defaultValue="both" required>
            <option value="analytics">Analityka i automatyzacja</option>
            <option value="apps">Aplikacje webowe i AI</option>
            <option value="both">Oba obszary</option>
          </select>
        </label>
      </div>

      <label className="field">
        <span>Krótki opis potrzeby</span>
        <textarea
          name="message"
          rows={6}
          placeholder="Opisz problem, proces lub aplikację, którą chcesz zbudować."
          required
        />
      </label>

      <div className="form-actions">
        <button className="button button-primary" type="submit" disabled={pending}>
          {pending ? "Wysyłanie..." : "Wyślij zgłoszenie"}
        </button>
        <p className="helper-text">
          Formularz wysyła wiadomość bezpośrednio na skrzynkę kontaktową przez transakcyjny
          provider e-mail.
        </p>
      </div>

      {state.status !== "idle" ? (
        <p className={`form-feedback form-feedback-${state.status}`}>{state.message}</p>
      ) : null}
    </form>
  );
}
