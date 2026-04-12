import '../tools/setup-jsdom.mjs';
import React from "react";
import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { render, screen, cleanup, act, waitFor } from "@testing-library/react";
import { ContactForm } from "../src/components/contact-form";

describe("ContactForm component null check", () => {
  test.afterEach(() => {
    cleanup();
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
});
