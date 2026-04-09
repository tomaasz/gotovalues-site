import { describe, test } from "node:test";
import assert from "node:assert/strict";

import { buildContactEmail, contactFormSchema } from "../src/lib/contact";

describe("contact form", () => {
  test("accepts valid submission with required fields", () => {
    const result = contactFormSchema.safeParse({
      name: "Anna",
      email: "anna@example.com",
      message: "To jest testowa wiadomosc, ktora ma ponad 20 znakow. Powinna przejsc poprawnie.",
    });
    assert.equal(result.success, true);
  });

  test("trims whitespace from email and accepts it", () => {
    const result = contactFormSchema.safeParse({
      name: "Anna",
      email: "  anna@example.com  ",
      message: "To jest testowa wiadomosc, ktora ma ponad 20 znakow. Powinna przejsc poprawnie.",
    });
    assert.equal(result.success, true);
    if (result.success) {
      assert.equal(result.data.email, "anna@example.com");
    }
  });

  test("rejects short name", () => {
    const result = contactFormSchema.safeParse({
      name: "A",
      email: "anna@example.com",
      message: "To jest testowa wiadomosc, ktora ma ponad 20 znakow. Powinna przejsc poprawnie.",
    });
    assert.equal(result.success, false);
    if (!result.success) {
      assert.ok(result.error.issues.some(i => i.path.includes('name')));
    }
  });

  test("rejects invalid email format", () => {
    const result = contactFormSchema.safeParse({
      name: "Anna",
      email: "anna@example",
      message: "To jest testowa wiadomosc, ktora ma ponad 20 znakow. Powinna przejsc poprawnie.",
    });
    assert.equal(result.success, false);
    if (!result.success) {
      assert.ok(result.error.issues.some(i => i.path.includes('email')));
    }
  });

  test("rejects short message", () => {
    const result = contactFormSchema.safeParse({
      name: "Anna",
      email: "anna@example.com",
      message: "Za krotko",
    });
    assert.equal(result.success, false);
    if (!result.success) {
      assert.ok(result.error.issues.some(i => i.path.includes('message')));
    }
  });

  test("rejects incomplete submissions", () => {
    const result = contactFormSchema.safeParse({
      name: "Jan",
      email: "not-an-email",
      message: "",
    });

    assert.equal(result.success, false);
  });

  test("builds a readable email payload for valid submissions", () => {
    const parsed = contactFormSchema.parse({
      name: "Jan Kowalski",
      email: "jan@example.com",
      company: "Acme",
      message: "Potrzebuję aplikacji do obiegu dokumentów.",
    });

    const email = buildContactEmail(parsed);

    assert.match(email.subject, /\[gotovalues\]/);
    assert.match(email.subject, /Nowe zgłoszenie od Jan Kowalski/);
    assert.match(email.text, /gotovalues/);
    assert.match(email.text, /Imię: Jan Kowalski/);
    assert.match(email.text, /Acme/);
    assert.match(email.text, /obiegu dokumentów/);
    assert.match(email.html, /jan@example.com/);
  });

  test("escapeHtml correctly escapes special characters", () => {
    const parsed = contactFormSchema.parse({
      name: "Attack <script>alert(1)</script>",
      email: "test@example.com",
      company: "BadCompany = 'bad'",
      message: "Testing `backticks`, /slashes/, and & ampersands and = equals.",
    });

    const email = buildContactEmail(parsed);

    // Verify name
    assert.match(email.html, /Attack &lt;script&gt;alert\(1\)&lt;&#x2F;script&gt;/);
    // Verify company
    assert.match(email.html, /BadCompany &#x3D; &#39;bad&#39;/);
    // Verify message
    assert.match(email.html, /Testing &#x60;backticks&#x60;, &#x2F;slashes&#x2F;, and &amp; ampersands and &#x3D; equals\./);
  });
});
