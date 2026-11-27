import { describe, test } from "node:test";
import assert from "node:assert/strict";

import { brandName, siteContent } from "../src/content/site";

describe("site content", () => {
  test("ensures all internal product records have complete metadata", () => {
    const allProducts = [...siteContent.products.public, ...siteContent.products.private];

    for (const product of allProducts) {
      assert.ok(product.name && product.name.trim().length > 0, "Missing product name");
      assert.ok(product.summary && product.summary.trim().length > 0, "Missing product summary");
      assert.ok(product.stack && Array.isArray(product.stack) && product.stack.length > 0, "Missing product stack");
      assert.ok(product.impact && product.impact.trim().length > 0, "Missing product impact");
      assert.ok(product.screenshot, "Missing screenshot");
      assert.ok(product.screenshot.src && product.screenshot.src.startsWith("/images/"), "Invalid screenshot src");
      assert.ok(product.screenshot.alt && product.screenshot.alt.trim().length > 0, "Missing screenshot alt");
    }
  });

  test("keeps private implementations unlinked", () => {
    assert.ok(siteContent.products.private.length >= 2);

    for (const product of siteContent.products.private) {
      assert.equal("url" in product ? product.url : undefined, undefined);
      assert.ok(product.screenshot.alt.length > 0);
      assert.ok(product.name.length <= 48);
      assert.ok(product.summary.length <= 90);
    }
  });

  test("defines four offer pillars mapped to dedicated service routes", () => {
    assert.deepEqual(
      siteContent.offer.pillars.map((pillar) => ({ title: pillar.title, href: pillar.href })),
      [
        { title: "Automatyzacja i integracje", href: "/automatyzacja" },
        { title: "Dane i analityka", href: "/dane-i-analityka" },
        { title: "Aplikacje i oprogramowanie", href: "/aplikacje" },
        { title: "Infrastruktura i wsparcie IT", href: "/wsparcie-it" },
      ],
    );
  });

  test("uses the approved lowercase brand in active content", () => {
    assert.equal(brandName, "gotovalues");
    assert.equal(siteContent.brand.name, "gotovalues");
  });

  test("keeps homepage CTA, H1-C, and audience paths without unverified absolutes", () => {
    assert.equal(siteContent.brand.cta.primary.label, "Opisz swój temat");
    assert.equal(siteContent.brand.headline, "Automatyzacja, aplikacje, dane i wsparcie IT.");
    assert.equal(siteContent.brand.audiencePaths.length, 2);
    assert.equal(/od ręki|24h/i.test(JSON.stringify(siteContent.brand)), false);
  });

  test("defines complete service landing content for all four service pages", () => {
    const landings = Object.values(siteContent.serviceLandings);
    assert.equal(landings.length, 4);
    for (const landing of landings) {
      assert.ok(landing.slug.startsWith("/"));
      assert.ok(landing.whenItems.length === 3);
      assert.ok(landing.scopeItems.length === 3);
      assert.ok(landing.processSteps.length === 3);
      assert.ok(landing.formPlaceholder.length > 20);
      assert.equal(/gołaszew|golaszew|600\s*468\s*473/i.test(JSON.stringify(landing)), false);
    }
  });

  test("keeps /jak-pracuje positioning grounded in process-first methodology", () => {
    assert.equal(siteContent.comparisonLanding.audiences.length, 2);
    assert.deepEqual(
      siteContent.comparisonLanding.audiences.map((audience) => audience.slug),
      ["proces-przed-kodem", "automatyzacja-i-aplikacja"],
    );
    assert.ok(
      siteContent.comparisonLanding.audiences.every((audience) => audience.gotovaluesAdvantage.length >= 3),
    );
  });

  test("defines an AI-readable GEO summary for crawler-facing files", () => {
    assert.match(siteContent.aiSummary.positioning, /automatyzacja|dane|aplikacje|wsparcie IT/i);
    assert.ok(siteContent.aiSummary.bestFor.length >= 3);
    assert.ok(siteContent.aiSummary.notFor.length >= 2);
    assert.match(siteContent.aiSummary.sitemap, /^https:\/\/gotovalues\.com\/sitemap\.xml$/);
  });

  test("keeps concise brand-first about and contact without personal surname, unverified absolutes or raw phone", () => {
    assert.equal(siteContent.about.title, "O gotovalues");
    assert.ok(siteContent.about.points.length <= 3);
    assert.equal(/leasing|wycen|gołaszew|golaszew|linkedin\.com\/in\//i.test(JSON.stringify(siteContent.about)), false);
    assert.equal(siteContent.contact.signals[0]?.value, "kontakt@gotovalues.com");
    assert.match(siteContent.contact.signals[1]?.value ?? "", /dni robocze/i);
    assert.equal(/24h/i.test(siteContent.contact.signals[1]?.value ?? ""), false);
    assert.match(siteContent.contact.signals[2]?.value ?? "", /Zabrodzie/i);
    assert.equal(/600\s*468\s*473/.test(JSON.stringify(siteContent)), false);
  });

  test("keeps offer anchored in all four pillars without 24/7 or emergency absolutes", () => {
    const offerText = siteContent.offer.pillars
      .map((pillar) => `${pillar.title} ${pillar.description} ${pillar.bullets.join(" ")}`)
      .join(" ");
    assert.match(offerText, /integracje|dashboardy|aplikacje|komputerów|serwerów|kopie zapasowe/i);
    assert.equal(/24\/7|od ręki/i.test(offerText), false);
  });
});
