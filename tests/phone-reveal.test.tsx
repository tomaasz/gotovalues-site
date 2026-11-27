import "global-jsdom/register";

import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "node:test";
import assert from "node:assert/strict";

import { PhoneReveal } from "../src/components/phone-reveal";

describe("PhoneReveal bot-protected contact", () => {
  afterEach(() => {
    cleanup();
  });

  test("hides raw phone digits and tel: link before user interaction", () => {
    const { container } = render(<PhoneReveal />);

    assert.ok(screen.getByRole("button", { name: "Pokaż numer telefonu" }));
    assert.equal(container.querySelector("a"), null);
    assert.equal(/600\s*468\s*473|tel:/i.test(container.innerHTML), false);
  });

  test("reveals formatted Polish phone link after click", () => {
    const { container } = render(<PhoneReveal />);

    fireEvent.click(screen.getByRole("button", { name: "Pokaż numer telefonu" }));

    const link = screen.getByRole("link", { name: "+48 600 468 473" });
    assert.equal(link.getAttribute("href"), "tel:+48600468473");
    assert.equal(container.querySelector("button"), null);
  });
});
