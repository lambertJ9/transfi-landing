export default function TransfiLandingPage() {
  const features = [
    {
      title: "Global Transfers",
      desc: "Fast, reliable international payments for people and businesses.",
    },
    {
      title: "Compliance First",
      desc: "Designed with KYC, AML, and operational trust at the core.",
    },
    {
      title: "Built to Scale",
      desc: "A strong foundation for wallets, payouts, and escrow-style workflows.",
    },
  ];

  const steps = [
    "Create account",
    "Verify identity",
    "Fund wallet",
    "Send or release payment",
  ];

  const investorCards = [
    {
      title: "Large market",
      desc: "Cross-border payments and marketplace infrastructure remain a major global opportunity.",
    },
    {
      title: "Flexible revenue",
      desc: "Monetize through transaction fees, FX spreads, and future platform services.",
    },
    {
      title: "Expansion path",
      desc: "Grow from payments into milestone releases, escrow flows, and partner APIs.",
    },
  ];

  const useCases = [
    "Rent-to-own payments",
    "Freelancer milestones",
    "Marketplace transactions",
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.18),transparent_35%),radial-gradient(circle_at_left,rgba(14,165,233,0.14),transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-8">
          <header className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur">
            <div>
              <div className="text-xl font-semibold tracking-tight">Transfi</div>
              <div className="text-sm text-slate-300">
                Borderless payments, designed for trust.
              </div>
            </div>
            <nav className="hidden gap-6 text-sm text-slate-300 md:flex">
              <a href="#features" className="hover:text-white">
                Features
              </a>
              <a href="#how-it-works" className="hover:text-white">
                How it works
              </a>
              <a href="#investors" className="hover:text-white">
                Investors
              </a>
              <a href="#waitlist" className="hover:text-white">
                Get started
              </a>
            </nav>
          </header>

          <div className="grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
            <div>
              <div className="mb-4 inline-flex rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-sm text-sky-200">
                Cross-border infrastructure for modern finance
              </div>
              <h1 className="max-w-2xl text-5xl font-semibold leading-tight tracking-tight md:text-6xl">
                Global payments with speed, control, and trust.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Transfi helps people and businesses move money across borders
                with a cleaner, more secure, and compliance-focused experience.
              </p>

              <form
                className="mt-8 flex flex-wrap gap-4"
                id="waitlist"
                action="/api/waitlist"
                method="POST"
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="min-w-[260px] flex-1 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-white outline-none placeholder:text-slate-400"
                />
                <button
                  className="rounded-2xl bg-sky-500 px-6 py-3 text-base font-medium text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-400"
                  type="submit"
                >
                  Join the waitlist
                </button>
                <button
                  className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-base font-medium text-white transition hover:bg-white/10"
                  type="button"
                >
                  Talk to us
                </button>
              </form>

              <div className="mt-10 grid max-w-xl grid-cols-3 gap-4 text-sm text-slate-300">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-2xl font-semibold text-white">Fast</div>
                  <div>Cross-border payouts</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-2xl font-semibold text-white">Secure</div>
                  <div>Compliance-led design</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-2xl font-semibold text-white">
                    Flexible
                  </div>
                  <div>Escrow-style workflows</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 rounded-[2rem] bg-sky-500/10 blur-3xl" />
              <div className="relative rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/30 backdrop-blur">
                <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <div className="text-sm text-slate-400">
                        Available balance
                      </div>
                      <div className="text-3xl font-semibold">$12,480.00</div>
                    </div>
                    <div className="rounded-2xl bg-emerald-500/15 px-3 py-1 text-sm text-emerald-300">
                      Verified
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="text-sm text-slate-400">Send from</div>
                      <div className="mt-1 text-base font-medium">
                        Canada • CAD
                      </div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="text-sm text-slate-400">
                        Recipient gets
                      </div>
                      <div className="mt-1 text-base font-medium">
                        Nigeria • NGN
                      </div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">
                          Estimated delivery
                        </span>
                        <span className="font-medium text-white">Same day</span>
                      </div>
                    </div>
                  </div>

                  <button className="mt-5 w-full rounded-2xl bg-white px-4 py-3 font-medium text-slate-950 transition hover:bg-slate-100">
                    Start transfer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-8 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 md:items-end">
          <div>
            <div className="text-sm font-medium uppercase tracking-[0.2em] text-sky-300">
              Why Transfi
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Simple for customers. Credible for partners.
            </h2>
          </div>
          <p className="text-slate-300 md:max-w-xl md:justify-self-end">
            Built to communicate trust clearly to users, banks, investors, and
            marketplace operators.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/10"
            >
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="mt-3 leading-7 text-slate-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="how-it-works"
        className="mx-auto max-w-7xl px-6 py-8 md:py-16"
      >
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <div className="text-sm font-medium uppercase tracking-[0.2em] text-sky-300">
              How it works
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              A clear flow from onboarding to payout.
            </h2>
            <p className="mt-4 text-slate-300">
              Start with verified users, wallet funding, and dependable
              transfers. Add more advanced flows as you scale.
            </p>
          </div>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={step}
                className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-500 text-sm font-semibold text-white">
                  {index + 1}
                </div>
                <div className="pt-1 text-base text-slate-200">{step}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="investors"
        className="mx-auto max-w-7xl px-6 py-8 md:py-16"
      >
        <div className="grid gap-10 md:grid-cols-2 md:items-end">
          <div>
            <div className="text-sm font-medium uppercase tracking-[0.2em] text-sky-300">
              Investor view
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              A payments layer with room to grow into escrow-style
              infrastructure.
            </h2>
          </div>
          <p className="text-slate-300 md:max-w-xl md:justify-self-end">
            Start with transfers and payouts. Expand into milestone releases,
            rent-to-own flows, and marketplace transaction logic.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {investorCards.map((card) => (
            <div
              key={card.title}
              className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/10"
            >
              <h3 className="text-xl font-semibold">{card.title}</h3>
              <p className="mt-3 leading-7 text-slate-300">{card.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold">Escrow-style capability</h3>
            <ul className="mt-4 space-y-2 text-slate-300">
              <li>• Payment collection via Transfi</li>
              <li>• Cross-border payouts</li>
              <li>• Multi-currency and future crypto rails</li>
              <li>• Internal wallet locking and release logic</li>
              <li>• Admin dispute and condition management</li>
            </ul>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold">Use cases</h3>
            <div className="mt-4 grid gap-4">
              {useCases.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-slate-900/40 p-4 text-slate-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="security" className="mx-auto max-w-7xl px-6 py-8 md:py-16">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-8 md:p-10">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <div className="text-sm font-medium uppercase tracking-[0.2em] text-sky-300">
                Trust & security
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                Built for a compliance-first story.
              </h2>
              <p className="mt-4 leading-8 text-slate-300">
                Show readiness for KYC, AML, transaction monitoring, and secure
                infrastructure from day one.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Identity verification ready",
                "AML-aware platform planning",
                "Encrypted infrastructure model",
                "Scalable cloud foundation",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 text-slate-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 md:py-20">
        <div className="rounded-[2rem] border border-sky-400/20 bg-sky-500/10 p-8 text-center md:p-12">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Ready to launch Transfi.app the right way?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Build trust publicly while you finalize compliance, infrastructure,
            and your MVP rollout.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button className="rounded-2xl bg-white px-6 py-3 font-medium text-slate-950 hover:bg-slate-100">
              Join the waitlist
            </button>
            <button className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 font-medium text-white hover:bg-white/10">
              Contact Transfi
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
