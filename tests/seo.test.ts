import { describe, test } from "node:test";
import assert from "node:assert/strict";

import robots from "../src/app/robots";
import sitemap from "../src/app/sitemap";

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

    const produkty = config.find(item => item.url === "https://gotovalues.com/produkty");
    assert.ok(produkty, "Must include produkty url");
  });
});
