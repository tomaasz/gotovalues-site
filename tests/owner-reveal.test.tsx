import "global-jsdom/register";

import React from "react";
import { readFileSync } from "node:fs";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "node:test";
import assert from "node:assert/strict";

import { OwnerReveal } from "../src/components/owner-reveal";

describe("OwnerReveal crawler-protected personal details", () => {
  afterEach(() => {
    cleanup();
  });

  test("hides owner name, surname and LinkedIn URL before user click in profile variant", () => {
    const { container } = render(<OwnerReveal variant="profile" />);

    assert.ok(screen.getByRole("button", { name: "Pokaż dane kontaktowe i profil LinkedIn" }));
    assert.equal(container.querySelector("a"), null);
    assert.equal(/tomasz|gołaszew|golaszew|linkedin\.com/i.test(container.innerHTML), false);
  });

  test("reveals full name and LinkedIn link after user click in profile variant", () => {
    const { container } = render(<OwnerReveal variant="profile" />);

    fireEvent.click(screen.getByRole("button", { name: "Pokaż dane kontaktowe i profil LinkedIn" }));

    assert.ok(screen.getByText("Tomasz Gołaszewski"));
    const link = screen.getByRole("link", { name: /Profil na LinkedIn/i });
    assert.equal(link.getAttribute("href"), "https://www.linkedin.com/in/tomasz-golaszewski/");
    assert.match(link.getAttribute("rel") ?? "", /nofollow/);
    assert.equal(container.querySelector("button"), null);
  });

  test("hides administrator name before click and reveals on click in inline variant", () => {
    const { container } = render(<OwnerReveal variant="inline" />);

    assert.ok(screen.getByRole("button", { name: "Pokaż dane administratora" }));
    assert.equal(/tomasz|gołaszew|golaszew/i.test(container.innerHTML), false);

    fireEvent.click(screen.getByRole("button", { name: "Pokaż dane administratora" }));
    assert.ok(screen.getByText("Tomasz Gołaszewski"));
  });

  test("keeps surname and personal LinkedIn URL out of crawlable server source files", () => {
    const filesToCheck = [
      "../src/app/layout.tsx",
      "../src/app/blog/[slug]/page.tsx",
      "../src/app/jak-pracuje/page.tsx",
      "../src/app/automatyzacja/page.tsx",
      "../src/app/dane-i-analityka/page.tsx",
      "../src/app/aplikacje/page.tsx",
      "../src/app/wsparcie-it/page.tsx",
      "../src/app/polityka-prywatnosci/page.tsx",
      "../src/components/home/home-sheets.tsx",
      "../src/components/service-landing.tsx",
      "../src/content/site.ts",
      "../public/llms.txt",
    ];

    for (const relPath of filesToCheck) {
      const content = readFileSync(new URL(relPath, import.meta.url), "utf-8");
      assert.equal(
        /gołaszew|golaszew|tomasz-golaszewski/i.test(content),
        false,
        `Personal surname or LinkedIn slug must not appear in crawlable file ${relPath}`,
      );
    }
  });
});
