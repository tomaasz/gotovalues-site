import "global-jsdom/register";

import React from "react";
import { readFileSync } from "node:fs";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, mock, test } from "node:test";
import assert from "node:assert/strict";

import { DrawingSheet } from "../src/components/home/home-sheets";
import { TitleBlockForm } from "../src/components/home/title-block-form";
import { SiteHeader } from "../src/components/site-header";
import { Footer } from "../src/components/footer";

describe("homepage copy", () => {
  afterEach(() => {
    cleanup();
    mock.restoreAll();
  });

  test("keeps the first viewport clean with a single CTA to #kontakt and no duplicate form", () => {
    const { container } = render(<DrawingSheet />);

    assert.equal(
      screen.getByRole("heading", { level: 1 }).textContent,
      "Automatyzacja, aplikacje i wsparcie IT.",
    );
    assert.equal(container.querySelectorAll("form").length, 0);
    const cta = screen.getByRole("link", { name: "Napisz wiadomość" });
    assert.equal(cta.getAttribute("href"), "#kontakt");
    assert.ok(screen.getByText("Wsparcie IT, serwery i sprzęt"));
  });

  test("submits the unchanged contact payload shape", async () => {
    const nativeFormData = globalThis.FormData;
    globalThis.FormData = window.FormData;
    let request: RequestInit | undefined;
    mock.method(global, "fetch", async (_input: string | URL | Request, init?: RequestInit) => {
      request = init;
      return new Response(JSON.stringify({ message: "ok" }), { status: 200 });
    });

    try {
      render(<TitleBlockForm />);
      fireEvent.change(screen.getByLabelText("W czym mogę pomóc?"), {
        target: { value: "Chcemy połączyć arkusze z pocztą i uporządkować kopie zapasowe." },
      });
      fireEvent.change(screen.getByLabelText("Imię"), { target: { value: "Tomasz" } });
      fireEvent.change(screen.getByLabelText("E-mail"), { target: { value: "tomasz@example.com" } });
      fireEvent.change(screen.getByLabelText(/Firma/), { target: { value: "Gotova" } });

      const form = screen.getByRole("button", { name: "Wyślij wiadomość" }).closest("form")!;
      const reactPropsKey = Object.keys(form).find((key) => key.startsWith("__reactProps$"));
      assert.ok(reactPropsKey);
      const props = form[reactPropsKey as keyof typeof form] as {
        onSubmit: (event: { preventDefault: () => void; currentTarget: HTMLFormElement }) => Promise<void>;
      };
      await act(async () => {
        await props.onSubmit({ preventDefault: () => {}, currentTarget: form });
      });

      assert.ok(request);
      assert.deepEqual(Object.keys(JSON.parse(String(request.body))).sort(), [
        "bot_field",
        "company",
        "email",
        "message",
        "name",
      ]);
      assert.equal(JSON.parse(String(request.body)).company, "Gotova");
      assert.equal(
        JSON.parse(String(request.body)).message,
        "Chcemy połączyć arkusze z pocztą i uporządkować kopie zapasowe.",
      );
    } finally {
      globalThis.FormData = nativeFormData;
    }
  });

  test("keeps the full contact form CTA and neutral automation + hardware/IT prompt", async () => {
    const { ContactForm } = await import("../src/components/contact-form");
    render(<ContactForm />);

    assert.ok(screen.getByRole("button", { name: "Wyślij wiadomość" }));
    const placeholder = screen.getByLabelText(/W czym mogę pomóc/i).getAttribute("placeholder") ?? "";
    assert.match(placeholder, /przepisywanie danych|raporty|komputera|serwera|wsparcie IT/i);
    assert.equal(/rwie się Wi-Fi/i.test(placeholder), false);
  });

  test("keeps the compact form status live and without legacy pilot fields", () => {
    render(<TitleBlockForm />);
    const status = screen.getByRole("status");
    assert.equal(status.getAttribute("aria-live"), "polite");
    assert.equal(screen.getByRole("button", { name: "Wyślij wiadomość" }).textContent, "Wyślij wiadomość");
    assert.equal(screen.queryByLabelText(/System wsparcia|Zgłoszenia tygodniowo|Program pilotażowy/i), null);
  });

  test("omits product examples and removed legacy routes from homepage, header, and footer", () => {
    const { container } = render(
      <>
        <SiteHeader />
        <Footer />
      </>,
    );
    assert.equal(container.querySelector('a[href="/#produkty"]'), null);
    assert.equal(container.querySelector('a[href="/supportflow"]'), null);
    assert.equal(container.querySelector('a[href="/triageflow"]'), null);
    assert.equal(container.querySelector('a[href="/kalkulator-roi"]'), null);
    assert.equal(screen.queryByRole("link", { name: "Produkty" }), null);

    const homePageSource = readFileSync(new URL("../src/app/page.tsx", import.meta.url), "utf-8");
    assert.equal(/ProofSheet/.test(homePageSource), false);
  });
});
