const features = [
  {
    title: "Global Transfers",
    desc: "Send money across borders with a simple, fast, and secure experience designed for modern users.",
  },
  {
    title: "Compliance First",
    desc: "Built with KYC, AML, and security principles in mind to support trustworthy financial operations.",
  },
  {
    title: "Built for Growth",
    desc: "A strong foundation for fintech expansion across wallets, payouts, and future crypto capabilities.",
  },
];

const steps = [
  "Create your account",
  "Verify your identity",
  "Fund your wallet",
  "Send money ",
];

export default function HomePage() {
  return (
    <main>
      <section className="hero-bg">
        <div className="container">
          <header className="glass topbar">
            <div>
              <div style={{ fontSize: 22, fontWeight: 700 }}>Transfi</div>
              <div style={{ fontSize: 14, color: "#cbd5e1" }}>
                Borderless payments, designed for trust.
              </div>
            </div>
            <nav className="nav">
              <a href="#features">Features</a>
              <a href="#how-it-works">How it works</a>
              <a href="#security">Security</a>
              <a href="#waitlist">Get started</a>
            </nav>
          </header>

          <div
            className="section grid-2"
            style={{ alignItems: "center", minHeight: "70vh" }}
          >
            <div>
              <div className="small-badge">Canada-ready fintech foundation</div>
              <h1 className="heading-xl">
                Move money globally with speed, clarity, and confidence.
              </h1>
              <p className="muted" style={{ fontSize: 20, maxWidth: 720 }}>
                Transfi is building a modern cross-border payments experience for
                people and businesses that need secure transfers, a clean wallet
                experience, and a strong compliance-focused foundation.
              </p>

              <div
                id="waitlist"
                style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 28 }}
              >
                <button className="btn-primary">Join the waitlist</button>
                <button className="btn-secondary">Talk to us</button>
              </div>

              <div className="hero-cards">
                <div className="card stat-card">
                  <div style={{ fontSize: 28, fontWeight: 700 }}>24/7</div>
                  <div className="muted">Always-on platform vision</div>
                </div>
                <div className="card stat-card">
                  <div style={{ fontSize: 28, fontWeight: 700 }}>Fast</div>
                  <div className="muted">Cross-border payments</div>
                </div>
                <div className="card stat-card">
                  <div style={{ fontSize: 28, fontWeight: 700 }}>Secure</div>
                  <div className="muted">Compliance-led design</div>
                </div>
              </div>
            </div>

            <div>
              <div
                className="card"
                style={{
                  padding: 24,
                  borderRadius: 32,
                  background: "rgba(15,23,42,0.85)",
                }}
              >
                <div
                  className="card"
                  style={{
                    padding: 24,
                    background: "linear-gradient(135deg, #0f172a, #1e293b)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 18,
                    }}
                  >
                    <div>
                      <div style={{ color: "#94a3b8", fontSize: 14 }}>
                        Available balance
                      </div>
                      <div style={{ fontSize: 36, fontWeight: 700 }}> <p className="muted" style={{ fontSize: 20, maxWidth: 720 }}>
  Send, receive, and manage global payments with a secure, scalable fintech platform.
</p>
                        $12,480.00
                      </div>
                    </div>
                    <div
                      style={{
                        borderRadius: 18,
                        padding: "8px 12px",
                        background: "rgba(16,185,129,0.15)",
                        color: "#86efac",
                        fontSize: 14,
                      }}
                    >
                      Verified
                    </div>
                  </div>

                  <div style={{ display: "grid", gap: 12 }}>
                    <div className="card" style={{ padding: 16 }}>
                      <div style={{ color: "#94a3b8", fontSize: 14 }}>
                        Send from
                      </div>
                      <div style={{ marginTop: 4, fontWeight: 600 }}>
                        Canada • CAD
                      </div>
                    </div>
                    <div className="card" style={{ padding: 16 }}>
                      <div style={{ color: "#94a3b8", fontSize: 14 }}>
                        Recipient gets
                      </div>
                      <div style={{ marginTop: 4, fontWeight: 600 }}>
                        Nigeria • NGN
                      </div>
                    </div>
                    <div
                      className="card"
                      style={{
                        padding: 16,
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span style={{ color: "#94a3b8", fontSize: 14 }}>
                        Estimated delivery
                      </span>
                      <span style={{ fontWeight: 600 }}>Same day</span>
                    </div>
                  </div>

                  <button
                    className="btn-primary"
                    style={{
                      width: "100%",
                      marginTop: 18,
                      background: "white",
                      color: "#020617",
                    }}
                  >
                    Start transfer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="section">
        <div className="container">
          <div style={{ maxWidth: 720, marginBottom: 32 }}>
            <div
              style={{
                fontSize: 13,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#7dd3fc",
                fontWeight: 700,
              }}
            >
              Why Transfi
            </div>
            <h2 className="heading-lg">
              A landing page built around trust and clarity.
            </h2>
            <p className="muted">
              The product story should feel simple to customers and credible to
              banks, partners, and regulators.
            </p>
          </div>

          <div className="grid-3">
            {features.map((feature) => (
              <div key={feature.title} className="card feature-card">
                <h3 style={{ fontSize: 20, margin: 0 }}>{feature.title}</h3>
                <p className="muted" style={{ marginTop: 12 }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section">
        <div className="container grid-2">
          <div>
            <div
              style={{
                fontSize: 13,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#7dd3fc",
                fontWeight: 700,
              }}
            >
              How it works
            </div>
            <h2 className="heading-lg">
              A simple user journey from onboarding to transfer.
            </h2>
            <p className="muted">
              Start with a focused MVP: verified users, wallet funding, and
              clean transfer flows. Keep the first release lean, reliable, and
              compliant.
            </p>
          </div>
          <div>
            {steps.map((step, index) => (
              <div key={step} className="step">
                <div className="step-number">{index + 1}</div>
                <div style={{ paddingTop: 8 }}>{step}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="security" className="section">
        <div className="container">
          <div
            className="card"
            style={{
              padding: 40,
              background: "linear-gradient(135deg, #0f172a, #1e293b)",
            }}
          >
            <div className="grid-2">
              <div>
                <div
                  style={{
                    fontSize: 13,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#7dd3fc",
                    fontWeight: 700,
                  }}
                >
                  Trust & security
                </div>
                <h2 className="heading-lg">
                  Built for a compliance-first fintech story.
                </h2>
                <p className="muted">
                  Highlight your readiness for KYC, AML, transaction monitoring,
                  secure infrastructure, and careful rollout. That builds
                  confidence with customers and with institutional partners.
                </p>
              </div>
              <div className="grid-4">
                {[
                  "Identity verification ready",
                  "AML-aware platform planning",
                  "Encrypted infrastructure model",
                  "Scalable cloud foundation",
                ].map((item) => (
                  <div key={item} className="card" style={{ padding: 20 }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta"> 
            {/* INVESTOR SECTION (ADD HERE) */}
<section className="section">
  <div className="container">
    <h2 className="heading-lg">Built for investors and partners</h2>

    <div className="grid-3" style={{ marginTop: 24 }}>
      <div className="card" style={{ padding: 24 }}>
        <h3>Massive market</h3>
        <p className="muted">
          Cross-border payments and fintech infrastructure represent a multi-trillion dollar opportunity.
        </p>
      </div>

      <div className="card" style={{ padding: 24 }}>
        <h3>Scalable model</h3>
        <p className="muted">
          Revenue grows with transaction volume, FX spreads, and future API monetization.
        </p>
      </div>

      <div className="card" style={{ padding: 24 }}>
        <h3>Expansion ready</h3>
        <p className="muted">
          Designed to scale into escrow systems, crypto rails, and global payout infrastructure.
        </p>
      </div>
    </div>
  </div>
</section>

{/* EXISTING CTA BELOW */}
<section className="section">
            <h2 className="heading-lg" style={{ marginTop: 0 }}> 
              <section className="section">
  <div className="container">
    <div style={{ maxWidth: 900, marginBottom: 32 }}>
      <div
        style={{
          fontSize: 13,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#7dd3fc",
          fontWeight: 700,
        }}
      >
        Platform capabilities
      </div>

      <h2 className="heading-lg">
        Build escrow-style transactions on top of Transfi
      </h2>

      <p className="muted">
        Transfi enables you to design advanced financial flows such as escrow,
        milestone payments, and conditional releases — without building payment
        infrastructure from scratch.
      </p>
    </div>

    <div className="grid-2">
      <div className="card" style={{ padding: 24 }}>
        <h3>Advanced escrow architecture</h3>
        <ul className="muted" style={{ marginTop: 12 }}>
          <li>Payment collection via Transfi</li>
          <li>Payouts across borders</li>
          <li>Multi-currency and crypto rails</li>
        </ul>

        <div style={{ marginTop: 16 }}>
          <strong>Then build internally:</strong>
          <ul className="muted">
            <li>Escrow wallet logic</li>
            <li>Conditional release engine</li>
            <li>Admin dispute management</li>
          </ul>
        </div>
      </div>

      <div className="card" style={{ padding: 24 }}>
        <h3>How it works</h3>
        <ol className="muted" style={{ marginTop: 12 }}>
          <li>Buyer pays into your platform wallet</li>
          <li>Funds are locked internally (escrow logic)</li>
          <li>Conditions met → release payment</li>
        </ol>
      </div>
    </div>

    <div className="card" style={{ padding: 32, marginTop: 32 }}>
      <h3 style={{ marginTop: 0 }}>Best approach for your growth</h3>

      <div className="grid-2" style={{ marginTop: 16 }}>
        <div>
          <strong>Start with:</strong>
          <ul className="muted">
            <li>Transfi payments + payouts</li>
            <li>Simple wallet-based flow</li>
          </ul>
        </div>

        <div>
          <strong>Scale into:</strong>
          <ul className="muted">
            <li>Custom escrow logic</li>
            <li>Hybrid financial architecture</li>
          </ul>
        </div>
      </div>
    </div>

    <div style={{ marginTop: 40 }}>
      <h3>Real-world use cases</h3>

      <div className="grid-3" style={{ marginTop: 20 }}>
        {[
          "Rent-to-own property payments",
          "Freelancer milestone payments",
          "Car marketplace transactions",
        ].map((item) => (
          <div key={item} className="card" style={{ padding: 20 }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
              Ready to launch Transfi.app the right way?
            </h2>
            <p className="muted" style={{ maxWidth: 760, margin: "0 auto" }}>
              Use this page as the public face of your fintech while you
              finalize compliance, infrastructure, and your MVP rollout
              strategy.
            </p>
            <div
              style={{
                display: "flex",
                gap: 16,
                justifyContent: "center",
                flexWrap: "wrap",
                marginTop: 28,
              }}
            >
              <button
                className="btn-primary"
                style={{ background: "white", color: "#020617" }}
              >
                Join the waitlist
              </button>
              <button className="btn-secondary">Contact Transfi</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
