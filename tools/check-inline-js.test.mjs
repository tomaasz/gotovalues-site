import { test, describe } from "node:test";
import assert from "node:assert";
import { getInlineScripts } from "./check-inline-js.mjs";

describe("check-inline-js core logic", () => {
  test("should allow script with src", () => {
    const html = '<script src="assets/app.js"></script>';
    const result = getInlineScripts(html);
    assert.strictEqual(result.length, 0);
  });

  test("should detect simple inline script", () => {
    const html = '<script>console.log("hello")</script>';
    const result = getInlineScripts(html);
    assert.strictEqual(result.length, 1);
    assert.strictEqual(result[0], html);
  });

  test("should allow Google Analytics scripts", () => {
    const gtag = '<script>window.dataLayer = []; function gtag(){dataLayer.push(arguments);}</script>';
    const result = getInlineScripts(gtag);
    assert.strictEqual(result.length, 0);
  });

  test("should detect inline script even with attributes", () => {
    const html = '<script type="text/javascript">alert(1)</script>';
    const result = getInlineScripts(html);
    assert.strictEqual(result.length, 1);
    assert.strictEqual(result[0], html);
  });

  test("should handle multiple scripts and ignore those with src", () => {
    const html = `
      <script src="one.js"></script>
      <script>inline</script>
      <script src="two.js"></script>
      <script>another inline</script>
    `;
    const result = getInlineScripts(html);
    assert.strictEqual(result.length, 2);
    assert.ok(result[0].includes("inline"));
    assert.ok(result[1].includes("another inline"));
  });

  test("should ignore case in script tags", () => {
    const html = '<SCRIPT>console.log("HELLO")</SCRIPT>';
    const result = getInlineScripts(html);
    assert.strictEqual(result.length, 1);
  });
});
