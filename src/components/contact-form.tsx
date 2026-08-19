'use client';

import { startTransition, useState } from 'react';

import { logger } from '@/lib/logger';

const initialState = {
  status: 'idle' as 'idle' | 'success' | 'error',
  message: '',
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
      setState({ status: 'error', message: 'Wystąpił problem podczas wysyłki formularza.' });
      setPending(false);
      return;
    }

    const payload = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      company: String(formData.get('company') ?? ''),
      supportSystem: String(formData.get('support_system') ?? ''),
      weeklyTicketVolume: String(formData.get('weekly_ticket_volume') ?? ''),
      pilotInterest: String(formData.get('pilot_interest') ?? ''),
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

      let result: { message?: string; issues?: { fieldErrors?: Record<string, string[]>; formErrors?: string[] } } = {};
      try {
        result = await response.json();
      } catch (e) {
        logger.error('Błąd parsowania odpowiedzi z serwera', { error: e instanceof Error ? e.message : String(e) });
        throw new Error('Nie udało się wysłać formularza.');
      }

      if (!response.ok) {
        const errorMsg = result?.message || 'Nie udało się wysłać formularza.';
        const formErrors = result?.issues?.formErrors?.join(' ') || '';
        const fieldErrors = Object.values(result?.issues?.fieldErrors || {}).flat().join(' ');
        const details = [formErrors, fieldErrors].filter(Boolean).join(' ');
        throw new Error(details ? `${errorMsg} Szczegóły: ${details}` : errorMsg);
      }

      startTransition(() => {
        setState({
          status: 'success',
          message: result?.message || 'Dziękuję. Wrócę z oceną i propozycją następnego kroku.',
        });
      });
    } catch (error) {
      startTransition(() => {
        setState({
          status: 'error',
          message:
            error instanceof Error ? error.message : 'Wystąpił problem podczas wysyłki formularza.',
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
          <input id="name-input" name="name" type="text" placeholder="Jan" required autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="email-input">
            E-mail{' '}
            <span className="required-indicator" aria-hidden="true">
              *
            </span>
          </label>
          <input id="email-input" name="email" type="email" placeholder="jan@firma.pl" required autoComplete="email" />
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
            autoComplete="organization"
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="support-system-input">
          System wsparcia <span className="optional-indicator">(opcjonalnie)</span>
        </label>
        <input
          id="support-system-input"
          name="support_system"
          type="text"
          placeholder="Np. Zendesk, Freshdesk, HubSpot, e-mail"
        />
      </div>
      <div className="field-grid">
        <div className="field">
          <label htmlFor="weekly-ticket-volume-input">
            Zgłoszenia tygodniowo <span className="optional-indicator">(orientacyjnie)</span>
          </label>
          <select id="weekly-ticket-volume-input" name="weekly_ticket_volume" defaultValue="">
            <option value="">Wybierz zakres</option>
            <option value="mniej niż 50">mniej niż 50</option>
            <option value="50-100">50–100</option>
            <option value="101-300">101–300</option>
            <option value="powyżej 300">powyżej 300</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="pilot-interest-input">
            Program pilotażowy <span className="optional-indicator">(opcjonalnie)</span>
          </label>
          <select id="pilot-interest-input" name="pilot_interest" defaultValue="">
            <option value="">Wybierz odpowiedź</option>
            <option value="Tak, rozważam pilotaż">Tak, rozważam pilotaż</option>
            <option value="Chcę najpierw krótką konsultację">Chcę najpierw krótką konsultację</option>
            <option value="Pytam orientacyjnie">Pytam orientacyjnie</option>
          </select>
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
        />
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
