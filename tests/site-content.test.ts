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
      assert.equal('url' in product ? product.url : undefined, undefined);
      assert.ok(product.screenshot.alt.length > 0);
      assert.ok(product.name.length <= 48);
      assert.ok(product.summary.length <= 90);
    }
  });

  test("defines four small-business IT offer pillars for the homepage", () => {
    assert.deepEqual(
      siteContent.offer.pillars.map((pillar) => pillar.title),
      [
        "Sieci, Wi-Fi i sprzęt biurowy",
        "Naprawa i konfiguracja komputerów",
        "Zdalny i lokalny helpdesk IT",
        "Automatyzacja i proste narzędzia",
      ],
    );
  });

  test("uses the approved lowercase brand in active content", () => {
    assert.equal(brandName, "gotovalues");
    assert.equal(siteContent.brand.name, "gotovalues");
  });

  test("keeps homepage CTA and framing focused on small business and JDG IT support", () => {
    assert.equal(siteContent.brand.cta.primary.label, "Napisz");
    assert.match(siteContent.brand.headline, /IT|małej firmy|JDG/i);
    assert.match(siteContent.brand.intro, /sieci|naprawa|helpdesk/i);
  });

  test("turns Obsidian competitor research into non-antagonistic positioning payload", () => {
    assert.equal(siteContent.comparisonLanding.audiences.length, 2);
    assert.deepEqual(
      siteContent.comparisonLanding.audiences.map((audience) => audience.slug),
      ["proces-przed-kodem", "automatyzacja-i-aplikacja"],
    );
    assert.match(siteContent.comparisonLanding.headline, /Proces|gotowiec|dedykowane/i);
    assert.match(siteContent.comparisonLanding.intro, /Nie chcę stawiać gotovalues w kontrze/i);
    assert.ok(
      siteContent.comparisonLanding.audiences.every((audience) => audience.gotovaluesAdvantage.length >= 3),
    );
  });

  test("exposes Cavi and Akta as proof-of-competence evidence", () => {
    assert.deepEqual(
      siteContent.proofOfCompetence.items.map((item) => item.name),
      ["Cavi", "Akta"],
    );
    assert.ok(siteContent.proofOfCompetence.items.every((item) => item.evidence.length >= 2));
  });

  test("defines an AI-readable GEO summary for crawler-facing files", () => {
    assert.match(siteContent.aiSummary.positioning, /AI|aplikacje|automatyz/i);
    assert.ok(siteContent.aiSummary.bestFor.length >= 3);
    assert.ok(siteContent.aiSummary.notFor.length >= 2);
    assert.match(siteContent.aiSummary.sitemap, /^https:\/\/gotovalues\.com\/sitemap\.xml$/);
  });

  test("defines a focused landing-page payload for production outreach", () => {
    const landing = siteContent.productionLanding;
    assert.match(landing.eyebrow, /produkcji/i);
    assert.match(landing.headline, /jakość/i);
    assert.match(landing.headline, /bez wymiany ERP/i);
    assert.match(landing.metadataDescription, /gotovalues/);
    assert.match(landing.metadataDescription, /bez wymiany ERP/i);
    assert.equal(landing.symptoms.length, 3);
    assert.equal(landing.solutions.length, 3);
    assert.equal(landing.processSteps.length, 3);
    assert.equal(landing.panel.items.length, 3);
    assert.equal(landing.sections.contact.points.length, 3);
    assert.match(landing.cta.label, /proces/i);
    assert.equal(landing.cta.href, "#kontakt");

    const allProductionText = JSON.stringify(landing);
    assert.match(allProductionText, /dokument/i);
    assert.match(allProductionText, /wyjątk/i);
    assert.equal(/SupportFlow|helpdesk/i.test(allProductionText), false);
  });

  test("keeps trust signals in about and contact content", () => {
    assert.match(siteContent.about.role, /Tomasz Gołaszewski/i);
    assert.match(siteContent.about.profileLink.href, /linkedin\.com/i);
    assert.match(siteContent.about.summary, /sieci|naprawy|pomoc zdalną|IT/i);
    assert.ok(siteContent.about.points.length <= 3);
    assert.equal("detail" in siteContent.about, false);
    assert.equal(siteContent.contact.signals[0]?.value, "kontakt@gotovalues.com");
    assert.match(siteContent.contact.signals[1]?.value ?? "", /24h/i);
  });

  test("keeps offer anchored in small-business IT services and optional automation", () => {
    const offerText = siteContent.offer.pillars.map((pillar) => `${pillar.title} ${pillar.description} ${pillar.bullets.join(" ")}`).join(" ");
    assert.match(offerText, /sieci|Wi-Fi|naprawa|helpdesk|backup|automatyzac/i);
    assert.deepEqual(siteContent.proofOfCompetence.items.map((item) => item.name), ["Cavi", "Akta"]);
    assert.equal(siteContent.proofOfCompetence.items.filter((item) => Boolean(item.url)).length, 2);
    assert.ok(siteContent.proofOfCompetence.items.every((item) => item.summary.length <= 90));
  });
});
