import { describe, test } from "node:test";
import assert from "node:assert/strict";

import robots from "../src/app/robots";
import sitemap from "../src/app/sitemap";
import { GET as aiTxt } from "../src/app/ai.txt/route";
import { GET as llmsTxt } from "../src/app/llms.txt/route";

describe("SEO config", () => {
  test("robots.txt is configured correctly", () => {
    const config = robots();
    assert.ok(config);
    assert.equal(config.sitemap, "https://gotovalues.com/sitemap.xml");

    // Check rules for indexing
    const rules = Array.isArray(config.rules) ? config.rules : [config.rules];
    const generalRule = rules.find(r => r.userAgent === '*');
    assert.ok(generalRule, "Must have a rule for all agents '*'");

    if (typeof generalRule.allow === 'string') {
        assert.equal(generalRule.allow, "/");
    } else {
        assert.ok(generalRule.allow?.includes("/"));
    }

    if (typeof generalRule.disallow === 'string') {
        assert.equal(generalRule.disallow, "/api/");
    } else {
        assert.ok(generalRule.disallow?.includes("/api/"));
    }
  });

  test("sitemap.xml is configured correctly", () => {
    const config = sitemap();
    assert.ok(config.length >= 3);

    const root = config.find(item => item.url === "https://gotovalues.com");
    assert.ok(root, "Must include root url");
    assert.equal(root.priority, 1);

    const supportflow = config.find(item => item.url === "https://gotovalues.com/supportflow");
    assert.ok(supportflow, "Must include supportflow url");

    const comparison = config.find(item => item.url === "https://gotovalues.com/vs-freelancer-automatyzator");
    assert.ok(comparison, "Must include competitor-comparison landing page");

    const llms = config.find(item => item.url === "https://gotovalues.com/llms.txt");
    assert.ok(llms, "Must include llms.txt for AI crawlers");
  });

  test("llms.txt and ai.txt expose crawler-readable positioning", async () => {
    const llmsResponse = await llmsTxt();
    const aiResponse = await aiTxt();
    const llms = await llmsResponse.text();
    const ai = await aiResponse.text();

    assert.equal(llmsResponse.headers.get("content-type"), "text/plain; charset=utf-8");
    assert.match(llms, /gotovalues/i);
    assert.match(llms, /AI|automatyzacja|aplikacje/i);
    assert.match(llms, /https:\/\/gotovalues\.com\/sitemap\.xml/);
    assert.match(ai, /AI crawling: allow/);
    assert.match(ai, /AI indexing: allow/);
    assert.match(ai, /https:\/\/gotovalues\.com\/llms\.txt/);
  });
});
