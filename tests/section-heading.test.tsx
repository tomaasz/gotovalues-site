import '../tools/setup-jsdom.mjs';
import React from "react";
import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { render, screen, cleanup } from "@testing-library/react";
import { SectionHeading } from "../src/components/section-heading";

describe("SectionHeading component", () => {
  test.afterEach(() => {
    cleanup();
  });

  test('renders standard variation with h2', () => {
    render(<SectionHeading eyebrow="test-eyebrow" heading="Main Heading" />);
    const heading = screen.getByRole('heading', { level: 2 });
    assert.equal(heading.textContent, 'Main Heading');

    const eyebrow = screen.getByText('test-eyebrow');
    assert.ok(eyebrow.classList.contains('eyebrow'));
  });

  test('renders inline variant', () => {
    const { container } = render(<SectionHeading inline eyebrow="inline-eyebrow" heading="Inline" />);
    const wrapper = container.querySelector('.section-heading-inline');
    assert.ok(wrapper);
  });

  test('renders different heading levels', () => {
    const { unmount } = render(<SectionHeading level="h1" eyebrow="h1" heading="H1 Head" />);
    assert.ok(screen.getByRole('heading', { level: 1 }));
    unmount();

    render(<SectionHeading level="h3" eyebrow="h3" heading="H3 Head" />);
    assert.ok(screen.getByRole('heading', { level: 3 }));
  });
});
