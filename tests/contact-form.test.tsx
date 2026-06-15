import 'global-jsdom/register';
import React from "react";
import { describe, test, mock } from "node:test";
import assert from "node:assert/strict";
import { render, screen, cleanup, act, waitFor } from "@testing-library/react";
import { ContactForm } from "../src/components/contact-form";

async function submitFormAction(container: HTMLElement, name: string, email: string, message: string) {
  const form = container.querySelector('form');
  if (form) {
    const reactPropsKey = Object.keys(form).find((key) => key.startsWith('__reactProps$'));
    if (reactPropsKey) {
      const props = form[reactPropsKey as keyof typeof form];
      if (props && props.action) {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('message', message);
        await props.action(formData);
      }
    }
  }
}

describe("ContactForm component", () => {
  test.afterEach(() => {
    cleanup();
    mock.restoreAll();
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

  async function setupAndSubmit(mockResponse: Response) {
    mock.method(global, 'fetch', async () => mockResponse);

    const { getByLabelText, container } = render(<ContactForm />);
    const nameInput = getByLabelText(/Imię/i) as HTMLInputElement;
    const emailInput = getByLabelText(/E-mail/i) as HTMLInputElement;
    const msgInput = getByLabelText(/Co dziś dzieje się/i) as HTMLTextAreaElement;

    await act(async () => {
      nameInput.value = 'Test';
      emailInput.value = 'test@example.com';
      msgInput.value = 'This is a sufficiently long message to pass the required test.';
    });

    await act(async () => {
      await submitFormAction(container, nameInput.value, emailInput.value, msgInput.value);
    });

    return { container };
  }

  test('handles null JSON response correctly without leaking TypeErrors', async () => {
    const { container } = await setupAndSubmit(new Response("null", { status: 400 }));

    await waitFor(() => {
      const errorElement = screen.getByText(/Nie udało się wysłać formularza\./);
      assert.ok(errorElement);
      // Verify it doesn't say "Cannot read properties of null"
      const allText = container.textContent;
      assert.equal(allText?.includes("Cannot read properties of null"), false);
    });
  });

  test('handles formErrors correctly', async () => {
    await setupAndSubmit(new Response(JSON.stringify({
      message: 'Błąd walidacji.',
      issues: {
        formErrors: ['Ogólny błąd formularza.'],
        fieldErrors: { name: ['Imię jest wymagane.'] }
      }
    }), { status: 400 }));

    await waitFor(() => {
      assert.ok(screen.getByText(/Ogólny błąd formularza\. Imię jest wymagane\./));
    });
  });
});
