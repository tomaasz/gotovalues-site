import { describe, test } from "node:test";
import assert from "node:assert/strict";

import { buildContactEmail, contactFormSchema } from "../src/lib/contact";

describe("contact form", () => {
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
