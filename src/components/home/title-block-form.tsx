'use client';

import { useState } from 'react';

import { logger } from '@/lib/logger';

type Status = {
  kind: 'idle' | 'sending' | 'success' | 'error';
  message: string;
  /** The error belongs to the process description field. */
  invalidMessage?: boolean;
};

const MIN_MESSAGE = 20;

/**
 * Compact contact form set into the drawing's title block (first viewport).
 * Posts to /api/contact with the same payload shape as ContactForm.
 */
export function TitleBlockForm() {
  const [status, setStatus] = useState<Status>({ kind: 'idle', message: '' });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const message = String(data.get('message') ?? '').trim();

    if (message.length < MIN_MESSAGE) {
      setStatus({
        kind: 'error',
        invalidMessage: true,
        message: `Opisz proces w co najmniej ${MIN_MESSAGE} znakach: co dziś robicie ręcznie i gdzie to boli.`,
      });
      return;
    }

    setStatus({ kind: 'sending', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(data.get('name') ?? ''),
          email: String(data.get('email') ?? ''),
          company: '',
          supportSystem: '',
          weeklyTicketVolume: '',
          pilotInterest: '',
          message,
          bot_field: String(data.get('bot_field') ?? ''),
        }),
      });

      const result: { message?: string } = await response.json().catch(() => ({}));

      if (!response.ok) {
        setStatus({
          kind: 'error',
          message: result.message ?? 'Nie udało się wysłać opisu. Spróbuj ponownie albo napisz na kontakt@gotovalues.com.',
        });
        return;
      }

      form.reset();
      setStatus({ kind: 'success', message: 'Dziękuję. Odpowiem w ciągu 24 godzin w dni robocze.' });
    } catch (error) {
      logger.error('Title block form submission failed', {
        error: error instanceof Error ? error.message : String(error),
      });
      setStatus({
        kind: 'error',
        message: 'Brak połączenia z serwerem. Spróbuj ponownie albo napisz na kontakt@gotovalues.com.',
      });
    }
  }

  const sending = status.kind === 'sending';

  return (
    <form className="gv-title-form" onSubmit={handleSubmit} noValidate={false} aria-describedby="gv-title-form-status">
      <div className="gv-tb-cell gv-tb-message">
        <label htmlFor="gv-tb-message">Opisz jeden proces</label>
        <textarea
          id="gv-tb-message"
          name="message"
          rows={3}
          required
          minLength={MIN_MESSAGE}
          maxLength={5000}
          aria-invalid={status.invalidMessage ? true : undefined}
          placeholder="Np. reklamacje spływają mailem, statusy partii prowadzimy w Excelu…"
        />
      </div>
      <div className="gv-tb-cell">
        <label htmlFor="gv-tb-name">Imię</label>
        <input id="gv-tb-name" name="name" autoComplete="given-name" required minLength={2} maxLength={100} />
      </div>
      <div className="gv-tb-cell">
        <label htmlFor="gv-tb-email">E-mail służbowy</label>
        <input id="gv-tb-email" name="email" type="email" autoComplete="email" required maxLength={255} />
      </div>
      <div className="gv-honeypot" aria-hidden="true">
        <label htmlFor="gv-tb-bot">Nie wypełniaj tego pola</label>
        <input id="gv-tb-bot" name="bot_field" tabIndex={-1} autoComplete="off" />
      </div>
      <button className="gv-tb-submit" type="submit" disabled={sending}>
        {sending ? 'Wysyłam opis…' : 'Wyślij opis procesu'}
      </button>
      <p
        id="gv-title-form-status"
        className={`gv-tb-status gv-tb-status-${status.kind}`}
        role="status"
      >
        {status.message}
      </p>
    </form>
  );
}
