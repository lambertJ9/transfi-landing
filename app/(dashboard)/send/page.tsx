"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { COUNTRIES, getRate } from "@/lib/types";

const TEAL = "#1D9E75";

export default function SendPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<any>(null);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    recipient_name: "",
    recipient_country: "Nigeria",
    recipient_currency: "NGN",
    amount_sent: "",
    notes: "",
  });

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      setProfile(data);
    };
    load();
  }, []);

  const rate = getRate("CAD", form.recipient_currency);
  const amount = parseFloat(form.amount_sent) || 0;
  const fee = parseFloat((amount * 0.015).toFixed(2));
  const amountReceived = parseFloat(((amount - fee) * rate).toFixed(2));

  const handleCountryChange = (name: string) => {
    const c = COUNTRIES.find(c => c.name === name);
    setForm(f => ({ ...f, recipient_country: name, recipient_currency: c?.currency || "NGN" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.recipient_name || !form.amount_sent) { setError("Please fill in all required fields."); return; }
    if (amount < 10) { setError("Minimum transfer is $10 CAD."); return; }
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch("/api/transfers", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${session?.access_token}` },
        body: JSON.stringify({ ...form, amount_sent: amount }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Transfer failed");
      setSuccess(data.transaction);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "12px 16px", borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.1)", background: "#1a1e1a",
    color: "#f0f2ee", fontSize: 14, fontFamily: "'Sora',sans-serif",
    outline: "none", boxSizing: "border-box",
  };

  if (success) return (
    <div style={{ minHeight: "100vh", background: "#0d0f0c", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Sora',sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 460, width: "100%", background: "#141614", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "2.5rem", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: "1rem" }}>✅</div>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: "#f0f2ee", marginBottom: 8 }}>Transfer initiated!</h2>
        <p style={{ color: "#a8afa4", fontSize: 14, lineHeight: 1.7, marginBottom: "1.5rem" }}>
          Your transfer of <strong style={{ color: "#f0f2ee" }}>${amount.toFixed(2)} CAD</strong> to <strong style={{ color: "#f0f2ee" }}>{form.recipient_name}</strong> is being processed.
        </p>
        <div style={{ background: "#0d0f0c", borderRadius: 12, padding: "1rem 1.25rem", marginBottom: "1.5rem", textAlign: "left" }}>
          {[
            ["Reference", success.reference],
            ["Recipient gets", `${amountReceived.toLocaleString()} ${form.recipient_currency}`],
            ["Estimated delivery", "Same day"],
            ["Status", "Processing"],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", fontSize: 13 }}>
              <span style={{ color: "#a8afa4" }}>{k}</span>
              <span style={{ fontWeight: 500, color: k === "Status" ? "#f59e0b" : "#f0f2ee" }}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button onClick={() => { setSuccess(null); setForm({ recipient_name: "", recipient_country: "Nigeria", recipient_currency: "NGN", amount_sent: "", notes: "" }); }}
            style={{ background: TEAL, color: "white", border: "none", padding: "12px 20px", borderRadius: 10, cursor: "pointer", fontFamily: "'Sora',sans-serif", fontSize: 14, fontWeight: 600 }}>
            Send another
          </button>
          <a href="/dashboard" style={{ background: "#1a1e1a", border: "1px solid rgba(255,255,255,0.1)", color: "#f0f2ee", padding: "12px 20px", borderRadius: 10, textDecoration: "none", fontSize: 14 }}>Dashboard</a>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#0d0f0c", fontFamily: "'Sora',sans-serif", color: "#f0f2ee" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
        input:focus, select:focus { border-color: #1D9E75 !important; box-shadow: 0 0 0 3px rgba(29,158,117,0.15); }
      `}</style>

      <nav style={{ padding: "1rem 2rem", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: TEAL, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="white"><path d="M2 8h5V3l7 5-7 5v-5H2z"/></svg>
          </div>
          <span style={{ fontWeight: 600, fontSize: 16 }}>Transfi</span>
        </div>
        <a href="/dashboard" style={{ fontSize: 13, color: "#a8afa4", textDecoration: "none" }}>← Dashboard</a>
      </nav>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "3rem 2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>
        <div style={{ background: "#141614", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "2rem" }}>
          <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: "1.5rem" }}>Send money</h1>

          {profile?.kyc_status !== "approved" && (
            <div style={{ background: "#1a1e1a", border: "1px solid rgba(245,158,11,0.3)", borderRadius: 10, padding: "12px 16px", marginBottom: "1.5rem", fontSize: 13, color: "#f59e0b" }}>
              ⚠️ KYC verification required. <a href="/kyc" style={{ color: TEAL, textDecoration: "none", fontWeight: 600 }}>Verify now →</a>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 500, color: "#a8afa4", marginBottom: 6, display: "block" }}>Recipient name</label>
              <input style={inputStyle} placeholder="Full name of recipient" value={form.recipient_name} onChange={e => set("recipient_name", e.target.value)} required />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 500, color: "#a8afa4", marginBottom: 6, display: "block" }}>Send to</label>
              <select style={inputStyle} value={form.recipient_country} onChange={e => handleCountryChange(e.target.value)}>
                {COUNTRIES.map(c => (
                  <option key={c.code} value={c.name}>{c.flag} {c.name} ({c.currency})</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 500, color: "#a8afa4", marginBottom: 6, display: "block" }}>Amount (CAD)</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#a8afa4", fontSize: 14 }}>$</span>
                <input style={{ ...inputStyle, paddingLeft: 28 }} type="number" min="10" step="0.01"
                  placeholder="100.00" value={form.amount_sent} onChange={e => set("amount_sent", e.target.value)} required />
              </div>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 500, color: "#a8afa4", marginBottom: 6, display: "block" }}>Notes (optional)</label>
              <input style={inputStyle} placeholder="e.g. Family support, rent payment" value={form.notes} onChange={e => set("notes", e.target.value)} />
            </div>

            {error && (
              <div style={{ background: "#2a1515", border: "1px solid #6b2a2a", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#f87171" }}>{error}</div>
            )}

            <button type="submit" disabled={loading || profile?.kyc_status !== "approved"} style={{
              background: TEAL, color: "white", border: "none", padding: "14px",
              borderRadius: 10, fontSize: 15, fontWeight: 600,
              cursor: (loading || profile?.kyc_status !== "approved") ? "not-allowed" : "pointer",
              fontFamily: "'Sora',sans-serif", opacity: (loading || profile?.kyc_status !== "approved") ? 0.6 : 1, marginTop: 4,
            }}>
              {loading ? "Processing..." : "Send money →"}
            </button>
          </form>
        </div>

        <div style={{ background: "#141614", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "2rem", position: "sticky", top: 100 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: TEAL, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: "1rem" }}>Transfer summary</div>
          {[
            ["You send", `$${amount.toFixed(2)} CAD`],
            ["Transfer fee (1.5%)", `- $${fee.toFixed(2)}`],
            ["Exchange rate", `1 CAD = ${rate} ${form.recipient_currency}`],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, fontSize: 13 }}>
              <span style={{ color: "#a8afa4" }}>{k}</span>
              <span style={{ fontFamily: "'DM Mono',monospace" }}>{v}</span>
            </div>
          ))}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 12, display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }}>
            <span style={{ fontWeight: 600 }}>Recipient gets</span>
            <span style={{ fontWeight: 700, fontSize: 18, color: TEAL, fontFamily: "'DM Mono',monospace" }}>
              {amountReceived > 0 ? amountReceived.toLocaleString() : "—"} {form.recipient_currency}
            </span>
          </div>
          <div style={{ background: "#0a2e22", borderRadius: 10, padding: "12px 14px", display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: "1rem" }}>
            <span style={{ color: "#9FE1CB" }}>Estimated delivery</span>
            <span style={{ color: TEAL, fontWeight: 600 }}>Same day</span>
          </div>
          <div style={{ fontSize: 11, color: "#5a6057", marginBottom: 4 }}>Wallet balance</div>
          <div style={{ fontSize: 18, fontWeight: 600, fontFamily: "'DM Mono',monospace" }}>${profile?.wallet_balance?.toFixed(2) || "0.00"} CAD</div>
        </div>
      </div>
    </div>
  );
}
