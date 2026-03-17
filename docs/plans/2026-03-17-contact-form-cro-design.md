# Contact Form CRO Design

## Goal

Zwiększyć liczbę zgłoszeń z homepage przez obniżenie tarcia w formularzu kontaktowym, bez rozbudowy procesu i bez zmiany układu sekcji.

## Current Form Health & Friction Index

### Score: 74/100

### Verdict: Usable with Friction

- **Field Necessity & Efficiency: 20/30**
  Formularz ma cztery pola wymagane. Select z obszarem wymaga od użytkownika klasyfikacji problemu językiem oferty.
- **Value–Effort Balance: 15/20**
  Wartość rozmowy jest już dobrze opisana, ale formularz nadal sugeruje bardziej proces sprzedażowy niż prosty kontakt.
- **Cognitive Load & Clarity: 14/20**
  Pole `service` dokłada zbędną decyzję. `Imię i nazwisko` jest cięższe niż potrzeba na pierwszym kontakcie.
- **Error Handling & Recovery: 12/15**
  Walidacja i komunikaty są poprawne.
- **Trust & Friction Reduction: 9/10**
  Jest informacja o bezpośrednim kontakcie, ale można mocniej obniżyć próg wejścia.
- **Mobile Usability: 4/5**
  Układ jest akceptowalny, ale mniej pól poprawi doświadczenie również mobilnie.

## Recommended Direction

Najlepszy ruch to formularz konwersacyjny:

- `Imię`
- `E-mail`
- `Firma` opcjonalnie
- jedno główne pole opisowe

Usuwamy select `service`, bo nie pomaga użytkownikowi rozpocząć rozmowy. To pole jest użyteczne dopiero po kontakcie, a nie przed nim.

## Why This Approach

Użytkownik przychodzący z kampanii albo outreachu zwykle wie, że "coś działa za bardzo ręcznie", ale nie musi wiedzieć, czy to podpada pod "analitykę", "workflow" czy "narzędzie AI". Formularz powinien przyjąć język problemu, nie wymuszać języka oferty.

## Scope

### Form Fields

- zmienić `Imię i nazwisko` na `Imię`
- zostawić `E-mail`
- zostawić opcjonalną `Firmę`
- usunąć `service`
- zostawić jedno główne pole tekstowe z prostym pytaniem o ręczną lub chaotyczną pracę

### Microcopy

- CTA ma być miękkie i nieformalnie niskotarciowe
- helper text ma podkreślać, że wystarczy kilka zdań
- komunikat sukcesu ma kończyć się obietnicą prostego następnego kroku

### Backend

- payload maila upraszcza się
- subject i treść wiadomości nie wymagają już etykiety usługi

## Expected Outcome

Po zmianie formularz powinien bardziej przypominać krótki kontakt do człowieka niż mini-brief projektowy. Celem nie jest lepszy screening, tylko więcej rozpoczętych rozmów.
