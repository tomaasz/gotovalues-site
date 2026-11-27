import "global-jsdom/register";

import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, test } from "node:test";
import assert from "node:assert/strict";

import ProductionLandingPage, { metadata } from "../src/app/dla-produkcji/page";
import { siteContent } from "../src/content/site";

describe("/dla-produkcji production landing page", () => {
  const originalIntersectionObserver = globalThis.IntersectionObserver;

  beforeEach(() => {
    class MockIntersectionObserver implements IntersectionObserver {
      readonly root = null;
      readonly rootMargin = "0px";
      readonly scrollMargin = "0px";
      readonly thresholds = [0];
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords(): IntersectionObserverEntry[] {
        return [];
      }
    }

    globalThis.IntersectionObserver = MockIntersectionObserver;
    window.IntersectionObserver = MockIntersectionObserver;
  });

  afterEach(() => {
    cleanup();
    globalThis.IntersectionObserver = originalIntersectionObserver;
    window.IntersectionObserver = originalIntersectionObserver;
  });

  test("exports production-focused metadata with lowercase gotovalues and canonical path", () => {
    assert.equal(metadata.title, "Dla produkcji");
    assert.equal(metadata.alternates?.canonical, "/dla-produkcji");
    assert.match(String(metadata.description ?? ""), /gotovalues/);
    assert.match(String(metadata.description ?? ""), /bez wymiany ERP/i);
  });

  test("names document, quality, and exception workflows and rules out ERP replacement", () => {
    const { container } = render(<ProductionLandingPage />);

    const h1 = screen.getByRole("heading", { level: 1 });
    assert.match(h1.textContent ?? "", /dokumenty|jakość|wyjątki/i);
    assert.match(h1.textContent ?? "", /bez wymiany ERP/i);

    const symptomsSection = container.querySelector("section#objawy");
    assert.ok(symptomsSection);
    for (const symptom of siteContent.productionLanding.symptoms) {
      assert.ok(screen.getByRole("heading", { level: 3, name: symptom.title }));
    }

    const solutionsSection = container.querySelector("section#rozwiazania");
    assert.ok(solutionsSection);
    assert.match(solutionsSection.textContent ?? "", /bez wymiany ERP/i);
    for (const solution of siteContent.productionLanding.solutions) {
      assert.ok(screen.getByRole("heading", { level: 3, name: solution.title }));
    }
  });

  test("omits product examples section and links to #produkty", () => {
    const { container } = render(<ProductionLandingPage />);
    assert.equal(container.querySelector("section#proof"), null);
    assert.equal(container.querySelector('[data-proof-grid="production"]'), null);
    assert.equal(container.querySelector('a[href="/#produkty"]'), null);
    assert.equal(container.querySelector('a[href="https://cavi.gotova.pl/"]'), null);
    assert.equal(container.querySelector('a[href="https://akta.gotova.pl"]'), null);
  });

  test("explains a small first step, keeps one primary #kontakt CTA, and omits SupportFlow detours", () => {
    const { container } = render(<ProductionLandingPage />);

    assert.equal(container.querySelector("section#zobacz-tez"), null);

    const primaryButtons = Array.from(container.querySelectorAll("a.button-primary"));
    assert.equal(primaryButtons.length, 1);
    assert.equal(primaryButtons[0]?.getAttribute("href"), "#kontakt");
    assert.equal(primaryButtons[0]?.textContent, siteContent.productionLanding.cta.label);

    const heroActions = container.querySelector(".hero-actions");
    assert.ok(heroActions);
    assert.equal(heroActions.querySelectorAll("a").length, 1);

    const firstStepSection = container.querySelector("section#jak-pracuje");
    assert.ok(firstStepSection);
    for (const step of siteContent.productionLanding.processSteps) {
      assert.ok(screen.getByText(step.title));
    }

    const contactSection = container.querySelector("section#kontakt");
    assert.ok(contactSection);
    assert.match(contactSection.textContent ?? "", /kontakt@gotovalues\.com/);
    assert.equal(screen.getAllByRole("heading", { level: 1 }).length, 1);
    assert.equal(screen.getAllByRole("heading", { level: 2 }).length, 4);
  });
});
