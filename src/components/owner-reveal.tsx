'use client';

import { useState } from 'react';

import { trackEvent } from '@/lib/analytics';

// Stored as shifted character codes and decoded only after user interaction
// so personal data and profile URLs never appear in SSR HTML, JSON-LD, or static strings.
const SHIFT = 19;
const ENCODED_NAME = [
  103, 130, 128, 116, 134, 141, 51, 90, 130, 341, 116, 134, 141, 120, 138, 134, 126, 124,
] as const;
const ENCODED_SLUG = [
  135, 130, 128, 116, 134, 141, 64, 122, 130, 127, 116, 134, 141, 120, 138, 134, 126, 124,
] as const;

type RevealedOwner = {
  name: string;
  profileUrl: string;
};

function decodeCodes(codes: readonly number[]): string {
  return codes.map((code) => String.fromCharCode(code - SHIFT)).join('');
}

function decodeOwner(): RevealedOwner {
  const name = decodeCodes(ENCODED_NAME);
  const slug = decodeCodes(ENCODED_SLUG);
  const profileUrl = ['https://', 'www.', 'linkedin.com', '/in/', slug, '/'].join('');
  return { name, profileUrl };
}

function ExternalIcon() {
  return (
    <svg className="gv-icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path
        d="M6 3h7v7M13 3 4 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

export type OwnerRevealProps = {
  variant?: 'profile' | 'inline';
};

export function OwnerReveal({ variant = 'profile' }: OwnerRevealProps) {
  const [owner, setOwner] = useState<RevealedOwner | null>(null);

  if (variant === 'inline') {
    return (
      <span aria-live="polite">
        {owner ? (
          <strong>{owner.name}</strong>
        ) : (
          <button
            type="button"
            className="legal-inline-button"
            aria-expanded="false"
            onClick={() => {
              setOwner(decodeOwner());
              trackEvent('owner_revealed', { variant: 'inline' });
            }}
          >
            Pokaż dane administratora
          </button>
        )}
      </span>
    );
  }

  return (
    <span aria-live="polite">
      {owner ? (
        <span>
          <strong>{owner.name}</strong>{' '}
          <a
            className="gv-link"
            href={owner.profileUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            Profil na LinkedIn
            <ExternalIcon />
            <span className="sr-only"> (otwiera się w nowej karcie)</span>
          </a>
        </span>
      ) : (
        <button
          type="button"
          className="gv-link gv-phone-trigger"
          aria-expanded="false"
          onClick={() => {
            setOwner(decodeOwner());
            trackEvent('owner_revealed', { variant: 'profile' });
          }}
        >
          Pokaż dane kontaktowe i profil LinkedIn
        </button>
      )}
    </span>
  );
}
