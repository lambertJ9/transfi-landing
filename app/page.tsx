export default function TransfiLandingPage() {
  const features = [
    {
      title: "Global Transfers",
      desc: "Fast and secure international payments.",
    },
    {
      title: "Compliance First",
      desc: "Built with strong compliance and security.",
    },
    {
      title: "Built for Growth",
      desc: "Designed to scale into global financial infrastructure.",
    },
  ];

  const steps = ["Create account", "Verify identity", "Fund wallet", "Send money"];

  const investorCards = [
    {
      title: "Massive market",
      desc: "Cross-border payments and fintech infrastructure represent a very large global opportunity.",
    },
    {
      title: "Scalable model",
      desc: "Revenue can grow with transaction volume, FX spreads, and future infrastructure fees.",
    },
    {
      title: "Expansion ready",
      desc: "Designed to expand into escrow flows, marketplace transactions, and future crypto-enabled rails.",
    },
  ];

  const useCases = [
    "Rent-to-own property payments",
    "Freelancer milestone payments",
    "Car marketplace transactions",
  ];

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.10),transparent_30%),radial-gradient(circle_at_left,rgba(59,130,246,0.10),transparent_25%)]">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <header className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/80 px-5 py-4 shadow-sm backdrop-blur">
            <div>
              <div className="text-xl font-semibold tracking-tight">Transfi</div>
              <div className="text-sm text-slate-500">Borderless payments, designed for trust.</div>
            </div>
            <nav className="hidden gap-6 text-sm text-slate-600 md:flex">
              <a href="#features" className="hover:text-slate-950">Features</a>
              <a href="#how-it-works" className="hover:text-slate-950">How it works</a>
              <a href="#investors" className="hover:text-slate-950">Investors</a>
              <a href="#waitlist" className="hover:text-slate-950">Get started</a>
            </nav>
          </header>

          <div className="grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
            <div>
              <div className="mb-4 inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sm text-sky-700">
                Canada-ready fintech foundation
              </div>
              <h1 className="max-w-xl text-5xl font-semibold leading-tight tracking-tight md:text-6xl">
                Global payments for modern people and businesses.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Send, receive, and manage cross-border payments with a secure, scalable fintech platform.
              </p>

              <form className="mt-8 flex flex-wrap gap-4" id="waitlist" action="/api/waitlist" method="POST">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="min-w-[260px] flex-1 rounded-2xl border border-slate-300 bg-white px-5 py-3 text-slate-950 outline-none placeholder:text-slate-400"
                />
                <button className="rounded-2xl bg-slate-950 px-6 py-3 text-base font-medium text-white shadow-lg shadow-slate-950/10 transition hover:bg-slate-800" type="submit">
                  Join the waitlist
                </button>
                <button className="rounded-2xl border border-slate-300 bg-white px-6 py-3 text-base font-medium text-slate-950 transition hover:bg-slate-50" type="button">
                  Talk to us
                </button>
              </form>

              <div className="mt-10 grid max-w-lg grid-cols-3 gap-4 text-sm text-slate-600">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="text-2xl font-semibold text-slate-950">24/7</div>
                  <div>Platform vision</div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="text-2xl font-semibold text-slate-950">Fast</div>
                  <div>Cross-border payments</div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="text-2xl font-semibold text-slate-950">Secure</div>
                  <div>Compliance-led design</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 rounded-[2rem] bg-sky-200/40 blur-3xl" />
              <div className="relative rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200/60">
                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-950 p-5 text-white">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <div className="text-sm text-slate-400">Available balance</div>
                      <div className="text-3xl font-semibold">$12,480.00</div>
                    </div>
                    <div className="rounded-2xl bg-emerald-500/15 px-3 py-1 text-sm text-emerald-300">
                      Verified
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="text-sm text-slate-400">Send from</div>
                      <div className="mt-1 text-base font-medium">Canada • CAD</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="text-sm text-slate-400">Recipient gets</div>
                      <div className="mt-1 text-base font-medium">Nigeria • NGN</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">Estimated delivery</span>
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
        <div className="mb-10 max-w-2xl">
          <div className="text-sm font-medium uppercase tracking-[0.2em] text-sky-700">Why Transfi</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Simple for customers. Credible for partners.</h2>
          <p className="mt-4 text-slate-600">
            A cleaner product story for users, banks, and investors.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-8 md:py-16">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <div className="text-sm font-medium uppercase tracking-[0.2em] text-sky-700">How it works</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">A clean flow from signup to payout.</h2>
            <p className="mt-4 text-slate-600">
              Start lean: verified users, wallet funding, and reliable transfers.
            </p>
          </div>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={step} className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
                  {index + 1}
                </div>
                <div className="pt-1 text-base text-slate-700">{step}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="investors" className="mx-auto max-w-7xl px-6 py-8 md:py-16">
        <div className="mb-10 max-w-2xl">
          <div className="text-sm font-medium uppercase tracking-[0.2em] text-sky-700">Investor view</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Infrastructure for payments, escrow-style flows, and future scale.</h2>
          <p className="mt-4 text-slate-600">
            Transfi can start as a cross-border payments layer and grow into a broader infrastructure platform for marketplace transactions, milestone releases, and escrow-driven workflows.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {investorCards.map((card) => (
            <div key={card.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">{card.title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{card.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold">Escrow-style capability</h3>
            <ul className="mt-4 space-y-2 text-slate-600">
              <li>• Payment collection via Transfi</li>
              <li>• Cross-border payouts</li>
              <li>• Multi-currency and future crypto rails</li>
              <li>• Internal wallet locking and release logic</li>
              <li>• Admin dispute and condition management</li>
            </ul>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold">Use cases</h3>
            <div className="mt-4 grid gap-4">
              {useCases.map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="security" className="mx-auto max-w-7xl px-6 py-8 md:py-16">
        <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-8 text-white md:p-10">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <div className="text-sm font-medium uppercase tracking-[0.2em] text-sky-300">Trust & security</div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">Built for a compliance-first fintech story.</h2>
              <p className="mt-4 leading-8 text-slate-300">
                Highlight readiness for KYC, AML, transaction monitoring, secure infrastructure, and careful rollout.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Identity verification ready",
                "AML-aware platform planning",
                "Encrypted infrastructure model",
                "Scalable cloud foundation",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-slate-200">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 md:py-20">
        <div className="rounded-[2rem] border border-sky-200 bg-sky-50 p-8 text-center md:p-12">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Ready to launch Transfi.app the right way?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Use this page as the public face of your fintech while you finalize compliance, infrastructure, and your MVP rollout strategy.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button className="rounded-2xl bg-slate-950 px-6 py-3 font-medium text-white hover:bg-slate-800">
              Join the waitlist
            </button>
            <button className="rounded-2xl border border-slate-300 bg-white px-6 py-3 font-medium text-slate-950 hover:bg-slate-50">
              Contact Transfi
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
