"use client";

import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState({
    firstName: "", lastName: "", email: "", role: "", country: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
      }),
      { threshold: 0.1 }
    );
    revealRefs.current.forEach(r => r && obs.observe(r));
    return () => obs.disconnect();
  }, []);

  const addReveal = (el: HTMLElement | null, i: number) => {
    revealRefs.current[i] = el;
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const { firstName, lastName, email, role, country } = formState;
    if (!firstName || !lastName || !email || !role || !country) {
      setError("Please fill in all fields before joining the waitlist.");
      return;
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ first_name: firstName, last_name: lastName, email, role, country }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.message || data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const t = dark ? themes.dark : themes.light;

  const features = [
    { icon: "🌐", title: "Global transfers", desc: "Fast, reliable international payments for people and businesses around the world." },
    { icon: "🔒", title: "Compliance first", desc: "Designed with KYC, AML, and operational trust at the core of every flow." },
    { icon: "📈", title: "Built to scale", desc: "A strong foundation for wallets, payouts, and escrow-style workflows that grow with you." },
  ];

  const steps = [
    { num: "01", title: "Create account", sub: "Sign up securely" },
    { num: "02", title: "Verify identity", sub: "KYC-ready flow" },
    { num: "03", title: "Fund wallet", sub: "Multi-currency" },
    { num: "04", title: "Send or release payment", sub: "Same-day delivery" },
  ];

  const investorCards = [
    { title: "Large market", desc: "Cross-border payments and marketplace infrastructure remain a major global opportunity." },
    { title: "Flexible revenue", desc: "Monetize through transaction fees, FX spreads, and future platform services." },
    { title: "Expansion path", desc: "Grow from payments into milestone releases, escrow flows, and partner APIs." },
  ];

  const escrowItems = [
    "Payment collection via Transfi",
    "Cross-border payouts",
    "Multi-currency and future crypto rails",
    "Internal wallet locking and release logic",
    "Admin dispute and condition management",
  ];

  const trustItems = [
    "Identity verification ready",
    "AML-aware platform planning",
    "Encrypted infrastructure model",
    "Scalable cloud foundation",
  ];

  return (
    <div style={{ background: t.bg, color: t.text, fontFamily: "'Sora', sans-serif", minHeight: "100vh", transition: "background .3s, color .3s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100% { transform:scale(1); opacity:1; } 50% { transform:scale(1.2); opacity:.7; } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        .anim-1 { opacity:0; animation: fadeUp .5s .1s ease forwards; }
        .anim-2 { opacity:0; animation: fadeUp .5s .2s ease forwards; }
        .anim-3 { opacity:0; animation: fadeUp .5s .3s ease forwards; }
        .anim-4 { opacity:0; animation: fadeUp .5s .4s ease forwards; }
        .anim-5 { opacity:0; animation: fadeUp .5s .5s ease forwards; }
        .anim-6 { opacity:0; animation: fadeUp .6s .6s ease forwards; }
        .reveal { opacity:0; transform:translateY(20px); transition: opacity .6s ease, transform .6s ease; }
        .reveal.visible { opacity:1; transform:translateY(0); }
        .live-dot { width:7px; height:7px; border-radius:50%; background:#1D9E75; animation: pulse 2s infinite; display:inline-block; }
        .vdot { width:7px; height:7px; border-radius:50%; background:#1D9E75; animation: pulse 1.8s infinite; display:inline-block; }
        .feat-card:hover { border-color: #1D9E75 !important; transform: translateY(-4px); box-shadow: 0 8px 40px rgba(0,0,0,.15); }
        .inv-card:hover { border-color: #1D9E75 !important; transform: translateY(-3px); }
        .trust-item:hover { border-color: #1D9E75 !important; }
        .feat-card, .inv-card, .trust-item { transition: border-color .25s, transform .25s, box-shadow .25s; }
        .btn-teal { background:#1D9E75; color:white; border:none; padding:13px 28px; border-radius:10px; font-size:16px; cursor:pointer; font-weight:500; font-family:'Sora',sans-serif; transition:background .2s, transform .15s; }
        .btn-teal:hover { background:#0F6E56; transform:translateY(-2px); }
        .btn-outline { background:transparent; border:1px solid; padding:13px 28px; border-radius:10px; font-size:16px; cursor:pointer; font-family:'Sora',sans-serif; transition:background .2s; font-weight:400; }
        .nav-link { font-size:14px; text-decoration:none; transition:color .2s; font-weight:400; cursor:pointer; }
        .nav-link:hover { color:#1D9E75 !important; }
        .transfer-btn { width:100%; background:#1D9E75; color:white; border:none; padding:13px; border-radius:12px; font-size:15px; font-weight:500; cursor:pointer; font-family:'Sora',sans-serif; transition:background .2s; }
        .transfer-btn:hover { background:#0F6E56; }
        .form-input { border-radius:10px; font-size:14px; font-family:'Sora',sans-serif; outline:none; transition:border-color .2s, box-shadow .2s; -webkit-appearance:none; }
        .form-input:focus { border-color:#1D9E75 !important; box-shadow:0 0 0 3px rgba(29,158,117,0.12); }
        .submit-btn { width:100%; background:#1D9E75; color:white; border:none; padding:14px; border-radius:10px; font-size:16px; font-weight:500; cursor:pointer; font-family:'Sora',sans-serif; margin-top:.5rem; transition:background .2s, transform .15s; }
        .submit-btn:hover:not(:disabled) { background:#0F6E56; transform:translateY(-1px); }
        .submit-btn:disabled { opacity:.6; cursor:not-allowed; }
        .theme-btn { border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:16px; transition:background .2s; }
        .hamburger { display:none; flex-direction:column; gap:5px; cursor:pointer; padding:4px; background:none; border:none; }
        .hamburger span { display:block; width:22px; height:2px; border-radius:2px; transition:all .3s; }
        @media(max-width:768px) {
          .nav-links { display:none !important; }
          .nav-ghost { display:none !important; }
          .hamburger { display:flex !important; }
          .hero-grid { grid-template-columns:1fr !important; }
          .steps-grid { grid-template-columns:1fr 1fr !important; }
          .form-row { grid-template-columns:1fr !important; }
          .footer-inner { flex-direction:column; text-align:center; }
        }
        @media(max-width:480px) {
          .hero-h1 { font-size:32px !important; }
          .bal-amount { font-size:28px !important; }
          .steps-grid { grid-template-columns:1fr !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"1rem 2.5rem", borderBottom:`1px solid ${t.border}`, background:t.bg, position:"sticky", top:0, zIndex:200, backdropFilter:"blur(12px)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer" }} onClick={() => scrollTo("top")}>
          <div style={{ width:32, height:32, borderRadius:10, background:"#1D9E75", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="17" height="17" viewBox="0 0 16 16" fill="white"><path d="M2 8h5V3l7 5-7 5v-5H2z"/></svg>
          </div>
          <span style={{ fontSize:18, fontWeight:600, letterSpacing:"-.02em" }}>Transfi</span>
        </div>
        <div className="nav-links" style={{ display:"flex", gap:32 }}>
          {["features","how","investors","waitlist"].map(id => (
            <span key={id} className="nav-link" style={{ color:t.text2 }} onClick={() => scrollTo(id)}>
              {id === "how" ? "How it works" : id === "waitlist" ? "Get started" : id.charAt(0).toUpperCase() + id.slice(1)}
            </span>
          ))}
        </div>
        <div style={{ display:"flex", gap:10, alignItems:"center" }}>
          <button className="theme-btn" style={{ width:36, height:36, border:`1px solid ${t.border2}`, background:t.bg2, color:t.text }} onClick={() => setDark(!dark)}>
            {dark ? "☀️" : "🌙"}
          </button>
          <button className="btn-outline nav-ghost" style={{ borderColor:t.border2, color:t.text }} onClick={() => scrollTo("waitlist")}>Talk to us</button>
          <button className="btn-teal" style={{ padding:"9px 20px", fontSize:14, borderRadius:8 }} onClick={() => scrollTo("waitlist")}>Get started</button>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span style={{ background:t.text }}/>
            <span style={{ background:t.text }}/>
            <span style={{ background:t.text }}/>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div style={{ position:"fixed", top:65, left:0, right:0, background:t.bg, borderBottom:`1px solid ${t.border}`, padding:"1.5rem 2rem", zIndex:190, display:"flex", flexDirection:"column", gap:"1.25rem" }}>
          {["features","how","investors","waitlist"].map(id => (
            <span key={id} style={{ fontSize:16, color:t.text2, cursor:"pointer", fontWeight:500 }} onClick={() => scrollTo(id)}>
              {id === "how" ? "How it works" : id === "waitlist" ? "Get started" : id.charAt(0).toUpperCase() + id.slice(1)}
            </span>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="top" style={{ padding:"6rem 2.5rem 3rem", maxWidth:960, margin:"0 auto", textAlign:"center" }}>
        <div className="anim-1" style={{ display:"inline-flex", alignItems:"center", gap:8, fontSize:12, fontWeight:500, color: dark ? "#9FE1CB" : "#085041", background: dark ? "#0a2e22" : "#E1F5EE", borderRadius:999, padding:"6px 16px", marginBottom:"1.75rem", letterSpacing:".06em", textTransform:"uppercase" }}>
          <span className="live-dot"/>Cross-border infrastructure for modern finance
        </div>
        <h1 className="anim-2 hero-h1" style={{ fontSize:"clamp(36px,6vw,58px)", fontWeight:600, lineHeight:1.1, marginBottom:"1.25rem", letterSpacing:"-.03em" }}>
          Global payments with <span style={{ color:"#1D9E75" }}>speed, control,</span> and trust.
        </h1>
        <p className="anim-3" style={{ fontSize:17, color:t.text2, lineHeight:1.8, maxWidth:520, margin:"0 auto 2.25rem", fontWeight:300 }}>
          Transfi helps people and businesses move money across borders with a cleaner, more secure, and compliance-focused experience.
        </p>
        <div className="anim-4" style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", marginBottom:"2.5rem" }}>
          <button className="btn-teal" onClick={() => scrollTo("waitlist")}>Join the waitlist</button>
          <button className="btn-outline" style={{ borderColor:t.border2, color:t.text, background:"transparent" }} onClick={() => scrollTo("waitlist")}>Talk to us</button>
        </div>
        <div className="anim-5" style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap", marginBottom:"3.5rem" }}>
          {["⚡ Fast cross-border payouts","🔒 Compliance-led design","🔄 Escrow-style workflows"].map(p => (
            <span key={p} style={{ fontSize:12, padding:"6px 14px", borderRadius:999, border:`1px solid ${t.border}`, background:t.bg2, color:t.text2 }}>{p}</span>
          ))}
        </div>

        {/* TRANSFER CARD */}
        <div className="anim-6" style={{ maxWidth:320, margin:"0 auto" }}>
          <div style={{ background:t.card, border:`1px solid ${t.border}`, borderRadius:20, padding:"1.75rem", boxShadow:t.shadowLg }}>
            <div style={{ fontSize:11, fontWeight:500, color:t.text3, textTransform:"uppercase", letterSpacing:".08em" }}>Available balance</div>
            <div className="bal-amount" style={{ fontSize:34, fontWeight:600, margin:"4px 0 12px", letterSpacing:"-.03em", fontFamily:"'DM Mono',monospace" }}>$12,480.00</div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:7, fontSize:12, background: dark ? "#0a2e22" : "#E1F5EE", color: dark ? "#9FE1CB" : "#085041", borderRadius:999, padding:"5px 14px", marginBottom:"1.25rem", fontWeight:500 }}>
              <span className="vdot"/>Verified
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:12 }}>
              {[["Send from","Canada · CAD"],["Recipient gets","Nigeria · NGN"]].map(([label,val]) => (
                <div key={label} style={{ background:t.bg2, borderRadius:12, padding:"12px 14px" }}>
                  <div style={{ fontSize:11, color:t.text3, fontWeight:500, letterSpacing:".04em" }}>{label}</div>
                  <div style={{ fontSize:14, fontWeight:500, marginTop:4, color:t.text }}>{val}</div>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", fontSize:13, color:t.text3, marginBottom:14, padding:"11px 14px", background:t.bg2, borderRadius:12 }}>
              Estimated delivery <strong style={{ color:"#1D9E75", fontWeight:600, fontFamily:"'DM Mono',monospace" }}>Same day</strong>
            </div>
            <button className="transfer-btn" onClick={() => scrollTo("waitlist")}>Start transfer</button>
          </div>
        </div>
      </section>

      <hr style={{ border:"none", borderTop:`1px solid ${t.border}`, maxWidth:960, margin:"0 auto" }}/>

      {/* FEATURES */}
      <section id="features" style={{ padding:"5rem 2.5rem" }}>
        <div style={{ maxWidth:960, margin:"0 auto" }}>
          <div className="reveal" ref={el => addReveal(el as HTMLElement, 0)} style={{ textAlign:"center", maxWidth:640, margin:"0 auto 3.5rem" }}>
            <div style={{ fontSize:11, fontWeight:600, color:"#1D9E75", letterSpacing:".1em", textTransform:"uppercase", marginBottom:".75rem" }}>Why Transfi</div>
            <h2 style={{ fontSize:"clamp(24px,4vw,36px)", fontWeight:600, lineHeight:1.2, marginBottom:".75rem", letterSpacing:"-.02em" }}>Simple for customers. Credible for partners.</h2>
            <p style={{ fontSize:16, color:t.text2, lineHeight:1.8, fontWeight:300 }}>Built to communicate trust clearly to users, banks, investors, and marketplace operators.</p>
          </div>
          <div className="reveal" ref={el => addReveal(el as HTMLElement, 1)} style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, maxWidth:720, margin:"0 auto 3.5rem" }}>
            {[["Same day","Cross-border payouts"],["KYC + AML","Compliance core"],["Multi-fx","& future crypto rails"]].map(([num,label]) => (
              <div key={label} style={{ background:t.bg2, borderRadius:14, padding:"1.25rem", textAlign:"center", border:`1px solid ${t.border}` }}>
                <div style={{ fontSize:18, fontWeight:600, color:"#1D9E75", marginBottom:4, fontFamily:"'DM Mono',monospace" }}>{num}</div>
                <div style={{ fontSize:12, color:t.text3 }}>{label}</div>
              </div>
            ))}
          </div>
          <div className="reveal" ref={el => addReveal(el as HTMLElement, 2)} style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:16 }}>
            {features.map(f => (
              <div key={f.title} className="feat-card" style={{ background:t.card, border:`1px solid ${t.border}`, borderRadius:16, padding:"1.75rem" }}>
                <div style={{ width:44, height:44, borderRadius:12, background: dark ? "#0a2e22" : "#E1F5EE", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"1.25rem", fontSize:20 }}>{f.icon}</div>
                <h3 style={{ fontSize:16, fontWeight:600, marginBottom:8, letterSpacing:"-.01em" }}>{f.title}</h3>
                <p style={{ fontSize:14, color:t.text2, lineHeight:1.7, fontWeight:300 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr style={{ border:"none", borderTop:`1px solid ${t.border}`, maxWidth:960, margin:"0 auto" }}/>

      {/* HOW IT WORKS */}
      <section id="how" style={{ padding:"5rem 2.5rem", background:t.bg2 }}>
        <div style={{ maxWidth:960, margin:"0 auto" }}>
          <div className="reveal" ref={el => addReveal(el as HTMLElement, 3)} style={{ textAlign:"center", maxWidth:640, margin:"0 auto 3.5rem" }}>
            <div style={{ fontSize:11, fontWeight:600, color:"#1D9E75", letterSpacing:".1em", textTransform:"uppercase", marginBottom:".75rem" }}>How it works</div>
            <h2 style={{ fontSize:"clamp(24px,4vw,36px)", fontWeight:600, lineHeight:1.2, marginBottom:".75rem", letterSpacing:"-.02em" }}>A clear flow from onboarding to payout.</h2>
            <p style={{ fontSize:16, color:t.text2, lineHeight:1.8, fontWeight:300 }}>Start with verified users, wallet funding, and dependable transfers. Add more advanced flows as you scale.</p>
          </div>
          <div className="reveal steps-grid" ref={el => addReveal(el as HTMLElement, 4)} style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:0, maxWidth:760, margin:"0 auto" }}>
            {steps.map((s, i) => (
              <div key={s.num} style={{ textAlign:"center", padding:"2rem 1rem", borderRight: i < steps.length-1 ? `1px solid ${t.border}` : "none" }}>
                <div style={{ fontSize:12, fontWeight:600, color:"#1D9E75", background: dark ? "#0a2e22" : "#E1F5EE", width:32, height:32, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px", fontFamily:"'DM Mono',monospace" }}>{s.num}</div>
                <div style={{ fontSize:15, fontWeight:500, marginBottom:4 }}>{s.title}</div>
                <div style={{ fontSize:12, color:t.text3 }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr style={{ border:"none", borderTop:`1px solid ${t.border}`, maxWidth:960, margin:"0 auto" }}/>

      {/* INVESTORS */}
      <section id="investors" style={{ padding:"3rem 2.5rem" }}>
        <div style={{ maxWidth:960, margin:"0 auto" }}>
          <div className="reveal" ref={el => addReveal(el as HTMLElement, 5)} style={{ textAlign:"center", maxWidth:640, margin:"0 auto 3.5rem" }}>
            <div style={{ fontSize:11, fontWeight:600, color:"#1D9E75", letterSpacing:".1em", textTransform:"uppercase", marginBottom:".75rem" }}>Investor view</div>
            <h2 style={{ fontSize:"clamp(24px,4vw,36px)", fontWeight:600, lineHeight:1.2, marginBottom:".75rem", letterSpacing:"-.02em" }}>A payments layer with room to grow into escrow-style infrastructure.</h2>
            <p style={{ fontSize:16, color:t.text2, lineHeight:1.8, fontWeight:300 }}>Start with transfers and payouts. Expand into milestone releases, rent-to-own flows, and marketplace transaction logic.</p>
          </div>
          <div className="reveal" ref={el => addReveal(el as HTMLElement, 6)} style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))", gap:16 }}>
            {investorCards.map(c => (
              <div key={c.title} className="inv-card" style={{ border:`1px solid ${t.border}`, borderRadius:16, padding:"1.5rem", background:t.card }}>
                <h3 style={{ fontSize:15, fontWeight:600, marginBottom:8, letterSpacing:"-.01em" }}>{c.title}</h3>
                <p style={{ fontSize:13, color:t.text2, lineHeight:1.7, fontWeight:300 }}>{c.desc}</p>
              </div>
            ))}
            <div className="inv-card" style={{ border:`1px solid ${t.border}`, borderRadius:16, padding:"1.5rem", background:t.card }}>
              <h3 style={{ fontSize:15, fontWeight:600, marginBottom:8 }}>Escrow-style capability</h3>
              <ul style={{ listStyle:"none", marginTop:"1rem" }}>
                {escrowItems.map(item => (
                  <li key={item} style={{ fontSize:13, color:t.text2, padding:"6px 0", display:"flex", gap:10, borderBottom:`1px solid ${t.border}`, fontWeight:300 }}>
                    <span style={{ color:"#1D9E75", fontSize:12, flexShrink:0 }}>→</span>{item}
                  </li>
                ))}
              </ul>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginTop:"1rem" }}>
                {["Rent-to-own payments","Freelancer milestones","Marketplace transactions"].map(tag => (
                  <span key={tag} style={{ fontSize:12, padding:"5px 12px", borderRadius:999, background: dark ? "#0a2e22" : "#E1F5EE", color: dark ? "#9FE1CB" : "#085041", fontWeight:500 }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr style={{ border:"none", borderTop:`1px solid ${t.border}`, maxWidth:960, margin:"0 auto" }}/>

      {/* TRUST */}
      <section style={{ padding:"3rem 2.5rem", background:t.bg2 }}>
        <div style={{ maxWidth:960, margin:"0 auto" }}>
          <div className="reveal" ref={el => addReveal(el as HTMLElement, 7)} style={{ textAlign:"center", maxWidth:640, margin:"0 auto 3.5rem" }}>
            <div style={{ fontSize:11, fontWeight:600, color:"#1D9E75", letterSpacing:".1em", textTransform:"uppercase", marginBottom:".75rem" }}>Trust & security</div>
            <h2 style={{ fontSize:"clamp(24px,4vw,36px)", fontWeight:600, lineHeight:1.2, marginBottom:".75rem", letterSpacing:"-.02em" }}>Built for a compliance-first story.</h2>
            <p style={{ fontSize:16, color:t.text2, lineHeight:1.8, fontWeight:300 }}>Show readiness for KYC, AML, transaction monitoring, and secure infrastructure from day one.</p>
          </div>
          <div className="reveal" ref={el => addReveal(el as HTMLElement, 8)} style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))", gap:12 }}>
            {trustItems.map(item => (
              <div key={item} className="trust-item" style={{ display:"flex", alignItems:"center", gap:14, padding:"16px 1.25rem", background:t.bg, borderRadius:14, border:`1px solid ${t.border}` }}>
                <div style={{ width:28, height:28, borderRadius:"50%", background: dark ? "#0a2e22" : "#E1F5EE", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, color:"#1D9E75", flexShrink:0, fontWeight:700 }}>✓</div>
                <span style={{ fontSize:14, fontWeight:500 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr style={{ border:"none", borderTop:`1px solid ${t.border}`, maxWidth:960, margin:"0 auto" }}/>

      {/* WAITLIST */}
      <section id="waitlist" style={{ padding:"6rem 2.5rem", background:t.bg2, borderTop:`1px solid ${t.border}` }}>
        <div style={{ maxWidth:500, margin:"0 auto", textAlign:"center" }}>
          <div className="reveal" ref={el => addReveal(el as HTMLElement, 9)}>
            <div style={{ fontSize:11, fontWeight:600, color:"#1D9E75", letterSpacing:".1em", textTransform:"uppercase", marginBottom:".75rem" }}>Ready to launch</div>
            <h2 style={{ fontSize:"clamp(24px,4vw,36px)", fontWeight:600, marginBottom:".75rem", letterSpacing:"-.02em" }}>Ready to launch Transfi.app the right way?</h2>
            <p style={{ fontSize:16, color:t.text2, marginBottom:"2.5rem", lineHeight:1.8, fontWeight:300 }}>Build trust publicly while you finalize compliance, infrastructure, and your MVP rollout. Join the waitlist today.</p>
          </div>

          {!submitted ? (
            <form className="reveal" ref={el => addReveal(el as HTMLElement, 10)} onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:12 }}>
              <div className="form-row" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                {[["firstName","First name","Ada"],["lastName","Last name","Obi"]].map(([field,label,ph]) => (
                  <div key={field} style={{ display:"flex", flexDirection:"column", gap:6, textAlign:"left" }}>
                    <label style={{ fontSize:12, fontWeight:500, color:t.text2, letterSpacing:".04em" }}>{label}</label>
                    <input className="form-input" value={formState[field as keyof typeof formState]} onChange={e => setFormState({...formState,[field]:e.target.value})} placeholder={ph} style={{ background:t.bg, border:`1px solid ${t.border2}`, color:t.text, padding:"12px 16px" }}/>
                  </div>
                ))}
              </div>
              {[
                { field:"email", label:"Email address", ph:"ada@example.com", type:"email" },
                { field:"country", label:"Country", ph:"Canada", type:"text" },
              ].map(({ field, label, ph, type }) => (
                <div key={field} style={{ display:"flex", flexDirection:"column", gap:6, textAlign:"left" }}>
                  <label style={{ fontSize:12, fontWeight:500, color:t.text2, letterSpacing:".04em" }}>{label}</label>
                  <input className="form-input" type={type} value={formState[field as keyof typeof formState]} onChange={e => setFormState({...formState,[field]:e.target.value})} placeholder={ph} style={{ background:t.bg, border:`1px solid ${t.border2}`, color:t.text, padding:"12px 16px" }}/>
                </div>
              ))}
              <div style={{ display:"flex", flexDirection:"column", gap:6, textAlign:"left" }}>
                <label style={{ fontSize:12, fontWeight:500, color:t.text2, letterSpacing:".04em" }}>I'm joining as</label>
                <select className="form-input" value={formState.role} onChange={e => setFormState({...formState,role:e.target.value})} style={{ background:t.bg, border:`1px solid ${t.border2}`, color:formState.role ? t.text : t.text3, padding:"12px 16px" }}>
                  <option value="">Select one...</option>
                  <option>Individual — sending money abroad</option>
                  <option>Business — cross-border payouts</option>
                  <option>Marketplace operator</option>
                  <option>Investor</option>
                  <option>Partner / API integration</option>
                </select>
              </div>
              <button className="submit-btn" type="submit" disabled={submitting}>
                {submitting ? "Joining..." : "Join the waitlist"}
              </button>
              {error && (
                <div style={{ fontSize:13, color:"#c0392b", background:"#fdecea", border:"1px solid #f5c6cb", borderRadius:8, padding:"10px 14px", textAlign:"left" }}>{error}</div>
              )}
              <p style={{ fontSize:12, color:t.text3, marginTop:".5rem" }}>No spam. No credit card. We'll reach out when Transfi is ready for you.</p>
            </form>
          ) : (
            <div style={{ textAlign:"center", padding:"2.5rem 2rem", background: dark ? "#0a2e22" : "#E1F5EE", borderRadius:16, border:"1px solid rgba(29,158,117,0.2)", animation:"fadeIn .5s ease" }}>
              <div style={{ fontSize:40, marginBottom:"1rem" }}>✅</div>
              <h3 style={{ fontSize:22, fontWeight:600, color: dark ? "#2DC98F" : "#0F6E56", marginBottom:".5rem" }}>You're on the list!</h3>
              <p style={{ fontSize:14, color:t.text2, lineHeight:1.7 }}>Thanks for joining. We'll be in touch as Transfi gets ready to launch. Keep an eye on your inbox.</p>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding:"2.5rem 2.5rem", borderTop:`1px solid ${t.border}` }}>
        <div className="footer-inner" style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"1rem", maxWidth:960, margin:"0 auto" }}>
          <div style={{ fontSize:16, fontWeight:600, color:t.text2 }}>Transfi</div>
          <div style={{ fontSize:13, color:t.text3 }}>Borderless payments, designed for trust.</div>
          <a href="mailto:hello@transfi.app" style={{ fontSize:13, color:"#1D9E75", textDecoration:"none" }}>Contact Transfi</a>
        </div>
      </footer>
    </div>
  );
}

const themes = {
  light: {
    bg:"#ffffff", bg2:"#f7f8f6", bg3:"#eef0ec",
    text:"#111410", text2:"#4a4f47", text3:"#8a8f87",
    border:"rgba(0,0,0,0.08)", border2:"rgba(0,0,0,0.14)",
    card:"#ffffff",
    shadow:"0 2px 16px rgba(0,0,0,0.06)",
    shadowLg:"0 8px 40px rgba(0,0,0,0.10)",
  },
  dark: {
    bg:"#0d0f0c", bg2:"#141614", bg3:"#1c1f1b",
    text:"#f0f2ee", text2:"#a8afa4", text3:"#5a6057",
    border:"rgba(255,255,255,0.08)", border2:"rgba(255,255,255,0.14)",
    card:"#181a17",
    shadow:"0 2px 16px rgba(0,0,0,0.3)",
    shadowLg:"0 8px 40px rgba(0,0,0,0.4)",
  },
};

