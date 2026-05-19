import { test, mock, afterEach } from 'node:test';
import assert from 'node:assert';
import { POST, contactConfig } from '../src/app/api/contact/route';

// Wykorzystujemy mock z node:test z opcją na mockowanie modułów
test('POST /api/contact', async (t) => {
  const originalEnv = { ...process.env };
  const originalConfig = { ...contactConfig };

  afterEach(() => {
    Object.keys(process.env).forEach(key => delete process.env[key]);
    Object.assign(process.env, originalEnv);
    Object.assign(contactConfig, originalConfig);
    mock.restoreAll();
  });

  await t.test('returns 400 on malformed JSON', async () => {
    const request = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      body: 'not a json',
    });

    const response = await POST(request);
    assert.strictEqual(response.status, 400);

    const data = await response.json();
    assert.strictEqual(data.message, 'Nieprawidłowy format danych.');
  });

  await t.test('returns 400 on invalid form data (Zod)', async () => {
    const request = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({ name: '', email: 'invalid' }),
    });

    const response = await POST(request);
    assert.strictEqual(response.status, 400);

    const data = await response.json();
    assert.strictEqual(data.message, 'Uzupełnij poprawnie wszystkie wymagane pola formularza.');
    assert.ok(data.issues);
  });

  await t.test('returns 503 when server config is missing', async () => {
    contactConfig.RESEND_API_KEY = '';
    contactConfig.CONTACT_TO_EMAIL = '';

    const payload = {
      name: 'John',
      email: 'john@example.com',
      message: 'This is a test message that is long enough.',
    };

    const request = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    const response = await POST(request);
    assert.strictEqual(response.status, 503);
    const data = await response.json();
    assert.strictEqual(data.message, 'Serwer jest chwilowo niedostępny. Spróbuj ponownie później.');
  });

  await t.test('sends email and returns 200 on success', async () => {
    contactConfig.RESEND_API_KEY = 'test_key';
    contactConfig.CONTACT_TO_EMAIL = 'admin@example.com';
    contactConfig.CONTACT_FROM_EMAIL = 'onboarding@resend.dev';

    // Instead of mocking the import we mock fetch since Resend uses it internally,
    // or we can test logic up to fetch if mock gets complicated.
    // Given Resend constructor uses global fetch internally in newer versions, let's mock fetch.
    mock.method(global, 'fetch', async () => {
      return new Response(JSON.stringify({ id: 'mocked_id' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    });

    // Ensure we send a fresh request IP so we don't hit the limit quickly
    const payload = {
      name: 'Jane',
      email: 'jane@example.com',
      message: 'This is a valid long message for testing the contact form correctly.',
    };

    const request = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'cf-connecting-ip': '1.2.3.4' },
      body: JSON.stringify(payload),
    });

    const response = await POST(request);
    assert.strictEqual(response.status, 200);

    const data = await response.json();
    assert.strictEqual(data.message, 'Dziękuję. Wrócę z krótką oceną i propozycją następnego kroku.');
  });

  await t.test('returns 429 when rate limit is exceeded', async () => {
     contactConfig.RESEND_API_KEY = 'test_key';
     contactConfig.CONTACT_TO_EMAIL = 'admin@example.com';

     mock.method(global, 'fetch', async () => new Response(JSON.stringify({ id: 'mocked_id' }), { status: 200, headers: { 'Content-Type': 'application/json' } }));

     const payload = {
       name: 'Spammer',
       email: 'spammer@example.com',
       message: 'Spamming the API constantly without delay.',
     };

     // The limit is 3, so we send 4.
     for (let i = 0; i < 3; i++) {
       const req = new Request('http://localhost:3000/api/contact', {
         method: 'POST',
         headers: { 'cf-connecting-ip': 'spam_ip' },
         body: JSON.stringify(payload),
       });
       await POST(req);
     }

     // 4th request should fail
     const limitReq = new Request('http://localhost:3000/api/contact', {
       method: 'POST',
       headers: { 'cf-connecting-ip': 'spam_ip' },
       body: JSON.stringify(payload),
     });

     const response = await POST(limitReq);
     assert.strictEqual(response.status, 429);
  });

  await t.test('returns 500 when Resend API returns an error object', async () => {
    contactConfig.RESEND_API_KEY = 'test_key';
    contactConfig.CONTACT_TO_EMAIL = 'admin@example.com';
    contactConfig.CONTACT_FROM_EMAIL = 'onboarding@resend.dev';

    mock.method(global, 'fetch', async () => {
      // Resend API returns an error object on failure (e.g., 400 Bad Request)
      return new Response(JSON.stringify({
        statusCode: 400,
        name: 'validation_error',
        message: 'Invalid domain'
      }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    });

    const payload = {
      name: 'Bob',
      email: 'bob@example.com',
      message: 'Testing an error response from the Resend SDK via fetch mock.',
    };

    const request = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'cf-connecting-ip': '5.6.7.8' },
      body: JSON.stringify(payload),
    });

    const response = await POST(request);
    assert.strictEqual(response.status, 500);

    const data = await response.json();
    assert.strictEqual(data.message, 'Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.');
  });
});
