'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  Terminal,
  Zap,
  TrendingDown,
  RefreshCw,
  CheckCircle2,
  Cpu,
  Code2,
  LayoutDashboard,
  Copy,
  Check,
  Activity,
  CheckCheck,
} from 'lucide-react';

export function VibeCodingHeroSection() {
  const [activeTab, setActiveTab] = useState<'terminal' | 'code' | 'preview'>('terminal');
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    const snippet = `// Autonomous Agent Pipeline - gotovalues
export default async function B2BCustomerPortal() {
  const pipeline = await deployMVP({ speed: '10x', type: 'b2b-system' });
  return <B2BSystem status={pipeline.ready} realtimeSync={true} />;
}`;
    navigator.clipboard?.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-zinc-800/90 bg-zinc-950 text-zinc-100 shadow-2xl antialiased selection:bg-emerald-500/30 selection:text-emerald-200 mb-16">
      {/* Glow & ambient tech aura */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.18),rgba(255,255,255,0))]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[550px] w-[900px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[100px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 -right-40 -z-10 h-[400px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]"
        aria-hidden="true"
      />

      {/* Subtle grid background */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#27272a15_1px,transparent_1px),linear-gradient(to_bottom,#27272a15_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
        aria-hidden="true"
      />

      {/* ── SEKCJA HERO ─────────────────────────────────────────── */}
      <section
        id="hero"
        aria-labelledby="hero-heading"
        className="relative mx-auto max-w-7xl px-4 pt-16 pb-16 sm:px-6 lg:px-8 lg:pt-24 lg:pb-20"
      >
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Kolumna lewa: Copy & CTA */}
          <div className="flex flex-col items-start lg:col-span-7">
            {/* Badge / Pigułka */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-medium text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)] backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span>🚀 Przyszłość Software Developmentu</span>
            </div>

            {/* Nagłówek główny (H1) */}
            <h1
              id="hero-heading"
              className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.1]"
            >
              Tworzymy aplikacje i strony WWW{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                10x szybciej
              </span>
              . Odkryj potencjał Vibe Coding.
            </h1>

            {/* Podtytuł */}
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-300 sm:text-xl">
              Łączymy wiedzę ekspercką z zaawansowanym Vibe Coding i agentami AI. Budujemy
              dedykowane aplikacje B2B, systemy wewnętrzne oraz strony internetowe o wysokiej
              konwersji — bez przepalania budżetu i bezkończących się miesięcy oczekiwania.
            </p>

            {/* Przyciski CTA */}
            <div className="mt-8 flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center">
              <Link
                href="#kontakt"
                className="group relative inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-7 py-4 text-sm font-semibold text-zinc-950 shadow-lg shadow-emerald-500/25 transition-all duration-200 hover:shadow-emerald-500/40 hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <span>Wyceń swój projekt w 24h</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <Link
                href="#korzysci"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/80 px-6 py-4 text-sm font-medium text-zinc-300 backdrop-blur-sm transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-800 hover:text-white active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
              >
                <span>Zobacz, jak pracujemy</span>
              </Link>
            </div>

            {/* Key stats bar */}
            <div className="mt-10 grid w-full grid-cols-3 gap-4 border-t border-zinc-800/80 pt-6 text-zinc-400 sm:gap-8">
              <div>
                <p className="text-2xl font-bold tracking-tight text-white sm:text-3xl">3–10 dni</p>
                <p className="mt-1 text-xs text-zinc-400 sm:text-sm">do pierwszego MVP</p>
              </div>
              <div>
                <p className="text-2xl font-bold tracking-tight text-white sm:text-3xl">-70%</p>
                <p className="mt-1 text-xs text-zinc-400 sm:text-sm">kosztów developmentu</p>
              </div>
              <div>
                <p className="text-2xl font-bold tracking-tight text-white sm:text-3xl">100%</p>
                <p className="mt-1 text-xs text-zinc-400 sm:text-sm">kodu na własność (IP)</p>
              </div>
            </div>
          </div>

          {/* Kolumna prawa: Interaktywna makieta z działającym Agentem AI */}
          <div className="relative lg:col-span-5">
            <div
              className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-teal-500/20 blur-xl opacity-80"
              aria-hidden="true"
            />

            <div className="relative rounded-2xl border border-zinc-800 bg-zinc-900/90 p-5 shadow-2xl backdrop-blur-xl">
              {/* Window bar */}
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/80 transition-opacity hover:opacity-100" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/80 transition-opacity hover:opacity-100" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/80 transition-opacity hover:opacity-100" />
                </div>

                {/* Tabs switcher */}
                <div className="flex items-center rounded-lg bg-zinc-950/80 p-1 border border-zinc-800/80 text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveTab('terminal')}
                    className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-all ${
                      activeTab === 'terminal'
                        ? 'bg-zinc-800 text-emerald-400 shadow-sm'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <Terminal className="h-3 w-3" />
                    <span>Agent Stream</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('code')}
                    className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-all ${
                      activeTab === 'code'
                        ? 'bg-zinc-800 text-cyan-400 shadow-sm'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <Code2 className="h-3 w-3" />
                    <span>Kod MVP</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('preview')}
                    className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 transition-all ${
                      activeTab === 'preview'
                        ? 'bg-zinc-800 text-teal-400 shadow-sm'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <LayoutDashboard className="h-3 w-3" />
                    <span>Podgląd UI</span>
                  </button>
                </div>

                <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live
                </div>
              </div>

              {/* Status akcji Agenta */}
              <div className="mt-4 flex items-center justify-between rounded-xl bg-zinc-950/80 p-3.5 border border-zinc-800/70">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                    <Cpu className="h-4 w-4 animate-spin" />
                  </div>
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-400">
                      Status zadania
                    </p>
                    <p className="text-xs font-semibold text-emerald-400 font-mono tracking-tight flex items-center gap-1.5">
                      <span>AI Agent: Building MVP...</span>
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="rounded-md bg-zinc-800/80 px-2 py-1 text-[11px] font-mono text-zinc-300">
                    Sprint #1: 85%
                  </span>
                </div>
              </div>

              {/* Tab 1: Terminal Agenta */}
              {activeTab === 'terminal' && (
                <div className="mt-3 space-y-2 rounded-xl bg-zinc-950 p-4 font-mono text-xs text-zinc-300 border border-zinc-900">
                  <div className="flex items-center gap-2 text-zinc-500 text-[11px]">
                    <span className="text-emerald-400 font-bold">$</span>
                    <span>gotovalues create-mvp --intent=&quot;B2B Customer Portal&quot;</span>
                  </div>
                  <div className="text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    <span>[Architecture] Next.js 16 + Tailwind v4 + PostgreSQL</span>
                  </div>
                  <div className="text-cyan-400 flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    <span>[Auth &amp; RBAC] Izolacja ról i uprawnień pracowników</span>
                  </div>
                  <div className="text-zinc-300 flex items-center gap-2">
                    <RefreshCw className="h-3.5 w-3.5 animate-spin text-emerald-400 shrink-0" />
                    <span>[Synthesizer] Generowanie widoków i logiki integracji...</span>
                  </div>
                  <div className="text-zinc-400 flex items-center gap-2 text-[11px]">
                    <Activity className="h-3 w-3 text-teal-400 shrink-0" />
                    <span>[Test Suite] 18 unit tests passing • 0 lint errors</span>
                  </div>

                  {/* Code snippet inside terminal */}
                  <div className="mt-3 rounded-lg border border-zinc-800/80 bg-zinc-900/80 p-3 text-[11px] text-zinc-400">
                    <div className="flex justify-between text-zinc-500 mb-1.5 border-b border-zinc-800 pb-1">
                      <span>app/dashboard/portal.tsx</span>
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCheck className="h-3 w-3" /> Gotowe do wdrożenia
                      </span>
                    </div>
                    <p className="text-purple-400">
                      export default async function <span className="text-amber-300">Portal</span>()
                      &#123;
                    </p>
                    <p className="pl-3 text-zinc-300">
                      const pipeline = await <span className="text-cyan-300">deployMVP</span>(&#123;
                      speed: &apos;10x&apos; &#125;);
                    </p>
                    <p className="pl-3 text-zinc-300">
                      return &lt;<span className="text-emerald-400">B2BSystem</span>{' '}
                      ready=&#123;pipeline.ready&#125; /&gt;;
                    </p>
                    <p className="text-purple-400">&#125;</p>
                  </div>
                </div>
              )}

              {/* Tab 2: Kod MVP */}
              {activeTab === 'code' && (
                <div className="mt-3 rounded-xl bg-zinc-950 p-4 font-mono text-xs text-zinc-300 border border-zinc-900">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800">
                    <span className="text-zinc-400 text-[11px]">src/app/api/pipeline/route.ts</span>
                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="flex items-center gap-1 rounded bg-zinc-800 px-2 py-0.5 text-[11px] text-zinc-300 hover:bg-zinc-700"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-400" />
                          <span>Skopiowano!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Kopiuj</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="space-y-1 text-[11px] leading-relaxed">
                    <p className="text-zinc-500">
                      {'// Zoptymalizowany kod TypeScript z agenticznym scaffoldingiem'}
                    </p>
                    <p className="text-purple-400">
                      import &#123; NextResponse &#125; from{' '}
                      <span className="text-emerald-300">&quot;next/server&quot;</span>;
                    </p>
                    <p className="text-purple-400">
                      import &#123; db &#125; from{' '}
                      <span className="text-emerald-300">&quot;@/lib/db&quot;</span>;
                    </p>
                    <p className="text-purple-400 pt-1">
                      export async function <span className="text-cyan-300">POST</span>(req:
                      Request) &#123;
                    </p>
                    <p className="pl-3 text-zinc-300">
                      const &#123; workflowId &#125; = await req.json();
                    </p>
                    <p className="pl-3 text-zinc-300">
                      const record = await db.workflow.execute(workflowId);
                    </p>
                    <p className="pl-3 text-emerald-400">
                      return NextResponse.json(&#123; success: true, record &#125;);
                    </p>
                    <p className="text-purple-400">&#125;</p>
                  </div>
                </div>
              )}

              {/* Tab 3: Podgląd UI (Mini Live Dashboard) */}
              {activeTab === 'preview' && (
                <div className="mt-3 rounded-xl bg-zinc-950 p-4 border border-zinc-900">
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-800">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      <span className="text-xs font-semibold text-white">Panel Operacyjny B2B</span>
                    </div>
                    <span className="text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      Status: Aktywny
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="rounded-lg bg-zinc-900 p-2.5 border border-zinc-800/80">
                      <p className="text-[10px] text-zinc-400">Czas obsługi procesów</p>
                      <p className="text-base font-bold text-white mt-0.5">
                        3.2s <span className="text-emerald-400 text-xs">-82%</span>
                      </p>
                    </div>
                    <div className="rounded-lg bg-zinc-900 p-2.5 border border-zinc-800/80">
                      <p className="text-[10px] text-zinc-400">Automatyzacja zadań</p>
                      <p className="text-base font-bold text-white mt-0.5">
                        94.8% <span className="text-cyan-400 text-xs">AI agent</span>
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center justify-between rounded bg-zinc-900/60 p-2 border border-zinc-800/50">
                      <span className="text-zinc-300 text-[11px]">
                        Faktura #2026/09 — Ekstrakcja danych
                      </span>
                      <span className="text-[10px] text-emerald-400 font-mono">
                        100% poprawności
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded bg-zinc-900/60 p-2 border border-zinc-800/50">
                      <span className="text-zinc-300 text-[11px]">
                        Zgłoszenie klienta B2B — AI Triage
                      </span>
                      <span className="text-[10px] text-cyan-400 font-mono">Odpowiedź wysłana</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tech chips */}
              <div className="mt-4 flex flex-wrap items-center gap-1.5 pt-1">
                {[
                  'Vibe Coding',
                  'Agenci AI',
                  'Next.js 16',
                  'Tailwind v4',
                  'Type-Safe',
                  'PostgreSQL',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-zinc-800 bg-zinc-900/60 px-2.5 py-1 text-[11px] font-mono text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEKCJA KORZYŚCI (3 KARTY) ────────────────────────────── */}
      <section
        id="korzysci"
        aria-labelledby="korzysci-heading"
        className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24 border-t border-zinc-800/80"
      >
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/90 px-3.5 py-1 text-xs font-medium text-zinc-300">
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            <span>Dlaczego Vibe Coding z gotovalues?</span>
          </div>
          <h2
            id="korzysci-heading"
            className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
          >
            Przewaga, której nie da Ci tradycyjny software house
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-400 sm:text-lg">
            Eliminujemy wielotygodniowe spotkania o niczym, rozdmuchane budżety i przeładowane
            specyfikacje. Dostarczamy oprogramowanie, które od razu rozwiązuje realne wąskie gardła
            i zarabia na siebie.
          </p>
        </div>

        {/* Siatka 3 kart korzyści */}
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Karta 1: Błyskawiczne tempo */}
          <article className="group relative flex flex-col justify-between rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-500/40 hover:bg-zinc-900/80 hover:shadow-2xl hover:shadow-emerald-500/10">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-transform duration-300 group-hover:scale-110">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-white">Błyskawiczne tempo</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                MVP i działające aplikacje w{' '}
                <strong className="text-zinc-100 font-semibold">3–10 dni zamiast miesięcy</strong>.
                Zastępujemy powolne procedury i niekończące się planowanie autonomicznymi
                workflowami programistycznymi.
              </p>
            </div>

            <div className="mt-6 border-t border-zinc-800/60 pt-4">
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-zinc-500">
                  <span>Tradycyjny software house</span>
                  <span>12–24 tyg.</span>
                </div>
                <div className="flex justify-between font-mono font-medium text-emerald-400">
                  <span>Vibe Coding gotovalues</span>
                  <span>3–10 dni</span>
                </div>
              </div>
            </div>
          </article>

          {/* Karta 2: Ułamek tradycyjnych kosztów */}
          <article className="group relative flex flex-col justify-between rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-teal-500/40 hover:bg-zinc-900/80 hover:shadow-2xl hover:shadow-teal-500/10">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-teal-500/30 bg-teal-500/10 text-teal-400 shadow-[0_0_20px_rgba(20,184,166,0.15)] transition-transform duration-300 group-hover:scale-110">
                <TrendingDown className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-white">Ułamek tradycyjnych kosztów</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Płacisz za{' '}
                <strong className="text-zinc-100 font-semibold">realną wartość biznesową</strong>, a
                nie roboczogodziny wielkiego zespołu PM-ów, analityków i junior developerów.
              </p>
            </div>

            <div className="mt-6 border-t border-zinc-800/60 pt-4">
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-zinc-500">
                  <span>Narzut agencyjny</span>
                  <span>Wysoki / ukryty</span>
                </div>
                <div className="flex justify-between font-mono font-medium text-teal-400">
                  <span>Model gotovalues</span>
                  <span>Zero zbędnych kosztów</span>
                </div>
              </div>
            </div>
          </article>

          {/* Karta 3: Wdrożenia w czasie rzeczywistym */}
          <article className="group relative flex flex-col justify-between rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-500/40 hover:bg-zinc-900/80 hover:shadow-2xl hover:shadow-cyan-500/10">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-transform duration-300 group-hover:scale-110">
                <RefreshCw className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-white">Wdrożenia w czasie rzeczywistym</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Iteracje i zmiany wprowadzane{' '}
                <strong className="text-zinc-100 font-semibold">na żywo podczas spotkań</strong>.
                Widzisz efekty i testujesz działający kod w trakcie rozmowy, a nie po 2 tygodniach.
              </p>
            </div>

            <div className="mt-6 border-t border-zinc-800/60 pt-4">
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-zinc-500">
                  <span>Pętla feedbacku</span>
                  <span>Co 14 dni</span>
                </div>
                <div className="flex justify-between font-mono font-medium text-cyan-400">
                  <span>Live Feedback</span>
                  <span>Natychmiast na callu</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
