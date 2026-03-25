import "./setup"; // Must come before any React Testing Library imports

import React from "react";
import { describe, test } from "node:test";
import assert from "node:assert/strict";

import { render, screen, cleanup } from "@testing-library/react";

import { ProductCard } from "../src/components/product-card";
import type { ProductCard as ProductCardType } from "../src/content/site";

const mockPublicProduct: ProductCardType = {
  name: "Public Product A",
  category: "public",
  summary: "This is a public product summary.",
  stack: ["React", "Node"],
  impact: "High impact.",
  url: "https://example.com/public",
  screenshot: { src: "/img.png", alt: "Screenshot alt" }
};

const mockPrivateProduct: ProductCardType = {
  name: "Private Product B",
  category: "private",
  summary: "This is a private product summary.",
  stack: ["Python", "FastAPI"],
  impact: "Medium impact.",
  screenshot: { src: "/img2.png", alt: "Private screenshot alt" }
};

describe("ProductCard component", () => {
  // Reset the DOM after each test to prevent bleed over
  test.afterEach(() => {
    cleanup();
  });

  test("renders as an anchor tag when a URL is provided", () => {
    const { container } = render(<ProductCard product={mockPublicProduct} />);
    const link = container.querySelector("a");

    assert.ok(link);
    assert.equal(link.getAttribute("href"), "https://example.com/public");
    assert.equal(link.getAttribute("target"), "_blank");
    assert.equal(link.getAttribute("rel"), "noopener noreferrer");

    // The link should contain the "Live" label
    assert.ok(screen.getByText("Live"));
  });

  test("renders as an article tag when no URL is provided", () => {
    const { container } = render(<ProductCard product={mockPrivateProduct} />);
    const article = container.querySelector("article");

    assert.ok(article);
    assert.equal(article.getAttribute("href"), null);

    // The "Live" label should not be present
    assert.equal(screen.queryByText("Live"), null);
  });

  test("applies compact class when compact prop is true", () => {
    const { container } = render(<ProductCard product={mockPublicProduct} compact={true} />);
    const card = container.firstChild as HTMLElement;

    assert.ok(card.classList.contains("product-card-compact"));
  });

  test("does not apply compact class when compact prop is false or undefined", () => {
    const { container } = render(<ProductCard product={mockPublicProduct} />);
    const card = container.firstChild as HTMLElement;

    assert.equal(card.classList.contains("product-card-compact"), false);
  });

  test("renders content fields correctly", () => {
    render(<ProductCard product={mockPublicProduct} />);

    // Name is rendered in the label and the h3
    const names = screen.getAllByText("Public Product A");
    assert.equal(names.length, 2);

    assert.ok(screen.getByText("This is a public product summary."));
    assert.ok(screen.getByText("High impact."));

    // Stack items
    assert.ok(screen.getByText("React"));
    assert.ok(screen.getByText("Node"));
  });

  test("renders category label correctly based on product category", () => {
    render(<ProductCard product={mockPublicProduct} />);
    assert.ok(screen.getByText("Produkt publiczny"));
  });

  test("renders private category label correctly", () => {
    render(<ProductCard product={mockPrivateProduct} />);
    assert.ok(screen.getByText("Prywatne wdrożenie"));
  });
});
