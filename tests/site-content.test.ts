import { describe, test } from "node:test";
import assert from "node:assert/strict";

import { brandName, siteContent } from "../src/content/site";

describe("site content", () => {
  test("ensures all products have complete metadata", () => {
    const allProducts = [...siteContent.products.public, ...siteContent.products.private];

    for (const product of allProducts) {
      assert.ok(product.name && product.name.trim().length > 0, 'Missing product name');
      assert.ok(product.summary && product.summary.trim().length > 0, 'Missing product summary');
      assert.ok(product.stack && Array.isArray(product.stack) && product.stack.length > 0, 'Missing product stack');
      assert.ok(product.impact && product.impact.trim().length > 0, 'Missing product impact');
      assert.ok(product.screenshot, 'Missing screenshot');
      assert.ok(product.screenshot.src && product.screenshot.src.startsWith('/images/'), 'Invalid screenshot src');
      assert.ok(product.screenshot.alt && product.screenshot.alt.trim().length > 0, 'Missing screenshot alt');
    }
  });

  test("exposes exactly two public products with approved URLs", () => {
    assert.equal(siteContent.products.public.length, 2);

    const urls = siteContent.products.public.map((product) => product.url);
    assert.deepEqual(urls, ["https://cavi.gotova.pl/", "https://akta.gotova.pl"]);
  });

  test("keeps private implementations unlinked", () => {
    assert.ok(siteContent.products.private.length >= 2);

    for (const product of siteContent.products.private) {
      assert.equal(product.url, undefined);
      assert.ok(product.screenshot.alt.length > 0);
    }
  });

  test("defines two equal offer pillars for the homepage", () => {
    assert.deepEqual(
      siteContent.offer.pillars.map((pillar) => pillar.title),
      ["Analityka i automatyzacja", "Aplikacje webowe i AI"],
    );
  });

  test("uses the approved lowercase brand in active content", () => {
    assert.equal(brandName, "gotovalues");
    assert.equal(siteContent.brand.name, "gotovalues");
  });

  test("keeps homepage CTA and framing focused on one concrete process", () => {
    assert.match(siteContent.brand.cta.primary.label, /proces/i);
    assert.match(siteContent.brand.eyebrow, /Excela i maila/);
  });

  test("defines a focused landing-page payload for production outreach", () => {
    assert.match(siteContent.productionLanding.eyebrow, /produkcji/i);
    assert.match(siteContent.productionLanding.headline, /jakość/i);
    assert.equal(siteContent.productionLanding.symptoms.length, 3);
    assert.equal(siteContent.productionLanding.solutions.length, 3);
    assert.equal(siteContent.productionLanding.processSteps.length, 3);
    assert.match(siteContent.productionLanding.cta.label, /proces/i);
  });

  test("keeps trust signals in about and contact content", () => {
    assert.match(siteContent.about.role, /Tomasz Gołaszewski/i);
    assert.match(siteContent.about.profileLink.href, /linkedin\.com/i);
    assert.match(siteContent.about.summary, /wycenie|aktywami|leasingowych/i);
    assert.equal(siteContent.about.points.length, 3);
    assert.equal(siteContent.contact.signals[0]?.value, "kontakt@gotovalues.com");
    assert.match(siteContent.contact.signals[1]?.value ?? "", /24h/i);
  });
});
