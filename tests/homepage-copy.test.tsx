import "global-jsdom/register";

import React from "react";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, mock, test } from "node:test";
import assert from "node:assert/strict";

import { DrawingSheet, ProofSheet } from "../src/components/home/home-sheets";
import { TitleBlockForm } from "../src/components/home/title-block-form";
import { siteContent } from "../src/content/site";

describe("homepage copy", () => {
  afterEach(() => {
    cleanup();
    mock.restoreAll();
  });

  test("keeps the first viewport problem-first with one Napisz action", () => {
    render(<DrawingSheet />);

    assert.equal(screen.getByRole("heading", { level: 1 }).textContent, "Porządkuję jeden proces naraz.");
    assert.equal(screen.getAllByRole("button", { name: "Napisz" }).length, 1);
    assert.equal(screen.queryByText(/działające wdrożenie|nie jestem zwykłym/i), null);
    assert.match(screen.getByLabelText("Opisz jeden proces").getAttribute("placeholder") ?? "", /dokumenty|statusy|wyjątki/i);
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
      fireEvent.change(screen.getByLabelText("Opisz jeden proces"), {
        target: { value: "Dokumenty przychodzą mailem, a statusy prowadzimy w Excelu." },
      });
      fireEvent.change(screen.getByLabelText("Imię"), { target: { value: "Tomasz" } });
      fireEvent.change(screen.getByLabelText("E-mail służbowy"), { target: { value: "tomasz@example.com" } });
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
      assert.equal(JSON.parse(String(request.body)).message, "Dokumenty przychodzą mailem, a statusy prowadzimy w Excelu.");
    } finally {
      globalThis.FormData = nativeFormData;
    }
  });

  test("keeps the full contact form CTA and concise process prompt", async () => {
    const { ContactForm } = await import("../src/components/contact-form");
    render(<ContactForm />);

    assert.ok(screen.getByRole("button", { name: "Napisz" }));
    assert.match(screen.getByLabelText(/Co dziś dzieje się ręcznie/i).getAttribute("placeholder") ?? "", /dokumenty|statusy|wyjątki/i);
    assert.equal(screen.queryByRole("button", { name: /Wyślij (krótki opis|opis procesu)/i }), null);
  });

  test("keeps the compact form status live and the sending label consistent", () => {
    render(<TitleBlockForm />);
    const status = screen.getByRole("status");
    assert.equal(status.getAttribute("aria-live"), "polite");
    assert.equal(screen.getByRole("button", { name: "Napisz" }).textContent, "Napisz");
    assert.equal(screen.queryByLabelText(/System wsparcia|Zgłoszenia tygodniowo|Program pilotażowy/i), null);
  });

  test("renders public and private proof in one grid with exactly two public links", () => {
    const { container } = render(<ProofSheet />);
    const section = container.querySelector("section#produkty");
    assert.ok(section);

    const grid = section.querySelector('[data-proof-grid="unified"]');
    assert.ok(grid);
    assert.equal(section.querySelector(".gv-private"), null);

    const allProducts = [...siteContent.products.public, ...siteContent.products.private];
    assert.equal(grid.children.length, allProducts.length);

    const links = Array.from(grid.querySelectorAll("a"));
    assert.equal(links.length, 2);
    assert.deepEqual(
      links.map((link) => link.getAttribute("href")),
      ["https://cavi.gotova.pl/", "https://akta.gotova.pl"],
    );
    for (const link of links) {
      assert.equal(link.getAttribute("target"), "_blank");
      assert.equal(link.getAttribute("rel"), "noopener noreferrer");
      assert.match(link.textContent ?? "", /otwiera się w nowej karcie/i);
    }

    const articles = Array.from(grid.querySelectorAll("article"));
    assert.equal(articles.length, siteContent.products.private.length);
    for (const article of articles) {
      assert.equal(article.getAttribute("href"), null);
      assert.equal(article.querySelector("a"), null);
      assert.match(article.textContent ?? "", /Prywatne wdrożenie/);
      assert.match(article.textContent ?? "", /Bez linku/);
    }

    assert.equal(screen.getByRole("heading", { level: 2 }).id, "gv-proof-title");
    assert.equal(screen.getAllByRole("heading", { level: 3 }).length, allProducts.length);

    for (const product of allProducts) {
      assert.ok(screen.getByRole("heading", { level: 3, name: product.name }));
      assert.ok(screen.getByText(product.summary));
      assert.ok(screen.getByRole("img", { name: product.screenshot.alt }));
    }
  });
});
