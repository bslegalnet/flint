"use client";

import { useEffect, useMemo, useState, FormEvent } from "react";

/* ============================================================
   Flint Financial Group — Agent Portal
   Single self-contained file. Includes:
   - Login (email/password) with magic-link option (mock)
   - localStorage session persistence
   - 5-section dashboard: Overview, Contracting, Production, Training, Agent Tools
   - Sidebar nav on desktop, bottom tab bar on mobile
   ============================================================ */

const SESSION_KEY = "flint_agent_session";
const CARRIERS_KEY = "flint_agent_carriers";
const POLICIES_KEY = "flint_agent_policies";
const LICENSE_KEY = "flint_agent_license";
const PROGRESS_KEY = "flint_agent_progress";
const ONBOARD_KEY = "flint_agent_onboarded";
const OPEN_EVENT = "flint:open-agent-portal";

type Session = {
  email: string;
  firstName: string;
  lastName: string;
  state: string;
  joinedAt: string;
};

type CarrierStatus = "Pending" | "Active" | "Terminated";
type CarrierLOB = "FE" | "MP" | "Medicare" | "IUL";
type CarrierAppointment = {
  id: string;
  carrier: string;
  lob: CarrierLOB;
  level: number;
  status: CarrierStatus;
  writingNumber: string;
};

type PolicyStatus = "Pending" | "Issued" | "Lapsed";
type Policy = {
  id: string;
  type: CarrierLOB;
  carrier: string;
  faceAmount: number;
  annualPremium: number;
  writtenDate: string; // YYYY-MM-DD
  status: PolicyStatus;
};

type LicenseInfo = {
  number: string;
  state: string;
  expiry: string;
};

type ProgressMap = Record<string, boolean>;

type TabKey = "overview" | "contracting" | "production" | "training" | "tools";

/* ---------- Tiny utilities ---------- */

const uid = () => Math.random().toString(36).slice(2, 10);

const dateOffset = (from: Date, days: number) =>
  new Date(from.getTime() + days * 86400000).toISOString().slice(0, 10);

const currency = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

const readJSON = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const writeJSON = (key: string, val: unknown) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(val));
};

/* ---------- Seed data ---------- */

const SEED_CARRIERS: CarrierAppointment[] = [
  { id: uid(), carrier: "Mutual of Omaha", lob: "FE", level: 110, status: "Active", writingNumber: "MOO-—" },
  { id: uid(), carrier: "Aetna", lob: "FE", level: 115, status: "Pending", writingNumber: "—" },
  { id: uid(), carrier: "Americo", lob: "MP", level: 120, status: "Active", writingNumber: "AMR-—" },
  { id: uid(), carrier: "Foresters", lob: "MP", level: 115, status: "Active", writingNumber: "FOR-—" },
  { id: uid(), carrier: "UnitedHealthcare", lob: "Medicare", level: 100, status: "Pending", writingNumber: "—" },
  { id: uid(), carrier: "Allianz", lob: "IUL", level: 105, status: "Pending", writingNumber: "—" },
];

type Resource = {
  id: string;
  title: string;
  description: string;
  body?: string;
  link?: string;
};

const RESOURCES: Record<string, { label: string; items: Resource[] }> = {
  start: {
    label: "Getting Started",
    items: [
      {
        id: "start-1",
        title: "Contracting Walkthrough",
        description: "Step-by-step on getting appointed with Flint's carriers.",
        body: "1. Complete the universal contracting packet sent to your email.\n2. Submit AML, E&O, license copy, and voided check.\n3. Allow 5–7 business days for E-app review.\n4. You'll receive writing numbers via email once approved.",
      },
      {
        id: "start-2",
        title: "Carrier Portal Logins",
        description: "Where to log in and run e-apps for every carrier.",
        body: "Mutual of Omaha → mutualofomaha.com/broker\nAmerico → agents.americo.com\nAetna → producerworld.aetna.com\nForesters → ezbiz.foresters.com\nUHC → jarvis.uhc.com",
      },
      {
        id: "start-3",
        title: "Onboarding Checklist",
        description: "Everything to do in your first 14 days.",
        body: "Day 1–3: Submit contracting, set up CRM, get dialer access.\nDay 4–7: Complete script training, role-play 20 calls.\nDay 8–14: Order first lead order, start dialing 200/day minimum.",
      },
    ],
  },
  scripts: {
    label: "Scripts",
    items: [
      {
        id: "scr-1",
        title: "Final Expense (FE) Script",
        description: "Proven door + phone FE script. Top producers use this.",
        body: "Hi, this is [Name] with Flint Financial. I'm following up on the form you filled out about the new state-regulated final expense program. The good news is you do qualify regardless of health history — let me ask a few quick questions...",
      },
      {
        id: "scr-2",
        title: "Mortgage Protection (MP) Script",
        description: "Telesales MP script with built-in qualification.",
        body: "Hi [Name], this is [You] with Flint Financial Group. We received your request about protecting your mortgage at [address]. I'm just verifying some info so we can get you a quote today...",
      },
      {
        id: "scr-3",
        title: "Medicare Script",
        description: "Compliance-friendly Medicare Advantage / Supplement opener.",
        body: "Hi [Name], this is [You], a licensed insurance agent. I'm calling regarding your request for Medicare plan information. Before I continue I need to let you know we do not offer every plan available in your area...",
      },
      {
        id: "scr-4",
        title: "Top 10 Objection Handlers",
        description: "Rebuttals for price, spouse, time, and trust objections.",
        body: "1. 'I need to talk to my spouse' → 'That makes total sense. Let's get all the numbers in front of you both so the conversation is easy...'\n2. 'I can't afford it' → 'I hear you. Most people don't want to start with the biggest plan. What if we built something around $30/mo?'\n3. 'Send me info' → 'Absolutely — and the way the carrier sends it, it's tied to your specific qualification...'",
      },
    ],
  },
  compliance: {
    label: "Compliance",
    items: [
      {
        id: "cmp-1",
        title: "DNC Rules",
        description: "Federal and state Do-Not-Call basics every agent must know.",
        body: "• Never call a number on the federal DNC list without prior express written consent.\n• Keep a record of consent for at least 5 years.\n• Honor opt-out requests within 30 days.",
      },
      {
        id: "cmp-2",
        title: "State Regulations Reference",
        description: "Quick links to each state's DOI advertising and replacement rules.",
        body: "Florida (FL DFS), Texas (TDI), California (CDI), New York (DFS). For every state you write in, read the replacement rules and the suitability requirements.",
      },
      {
        id: "cmp-3",
        title: "TCPA Basics",
        description: "Prior express written consent, auto-dialer rules, and SMS compliance.",
        body: "Auto-dialers and prerecorded messages to wireless numbers require prior express written consent. Texting is treated the same as a call under TCPA.",
      },
    ],
  },
  advanced: {
    label: "Advanced",
    items: [
      {
        id: "adv-1",
        title: "Recruiting Your First Agent",
        description: "How to recruit, contract, and onboard a downline producer.",
        body: "Recruit from your warm market and social. Offer them a real ladder, not just a contract. Train them like you'd want to be trained: scripts, role-play, lead order before week 2.",
      },
      {
        id: "adv-2",
        title: "Building a Downline",
        description: "Override math, hierarchy planning, and long-term agency design.",
        body: "Build for 10 producing agents in year 1, 30 by year 2. Pay above industry average and protect your retention — overrides only compound when agents stay.",
      },
      {
        id: "adv-3",
        title: "IUL Concepts",
        description: "Index universal life mechanics and how to position them.",
        body: "IUL is permanent insurance with cash value tied to a market index (with floors and caps). Position as a tax-advantaged retirement supplement, not 'investing in stocks.'",
      },
    ],
  },
};

const TOOLS = [
  {
    id: "leads",
    badge: "FLINT EXCLUSIVE",
    name: "Premium Leads",
    vendor: "Benepath / Lead Co.",
    description:
      "Premium TCPA-compliant final expense, mortgage protection, and Medicare leads delivered in real time. Flint agents get exclusive pricing.",
    cta: "Browse Leads — Use Code FLINT15 for 15% Off",
    note: "Preferred lead partner of Flint Financial Group",
    link: "#",
    icon: "L",
  },
  {
    id: "rexah",
    badge: "MOST POPULAR",
    name: "Rexah Labs",
    vendor: "AI Objection Handling",
    description:
      "Real-time AI that listens to your calls and instantly surfaces proven rebuttals when prospects object. Used by top producers in our network.",
    cta: "Try Rexah Free — Flint Agent Discount Applied",
    note: "Flint agents get $10/mo off — $20/mo instead of $30",
    link: "https://tryrexahlabs.com",
    icon: "R",
  },
  {
    id: "ghl",
    badge: "RECOMMENDED",
    name: "GoHighLevel",
    vendor: "CRM Built for Insurance",
    description:
      "The CRM built for insurance agents. Pipeline management, automated follow-up, appointment booking, and more.",
    cta: "Start Free Trial",
    note: "Used by 60% of Flint agents",
    link: "#",
    icon: "G",
  },
  {
    id: "convoso",
    badge: "RECOMMENDED",
    name: "Convoso",
    vendor: "Predictive Dialer",
    description:
      "High-performance predictive dialer used by top telesales agencies. Maximizes contact rate on your leads.",
    cta: "Get a Demo",
    note: "Top performer on FE & MP campaigns",
    link: "#",
    icon: "C",
  },
];

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY",
];

/* ============================================================
   Component
   ============================================================ */

export default function AgentPortal() {
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [tab, setTab] = useState<TabKey>("overview");

  // Listen for "open" event from anywhere on the page (Header button).
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, handler);
    return () => window.removeEventListener(OPEN_EVENT, handler);
  }, []);

  // Restore session on mount.
  useEffect(() => {
    const stored = readJSON<Session | null>(SESSION_KEY, null);
    if (stored) setSession(stored);
  }, []);

  // Lock body scroll while open.
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  if (!open) return null;

  const handleLogout = () => {
    if (typeof window !== "undefined") window.localStorage.removeItem(SESSION_KEY);
    setSession(null);
    setTab("overview");
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white text-navy overflow-y-auto">
      {/* Top-right close (returns to website) */}
      <button
        onClick={() => setOpen(false)}
        className="fixed top-4 right-4 z-[110] h-9 w-9 rounded-full bg-navy/5 hover:bg-navy/10 border border-navy/10 text-navy/70 hover:text-navy flex items-center justify-center text-sm"
        aria-label="Close portal"
      >
        ×
      </button>

      {!session ? (
        <LoginView onAuthed={(s) => setSession(s)} />
      ) : (
        <DashboardView
          session={session}
          tab={tab}
          setTab={setTab}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}

/* ============================================================
   Login
   ============================================================ */

function LoginView({ onAuthed }: { onAuthed: (s: Session) => void }) {
  const [mode, setMode] = useState<"password" | "magic">("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [state, setState] = useState("FL");
  const [error, setError] = useState<string | null>(null);
  const [magicSent, setMagicSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    if (mode === "magic") {
      // Mock magic link: complete login immediately.
      setMagicSent(true);
      setTimeout(() => {
        const session: Session = {
          email,
          firstName: firstName || email.split("@")[0],
          lastName: lastName || "",
          state,
          joinedAt: readJSON<Session | null>(SESSION_KEY, null)?.joinedAt ?? new Date().toISOString(),
        };
        writeJSON(SESSION_KEY, session);
        onAuthed(session);
      }, 700);
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (!firstName.trim()) {
      setError("Enter your first name.");
      return;
    }
    const session: Session = {
      email,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      state,
      joinedAt: readJSON<Session | null>(SESSION_KEY, null)?.joinedAt ?? new Date().toISOString(),
    };
    writeJSON(SESSION_KEY, session);
    onAuthed(session);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="text-3xl font-cinzel tracking-[0.25em] text-gold">FLINT</div>
          </div>
          <h1 className="text-2xl font-serif text-navy mb-1">Agent Portal</h1>
          <p className="text-sm text-navy/60">
            {mode === "magic" ? "Sign in with a magic link" : "Sign in to your dashboard"}
          </p>
        </div>

        <div className="bg-neutral-50 border border-navy/10 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex gap-1 mb-5 p-1 bg-navy/[0.05] rounded-lg">
            <button
              type="button"
              onClick={() => setMode("password")}
              className={`flex-1 text-xs font-semibold uppercase tracking-wider py-2 rounded-md transition ${
                mode === "password" ? "bg-gold text-navy" : "text-navy/60 hover:text-navy"
              }`}
            >
              Email / Password
            </button>
            <button
              type="button"
              onClick={() => setMode("magic")}
              className={`flex-1 text-xs font-semibold uppercase tracking-wider py-2 rounded-md transition ${
                mode === "magic" ? "bg-gold text-navy" : "text-navy/60 hover:text-navy"
              }`}
            >
              Magic Link
            </button>
          </div>

          {magicSent ? (
            <div className="text-center py-6">
              <div className="text-gold text-3xl mb-3">✓</div>
              <p className="text-navy/80 text-sm">
                Magic link sent to <span className="text-gold">{email}</span>. Signing you in…
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <Field label="Email">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input"
                  autoComplete="email"
                  required
                />
              </Field>

              {mode === "password" && (
                <Field label="Password">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input"
                    autoComplete="current-password"
                    required
                  />
                </Field>
              )}

              <div className="grid grid-cols-2 gap-3">
                <Field label="First Name">
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Jordan"
                    className="input"
                    required={mode === "password"}
                  />
                </Field>
                <Field label="Last Name">
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Smith"
                    className="input"
                  />
                </Field>
              </div>

              <Field label="License State">
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="input"
                >
                  {US_STATES.map((s) => (
                    <option key={s} value={s} className="text-navy">
                      {s}
                    </option>
                  ))}
                </select>
              </Field>

              {error && (
                <p className="text-rose-700 text-xs">{error}</p>
              )}

              <button
                type="submit"
                className="w-full bg-gold-gradient text-white font-semibold rounded-full py-3 hover:brightness-105 active:scale-[0.99] transition"
              >
                {mode === "magic" ? "Send Magic Link" : "Sign In"}
              </button>

              <div className="relative my-1">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-navy/10" /></div>
                <div className="relative flex justify-center"><span className="bg-neutral-50 px-2 text-[10px] uppercase tracking-wider text-navy/40">or</span></div>
              </div>

              <button
                type="button"
                onClick={() => {
                  const joinedAt = new Date(Date.now() - 90 * 86400000).toISOString();
                  const session: Session = {
                    email: "jose@flintfinancial.com",
                    firstName: "Jose",
                    lastName: "Neelettu",
                    state: "FL",
                    joinedAt,
                  };
                  writeJSON(SESSION_KEY, session);

                  const today = new Date();
                  const demoPolicies: Policy[] = [
                    { id: uid(), type: "FE", carrier: "Mutual of Omaha", faceAmount: 15000, annualPremium: 920, writtenDate: dateOffset(today, -3), status: "Issued" },
                    { id: uid(), type: "MP", carrier: "Americo", faceAmount: 250000, annualPremium: 1340, writtenDate: dateOffset(today, -8), status: "Issued" },
                    { id: uid(), type: "FE", carrier: "Aetna", faceAmount: 20000, annualPremium: 1180, writtenDate: dateOffset(today, -15), status: "Pending" },
                    { id: uid(), type: "FE", carrier: "Foresters", faceAmount: 12000, annualPremium: 780, writtenDate: dateOffset(today, -34), status: "Issued" },
                    { id: uid(), type: "MP", carrier: "Americo", faceAmount: 200000, annualPremium: 1090, writtenDate: dateOffset(today, -45), status: "Issued" },
                    { id: uid(), type: "Medicare", carrier: "UnitedHealthcare", faceAmount: 0, annualPremium: 600, writtenDate: dateOffset(today, -62), status: "Issued" },
                    { id: uid(), type: "FE", carrier: "Mutual of Omaha", faceAmount: 10000, annualPremium: 720, writtenDate: dateOffset(today, -78), status: "Issued" },
                    { id: uid(), type: "IUL", carrier: "Allianz", faceAmount: 500000, annualPremium: 3600, writtenDate: dateOffset(today, -110), status: "Issued" },
                  ];
                  writeJSON(POLICIES_KEY, demoPolicies);
                  writeJSON(LICENSE_KEY, { number: "W123456", state: "FL", expiry: dateOffset(today, 540) });
                  onAuthed(session);
                }}
                className="w-full bg-navy text-white font-semibold rounded-full py-3 hover:bg-navy-soft transition"
              >
                Continue as Demo Agent (Jose)
              </button>

              <p className="text-[11px] text-navy/40 text-center">
                Authorized agents only. Flint Financial Group ©
              </p>
            </form>
          )}
        </div>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 0.625rem 0.875rem;
          background: #FFFFFF;
          border: 1px solid rgba(28, 18, 8, 0.15);
          border-radius: 0.5rem;
          color: #1C1208;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.15s, background 0.15s;
        }
        .input:focus {
          border-color: rgba(192, 148, 40, 0.6);
          background: #FFFFFF;
        }
        .input::placeholder { color: rgba(28,18,8,0.35); }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[11px] font-semibold uppercase tracking-wider text-navy/50 mb-1.5">
        {label}
      </span>
      {children}
    </label>
  );
}

/* ============================================================
   Dashboard shell
   ============================================================ */

function DashboardView({
  session,
  tab,
  setTab,
  onLogout,
}: {
  session: Session;
  tab: TabKey;
  setTab: (t: TabKey) => void;
  onLogout: () => void;
}) {
  const nav: { key: TabKey; label: string; icon: string }[] = [
    { key: "overview", label: "Overview", icon: "◐" },
    { key: "contracting", label: "Contracting", icon: "❖" },
    { key: "production", label: "Production", icon: "↗" },
    { key: "training", label: "Training", icon: "✦" },
    { key: "tools", label: "Agent Tools", icon: "⚙" },
  ];

  const [showOnboarding, setShowOnboarding] = useState(false);
  useEffect(() => {
    const onboarded = readJSON<Record<string, true>>(ONBOARD_KEY, {});
    if (!onboarded[session.email]) setShowOnboarding(true);
  }, [session.email]);

  const finishOnboarding = () => {
    const onboarded = readJSON<Record<string, true>>(ONBOARD_KEY, {});
    onboarded[session.email] = true;
    writeJSON(ONBOARD_KEY, onboarded);
    setShowOnboarding(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-navy/5 bg-neutral-50">
        <div className="px-6 py-6 border-b border-navy/5">
          <div className="text-xl font-cinzel tracking-[0.25em] text-gold">FLINT</div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-navy/40 mt-1">
            Agent Portal
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {nav.map((n) => (
            <button
              key={n.key}
              onClick={() => setTab(n.key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                tab === n.key
                  ? "bg-gold/10 text-gold border border-gold/20"
                  : "text-navy/70 hover:text-navy hover:bg-navy/5 border border-transparent"
              }`}
            >
              <span className="w-5 text-center opacity-80">{n.icon}</span>
              <span className="font-medium">{n.label}</span>
            </button>
          ))}
        </nav>
        <button
          onClick={onLogout}
          className="m-3 px-3 py-2 text-xs text-navy/60 hover:text-navy border border-navy/10 hover:border-navy/20 rounded-lg transition"
        >
          Sign Out
        </button>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-navy/5 px-4 md:px-8 py-4 flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-navy/40">
              {nav.find((n) => n.key === tab)?.label}
            </div>
            <h1 className="text-lg md:text-xl font-serif text-navy mt-0.5">
              {session.firstName} {session.lastName}
              <span className="ml-2 text-xs text-gold/80 font-sans tracking-wider uppercase">
                Licensed · {session.state}
              </span>
            </h1>
          </div>
          <button
            onClick={onLogout}
            className="md:hidden text-xs text-navy/60 px-3 py-1.5 border border-navy/10 rounded-full"
          >
            Sign Out
          </button>
        </header>

        <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8">
          {tab === "overview" && <OverviewTab session={session} setTab={setTab} />}
          {tab === "contracting" && <ContractingTab session={session} />}
          {tab === "production" && <ProductionTab />}
          {tab === "training" && <TrainingTab />}
          {tab === "tools" && <ToolsTab />}
        </main>
      </div>

      {/* Mobile bottom tab bar */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-20 bg-neutral-50/95 backdrop-blur border-t border-navy/10 grid grid-cols-5">
        {nav.map((n) => (
          <button
            key={n.key}
            onClick={() => setTab(n.key)}
            className={`py-2.5 flex flex-col items-center gap-0.5 text-[10px] uppercase tracking-wider transition ${
              tab === n.key ? "text-gold" : "text-navy/50"
            }`}
          >
            <span className="text-base">{n.icon}</span>
            <span>{n.label.split(" ")[0]}</span>
          </button>
        ))}
      </nav>

      {showOnboarding && (
        <Onboarding session={session} onFinish={finishOnboarding} setTab={setTab} />
      )}
    </div>
  );
}

/* ============================================================
   Onboarding (first login)
   ============================================================ */

function Onboarding({
  session,
  onFinish,
  setTab,
}: {
  session: Session;
  onFinish: () => void;
  setTab: (t: TabKey) => void;
}) {
  const steps: {
    key: string;
    eyebrow: string;
    title: string;
    body: React.ReactNode;
  }[] = [
    {
      key: "welcome",
      eyebrow: "Welcome",
      title: `Welcome to Flint, ${session.firstName}.`,
      body: (
        <div className="space-y-4 text-navy/75 text-[15px] leading-relaxed">
          <p>
            This is your home base — a single place to track every appointment,
            every policy, every training module, and every tool we've negotiated
            on your behalf.
          </p>
          <p>
            Take 60 seconds to get the lay of the land. We'll be quick.
          </p>
        </div>
      ),
    },
    {
      key: "sections",
      eyebrow: "Your Dashboard",
      title: "Five sections, one workflow.",
      body: (
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { t: "Overview", d: "Snapshot of your month + quick links." },
            { t: "Contracting", d: "Every carrier appointment, license info, IMO relationships." },
            { t: "Production", d: "Log every policy. AP, commission, 6-month trend." },
            { t: "Training", d: "Scripts, compliance, advanced builds. Track your progress." },
            { t: "Agent Tools", d: "The toolkit Flint has negotiated for you." },
          ].map((row) => (
            <div key={row.t} className="rounded-xl border border-navy/10 bg-neutral-50 p-3">
              <div className="text-sm font-semibold text-navy">{row.t}</div>
              <div className="text-xs text-navy/60 mt-0.5">{row.d}</div>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: "production",
      eyebrow: "Stay in front of your numbers",
      title: "Log every policy the moment you sell it.",
      body: (
        <div className="space-y-4 text-navy/75 text-[15px] leading-relaxed">
          <p>
            Open the <span className="text-navy font-semibold">Production</span> tab and add the carrier,
            face amount, annual premium, and status. Numbers flow into your dashboard,
            leaderboard, and 6-month trend automatically.
          </p>
          <p className="text-sm text-navy/60">
            Agents who log within 24 hours retain more clients and renew more contracts. Make it a habit.
          </p>
        </div>
      ),
    },
    {
      key: "toolkit",
      eyebrow: "The Edge",
      title: "Agent Toolkit",
      body: (
        <div className="space-y-4">
          <p className="text-sm text-navy/70">
            Exclusive tools and discounts available to Flint agents. Hand-picked by the team —
            not a directory, not an ad.
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            {TOOLS.map((t) => (
              <ToolCard key={t.id} tool={t} />
            ))}
          </div>
          <p className="text-[11px] text-navy/40 text-center">
            You'll find these again any time under the <em>Agent Tools</em> tab.
          </p>
        </div>
      ),
    },
    {
      key: "ready",
      eyebrow: "You're set",
      title: "Time to write business.",
      body: (
        <div className="space-y-4 text-navy/75 text-[15px] leading-relaxed">
          <p>
            Your dashboard is live. Add your first policy, finish your contracting,
            and let your manager know if anything's blocking you.
          </p>
          <p className="text-sm text-navy/60">
            Need help? Reach the Flint team in your private agent Slack channel any time.
          </p>
        </div>
      ),
    },
  ];

  const [i, setI] = useState(0);
  const step = steps[i];
  const isLast = i === steps.length - 1;

  const finish = () => {
    setTab("tools");
    onFinish();
  };

  return (
    <div className="fixed inset-0 z-[120] bg-navy/40 backdrop-blur-sm flex items-center justify-center p-3 md:p-6">
      <div className="w-full max-w-3xl max-h-[92vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-navy/10 overflow-hidden">
        {/* Header */}
        <div className="px-6 md:px-8 pt-6 pb-4 border-b border-navy/5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {steps.map((s, idx) => (
              <span
                key={s.key}
                className={`h-1.5 rounded-full transition-all ${
                  idx === i ? "w-8 bg-gold" : idx < i ? "w-4 bg-gold/50" : "w-4 bg-navy/10"
                }`}
              />
            ))}
            <span className="ml-3 text-[10px] uppercase tracking-[0.2em] text-navy/40">
              Step {i + 1} of {steps.length}
            </span>
          </div>
          <button
            onClick={onFinish}
            className="text-xs text-navy/50 hover:text-navy underline-offset-4 hover:underline"
          >
            Skip
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 md:px-8 py-6 md:py-8">
          <div className="text-[10px] uppercase tracking-[0.2em] text-gold mb-2">{step.eyebrow}</div>
          <h2 className="text-2xl md:text-3xl font-serif text-navy mb-5">{step.title}</h2>
          {step.body}
        </div>

        {/* Footer */}
        <div className="px-6 md:px-8 py-4 border-t border-navy/5 flex items-center justify-between gap-3 bg-neutral-50">
          <button
            onClick={() => setI((n) => Math.max(0, n - 1))}
            disabled={i === 0}
            className="text-sm text-navy/60 hover:text-navy disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            ← Back
          </button>
          {isLast ? (
            <button
              onClick={finish}
              className="bg-gold-gradient text-white font-semibold rounded-full px-6 py-2.5 text-sm hover:brightness-105 transition"
            >
              Enter Dashboard →
            </button>
          ) : (
            <button
              onClick={() => setI((n) => Math.min(steps.length - 1, n + 1))}
              className="bg-gold-gradient text-white font-semibold rounded-full px-6 py-2.5 text-sm hover:brightness-105 transition"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Overview
   ============================================================ */

function OverviewTab({ session, setTab }: { session: Session; setTab: (t: TabKey) => void }) {
  const carriers = useLocalState<CarrierAppointment[]>(CARRIERS_KEY, SEED_CARRIERS)[0];
  const policies = useLocalState<Policy[]>(POLICIES_KEY, [])[0];

  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthPolicies = policies.filter(
    (p) => new Date(p.writtenDate) >= monthStart && p.status !== "Lapsed"
  );
  const monthAP = monthPolicies.reduce((sum, p) => sum + (p.annualPremium || 0), 0);
  const daysSince = Math.max(
    0,
    Math.floor((Date.now() - new Date(session.joinedAt).getTime()) / 86400000)
  );
  const activeCarriers = carriers.filter((c) => c.status === "Active").length;

  return (
    <div className="space-y-8 max-w-6xl">
      <section>
        <h2 className="text-2xl md:text-3xl font-serif text-navy">
          Welcome back, <span className="text-gold">{session.firstName}</span>.
        </h2>
        <p className="text-navy/60 mt-1 text-sm">
          Here's your snapshot for {now.toLocaleDateString("en-US", { month: "long", year: "numeric" })}.
        </p>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <StatCard label="Carriers Appointed" value={`${activeCarriers}`} sub={`${carriers.length - activeCarriers} pending`} />
        <StatCard label="Policies This Month" value={`${monthPolicies.length}`} sub={`${policies.filter(p => p.status === "Issued").length} issued total`} />
        <StatCard label="AP This Month" value={currency(monthAP)} sub="Annualized premium" />
        <StatCard label="Days With Flint" value={`${daysSince}`} sub="Since onboarded" />
      </section>

      <section>
        <h3 className="text-xs uppercase tracking-[0.2em] text-navy/40 mb-3">Jump In</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { k: "contracting", label: "Contracting" },
            { k: "production", label: "Log Production" },
            { k: "training", label: "Training" },
            { k: "tools", label: "Agent Tools" },
          ].map((q) => (
            <button
              key={q.k}
              onClick={() => setTab(q.k as TabKey)}
              className="text-left bg-neutral-50 hover:bg-navy/[0.06] border border-navy/10 hover:border-gold/30 rounded-xl p-4 transition"
            >
              <div className="text-navy font-medium">{q.label}</div>
              <div className="text-xs text-navy/50 mt-0.5">Open →</div>
            </button>
          ))}
        </div>
      </section>

      <section className="bg-neutral-50 border border-navy/10 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-navy font-serif text-lg">Production Leaderboard</h3>
            <p className="text-xs text-navy/50">This month · top 5 producers · placeholder</p>
          </div>
          <span className="text-[10px] uppercase tracking-wider text-gold/80 border border-gold/30 rounded-full px-2 py-0.5">
            Live Next Month
          </span>
        </div>
        <ol className="space-y-2">
          {[
            { name: "Marcus T.", ap: 38420 },
            { name: "Priya R.", ap: 31180 },
            { name: "Jamal H.", ap: 27950 },
            { name: `${session.firstName} (you)`, ap: monthAP, me: true },
            { name: "Caroline W.", ap: 22610 },
          ]
            .sort((a, b) => b.ap - a.ap)
            .map((row, i) => (
              <li
                key={row.name}
                className={`flex items-center justify-between px-3 py-2 rounded-lg ${
                  row.me ? "bg-gold/10 border border-gold/20" : "bg-navy/[0.02]"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="w-6 text-center text-navy/50 text-sm">{i + 1}</span>
                  <span className={`text-sm ${row.me ? "text-gold" : "text-navy/90"}`}>{row.name}</span>
                </span>
                <span className="text-sm font-medium text-navy/90 tabular-nums">{currency(row.ap)}</span>
              </li>
            ))}
        </ol>
      </section>
    </div>
  );
}

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="bg-neutral-50 border border-navy/10 rounded-xl p-4">
      <div className="text-[10px] uppercase tracking-wider text-navy/40">{label}</div>
      <div className="text-2xl md:text-3xl font-serif text-navy mt-1 tabular-nums">{value}</div>
      {sub && <div className="text-[11px] text-navy/40 mt-0.5">{sub}</div>}
    </div>
  );
}

/* ============================================================
   Contracting
   ============================================================ */

function ContractingTab({ session }: { session: Session }) {
  const [carriers, setCarriers] = useLocalState<CarrierAppointment[]>(CARRIERS_KEY, SEED_CARRIERS);
  const [license, setLicense] = useLocalState<LicenseInfo>(LICENSE_KEY, {
    number: "",
    state: session.state,
    expiry: "",
  });
  const [editLicense, setEditLicense] = useState(false);
  const [draftLicense, setDraftLicense] = useState(license);
  useEffect(() => setDraftLicense(license), [license]);

  const cycleStatus = (id: string) => {
    const order: CarrierStatus[] = ["Pending", "Active", "Terminated"];
    setCarriers((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const next = order[(order.indexOf(c.status) + 1) % order.length];
        return { ...c, status: next };
      })
    );
  };

  const addCarrier = () => {
    setCarriers((prev) => [
      ...prev,
      {
        id: uid(),
        carrier: "New Carrier",
        lob: "FE",
        level: 100,
        status: "Pending",
        writingNumber: "—",
      },
    ]);
  };

  const updateCarrier = (id: string, patch: Partial<CarrierAppointment>) => {
    setCarriers((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  };

  const removeCarrier = (id: string) => {
    setCarriers((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <section>
        <h2 className="text-xl md:text-2xl font-serif text-navy mb-1">Contracting & Appointments</h2>
        <p className="text-sm text-navy/60">
          Track every carrier appointment across all of your IMO relationships.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-4">
        <div className="bg-neutral-50 border border-navy/10 rounded-2xl p-5">
          <div className="text-[10px] uppercase tracking-wider text-gold/80 mb-1">Primary IMO</div>
          <div className="text-navy font-serif text-lg">Family First Life</div>
          <div className="text-xs text-navy/50 mt-1">FE / MP / IUL contracts</div>
        </div>
        <div className="bg-neutral-50 border border-navy/10 rounded-2xl p-5">
          <div className="text-[10px] uppercase tracking-wider text-gold/80 mb-1">Medicare IMO</div>
          <div className="text-navy font-serif text-lg">Pinnacle Financial</div>
          <div className="text-xs text-navy/50 mt-1">Medicare Advantage & Supplement</div>
        </div>
      </section>

      <section className="bg-neutral-50 border border-navy/10 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-navy font-serif text-lg">License Information</h3>
          <button
            onClick={() => {
              if (editLicense) setLicense(draftLicense);
              setEditLicense((v) => !v);
            }}
            className="text-xs text-gold hover:text-gold-light underline-offset-4 hover:underline"
          >
            {editLicense ? "Save" : "Edit"}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <LicenseField
            label="License #"
            value={editLicense ? draftLicense.number : license.number || "—"}
            edit={editLicense}
            onChange={(v) => setDraftLicense({ ...draftLicense, number: v })}
          />
          <LicenseField
            label="State"
            value={editLicense ? draftLicense.state : license.state}
            edit={editLicense}
            onChange={(v) => setDraftLicense({ ...draftLicense, state: v })}
          />
          <LicenseField
            label="Expires"
            value={editLicense ? draftLicense.expiry : license.expiry || "—"}
            edit={editLicense}
            type="date"
            onChange={(v) => setDraftLicense({ ...draftLicense, expiry: v })}
          />
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-navy font-serif text-lg">Carrier Appointments</h3>
          <button
            onClick={addCarrier}
            className="text-xs bg-gold/10 hover:bg-gold/20 text-gold border border-gold/30 px-3 py-1.5 rounded-full transition"
          >
            + Add Carrier
          </button>
        </div>

        <div className="bg-neutral-50 border border-navy/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-neutral-50 text-[10px] uppercase tracking-wider text-navy/50">
                <tr>
                  <th className="text-left px-4 py-3">Carrier</th>
                  <th className="text-left px-4 py-3">LOB</th>
                  <th className="text-left px-4 py-3">Level</th>
                  <th className="text-left px-4 py-3">Writing #</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {carriers.map((c) => (
                  <tr key={c.id} className="border-t border-navy/5 hover:bg-navy/[0.02]">
                    <td className="px-4 py-3">
                      <input
                        value={c.carrier}
                        onChange={(e) => updateCarrier(c.id, { carrier: e.target.value })}
                        className="bg-transparent text-navy w-full outline-none focus:bg-navy/5 rounded px-1 -mx-1"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={c.lob}
                        onChange={(e) => updateCarrier(c.id, { lob: e.target.value as CarrierLOB })}
                        className="bg-transparent text-navy outline-none"
                      >
                        {(["FE", "MP", "Medicare", "IUL"] as CarrierLOB[]).map((l) => (
                          <option key={l} value={l} className="text-navy">{l}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 tabular-nums">
                      <input
                        type="number"
                        value={c.level}
                        onChange={(e) => updateCarrier(c.id, { level: Number(e.target.value) })}
                        className="bg-transparent text-navy w-16 outline-none focus:bg-navy/5 rounded px-1"
                      />
                      <span className="text-navy/40">%</span>
                    </td>
                    <td className="px-4 py-3">
                      <input
                        value={c.writingNumber}
                        onChange={(e) => updateCarrier(c.id, { writingNumber: e.target.value })}
                        className="bg-transparent text-navy/80 w-full outline-none focus:bg-navy/5 rounded px-1 -mx-1"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => cycleStatus(c.id)}
                        className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border ${statusStyle(c.status)}`}
                      >
                        {c.status}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => removeCarrier(c.id)}
                        className="text-navy/30 hover:text-rose-700 text-xs"
                        aria-label="Remove"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
                {carriers.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center text-navy/40 py-8 text-sm">
                      No carriers yet. Add your first appointment above.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-[11px] text-navy/40 mt-2">
          Tip: click a status to cycle Pending → Active → Terminated.
        </p>
      </section>
    </div>
  );
}

function statusStyle(s: CarrierStatus) {
  if (s === "Active") return "bg-emerald-500/15 text-emerald-700 border-emerald-600/40";
  if (s === "Pending") return "bg-amber-500/15 text-amber-700 border-amber-600/40";
  return "bg-rose-500/15 text-rose-700 border-rose-600/40";
}

function LicenseField({
  label,
  value,
  edit,
  type = "text",
  onChange,
}: {
  label: string;
  value: string;
  edit: boolean;
  type?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-navy/40 mb-1">{label}</div>
      {edit ? (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-navy/5 border border-navy/10 rounded-md px-2.5 py-1.5 text-navy text-sm outline-none focus:border-gold/40"
        />
      ) : (
        <div className="text-navy text-sm">{value}</div>
      )}
    </div>
  );
}

/* ============================================================
   Production
   ============================================================ */

function ProductionTab() {
  const [policies, setPolicies] = useLocalState<Policy[]>(POLICIES_KEY, []);
  const [draft, setDraft] = useState<Omit<Policy, "id">>({
    type: "FE",
    carrier: "",
    faceAmount: 10000,
    annualPremium: 0,
    writtenDate: new Date().toISOString().slice(0, 10),
    status: "Pending",
  });

  const add = (e: FormEvent) => {
    e.preventDefault();
    if (!draft.carrier.trim() || draft.annualPremium <= 0) return;
    setPolicies((prev) => [{ ...draft, id: uid() }, ...prev]);
    setDraft({ ...draft, carrier: "", faceAmount: 10000, annualPremium: 0 });
  };

  const remove = (id: string) => setPolicies((p) => p.filter((x) => x.id !== id));

  const updateStatus = (id: string, status: PolicyStatus) =>
    setPolicies((p) => p.map((x) => (x.id === id ? { ...x, status } : x)));

  const stats = useMemo(() => {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const yearStart = new Date(now.getFullYear(), 0, 1);
    const monthAP = policies
      .filter((p) => new Date(p.writtenDate) >= monthStart && p.status !== "Lapsed")
      .reduce((s, p) => s + p.annualPremium, 0);
    const yearAP = policies
      .filter((p) => new Date(p.writtenDate) >= yearStart && p.status !== "Lapsed")
      .reduce((s, p) => s + p.annualPremium, 0);
    const issued = policies.filter((p) => p.status === "Issued").length;
    return { monthAP, yearAP, issued, commission: yearAP * 0.85 };
  }, [policies]);

  const months6 = useMemo(() => {
    const arr: { label: string; ap: number }[] = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const next = new Date(d.getFullYear(), d.getMonth() + 1, 1);
      const ap = policies
        .filter((p) => {
          const w = new Date(p.writtenDate);
          return w >= d && w < next && p.status !== "Lapsed";
        })
        .reduce((s, p) => s + p.annualPremium, 0);
      arr.push({ label: d.toLocaleDateString("en-US", { month: "short" }), ap });
    }
    return arr;
  }, [policies]);

  return (
    <div className="space-y-8 max-w-6xl">
      <section>
        <h2 className="text-xl md:text-2xl font-serif text-navy mb-1">Production</h2>
        <p className="text-sm text-navy/60">Log every submitted policy. Numbers update everywhere else.</p>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <StatCard label="AP This Month" value={currency(stats.monthAP)} />
        <StatCard label="AP YTD" value={currency(stats.yearAP)} />
        <StatCard label="Policies Issued" value={`${stats.issued}`} />
        <StatCard label="Commission Est." value={currency(stats.commission)} sub="AP × 0.85 (placeholder)" />
      </section>

      <section className="bg-neutral-50 border border-navy/10 rounded-2xl p-5">
        <h3 className="text-navy font-serif text-lg mb-4">Monthly AP — Last 6 Months</h3>
        <BarChart6 data={months6} />
      </section>

      <section className="bg-neutral-50 border border-navy/10 rounded-2xl p-5">
        <h3 className="text-navy font-serif text-lg mb-4">Log a Policy</h3>
        <form onSubmit={add} className="grid grid-cols-2 md:grid-cols-6 gap-3 items-end">
          <Mini label="Type">
            <select
              value={draft.type}
              onChange={(e) => setDraft({ ...draft, type: e.target.value as CarrierLOB })}
              className="mini-input"
            >
              {(["FE", "MP", "Medicare", "IUL"] as CarrierLOB[]).map((l) => (
                <option key={l} value={l} className="text-navy">{l}</option>
              ))}
            </select>
          </Mini>
          <Mini label="Carrier" className="col-span-2 md:col-span-1">
            <input
              value={draft.carrier}
              onChange={(e) => setDraft({ ...draft, carrier: e.target.value })}
              placeholder="Americo"
              className="mini-input"
            />
          </Mini>
          <Mini label="Face Amount">
            <input
              type="number"
              value={draft.faceAmount}
              onChange={(e) => setDraft({ ...draft, faceAmount: Number(e.target.value) })}
              className="mini-input"
            />
          </Mini>
          <Mini label="Annual Premium">
            <input
              type="number"
              value={draft.annualPremium}
              onChange={(e) => setDraft({ ...draft, annualPremium: Number(e.target.value) })}
              className="mini-input"
            />
          </Mini>
          <Mini label="Written">
            <input
              type="date"
              value={draft.writtenDate}
              onChange={(e) => setDraft({ ...draft, writtenDate: e.target.value })}
              className="mini-input"
            />
          </Mini>
          <Mini label="Status">
            <select
              value={draft.status}
              onChange={(e) => setDraft({ ...draft, status: e.target.value as PolicyStatus })}
              className="mini-input"
            >
              {(["Pending", "Issued", "Lapsed"] as PolicyStatus[]).map((s) => (
                <option key={s} value={s} className="text-navy">{s}</option>
              ))}
            </select>
          </Mini>
          <button
            type="submit"
            className="col-span-2 md:col-span-6 mt-2 bg-gold-gradient text-white font-semibold rounded-full py-2.5 hover:brightness-105 transition"
          >
            Add Policy
          </button>
        </form>
        <style jsx>{`
          .mini-input {
            width: 100%;
            background: #FFFFFF;
            border: 1px solid rgba(28,18,8,0.15);
            border-radius: 0.5rem;
            color: #1C1208;
            padding: 0.5rem 0.625rem;
            font-size: 0.8125rem;
            outline: none;
          }
          .mini-input:focus { border-color: rgba(192,148,40,0.6); background: #FFFFFF; }
        `}</style>
      </section>

      <section>
        <h3 className="text-navy font-serif text-lg mb-3">Submitted Policies</h3>
        <div className="bg-neutral-50 border border-navy/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-neutral-50 text-[10px] uppercase tracking-wider text-navy/50">
                <tr>
                  <th className="text-left px-4 py-3">Date</th>
                  <th className="text-left px-4 py-3">Type</th>
                  <th className="text-left px-4 py-3">Carrier</th>
                  <th className="text-right px-4 py-3">Face</th>
                  <th className="text-right px-4 py-3">AP</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {[...policies]
                  .sort((a, b) => b.writtenDate.localeCompare(a.writtenDate))
                  .map((p) => (
                    <tr key={p.id} className="border-t border-navy/5 hover:bg-navy/[0.02]">
                      <td className="px-4 py-3 text-navy/80 tabular-nums">{p.writtenDate}</td>
                      <td className="px-4 py-3 text-navy">{p.type}</td>
                      <td className="px-4 py-3 text-navy">{p.carrier}</td>
                      <td className="px-4 py-3 text-right tabular-nums text-navy/80">{currency(p.faceAmount)}</td>
                      <td className="px-4 py-3 text-right tabular-nums text-navy">{currency(p.annualPremium)}</td>
                      <td className="px-4 py-3">
                        <select
                          value={p.status}
                          onChange={(e) => updateStatus(p.id, e.target.value as PolicyStatus)}
                          className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border bg-transparent outline-none ${policyStatusStyle(p.status)}`}
                        >
                          {(["Pending", "Issued", "Lapsed"] as PolicyStatus[]).map((s) => (
                            <option key={s} value={s} className="text-navy">{s}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button onClick={() => remove(p.id)} className="text-navy/30 hover:text-rose-700 text-xs">
                          ✕
                        </button>
                      </td>
                    </tr>
                  ))}
                {policies.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center text-navy/40 py-10 text-sm">
                      No policies logged yet. Add your first one above.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

function policyStatusStyle(s: PolicyStatus) {
  if (s === "Issued") return "text-emerald-700 border-emerald-600/40";
  if (s === "Pending") return "text-amber-700 border-amber-600/40";
  return "text-rose-700 border-rose-600/40";
}

function Mini({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-[10px] font-semibold uppercase tracking-wider text-navy/50 mb-1">
        {label}
      </span>
      {children}
    </label>
  );
}

function BarChart6({ data }: { data: { label: string; ap: number }[] }) {
  const max = Math.max(1, ...data.map((d) => d.ap));
  return (
    <div className="flex items-end gap-3 h-44">
      {data.map((d) => {
        const h = (d.ap / max) * 100;
        return (
          <div key={d.label} className="flex-1 flex flex-col items-center justify-end gap-2">
            <div className="text-[10px] text-navy/50 tabular-nums">
              {d.ap > 0 ? currency(d.ap) : ""}
            </div>
            <div
              className="w-full rounded-t-md bg-gradient-to-t from-gold-dark to-gold transition-all"
              style={{ height: `${Math.max(4, h)}%` }}
            />
            <div className="text-[10px] text-navy/60 uppercase tracking-wider">{d.label}</div>
          </div>
        );
      })}
    </div>
  );
}

/* ============================================================
   Training
   ============================================================ */

function TrainingTab() {
  const [progress, setProgress] = useLocalState<ProgressMap>(PROGRESS_KEY, {});
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggle = (id: string) => setProgress((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="space-y-8 max-w-5xl">
      <section>
        <h2 className="text-xl md:text-2xl font-serif text-navy mb-1">Training Library</h2>
        <p className="text-sm text-navy/60">Everything you need to ramp up and stay sharp. Mark complete as you go.</p>
      </section>

      {Object.entries(RESOURCES).map(([catKey, cat]) => {
        const total = cat.items.length;
        const done = cat.items.filter((i) => progress[i.id]).length;
        const pct = total ? Math.round((done / total) * 100) : 0;
        return (
          <section key={catKey}>
            <div className="flex items-end justify-between mb-3">
              <div>
                <h3 className="text-navy font-serif text-lg">{cat.label}</h3>
                <div className="text-[11px] text-navy/50">{done}/{total} complete</div>
              </div>
              <div className="w-32">
                <div className="h-1.5 bg-navy/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gold-gradient transition-all" style={{ width: `${pct}%` }} />
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {cat.items.map((r) => {
                const isOpen = openItem === r.id;
                const checked = !!progress[r.id];
                return (
                  <div
                    key={r.id}
                    className="bg-neutral-50 border border-navy/10 hover:border-gold/20 rounded-xl p-4 transition"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-navy font-medium">{r.title}</div>
                        <p className="text-xs text-navy/60 mt-1">{r.description}</p>
                      </div>
                      <button
                        onClick={() => toggle(r.id)}
                        aria-label="Mark complete"
                        className={`shrink-0 h-6 w-6 rounded-md border flex items-center justify-center text-xs transition ${
                          checked
                            ? "bg-gold border-gold text-navy"
                            : "border-navy/20 text-transparent hover:border-gold/50"
                        }`}
                      >
                        ✓
                      </button>
                    </div>
                    {r.body && (
                      <>
                        <button
                          onClick={() => setOpenItem(isOpen ? null : r.id)}
                          className="mt-3 text-xs text-gold/90 hover:text-gold"
                        >
                          {isOpen ? "Hide" : "View"} →
                        </button>
                        {isOpen && (
                          <pre className="mt-3 whitespace-pre-wrap text-xs text-navy/80 bg-neutral-100 border border-navy/5 rounded-md p-3 font-sans leading-relaxed">
                            {r.body}
                          </pre>
                        )}
                      </>
                    )}
                    {r.link && (
                      <a
                        href={r.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-block text-xs text-gold/90 hover:text-gold"
                      >
                        Open resource ↗
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}

/* ============================================================
   Agent Tools — curated, NOT an ad section
   ============================================================ */

function ToolsTab() {
  return (
    <div className="space-y-6 max-w-5xl">
      <section>
        <h2 className="text-xl md:text-2xl font-serif text-navy mb-1">Agent Toolkit</h2>
        <p className="text-sm text-navy/60">
          Exclusive tools and discounts available to Flint agents. Hand-picked by the team — not a directory, not an ad.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-4">
        {TOOLS.map((t) => (
          <ToolCard key={t.id} tool={t} />
        ))}
      </div>

      <p className="text-[11px] text-navy/40 text-center">
        Flint Financial Group may receive partner credits from some of these vendors. We only recommend tools our top producers actually use.
      </p>
    </div>
  );
}

function ToolCard({ tool: t }: { tool: (typeof TOOLS)[number] }) {
  return (
    <article className="relative bg-neutral-50 border border-navy/10 hover:border-gold/30 rounded-2xl p-5 pl-6 transition">
      <span className="absolute left-0 top-5 bottom-5 w-[3px] bg-gold-gradient rounded-r-full" />
      <header className="flex items-start gap-3 mb-3">
        <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-gold/30 to-gold/5 border border-gold/20 flex items-center justify-center text-gold font-cinzel text-lg shrink-0">
          {t.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-navy font-serif text-lg leading-tight">{t.name}</h3>
            <span className="text-[9px] uppercase tracking-wider text-gold border border-gold/30 rounded-full px-1.5 py-0.5">
              {t.badge}
            </span>
          </div>
          <div className="text-[11px] text-navy/50">{t.vendor}</div>
        </div>
      </header>

      <p className="text-sm text-navy/75 leading-relaxed">{t.description}</p>

      <div className="mt-4 text-[11px] text-gold/90 italic">{t.note}</div>

      <a
        href={t.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center justify-center w-full md:w-auto bg-gold-gradient text-white font-semibold rounded-full px-4 py-2.5 text-sm hover:brightness-105 transition"
      >
        {t.cta}
      </a>
    </article>
  );
}

/* ============================================================
   Hook: localStorage-backed state
   ============================================================ */

function useLocalState<T>(key: string, initial: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(initial);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(readJSON<T>(key, initial));
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    if (hydrated) writeJSON(key, state);
  }, [key, state, hydrated]);

  return [state, setState];
}

/* ============================================================
   Helper to open the portal from anywhere
   ============================================================ */

export function openAgentPortal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(OPEN_EVENT));
  }
}
