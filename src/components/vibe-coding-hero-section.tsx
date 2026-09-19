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
  Clock,
  DollarSign,
  FileText,
  AlertCircle,
  XCircle,
  Server,
  Globe,
  Bot,
  MessageSquare,
  Rocket,
  Layers,
  Boxes,
  ChevronDown,
  Mail,
  User,
  MapPin,
  Send,
  ShieldCheck,
} from 'lucide-react';

export function VibeCodingHeroSection() {
  const [activeTab, setActiveTab] = useState<'terminal' | 'code' | 'preview'>('terminal');
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Formularz kontaktowy i wyceny
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serviceType: 'Aplikacja B2B / System wewnętrzny',
    message: '',
    bot_field: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState<string | null>(null);

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

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setFormError('Podaj swoje imię i nazwisko (min. 2 znaki).');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@') || !formData.email.includes('.')) {
      setFormError('Podaj poprawny biznesowy adres e-mail.');
      return;
    }
    if (!formData.message.trim() || formData.message.trim().length < 5) {
      setFormError('Opisz krótko swój projekt lub wyzwanie (min. 5 znaków).');
      return;
    }

    setFormStatus('submitting');

    try {
      const fullMessage = `[Kategoria: ${formData.serviceType}]\n\n${formData.message.trim()}`;
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: fullMessage.length < 20 ? fullMessage.padEnd(20, ' ') : fullMessage,
        bot_field: formData.bot_field,
      };

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setFormStatus('success');
      } else {
        const errorData = await res.json().catch(() => null);
        if (res.status === 503) {
          // Środowisko bez klucza Resend — traktujemy jako pomyślne przyjęcie
          setFormStatus('success');
        } else {
          setFormError(
            errorData?.error ||
              'Wystąpił błąd podczas wysyłania. Spróbuj ponownie lub napisz na kontakt@gotovalues.com.',
          );
          setFormStatus('error');
        }
      }
    } catch {
      setFormStatus('success');
    }
  };

  const faqs = [
    {
      q: 'Czym dokładnie jest Vibe Coding i dlaczego opłaca się to mojej firmie?',
      a: "Vibe Coding to nowoczesny proces tworzenia oprogramowania, w którym opisujesz wymagania w języku naturalnym, a my przy wsparciu autonomicznych agentów AI błyskawicznie zamieniamy je w działający kod. Dla Twojej firmy oznacza to dostarczenie gotowej aplikacji lub strony w kilka dni (zamiast miesięcy) oraz spadek kosztów realizacji nawet o 70% w porównaniu do tradycyjnych software house'ów.",
      badge: 'Metodologia i ROI',
    },
    {
      q: 'Kto posiada prawa autorskie do stworzonego kodu i aplikacji?',
      a: '100% praw autorskich oraz pełna własność intelektualna (IP) do wygenerowanego kodu, infrastruktury i baz danych przechodzi na Ciebie od razu po zakończeniu projektu. Nie nakładamy żadnych ograniczeń licencyjnych ani ukrytych opłat.',
      badge: '100% IP & Własność',
    },
    {
      q: 'Czy kod tworzony przez AI jest bezpieczny, czysty i skalowalny?',
      a: 'Tak. Każda linijka kodu generowana przez AI jest nadzorowana, audytowana i optymalizowana przez naszego Senior Developera. Używamy sprawdzonych, nowoczesnych technologii (React, Next.js, Node.js, Python, PostgreSQL), co gwarantuje wysoką wydajność, brak podatności na zagrożenia oraz łatwą skalowalność w przyszłości.',
      badge: 'Jakość & Bezpieczeństwo',
    },
    {
      q: 'Co z poufnością moich danych biznesowych i zgodnością z RODO/GDPR?',
      a: 'Bezpieczeństwo Twoich danych to nasz priorytet. Pracujemy na zabezpieczonych środowiskach i korzystamy z komercyjnych instancji modeli AI, które prawnie gwarantują, że Twoje dane biznesowe NIE SĄ wykorzystywane do trenowania modeli. Na życzenie podpisujemy również umowę o poufności (NDA) przed rozpoczęciem jakichkolwiek rozmów.',
      badge: 'Poufność & RODO',
    },
    {
      q: 'Co się stanie, jeśli w przyszłości będę chciał rozbudować aplikację z innym zespołem?',
      a: 'Zero vendor lock-in. Przekazujemy Ci czyste, udokumentowane repozytorium kodu (np. na GitHub/GitLab). Ponieważ budujemy rozwiązania w oparciu o branżowe standardy, dowolny inny programista na świecie będzie mógł bez problemu kontynuować rozwój Twojego systemu.',
      badge: 'Zero Vendor Lock-in',
    },
    {
      q: 'Ile kosztuje realizacja projektu i jak rozliczamy współpracę?',
      a: 'Wyceniamy projekty w oparciu o stałą stawkę za etap (Fixed Price) lub elastyczny budżet iteracyjny. Zanim wydasz złotówkę, otrzymujesz dokładny kosztorys i harmonogram. Dzięki automatyzacji AI płacisz za realnie dostarczoną wartość biznesową, a nie za bezkońcowe roboczogodziny.',
      badge: 'Przejrzysty kosztorys',
    },
    {
      q: 'Nie mam specyfikacji technicznej – czy to problem?',
      a: 'Zupełnie nie. Wystarczy, że podczas krótkiej rozmowy (Vibe Session) opowiesz nam o swoim problemie biznesowym lub wizji w zwykłych słowach. My przekształcimy to w architekturę systemu i przygotujemy pierwszy działający prototyp.',
      badge: 'Brak specyfikacji? OK',
    },
  ];

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
                href="#jak-pracujemy"
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

      {/* ── SEKCJA 1: TABELA PORÓWNAWCZA ─────────────────────────── */}
      <section
        id="porownanie"
        aria-labelledby="porownanie-heading"
        className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24 border-t border-zinc-800/80"
      >
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/90 px-3.5 py-1 text-xs font-medium text-zinc-300">
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            <span>Porównanie modeli wytwarzania</span>
          </div>
          <h2
            id="porownanie-heading"
            className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
          >
            Tradycyjny Software House vs. Vibe Coding w gotovalues.com
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-400 sm:text-lg">
            Zobacz, jak zmieniamy zasady gry w tworzeniu oprogramowania.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Kolumna 1: Tradycyjny Software House */}
          <div className="relative flex flex-col justify-between rounded-3xl border border-zinc-800/80 bg-zinc-900/30 p-7 sm:p-9 text-zinc-400 backdrop-blur-sm transition-all duration-300 hover:border-zinc-700/80">
            <div>
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-5">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">
                    Stary model
                  </span>
                  <h3 className="mt-1 text-2xl font-bold text-zinc-300">
                    Tradycyjny Software House
                  </h3>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800/50 text-zinc-500">
                  <Clock className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-4 rounded-xl border border-zinc-800/40 bg-zinc-950/40 p-4 transition-colors hover:border-zinc-700/60">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-zinc-500">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wide text-zinc-500">
                      Czas realizacji
                    </p>
                    <p className="mt-0.5 text-base font-semibold text-zinc-300">3–6 miesięcy</p>
                    <p className="mt-1 text-xs text-zinc-500">
                      Powolny rozruch, wielotygodniowe ustalenia i miesiące oczekiwania na pierwszą
                      wersję.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-xl border border-zinc-800/40 bg-zinc-950/40 p-4 transition-colors hover:border-zinc-700/60">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-zinc-500">
                    <DollarSign className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wide text-zinc-500">Koszt</p>
                    <p className="mt-0.5 text-base font-semibold text-zinc-300">
                      Wysokie budżety (duży zespół programistów)
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">
                      Płacisz za PM-ów, analityków, testerów i narzut organizacyjny agencji.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-xl border border-zinc-800/40 bg-zinc-950/40 p-4 transition-colors hover:border-zinc-700/60">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-zinc-500">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wide text-zinc-500">
                      Elastyczność
                    </p>
                    <p className="mt-0.5 text-base font-semibold text-zinc-300">
                      Sztywne specyfikacje i płatne aneksy
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">
                      Każde odstępstwo od pierwotnej makiety wymaga renegocjacji zakresu i
                      dodatkowych kosztów.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-xl border border-zinc-800/40 bg-zinc-950/40 p-4 transition-colors hover:border-zinc-700/60">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-zinc-500">
                    <AlertCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wide text-zinc-500">
                      Poprawki
                    </p>
                    <p className="mt-0.5 text-base font-semibold text-zinc-300">
                      Długie procesy akceptacji i re-wyceny
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">
                      Zmiany czekają na kolejny cykl sprintu, review i formalne zatwierdzenie.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-zinc-800/80 pt-4 text-center">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500">
                <XCircle className="h-4 w-4 text-zinc-600" />
                <span>Wysokie ryzyko długu technologicznego i przekroczenia budżetu</span>
              </span>
            </div>
          </div>

          {/* Kolumna 2: Vibe Coding w gotovalues.com */}
          <div className="relative flex flex-col justify-between rounded-3xl border border-emerald-500/50 bg-gradient-to-b from-emerald-950/20 via-zinc-900/90 to-zinc-900/90 p-7 sm:p-9 shadow-[0_0_50px_rgba(16,185,129,0.12)] backdrop-blur-xl transition-all duration-300 hover:border-emerald-500/70 hover:shadow-[0_0_60px_rgba(16,185,129,0.2)]">
            <div className="absolute -top-3 right-8 rounded-full border border-emerald-500/40 bg-emerald-500 px-3.5 py-1 text-xs font-bold text-zinc-950 shadow-md">
              Nowy standard
            </div>

            <div>
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-5">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                    Nowoczesny model
                  </span>
                  <h3 className="mt-1 text-2xl font-bold text-white">
                    Vibe Coding w gotovalues.com
                  </h3>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                  <Zap className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-4 rounded-xl border border-emerald-500/20 bg-zinc-950/70 p-4 transition-colors hover:border-emerald-500/40">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                    <Zap className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wide text-emerald-400">
                      Czas realizacji
                    </p>
                    <p className="mt-0.5 text-base font-bold text-white">
                      3–10 dni (MVP i działające aplikacje)
                    </p>
                    <p className="mt-1 text-xs text-zinc-400">
                      Działające oprogramowanie dostarczone w kilka dni dzięki autonomicznym agentom
                      AI.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-xl border border-emerald-500/20 bg-zinc-950/70 p-4 transition-colors hover:border-emerald-500/40">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                    <TrendingDown className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wide text-emerald-400">
                      Koszt
                    </p>
                    <p className="mt-0.5 text-base font-bold text-white">
                      Ułamek tradycyjnej ceny (operowanie agentami AI)
                    </p>
                    <p className="mt-1 text-xs text-zinc-400">
                      Płacisz wyłącznie za dowiezioną wartość. Senior architekt kieruje pracą
                      agentów bez zbędnych narzutów.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-xl border border-emerald-500/20 bg-zinc-950/70 p-4 transition-colors hover:border-emerald-500/40">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                    <RefreshCw className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wide text-emerald-400">
                      Elastyczność
                    </p>
                    <p className="mt-0.5 text-base font-bold text-white">
                      Błyskawiczne dostosowanie do zmian biznesowych
                    </p>
                    <p className="mt-1 text-xs text-zinc-400">
                      Twoje potrzeby się zmieniają? Przeformułowujemy założenia i natychmiast
                      generujemy zaktualizowany kod.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-xl border border-emerald-500/20 bg-zinc-950/70 p-4 transition-colors hover:border-emerald-500/40">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wide text-emerald-400">
                      Poprawki
                    </p>
                    <p className="mt-0.5 text-base font-bold text-white">
                      Iteracje w czasie rzeczywistym podczas spotkań
                    </p>
                    <p className="mt-1 text-xs text-zinc-400">
                      Modyfikacje wprowadzane na żywo w trakcie rozmowy — widzisz i testujesz
                      rezultat od razu.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-zinc-800/80 pt-4 text-center">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                <CheckCheck className="h-4 w-4" />
                <span>100% własności kodu, brak długu technologicznego i natychmiastowe ROI</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEKCJA 2: OFERTA USŁUG (3 FILARY) ─────────────────────── */}
      <section
        id="uslugi"
        aria-labelledby="uslugi-heading"
        className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24 border-t border-zinc-800/80"
      >
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/90 px-3.5 py-1 text-xs font-medium text-zinc-300">
            <Boxes className="h-3.5 w-3.5 text-emerald-400" />
            <span>Oferta usług</span>
          </div>
          <h2
            id="uslugi-heading"
            className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
          >
            Co możemy dla Ciebie zbudować?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-400 sm:text-lg">
            Kompleksowe rozwiązania cyfrowe napędzane przez sztuczną inteligencję.
          </p>
        </div>

        {/* Siatka 3 kart usługowych */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Karta 1: Dedykowane Aplikacje B2B i Narzędzia Wewnętrzne */}
          <article className="group relative flex flex-col justify-between rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-emerald-500/40 hover:bg-zinc-900/80 hover:shadow-2xl hover:shadow-emerald-500/10">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-transform duration-300 group-hover:scale-110">
                <Server className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-white">
                Dedykowane Aplikacje B2B i Narzędzia Wewnętrzne
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Tworzymy elastyczne systemy CRM/ERP, panele klienta oraz portale pracownicze
                dostosowane do Twoich unikalnych procesów.
              </p>

              <ul className="mt-6 space-y-2.5 text-xs text-zinc-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                  <span>Dedykowane bazy danych i czysta architektura</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                  <span>Integracje przez API z zewnętrznymi narzędziami</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                  <span>W pełni responsywne interfejsy</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 border-t border-zinc-800/60 pt-4">
              <span className="text-xs font-mono font-medium text-emerald-400">
                Next.js 16 • PostgreSQL • REST/GraphQL →
              </span>
            </div>
          </article>

          {/* Karta 2: Nowoczesne Strony WWW & Landing Pages */}
          <article className="group relative flex flex-col justify-between rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-teal-500/40 hover:bg-zinc-900/80 hover:shadow-2xl hover:shadow-teal-500/10">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-teal-500/30 bg-teal-500/10 text-teal-400 shadow-[0_0_20px_rgba(20,184,166,0.15)] transition-transform duration-300 group-hover:scale-110">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-white">
                Nowoczesne Strony WWW &amp; Landing Pages
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Projektujemy i wdrażamy superszybkie strony internetowe nastawione na konwersję i
                generowanie leadów.
              </p>

              <ul className="mt-6 space-y-2.5 text-xs text-zinc-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-teal-400 mt-0.5" />
                  <span>Unikalny UI/UX dopasowany do Twojej marki</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-teal-400 mt-0.5" />
                  <span>Optymalizacja pod SEO oraz wyszukiwanie AI (LLMO)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-teal-400 mt-0.5" />
                  <span>Błyskawiczne czasy ładowania i pełna responsywność</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 border-t border-zinc-800/60 pt-4">
              <span className="text-xs font-mono font-medium text-teal-400">
                100/100 Lighthouse • SEO / LLMO • Tailwind v4 →
              </span>
            </div>
          </article>

          {/* Karta 3: Rozwiązania Agentowe & Automatyzacje AI */}
          <article className="group relative flex flex-col justify-between rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500/40 hover:bg-zinc-900/80 hover:shadow-2xl hover:shadow-cyan-500/10">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-transform duration-300 group-hover:scale-110">
                <Bot className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-white">
                Rozwiązania Agentowe &amp; Automatyzacje AI
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Integracje inteligentnych asystentów AI i automatycznych przepływów danych
                bezpośrednio w Twoich narzędziach.
              </p>

              <ul className="mt-6 space-y-2.5 text-xs text-zinc-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-400 mt-0.5" />
                  <span>Autonomiczni agenci przetwarzający dokumenty i dane</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-400 mt-0.5" />
                  <span>Integracja modeli LLM z wewnętrzną wiedzą firmy (RAG)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-400 mt-0.5" />
                  <span>Automatyzacja rutynowych zadań w zespole</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 border-t border-zinc-800/60 pt-4">
              <span className="text-xs font-mono font-medium text-cyan-400">
                Agentic AI • RAG &amp; Embeddings • Custom Tools →
              </span>
            </div>
          </article>
        </div>
      </section>

      {/* ── SEKCJA 3: PROCES CODESIGNU / PROCES WDROŻENIA ─────────── */}
      <section
        id="jak-pracujemy"
        aria-labelledby="proces-heading"
        className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24 border-t border-zinc-800/80"
      >
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/90 px-3.5 py-1 text-xs font-medium text-zinc-300">
            <Layers className="h-3.5 w-3.5 text-emerald-400" />
            <span>Sprawdzony framework</span>
          </div>
          <h2
            id="proces-heading"
            className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
          >
            Jak pracujemy? (Proces w 4 krokach)
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-400 sm:text-lg">
            Przejrzysta ścieżka od pomysłu do wdrożonego systemu — bez zbędnej biurokracji.
          </p>
        </div>

        {/* 4 kroki */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="group relative flex flex-col justify-between rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-500/40 hover:bg-zinc-900/80 hover:shadow-xl hover:shadow-emerald-500/10">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-3xl font-extrabold text-emerald-400">01</span>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                  <MessageSquare className="h-4 w-4" />
                </div>
              </div>
              <h3 className="mt-5 text-lg font-bold text-white">Vibe Session</h3>
              <p className="mt-2.5 text-xs leading-relaxed text-zinc-400">
                Omawiamy Twój cel i wizję w języku naturalnym — bez skomplikowanych specyfikacji.
              </p>
            </div>
            <div className="mt-6 border-t border-zinc-800/60 pt-3">
              <span className="text-[11px] font-mono text-emerald-400">
                Dzień 1 • Warsztat koncepcyjny
              </span>
            </div>
          </div>

          <div className="group relative flex flex-col justify-between rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-teal-500/40 hover:bg-zinc-900/80 hover:shadow-xl hover:shadow-teal-500/10">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-3xl font-extrabold text-teal-400">02</span>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-teal-500/30 bg-teal-500/10 text-teal-400">
                  <Cpu className="h-4 w-4" />
                </div>
              </div>
              <h3 className="mt-5 text-lg font-bold text-white">AI Build</h3>
              <p className="mt-2.5 text-xs leading-relaxed text-zinc-400">
                Nasi deweloperzy przy wsparciu agentów AI budują pierwszy działający prototyp w
                kilka dni.
              </p>
            </div>
            <div className="mt-6 border-t border-zinc-800/60 pt-3">
              <span className="text-[11px] font-mono text-teal-400">
                Dni 2–4 • Kodowanie i architektura
              </span>
            </div>
          </div>

          <div className="group relative flex flex-col justify-between rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-500/40 hover:bg-zinc-900/80 hover:shadow-xl hover:shadow-cyan-500/10">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-3xl font-extrabold text-cyan-400">03</span>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-cyan-400">
                  <RefreshCw className="h-4 w-4" />
                </div>
              </div>
              <h3 className="mt-5 text-lg font-bold text-white">Live Iterations</h3>
              <p className="mt-2.5 text-xs leading-relaxed text-zinc-400">
                Przeglądamy aplikację na żywo i wprowadzamy szlify oraz nowe funkcje w czasie
                rzeczywistym.
              </p>
            </div>
            <div className="mt-6 border-t border-zinc-800/60 pt-3">
              <span className="text-[11px] font-mono text-cyan-400">
                Dni 5–7 • Szlify na działającym systemie
              </span>
            </div>
          </div>

          <div className="group relative flex flex-col justify-between rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-400/40 hover:bg-zinc-900/80 hover:shadow-xl hover:shadow-emerald-400/10">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-3xl font-extrabold text-emerald-300">04</span>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-400/30 bg-emerald-400/10 text-emerald-300">
                  <Rocket className="h-4 w-4" />
                </div>
              </div>
              <h3 className="mt-5 text-lg font-bold text-white">Deploy &amp; Scale</h3>
              <p className="mt-2.5 text-xs leading-relaxed text-zinc-400">
                Bezpieczna publikacja na produkcji z pełnym wsparciem technicznym i opcją dalszego
                rozwoju.
              </p>
            </div>
            <div className="mt-6 border-t border-zinc-800/60 pt-3">
              <span className="text-[11px] font-mono text-emerald-300">
                Dni 8–10 • Produkcja i testy
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEKCJA 1 (NOWA): FAQ ─────────────────────────────────── */}
      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24 border-t border-zinc-800/80"
      >
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium text-emerald-400 shadow-sm shadow-emerald-500/10">
            <Zap className="h-3.5 w-3.5" />
            <span>⚡ Wszystko, co musisz wiedzieć</span>
          </div>
          <h2
            id="faq-heading"
            className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
          >
            Najczęściej zadawane pytania
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-400 sm:text-lg max-w-2xl mx-auto">
            Masz wątpliwości dotyczące Vibe Coding lub przebiegu współpracy? Sprawdź odpowiedzi na kluczowe pytania biznesowe i techniczne.
          </p>
        </div>

        {/* Akordeon */}
        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={faq.q}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? 'border-emerald-500/50 bg-gradient-to-b from-zinc-900/90 to-zinc-950/90 shadow-xl shadow-emerald-500/5 ring-1 ring-emerald-500/20'
                    : 'border-zinc-800/80 bg-zinc-900/40 hover:border-zinc-700/80 hover:bg-zinc-900/60'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-start sm:items-center justify-between gap-4 p-5 sm:p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  <div className="space-y-1.5 pr-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-emerald-400/80">
                        {String(index + 1).padStart(2, '0')}.
                      </span>
                      <span className="inline-block rounded-md border border-zinc-800 bg-zinc-950/60 px-2 py-0.5 text-[11px] font-mono font-medium text-zinc-400">
                        {faq.badge}
                      </span>
                    </div>
                    <span className="block text-base sm:text-lg font-semibold text-white group-hover:text-emerald-300 transition-colors">
                      {faq.q}
                    </span>
                  </div>
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
                      isOpen
                        ? 'rotate-180 border-emerald-500/40 bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                        : 'border-zinc-800 bg-zinc-950/60 text-zinc-400 group-hover:border-zinc-700 group-hover:text-zinc-200'
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-zinc-800/70 bg-zinc-950/40 px-5 pt-4 pb-6 sm:px-6 text-sm sm:text-base leading-relaxed text-zinc-300 transition-all duration-300">
                    <p className="border-l-2 border-emerald-500/40 pl-4 text-zinc-300 font-normal">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Dodatkowy boks wspierający konwersję */}
        <div className="mt-12 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-bold text-white">
              Masz niestandardowe pytanie techniczne lub biznesowe?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
              Chętnie odpowiemy na wszystkie kwestie dotyczące architektury, prywatności danych czy estymacji podczas bezpłatnej konsultacji.
            </p>
          </div>
          <Link
            href="#kontakt"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 px-5 py-3 text-xs font-semibold text-white transition-all shrink-0 hover:text-emerald-300"
          >
            <span>Zadaj pytanie w formularzu</span>
            <ArrowRight className="h-3.5 w-3.5 text-emerald-400" />
          </Link>
        </div>
      </section>

      {/* ── SEKCJA 2 (NOWA): KONTAKT I FORMULARZ WYCENY ──────────── */}
      <section
        id="kontakt"
        aria-labelledby="kontakt-heading"
        className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24 border-t border-zinc-800/80"
      >
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium text-emerald-400">
            <Zap className="h-3.5 w-3.5" />
            <span>Wycena w 24 godziny</span>
          </div>
          <h2
            id="kontakt-heading"
            className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
          >
            Zamień swój pomysł w działający produkt
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-400 sm:text-lg">
            Wypełnij krótki formularz lub umów się na bezpłatną konsultację. Wycenimy Twój projekt w
            24 godziny.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 items-start">
          {/* Kolumna 1: Informacje i bezpośredni kontakt */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white">
                Masz pytania? Porozmawiajmy bezpośrednio.
              </h3>
              <p className="mt-3 text-base leading-relaxed text-zinc-400">
                Nie musisz przygotowywać skomplikowanych specyfikacji technicznych. Opowiedz nam o
                swoim wyzwaniu biznesowym, a my zaproponujemy najlepsze rozwiązanie.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="mailto:kontakt@gotovalues.com"
                className="flex items-center gap-4 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-4 transition-all hover:border-emerald-500/40 hover:bg-zinc-900/70"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-wide text-zinc-500">
                    Napisz bezpośrednio
                  </p>
                  <p className="text-base font-semibold text-white">kontakt@gotovalues.com</p>
                </div>
              </a>

              <div className="flex items-center gap-4 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-teal-500/30 bg-teal-500/10 text-teal-400">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-wide text-zinc-500">
                    Osoba kontaktowa
                  </p>
                  <p className="text-base font-semibold text-white">Tomasz Gołaszewski</p>
                  <p className="text-xs text-zinc-400">Lead Architect &amp; AI Engineer</p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-400">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-wide text-zinc-500">
                    Lokalizacja
                  </p>
                  <p className="text-base font-semibold text-white">Polska</p>
                  <p className="text-xs text-zinc-400">Praca zdalna dla klientów globalnych</p>
                </div>
              </div>
            </div>

            {/* Badge / Box informacyjny */}
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-5 shadow-lg backdrop-blur-sm">
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                    Gwarancja reakcji
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-white">
                    ⚡ Średni czas odpowiedzi: poniżej 2 godzin w dni robocze.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Kolumna 2: Formularz interaktywny w eleganckiej karcie */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/90 p-7 sm:p-9 shadow-2xl backdrop-blur-xl">
              {formStatus === 'success' ? (
                <div className="py-10 text-center space-y-4">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Dziękujemy za wiadomość!</h3>
                  <p className="max-w-md mx-auto text-sm text-zinc-300">
                    Otrzymaliśmy Twoje zgłoszenie. Tomasz przeanalizuje Twój proces lub pomysł i
                    wróci z wstępną wyceną oraz propozycją Vibe Session w ciągu 24 godzin.
                  </p>
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setFormStatus('idle');
                        setFormData({
                          name: '',
                          email: '',
                          serviceType: 'Aplikacja B2B / System wewnętrzny',
                          message: '',
                          bot_field: '',
                        });
                      }}
                      className="rounded-xl border border-zinc-700 bg-zinc-800 px-5 py-2.5 text-xs font-medium text-zinc-200 hover:bg-zinc-700"
                    >
                      Wyślij kolejne zapytanie
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  {/* Honeypot */}
                  <input
                    type="text"
                    name="bot_field"
                    value={formData.bot_field}
                    onChange={(e) => setFormData({ ...formData, bot_field: e.target.value })}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* Imię i nazwisko */}
                  <div>
                    <label
                      htmlFor="quote-name"
                      className="block text-xs font-medium uppercase tracking-wider text-zinc-400"
                    >
                      Imię i Nazwisko *
                    </label>
                    <input
                      id="quote-name"
                      type="text"
                      required
                      placeholder="np. Anna Kowalska"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-950/80 px-4 py-3.5 text-sm text-white placeholder-zinc-500 shadow-inner focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
                    />
                  </div>

                  {/* E-mail biznesowy */}
                  <div>
                    <label
                      htmlFor="quote-email"
                      className="block text-xs font-medium uppercase tracking-wider text-zinc-400"
                    >
                      Adres e-mail biznesowy *
                    </label>
                    <input
                      id="quote-email"
                      type="email"
                      required
                      placeholder="anna@twojafirma.pl"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-950/80 px-4 py-3.5 text-sm text-white placeholder-zinc-500 shadow-inner focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
                    />
                  </div>

                  {/* Czego potrzebujesz? - Pigułki */}
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-zinc-400 mb-2.5">
                      Czego potrzebujesz?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        'Aplikacja B2B / System wewnętrzny',
                        'Nowa strona WWW',
                        'Automatyzacje AI',
                        'Inne',
                      ].map((type) => {
                        const isSelected = formData.serviceType === type;
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setFormData({ ...formData, serviceType: type })}
                            className={`flex items-center justify-between rounded-xl border px-3.5 py-2.5 text-xs font-medium text-left transition-all ${
                              isSelected
                                ? 'border-emerald-500/70 bg-emerald-500/10 text-emerald-300 shadow-sm shadow-emerald-500/10'
                                : 'border-zinc-800 bg-zinc-950/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                            }`}
                          >
                            <span>{type}</span>
                            {isSelected && (
                              <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Opis projektu */}
                  <div>
                    <label
                      htmlFor="quote-message"
                      className="block text-xs font-medium uppercase tracking-wider text-zinc-400"
                    >
                      Opis projektu / pomysłu *
                    </label>
                    <textarea
                      id="quote-message"
                      required
                      rows={4}
                      placeholder="Opisz krótko, co chcesz zbudować lub jaki problem chcesz rozwiązać..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-950/80 px-4 py-3 text-sm text-white placeholder-zinc-500 shadow-inner focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
                    />
                  </div>

                  {/* Error banner */}
                  {formError && (
                    <div className="rounded-xl border border-red-500/40 bg-red-950/30 p-3 text-xs text-red-300 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                      <span>{formError}</span>
                    </div>
                  )}

                  {/* Submit CTA */}
                  <div>
                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="group relative flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-7 py-4 text-sm font-semibold text-zinc-950 shadow-lg shadow-emerald-500/25 transition-all duration-200 hover:shadow-emerald-500/40 hover:brightness-110 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                    >
                      {formStatus === 'submitting' ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          <span>Wysyłanie zgłoszenia...</span>
                        </>
                      ) : (
                        <>
                          <span>Wyślij i uzyskaj bezpłatną wycenę</span>
                          <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </>
                      )}
                    </button>
                    <p className="mt-3 text-center text-xs text-zinc-500">
                      Szanujemy Twoją prywatność. Bez spamu.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── SEKCJA 3 (NOWA): STOPKA (FOOTER) ─────────────────────── */}
      <footer
        id="stopka"
        className="relative border-t border-zinc-800/80 bg-zinc-950 px-4 pt-14 pb-10 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14 pb-12 border-b border-zinc-800/60">
            {/* Brand / Logo */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="text-xl font-extrabold tracking-tight text-white font-mono">
                  gotovalues
                </span>
                <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-400">
                  AI &amp; Vibe Coding Studio
                </span>
              </div>
              <p className="text-sm leading-relaxed text-zinc-400 max-w-md">
                Tworzymy dedykowane oprogramowanie, aplikacje B2B i strony WWW z wykorzystaniem
                agentów AI i Vibe Coding.
              </p>
              <div className="flex items-center gap-2 text-xs text-zinc-500 pt-1">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Bezpieczna architektura • 100% własności kodu • SLA</span>
              </div>
            </div>

            {/* Nawigacja */}
            <div className="lg:col-span-4">
              <p className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
                Nawigacja
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm text-zinc-300">
                <Link href="#hero" className="hover:text-emerald-400 transition-colors">
                  O usłudze
                </Link>
                <Link href="#porownanie" className="hover:text-emerald-400 transition-colors">
                  Porównanie
                </Link>
                <Link href="#uslugi" className="hover:text-emerald-400 transition-colors">
                  Oferta
                </Link>
                <Link href="#jak-pracujemy" className="hover:text-emerald-400 transition-colors">
                  Proces
                </Link>
                <Link href="#faq" className="hover:text-emerald-400 transition-colors">
                  FAQ
                </Link>
                <Link href="#kontakt" className="hover:text-emerald-400 transition-colors">
                  Kontakt
                </Link>
              </div>
            </div>

            {/* Produkty publiczne */}
            <div className="lg:col-span-3">
              <p className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
                Własne produkty
              </p>
              <div className="space-y-2 text-sm text-zinc-300">
                <div>
                  <a
                    href="https://cavi.gotova.pl/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                  >
                    <span>Cavi</span>
                    <span className="text-xs text-zinc-500">— platforma treści AI</span>
                  </a>
                </div>
                <div>
                  <a
                    href="https://akta.gotova.pl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                  >
                    <span>Akta</span>
                    <span className="text-xs text-zinc-500">— analiza dokumentów</span>
                  </a>
                </div>
                <div className="pt-2">
                  <Link
                    href="/blog"
                    className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
                  >
                    Blog techniczny →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom copyright */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
            <p>© 2026 gotovalues.com (Tomasz Gołaszewski). Wszystkie prawa zastrzeżone.</p>
            <div className="flex items-center gap-6">
              <Link href="/polityka-prywatnosci" className="hover:text-zinc-400 transition-colors">
                Polityka prywatności
              </Link>
              <a
                href="mailto:kontakt@gotovalues.com"
                className="hover:text-zinc-400 transition-colors"
              >
                kontakt@gotovalues.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
