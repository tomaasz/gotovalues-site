import { describe, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

describe("index.html structure", () => {
  const html = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");

  const count = (pattern) => (html.match(pattern) || []).length;

  test("should contain exactly one document shell", () => {
    assert.equal(count(/<!DOCTYPE html>/g), 1);
    assert.equal(count(/<body\b/g), 1);
    assert.equal(count(/<\/body>/g), 1);
    assert.equal(count(/<\/head>/g), 1);
    assert.equal(count(/<\/html>/g), 1);
  });

  test("should not contain a duplicated head/body boundary", () => {
    assert.equal(count(/<\/head><body\b/g), 1);
  });
});
