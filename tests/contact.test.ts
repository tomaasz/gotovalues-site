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
});
