import { describe, test } from "node:test";
import assert from "node:assert/strict";

import { siteContent } from "../src/content/site";

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
});
