import { describe, test } from "node:test";
import assert from "node:assert/strict";

import { brandName, siteContent } from "../src/content/site";

describe("site content", () => {
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
    assert.match(siteContent.about.partnerNote, /Nie działam jak duża agencja/i);
    assert.equal(siteContent.contact.signals[0]?.value, "kontakt@gotovalues.com");
    assert.match(siteContent.contact.signals[1]?.value ?? "", /24h/i);
  });
});
