import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import robots from "../src/app/robots";
import sitemap from "../src/app/sitemap";
import { GET as aiTxt } from "../src/app/ai.txt/route";
import { GET as llmsTxt } from "../src/app/llms.txt/route";

describe("SEO config", () => {
  test("robots.txt is configured correctly", () => {
    const config = robots();
    assert.ok(config);
    assert.equal(config.sitemap, "https://gotovalues.com/sitemap.xml");

    const rules = Array.isArray(config.rules) ? config.rules : [config.rules];
    const generalRule = rules.find((r) => r.userAgent === "*");
    assert.ok(generalRule, "Must have a rule for all agents '*'");

    if (typeof generalRule.allow === "string") {
      assert.equal(generalRule.allow, "/");
    } else {
      assert.ok(generalRule.allow?.includes("/"));
    }

    if (typeof generalRule.disallow === "string") {
      assert.equal(generalRule.disallow, "/api/");
    } else {
      assert.ok(generalRule.disallow?.includes("/api/"));
    }
  });

  test("sitemap.xml includes active HTML routes and excludes non-HTML and retired URLs", () => {
    const config = sitemap();
    const urls = config.map((item) => item.url);

    const requiredUrls = [
      "https://gotovalues.com",
      "https://gotovalues.com/automatyzacja",
      "https://gotovalues.com/dane-i-analityka",
      "https://gotovalues.com/aplikacje",
      "https://gotovalues.com/wsparcie-it",
      "https://gotovalues.com/jak-pracuje",
      "https://gotovalues.com/blog",
    ];
    for (const required of requiredUrls) {
      assert.ok(urls.includes(required), `Sitemap must include ${required}`);
    }

    const excludedUrls = [
      "https://gotovalues.com/llms.txt",
      "https://gotovalues.com/ai.txt",
      "https://gotovalues.com/vs-freelancer-automatyzator",
      "https://gotovalues.com/polityka-prywatnosci",
      "https://gotovalues.com/supportflow",
      "https://gotovalues.com/triageflow",
      "https://gotovalues.com/kalkulator-roi",
      "https://gotovalues.com/dla-produkcji",
      "https://gotovalues.com/dla-logistyki",
    ];
    for (const excluded of excludedUrls) {
      assert.equal(urls.includes(excluded), false, `Sitemap must exclude ${excluded}`);
    }
  });

  test("llms.txt and ai.txt expose consistent crawler-readable positioning for all four service pillars", async () => {
    const llmsResponse = await llmsTxt();
    const aiResponse = await aiTxt();
    const llms = await llmsResponse.text();
    const ai = await aiResponse.text();

    assert.equal(llmsResponse.headers.get("content-type"), "text/plain; charset=utf-8");
    assert.match(llms, /gotovalues/i);
    assert.match(llms, /https:\/\/gotovalues\.com\/automatyzacja/);
    assert.match(llms, /https:\/\/gotovalues\.com\/dane-i-analityka/);
    assert.match(llms, /https:\/\/gotovalues\.com\/aplikacje/);
    assert.match(llms, /https:\/\/gotovalues\.com\/wsparcie-it/);
    assert.match(llms, /https:\/\/gotovalues\.com\/jak-pracuje/);
    assert.match(llms, /https:\/\/gotovalues\.com\/sitemap\.xml/);
    assert.match(llms, /^# .+\n\n> .+/, "H1 must be followed by a blockquote description");
    assert.equal(/supportflow|triageflow|dla-produkcji|dla-logistyki|kalkulator-roi|cavi\.gotova|akta\.gotova/i.test(llms), false);
    assert.match(ai, /AI crawling: allow/);
    assert.match(ai, /AI indexing: allow/);
    assert.match(ai, /https:\/\/gotovalues\.com\/llms\.txt/);
  });

  test("layout.tsx includes valid Schema.org JSON-LD with brand profiles only and descriptive title", () => {
    const layoutPath = new URL("../src/app/layout.tsx", import.meta.url);
    const content = readFileSync(layoutPath, "utf-8");

    assert.match(content, /https:\/\/schema\.org/);
    assert.match(content, /sameAs/);
    assert.match(content, /https:\/\/github\.com\/gotovalues/);
    assert.match(content, /https:\/\/www\.facebook\.com\/gotovalues/);
    assert.equal(/gołaszew|golaszew|linkedin\.com\/in\//i.test(content), false);
    assert.match(content, /automatyzacja, aplikacje, dane i wsparcie IT/);
  });
});
