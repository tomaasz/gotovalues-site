import { describe, test } from "node:test";
import assert from "node:assert/strict";

import { brandName, siteContent } from "../src/content/site";

describe("site content", () => {
  test("ensures all products have complete metadata", () => {
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

  test("exposes exactly two public products with approved URLs in internal data", () => {
    assert.equal(siteContent.products.public.length, 2);

    const urls = siteContent.products.public.map((product) => product.url);
    assert.deepEqual(urls, ["https://cavi.gotova.pl/", "https://akta.gotova.pl"]);
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

  test("defines three remote-first offer pillars for the homepage", () => {
    assert.deepEqual(
      siteContent.offer.pillars.map((pillar) => pillar.title),
      [
        "Procesy, dane i automatyzacja",
        "Dedykowane narzędzia i aplikacje",
        "Uporządkowanie IT i zdalne wsparcie",
      ],
    );
  });

  test("uses the approved lowercase brand in active content", () => {
    assert.equal(brandName, "gotovalues");
    assert.equal(siteContent.brand.name, "gotovalues");
  });

  test("keeps homepage CTA and framing focused on processes, data, apps and remote IT without onsite promises", () => {
    assert.equal(siteContent.brand.cta.primary.label, "Wyślij wiadomość");
    assert.match(siteContent.brand.headline, /automatyzacja|aplikacje|zdalne wsparcie IT/i);
    assert.match(siteContent.brand.intro, /osobom prywatnym|aplikacje|etapach/i);
    assert.equal(/dojazd|naprawa komputer|od ręki|24h/i.test(JSON.stringify(siteContent.brand)), false);
  });

  test("keeps /jak-pracuje positioning grounded in process-first methodology", () => {
    assert.equal(siteContent.comparisonLanding.audiences.length, 2);
    assert.deepEqual(
      siteContent.comparisonLanding.audiences.map((audience) => audience.slug),
      ["proces-przed-kodem", "automatyzacja-i-aplikacja"],
    );
    assert.match(siteContent.comparisonLanding.headline, /problemu|rozwiązania/i);
    assert.ok(
      siteContent.comparisonLanding.audiences.every((audience) => audience.gotovaluesAdvantage.length >= 3),
    );
  });

  test("defines an AI-readable GEO summary for crawler-facing files", () => {
    assert.match(siteContent.aiSummary.positioning, /AI|aplikacje|automatyz/i);
    assert.ok(siteContent.aiSummary.bestFor.length >= 3);
    assert.ok(siteContent.aiSummary.notFor.length >= 2);
    assert.match(siteContent.aiSummary.sitemap, /^https:\/\/gotovalues\.com\/sitemap\.xml$/);
  });

  test("keeps concise trust signals in about and contact without unverified absolutes or raw phone", () => {
    assert.match(siteContent.about.role, /Tomasz Gołaszewski/i);
    assert.match(siteContent.about.profileLink.href, /linkedin\.com/i);
    assert.ok(siteContent.about.points.length <= 3);
    assert.equal(/leasing|wycen/i.test(JSON.stringify(siteContent.about)), false);
    assert.equal(siteContent.contact.signals[0]?.value, "kontakt@gotovalues.com");
    assert.match(siteContent.contact.signals[1]?.value ?? "", /dni robocze/i);
    assert.equal(/24h/i.test(siteContent.contact.signals[1]?.value ?? ""), false);
    assert.match(siteContent.contact.signals[2]?.value ?? "", /Zabrodzie/i);
    assert.match(siteContent.contact.signals[2]?.value ?? "", /wyszkowski/i);
    assert.equal(/600\s*468\s*473/.test(JSON.stringify(siteContent)), false);
  });

  test("keeps offer free of onsite repair promises", () => {
    const offerText = siteContent.offer.pillars
      .map((pillar) => `${pillar.title} ${pillar.description} ${pillar.bullets.join(" ")}`)
      .join(" ");
    assert.match(offerText, /integracje|aplikacje|zdaln|kopie zapasowe/i);
    assert.equal(/dojazd|naprawa komputer|okablowanie|od ręki/i.test(offerText), false);
  });
});
