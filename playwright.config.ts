import { defineConfig, devices } from 'playwright/test';

/**
 * Konfiguracja Playwright dla testów E2E gotovalues-site.
 *
 * Zasady bezpieczeństwa i izolacji:
 * 1. Dedykowany, czysty profil/kontekst testowy (brak CDP do codziennego Chrome).
 * 2. Brak wymogu istniejącego profilu użytkownika.
 * 3. Brak zapisu poświadczeń/ciasteczek do playwright/.auth ani repozytorium.
 * 4. Niezależność od interaktywnej sesji użytkownika (domyślnie headless).
 */
const PORT = process.env.PORT || '3199';
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list']],
  outputDir: 'test-results',
  use: {
    baseURL,
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
  webServer: {
    command: `ulimit -n 65536 && pnpm dev -p ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
