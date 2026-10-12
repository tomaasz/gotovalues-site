import { test, expect } from 'playwright/test';

test.describe('Krytyczna ścieżka: Kalkulator ROI automatyzacji procesów', () => {
  test('prawidłowo przelicza oszczędności na żywo i zapisuje snapshot wyników', async ({ page }) => {
    // 1. Nawigacja do dedykowanej strony kalkulatora ROI
    await page.goto('/kalkulator-roi');

    // 2. Asercja stanu początkowego i domyślnych wartości formularza
    const form = page.locator('form[aria-label="Kalkulator ROI automatyzacji"]');
    await expect(form).toBeVisible();

    const executionsInput = page.locator('#roi-executions');
    const minutesInput = page.locator('#roi-minutes');
    const hourlyCostInput = page.locator('#roi-hourly');
    const automationShareInput = page.locator('#roi-share');
    const implCostInput = page.locator('#roi-impl');

    await expect(executionsInput).toHaveValue('200');
    await expect(minutesInput).toHaveValue('4');
    await expect(hourlyCostInput).toHaveValue('60');
    await expect(automationShareInput).toHaveValue('80');
    await expect(implCostInput).toHaveValue('12000');

    const resultsSection = page.locator('.roi-calc-results');
    await expect(resultsSection).toBeVisible();

    // Weryfikacja wartości domyślnych:
    // 200 * 4 / 60 = 13.33 h (~13 h)
    // 13.33 * 0.8 = 10.66 h (~11 h)
    // 10.66 * 60 = 640 zł
    // 640 * 12 = 7 680 zł
    await expect(resultsSection).toContainText('13 h');
    await expect(resultsSection).toContainText('11 h');
    await expect(resultsSection).toContainText(/640\s*zł/);
    await expect(resultsSection).toContainText(/(7\s*680|7680)\s*zł/);
    await expect(resultsSection).toContainText('~19');

    // 3. Interakcja użytkownika: wprowadzenie deterministycznych danych testowych
    // Zwiększamy liczbę wykonań do 500 oraz stawkę do 100 zł/h
    await executionsInput.fill('500');
    await hourlyCostInput.fill('100');

    // 4. Weryfikacja reaktywnego przeliczenia na żywo:
    // 500 * 4 / 60 = 33.33 h -> 33 h tracone
    // 33.33 * 0.8 = 26.67 h -> 27 h odzyskane
    // 26.67 * 100 zł = 2 666.67 zł -> 2 667 zł miesięcznie
    // 2 666.67 * 12 = 32 000 zł rocznie
    // 12 000 / 2 666.67 = 4.5 -> ~4 miesiące zwrotu (zaokrąglenie half-even w Intl.NumberFormat)
    await expect(resultsSection).toContainText('33 h');
    await expect(resultsSection).toContainText('27 h');
    await expect(resultsSection).toContainText(/2\s*667\s*zł/);
    await expect(resultsSection).toContainText(/32\s*000\s*zł/);
    await expect(resultsSection).toContainText(/~4\s*miesią/);

    // 5. Zapisanie kontrolowanego snapshotu po kluczowej akcji
    await resultsSection.screenshot({
      path: 'test-results/roi-calculator-recalculated.png',
    });

    // 6. Akcja końcowa (konwersja): kliknięcie CTA prowadzącego do formularza kontaktowego
    const ctaButton = resultsSection.locator('a.button-primary[href="/#kontakt"]');
    await expect(ctaButton).toBeVisible();
    await expect(ctaButton).toHaveText('Policzmy to na Twoim procesie');

    await ctaButton.click();
    await expect(page).toHaveURL(/.*#kontakt/);
  });
});
