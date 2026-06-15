"use client";

import Link from "next/link";
import { useState } from "react";

const PLN = new Intl.NumberFormat("pl-PL", {
  style: "currency",
  currency: "PLN",
  maximumFractionDigits: 0,
});

const HOURS = new Intl.NumberFormat("pl-PL", { maximumFractionDigits: 0 });

type Inputs = {
  executions: number; // wykonań / mies.
  minutes: number; // minut na 1 wykonanie
  hourlyCost: number; // koszt godziny pracy (PLN)
  automationShare: number; // % czasu, który automat eliminuje
  implementationCost: number; // jednorazowy koszt wdrożenia (PLN), 0 = pomiń
};

const DEFAULTS: Inputs = {
  executions: 200,
  minutes: 4,
  hourlyCost: 60,
  automationShare: 80,
  implementationCost: 12000,
};

function num(value: string, fallback = 0): number {
  const n = Number(value.replace(",", "."));
  return Number.isFinite(n) && n >= 0 ? n : fallback;
}

export function RoiCalculator() {
  const [v, setV] = useState<Inputs>(DEFAULTS);

  const update = (key: keyof Inputs) => (value: string) =>
    setV((prev) => ({ ...prev, [key]: num(value, 0) }));

  const hoursNow = (v.executions * v.minutes) / 60;
  const hoursSaved = hoursNow * (v.automationShare / 100);
  const savedPerMonth = hoursSaved * v.hourlyCost;
  const savedPerYear = savedPerMonth * 12;
  const paybackMonths =
    v.implementationCost > 0 && savedPerMonth > 0
      ? v.implementationCost / savedPerMonth
      : null;

  return (
    <div className="roi-calc">
      <form
        className="surface roi-calc-inputs"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Kalkulator ROI automatyzacji"
      >
        <div className="field-grid">
          <div className="field">
            <label htmlFor="roi-executions">Liczba wykonań procesu / miesiąc</label>
            <input
              id="roi-executions"
              type="number"
              min={0}
              inputMode="numeric"
              value={v.executions}
              onChange={(e) => update("executions")(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="roi-minutes">Czas na jedno wykonanie (minuty)</label>
            <input
              id="roi-minutes"
              type="number"
              min={0}
              inputMode="decimal"
              value={v.minutes}
              onChange={(e) => update("minutes")(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="roi-hourly">Koszt godziny pracy (PLN brutto)</label>
            <input
              id="roi-hourly"
              type="number"
              min={0}
              inputMode="numeric"
              value={v.hourlyCost}
              onChange={(e) => update("hourlyCost")(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="roi-share">
              Ile czasu eliminuje automat (%)
            </label>
            <input
              id="roi-share"
              type="number"
              min={0}
              max={100}
              inputMode="numeric"
              value={v.automationShare}
              onChange={(e) => update("automationShare")(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="roi-impl">
              Szacowany koszt wdrożenia (PLN, opcjonalnie)
            </label>
            <input
              id="roi-impl"
              type="number"
              min={0}
              inputMode="numeric"
              value={v.implementationCost}
              onChange={(e) => update("implementationCost")(e.target.value)}
            />
          </div>
        </div>
        <p className="helper-text">
          Wartości domyślne to typowy przykład (przepisywanie ~200 zamówień
          miesięcznie). Podmień je na swoje liczby — wynik liczy się na żywo.
        </p>
      </form>

      <div className="surface roi-calc-results" aria-live="polite">
        <p className="eyebrow">Szacowany efekt</p>
        <div className="roi-result-grid">
          <div className="roi-result">
            <span className="roi-result-value">{HOURS.format(hoursNow)} h</span>
            <span className="roi-result-label">
              tracone dziś miesięcznie na ten proces
            </span>
          </div>
          <div className="roi-result roi-result-accent">
            <span className="roi-result-value">{HOURS.format(hoursSaved)} h</span>
            <span className="roi-result-label">odzyskane miesięcznie</span>
          </div>
          <div className="roi-result">
            <span className="roi-result-value">{PLN.format(savedPerMonth)}</span>
            <span className="roi-result-label">oszczędności miesięcznie</span>
          </div>
          <div className="roi-result roi-result-accent">
            <span className="roi-result-value">{PLN.format(savedPerYear)}</span>
            <span className="roi-result-label">oszczędności rocznie</span>
          </div>
        </div>

        {paybackMonths !== null && (
          <p className="roi-payback">
            Przy koszcie wdrożenia {PLN.format(v.implementationCost)} inwestycja
            zwraca się w{" "}
            <strong>
              {paybackMonths < 1
                ? "mniej niż miesiąc"
                : `~${HOURS.format(paybackMonths)} ${
                    paybackMonths < 2 ? "miesiąc" : "miesiące"
                  }`}
            </strong>
            .
          </p>
        )}

        <p className="helper-text roi-disclaimer">
          To szacunek orientacyjny — nie uwzględnia kosztu błędów ani opóźnień,
          które zwykle dokładają się po stronie oszczędności. Realny rachunek
          robię na Twoich danych.
        </p>

        <Link className="button button-primary" href="/#kontakt">
          Policzmy to na Twoim procesie
        </Link>
      </div>
    </div>
  );
}
