'use client';

import { useState } from 'react';

import { trackEvent } from '@/lib/analytics';

// Stored as shifted digit codes and decoded only after user interaction
// so raw phone patterns never appear in SSR HTML or static bundle strings.
const SHIFT = 17;
const ENCODED_DIGITS = [23, 17, 17, 21, 23, 25, 21, 24, 20] as const;

type RevealedPhone = {
  display: string;
  href: string;
};

function decodePhone(): RevealedPhone {
  const raw = ENCODED_DIGITS.map((value) => String(value - SHIFT)).join('');
  const grouped = `${raw.slice(0, 3)} ${raw.slice(3, 6)} ${raw.slice(6, 9)}`;
  const scheme = ['t', 'e', 'l', ':'].join('');
  return {
    display: `+48 ${grouped}`,
    href: `${scheme}+48${raw}`,
  };
}

export function PhoneReveal() {
  const [phone, setPhone] = useState<RevealedPhone | null>(null);

  return (
    <span aria-live="polite">
      {phone ? (
        <a className="gv-link" href={phone.href}>
          {phone.display}
        </a>
      ) : (
        <button
          type="button"
          className="gv-link gv-phone-trigger"
          aria-expanded="false"
          onClick={() => {
            setPhone(decodePhone());
            trackEvent('phone_revealed');
          }}
        >
          Pokaż numer telefonu
        </button>
      )}
    </span>
  );
}
