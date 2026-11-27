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

  test("sitemap.xml includes active routes and excludes removed legacy offer pages", () => {
    const config = sitemap();
    assert.ok(config.length >= 3);

    const root = config.find((item) => item.url === "https://gotovalues.com");
    assert.ok(root, "Must include root url");
    assert.equal(root.priority, 1);

    const comparison = config.find((item) => item.url === "https://gotovalues.com/vs-freelancer-automatyzator");
    assert.ok(comparison, "Must include /vs-freelancer-automatyzator");

    const howIWork = config.find((item) => item.url === "https://gotovalues.com/jak-pracuje");
    assert.ok(howIWork, "Must include /jak-pracuje");
    assert.ok((howIWork.priority ?? 0) > (comparison.priority ?? 0));

    const llms = config.find((item) => item.url === "https://gotovalues.com/llms.txt");
    assert.ok(llms, "Must include llms.txt for AI crawlers");

    const removedUrls = [
      "https://gotovalues.com/supportflow",
      "https://gotovalues.com/triageflow",
      "https://gotovalues.com/kalkulator-roi",
      "https://gotovalues.com/dla-produkcji",
      "https://gotovalues.com/dla-logistyki",
    ];
    for (const removed of removedUrls) {
      assert.equal(
        config.find((item) => item.url === removed),
        undefined,
        `Sitemap must not include removed route ${removed}`,
      );
    }
  });

  test("llms.txt and ai.txt expose consistent crawler-readable positioning without removed routes", async () => {
    const llmsResponse = await llmsTxt();
    const aiResponse = await aiTxt();
    const llms = await llmsResponse.text();
    const ai = await aiResponse.text();

    assert.equal(llmsResponse.headers.get("content-type"), "text/plain; charset=utf-8");
    assert.match(llms, /gotovalues/i);
    assert.match(llms, /AI|automatyzacja|aplikacje/i);
    assert.match(llms, /https:\/\/gotovalues\.com\/sitemap\.xml/);
    assert.match(llms, /https:\/\/gotovalues\.com\/jak-pracuje/);
    assert.match(llms, /^# .+\n\n> .+/, "H1 must be followed by a blockquote description");
    assert.match(llms, /\[Jak pracuję\]\(https:\/\/gotovalues\.com\/jak-pracuje\)/);
    assert.equal(/supportflow|triageflow|dla-produkcji|dla-logistyki|kalkulator-roi|cavi\.gotova|akta\.gotova/i.test(llms), false);
    assert.match(ai, /AI crawling: allow/);
    assert.match(ai, /AI indexing: allow/);
    assert.match(ai, /https:\/\/gotovalues\.com\/llms\.txt/);
  });

  test("layout.tsx includes valid Schema.org JSON-LD with verified sameAs profiles and descriptive title", () => {
    const layoutPath = new URL("../src/app/layout.tsx", import.meta.url);
    const content = readFileSync(layoutPath, "utf-8");

    assert.match(content, /https:\/\/schema\.org/);
    assert.match(content, /sameAs/);
    assert.match(content, /https:\/\/www\.linkedin\.com\/in\/tomasz-golaszewski\//);
    assert.match(content, /https:\/\/github\.com\/gotovalues/);
    assert.match(content, /https:\/\/www\.facebook\.com\/gotovalues/);
    assert.match(content, /automatyzacja, aplikacje i zdalne wsparcie IT/);
  });
});
