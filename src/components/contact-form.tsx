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
          message: result.message || "Dziękuję. Wrócę z oceną i propozycją następnego kroku.",
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
          <span>Imię</span>
          <input name="name" type="text" placeholder="Jan" required />
        </label>
        <label className="field">
          <span>E-mail</span>
          <input name="email" type="email" placeholder="jan@firma.pl" required />
        </label>
        <label className="field">
          <span>Firma</span>
          <input name="company" type="text" placeholder="Nazwa firmy lub zakładu" />
        </label>
      </div>

      <label className="field">
        <span>Co dziś dzieje się ręcznie albo chaotycznie</span>
        <textarea
          name="message"
          rows={6}
          placeholder="Wystarczą 2-4 zdania. Np. dokumenty przychodzą mailem, dane trafiają do Excela, a status trzeba ręcznie dopytywać."
          required
        />
      </label>

      <div className="form-actions">
        <button className="button button-primary" type="submit" disabled={pending}>
          {pending ? "Wysyłanie..." : "Wyślij krótki opis"}
        </button>
        <p className="helper-text">
          Wystarczy kilka zdań. Wiadomość trafia bezpośrednio do mnie, bez żadnego automatu po drodze.
        </p>
      </div>

      {state.status !== "idle" ? (
        <p className={`form-feedback form-feedback-${state.status}`}>{state.message}</p>
      ) : null}
    </form>
  );
}
