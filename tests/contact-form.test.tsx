import '../tools/setup-jsdom.mjs';
import React from "react";
import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { render, screen, cleanup } from "@testing-library/react";
import { ContactForm } from "../src/components/contact-form";

describe("ContactForm component", () => {
  test.afterEach(() => {
    cleanup();
  });

  test('renders correctly and has a loading indicator pattern mapped to aria states', () => {
    render(<ContactForm />);
    assert.ok(screen.getByLabelText(/Imię/i));
    assert.ok(screen.getByLabelText(/E-mail/i));
    assert.ok(screen.getByLabelText(/Firma/i));
    assert.ok(screen.getByLabelText(/Co dziś dzieje się/i));
    assert.ok(screen.getByRole('button', { name: /Wyślij krótki opis/i }));
  });

  test('has polite live region for feedback', () => {
    const { container } = render(<ContactForm />);
    const liveRegion = container.querySelector('[aria-live="polite"]');
    assert.ok(liveRegion);
    assert.equal(liveRegion.getAttribute('aria-atomic'), 'true');
  });
});
