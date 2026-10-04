import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { GET as faqJson } from "../src/app/ai/faq.json/route";
import { GET as serviceJson } from "../src/app/ai/service.json/route";
import { GET as summaryJson } from "../src/app/ai/summary.json/route";
import { GET as feedXml } from "../src/app/feed.xml/route";
import { GET as wellKnownAiTxt } from "../src/app/.well-known/ai.txt/route";

describe("AI discovery endpoints", () => {
  test("summary, faq and service return valid JSON", async () => {
    const summary = await (await summaryJson()).json();
    const faq = await (await faqJson()).json();
    const service = await (await serviceJson()).json();

    assert.equal(summary.name, "gotovalues");
    assert.ok(summary.description.length > 0);
    assert.ok(faq.faq.length > 0);
    assert.ok(service.services.length > 0);
  });

  test("RSS feed lists blog posts as valid items", async () => {
    const response = await feedXml();
    const xml = await response.text();

    assert.equal(response.headers.get("content-type"), "application/rss+xml; charset=utf-8");
    assert.match(xml, /<rss version="2\.0"/);
    assert.match(xml, /<item>[\s\S]*https:\/\/gotovalues\.com\/blog\//);
  });

  test("/.well-known/ai.txt mirrors ai.txt", async () => {
    const text = await (await wellKnownAiTxt()).text();
    assert.match(text, /AI crawling: allow/);
  });
});
