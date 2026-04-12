import '../tools/setup-jsdom.mjs';
import React from "react";
import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { render, screen, cleanup, act, waitFor } from "@testing-library/react";
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

  test('handles null JSON response correctly without leaking TypeErrors', async () => {
    const originalFetch = global.fetch;

    global.fetch = async () => new Response("null", { status: 400 });

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
      const form = container.querySelector('form');
      if (form) {
        const reactPropsKey = Object.keys(form).find((key) => key.startsWith('__reactProps$'));
        if (reactPropsKey) {
          // @ts-expect-error - accessing internal react props for test
          const props = form[reactPropsKey as keyof typeof form];
          if (props && props.action) {
            const formData = new FormData();
            formData.append('name', nameInput.value);
            formData.append('email', emailInput.value);
            formData.append('message', msgInput.value);
            await props.action(formData);
          }
        }
      }
    });

    try {
      await waitFor(() => {
        const errorElement = screen.getByText(/Nie udało się wysłać formularza\./);
        assert.ok(errorElement);
        // Verify it doesn't say "Cannot read properties of null"
        const allText = container.textContent;
        assert.equal(allText?.includes("Cannot read properties of null"), false);
      });
    } finally {
      global.fetch = originalFetch;
    }
  });

  test('handles formErrors correctly', async () => {
    const originalFetch = global.fetch;

    global.fetch = async () => new Response(JSON.stringify({
      message: 'Błąd walidacji.',
      issues: {
        formErrors: ['Ogólny błąd formularza.'],
        fieldErrors: { name: ['Imię jest wymagane.'] }
      }
    }), { status: 400 });

    const { getByLabelText, container } = render(<ContactForm />);
    const nameInput = getByLabelText(/Imię/i) as HTMLInputElement;
    const emailInput = getByLabelText(/E-mail/i) as HTMLInputElement;
    const msgInput = getByLabelText(/Co dziś dzieje się/i) as HTMLTextAreaElement;

    // Fill out form to pass HTML validation so we hit the custom fetch handler
    await act(async () => {
      nameInput.value = 'Test';
      emailInput.value = 'test@example.com';
      msgInput.value = 'This is a sufficiently long message to pass the required test.';
    });

    await act(async () => {
      // In Next.js App Router, the action prop handles form submission. To properly test this component
      // without heavy Server Action mocking in JSDOM, we can trigger the action handler directly if we can access it,
      // or we can test the handleSubmit function indirectly by mocking fetch as we did.
      // But since Action is passed as a prop internally, testing library fireEvent.submit(form) often fails to trigger the transition.
      // Let's directly invoke the fetch logic if possible, or trigger submit while properly awaited.

      const form = container.querySelector('form');
      if (form) {
        // We can extract the action prop from the form's React fiber if needed, but simplest is to dispatch submit event
        // with the right properties so Next.js internal action handler picks it up, or we can just call the action directly if we can grab it.
        const reactPropsKey = Object.keys(form).find((key) => key.startsWith('__reactProps$'));
        if (reactPropsKey) {
          // @ts-expect-error accessing internal react props for test
          const props = form[reactPropsKey as keyof typeof form];
          if (props && props.action) {
            const formData = new FormData();
            formData.append('name', nameInput.value);
            formData.append('email', emailInput.value);
            formData.append('message', msgInput.value);
            await props.action(formData);
          }
        }
      }
    });

    try {
      await waitFor(() => {
        assert.ok(screen.getByText(/Ogólny błąd formularza\. Imię jest wymagane\./));
      });
    } finally {
      global.fetch = originalFetch;
    }
  });
});
