import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { faqs } from "../src/content/faq";

describe("FAQ content", () => {
  test("every entry has a question and a non-empty answer for FAQPage schema", () => {
    assert.ok(faqs.length > 0);
    for (const faq of faqs) {
      assert.match(faq.q, /\?$/);
      assert.ok(faq.a.trim().length > 0);
    }
  });
});
