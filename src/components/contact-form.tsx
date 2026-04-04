'use client';

import { startTransition, useState } from 'react';

const initialState = {
  status: 'idle' as 'idle' | 'success' | 'error',
  message: '',
  fieldErrors: {} as Record<string, string[]>,
};

export function ContactForm() {
  const [state, setState] = useState(initialState);
  const [pending, setPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    setState(initialState);

    // honeypot check
    const honeypot = String(formData.get('bot_field') ?? '');
    if (honeypot.length > 0) {
      // Silently fail for bots
      setState({ status: 'error', message: 'Wystąpił problem podczas wysyłki formularza.', fieldErrors: {} });
      setPending(false);
      return;
    }

    const payload = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      company: String(formData.get('company') ?? ''),
      message: String(formData.get('message') ?? ''),
      // Sentinel: Pass the honeypot field to the server so it can be securely validated by the Zod schema.
      bot_field: String(formData.get('bot_field') ?? ''),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      let result: { message?: string; issues?: { fieldErrors?: Record<string, string[]> } } = {};
      try {
        result = await response.json();
      } catch (e) {
        console.error('Błąd parsowania odpowiedzi z serwera', e);
        throw new Error('Nie udało się wysłać formularza.');
      }

      if (!response.ok) {
        const error = new Error(result.message || 'Nie udało się wysłać formularza.') as Error & { fieldErrors?: Record<string, string[]> };
        error.fieldErrors = result.issues?.fieldErrors;
        throw error;
      }

      startTransition(() => {
        setState({
          status: 'success',
          message: result.message || 'Dziękuję. Wrócę z oceną i propozycją następnego kroku.',
          fieldErrors: {},
        });
      });
    } catch (error) {
      startTransition(() => {
        setState({
          status: 'error',
          message:
            error instanceof Error ? error.message : 'Wystąpił problem podczas wysyłki formularza.',
          fieldErrors: (error as Error & { fieldErrors?: Record<string, string[]> }).fieldErrors || {},
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
      <div style={{ display: 'none' }} aria-hidden="true">
        <label htmlFor="bot_field">Do not fill this out if you are human:</label>
        <input id="bot_field" name="bot_field" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="field-grid">
        <div className="field">
          <label htmlFor="name-input">
            Imię{' '}
            <span className="required-indicator" aria-hidden="true">
              *
            </span>
          </label>
          <input id="name-input" name="name" type="text" placeholder="Jan" required aria-invalid={!!state.fieldErrors?.name} aria-describedby={state.fieldErrors?.name ? "name-error" : undefined} />
          {state.fieldErrors?.name && <div id="name-error" className="form-feedback-error text-sm mt-1">{state.fieldErrors.name[0]}</div>}
        </div>
        <div className="field">
          <label htmlFor="email-input">
            E-mail{' '}
            <span className="required-indicator" aria-hidden="true">
              *
            </span>
          </label>
          <input id="email-input" name="email" type="email" placeholder="jan@firma.pl" required aria-invalid={!!state.fieldErrors?.email} aria-describedby={state.fieldErrors?.email ? "email-error" : undefined} />
          {state.fieldErrors?.email && <div id="email-error" className="form-feedback-error text-sm mt-1">{state.fieldErrors.email[0]}</div>}
        </div>
        <div className="field">
          <label htmlFor="company-input">
            Firma <span className="optional-indicator">(opcjonalnie)</span>
          </label>
          <input
            id="company-input"
            name="company"
            type="text"
            placeholder="Nazwa firmy lub zakładu"
            aria-invalid={!!state.fieldErrors?.company} aria-describedby={state.fieldErrors?.company ? "company-error" : undefined}
          />
          {state.fieldErrors?.company && <div id="company-error" className="form-feedback-error text-sm mt-1">{state.fieldErrors.company[0]}</div>}
        </div>
      </div>

      <div className="field">
        <label htmlFor="message-input">
          Co dziś dzieje się ręcznie albo chaotycznie{' '}
          <span className="required-indicator" aria-hidden="true">
            *
          </span>
        </label>
        <textarea
          id="message-input"
          name="message"
          rows={6}
          placeholder="Wystarczą 2-4 zdania. Np. dokumenty przychodzą mailem, dane trafiają do Excela, a status trzeba ręcznie dopytywać."
          required
          aria-invalid={!!state.fieldErrors?.message} aria-describedby={state.fieldErrors?.message ? "message-error" : undefined}
        />
        {state.fieldErrors?.message && <div id="message-error" className="form-feedback-error text-sm mt-1">{state.fieldErrors.message[0]}</div>}
      </div>

      <div className="form-actions">
        <button className="button button-primary" type="submit" disabled={pending}>
          {pending ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 mr-2 animate-spin"
                aria-hidden="true"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              Wysyłanie...
            </>
          ) : (
            'Wyślij krótki opis'
          )}
        </button>
        <p className="helper-text">
          Wystarczy kilka zdań. Wiadomość trafia bezpośrednio do mnie, bez żadnego automatu po
          drodze.
        </p>
      </div>

      <div aria-live="polite" aria-atomic="true">
        {state.status !== 'idle' ? (
          <p className={`form-feedback form-feedback-${state.status}`}>{state.message}</p>
        ) : null}
      </div>
    </form>
  );
}
