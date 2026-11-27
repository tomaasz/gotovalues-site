import "global-jsdom/register";

import React from "react";
import { readFileSync } from "node:fs";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, mock, test } from "node:test";
import assert from "node:assert/strict";

import { DrawingSheet } from "../src/components/home/home-sheets";
import { TitleBlockForm } from "../src/components/home/title-block-form";
import { SiteHeader } from "../src/components/site-header";

describe("homepage copy", () => {
  afterEach(() => {
    cleanup();
    mock.restoreAll();
  });

  test("keeps the first viewport focused on small-business IT with one Napisz action", () => {
    render(<DrawingSheet />);

    assert.equal(screen.getByRole("heading", { level: 1 }).textContent, "Sprawne IT dla małej firmy i JDG.");
    assert.equal(screen.getAllByRole("button", { name: "Napisz" }).length, 1);
    assert.equal(screen.queryByText(/działające wdrożenie|nie jestem zwykłym/i), null);
    assert.match(screen.getByLabelText("W czym mogę pomóc?").getAttribute("placeholder") ?? "", /Wi-Fi|komputer|backup|wsparcia IT/i);
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
        target: { value: "Rwie się Wi-Fi w biurze i trzeba skonfigurować kopię zapasową." },
      });
      fireEvent.change(screen.getByLabelText("Imię"), { target: { value: "Tomasz" } });
      fireEvent.change(screen.getByLabelText("E-mail"), { target: { value: "tomasz@example.com" } });
      fireEvent.change(screen.getByLabelText(/Firma/), { target: { value: "Gotova" } });

      const form = screen.getByRole("button", { name: "Napisz" }).closest("form")!;
      const reactPropsKey = Object.keys(form).find((key) => key.startsWith("__reactProps$"));
      assert.ok(reactPropsKey);
      const props = form[reactPropsKey as keyof typeof form] as { onSubmit: (event: { preventDefault: () => void; currentTarget: HTMLFormElement }) => Promise<void> };
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
      assert.equal(JSON.parse(String(request.body)).message, "Rwie się Wi-Fi w biurze i trzeba skonfigurować kopię zapasową.");
    } finally {
      globalThis.FormData = nativeFormData;
    }
  });

  test("keeps the full contact form CTA and concise IT support prompt", async () => {
    const { ContactForm } = await import("../src/components/contact-form");
    render(<ContactForm />);

    assert.ok(screen.getByRole("button", { name: "Napisz" }));
    assert.match(screen.getByLabelText(/W czym mogę pomóc/i).getAttribute("placeholder") ?? "", /Wi-Fi|komputer|backup|wsparcia IT/i);
    assert.equal(screen.queryByRole("button", { name: /Wyślij (krótki opis|opis procesu)/i }), null);
  });

  test("keeps the compact form status live and the sending label consistent", () => {
    render(<TitleBlockForm />);
    const status = screen.getByRole("status");
    assert.equal(status.getAttribute("aria-live"), "polite");
    assert.equal(screen.getByRole("button", { name: "Napisz" }).textContent, "Napisz");
    assert.equal(screen.queryByLabelText(/System wsparcia|Zgłoszenia tygodniowo|Program pilotażowy/i), null);
  });

  test("omits product examples section from homepage, logistics page, and header navigation", () => {
    const { container } = render(<SiteHeader />);
    assert.equal(container.querySelector('a[href="/#produkty"]'), null);
    assert.equal(screen.queryByRole("link", { name: "Produkty" }), null);

    const homePageSource = readFileSync(new URL("../src/app/page.tsx", import.meta.url), "utf-8");
    assert.equal(/ProofSheet/.test(homePageSource), false);

    const logisticsPageSource = readFileSync(new URL("../src/app/dla-logistyki/page.tsx", import.meta.url), "utf-8");
    assert.equal(/ProductCard|\/#produkty/.test(logisticsPageSource), false);
  });
});
