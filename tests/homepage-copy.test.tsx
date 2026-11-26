import "global-jsdom/register";

import React from "react";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, mock, test } from "node:test";
import assert from "node:assert/strict";

import { DrawingSheet } from "../src/components/home/home-sheets";
import { TitleBlockForm } from "../src/components/home/title-block-form";

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
        "pilotInterest",
        "supportSystem",
        "weeklyTicketVolume",
      ]);
      assert.equal(JSON.parse(String(request.body)).message, "Dokumenty przychodzą mailem, a statusy prowadzimy w Excelu.");
    } finally {
      globalThis.FormData = nativeFormData;
    }
  });
});
