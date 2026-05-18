"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const STEPS = ["Personal info", "Identity document", "Address", "Review & submit"];
const TEAL = "#1D9E75";

export default function KYCPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [existingKyc, setExistingKyc] = useState<any>(null);
  const [form, setForm] = useState({
    full_name: "", date_of_birth: "", nationality: "",
    id_type: "passport", id_number: "",
    address: "", city: "", postal_code: "", country: "Canada",
  });

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  useEffect(() => {
    const check = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      const { data } = await supabase.from("kyc_submissions").select("*").eq("user_id", user.id).single();
      if (data) setExistingKyc(data);
    };
    check();
  }, []);

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch("/api/kyc", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${session?.access_token}` },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || "Submission failed");
      }
      setSubmitted(true);
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
  const labelStyle: React.CSSProperties = {
    fontSize: 12, fontWeight: 500, color: "#a8afa4", marginBottom: 6, display: "block",
  };

  if (existingKyc) return (
    <div style={{ minHeight: "100vh", background: "#0d0f0c", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Sora',sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 480, width: "100%", background: "#141614", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "2.5rem", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: "1rem" }}>
          {existingKyc.status === "approved" ? "✅" : existingKyc.status === "rejected" ? "❌" : "🕐"}
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: "#f0f2ee", marginBottom: 8 }}>
          {existingKyc.status === "approved" ? "Identity verified!" : existingKyc.status === "rejected" ? "Verification rejected" : "Under review"}
        </h2>
        <p style={{ color: "#a8afa4", fontSize: 14, lineHeight: 1.7, marginBottom: "1.5rem" }}>
          {existingKyc.status === "approved"
            ? "Your identity has been verified. You can now send money."
            : existingKyc.status === "rejected"
            ? `Reason: ${existingKyc.admin_notes || "Please contact support."}`
            : "Your documents are being reviewed. Usually takes 1–2 business days."}
        </p>
        <a href="/dashboard" style={{ background: TEAL, color: "white", padding: "12px 24px", borderRadius: 10, textDecoration: "none", fontSize: 14, fontWeight: 600 }}>Back to dashboard</a>
      </div>
    </div>
  );

  if (submitted) return (
    <div style={{ minHeight: "100vh", background: "#0d0f0c", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Sora',sans-serif", padding: "2rem" }}>
      <div style={{ maxWidth: 480, width: "100%", background: "#141614", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "2.5rem", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: "1rem" }}>🎉</div>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: "#f0f2ee", marginBottom: 8 }}>KYC submitted!</h2>
        <p style={{ color: "#a8afa4", fontSize: 14, lineHeight: 1.7, marginBottom: "1.5rem" }}>We'll notify you within 1–2 business days.</p>
        <a href="/dashboard" style={{ background: TEAL, color: "white", padding: "12px 24px", borderRadius: 10, textDecoration: "none", fontSize: 14, fontWeight: 600 }}>Back to dashboard</a>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#0d0f0c", fontFamily: "'Sora',sans-serif", color: "#f0f2ee" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600&display=swap');
        input:focus, select:focus { border-color: #1D9E75 !important; box-shadow: 0 0 0 3px rgba(29,158,117,0.15); }
      `}</style>

      <nav style={{ padding: "1rem 2rem", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 30, height: 30, borderRadius: 8, background: TEAL, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="white"><path d="M2 8h5V3l7 5-7 5v-5H2z"/></svg>
        </div>
        <span style={{ fontWeight: 600, fontSize: 16 }}>Transfi</span>
        <span style={{ color: "#5a6057", margin: "0 8px" }}>/</span>
        <span style={{ color: "#a8afa4", fontSize: 14 }}>Identity verification</span>
      </nav>

      <div style={{ maxWidth: 580, margin: "0 auto", padding: "3rem 2rem" }}>
        <div style={{ display: "flex", gap: 0, marginBottom: "2.5rem" }}>
          {STEPS.map((s, i) => (
            <div key={s} style={{ flex: 1, textAlign: "center" }}>
              <div style={{ height: 4, background: i <= step ? TEAL : "rgba(255,255,255,0.1)", borderRadius: 2, marginBottom: 8 }}/>
              <div style={{ fontSize: 11, color: i === step ? TEAL : "#5a6057", fontWeight: i === step ? 600 : 400 }}>{s}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#141614", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "2rem" }}>
          {step === 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Personal information</h2>
              <p style={{ fontSize: 13, color: "#a8afa4", marginBottom: 8 }}>Enter your details exactly as they appear on your ID.</p>
              <div>
                <label style={labelStyle}>Full legal name</label>
                <input style={inputStyle} placeholder="Ada Obi" value={form.full_name} onChange={e => set("full_name", e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Date of birth</label>
                <input style={inputStyle} type="date" value={form.date_of_birth} onChange={e => set("date_of_birth", e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Nationality</label>
                <input style={inputStyle} placeholder="e.g. Nigerian, Canadian" value={form.nationality} onChange={e => set("nationality", e.target.value)} />
              </div>
            </div>
          )}

          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Identity document</h2>
              <div>
                <label style={labelStyle}>Document type</label>
                <select style={inputStyle} value={form.id_type} onChange={e => set("id_type", e.target.value)}>
                  <option value="passport">Passport</option>
                  <option value="drivers_license">Driver's license</option>
                  <option value="national_id">National ID card</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Document number</label>
                <input style={inputStyle} placeholder="e.g. A12345678" value={form.id_number} onChange={e => set("id_number", e.target.value)} />
              </div>
              <div style={{ background: "#0a2e22", border: "1px solid rgba(29,158,117,0.2)", borderRadius: 10, padding: "12px 16px", fontSize: 12, color: "#9FE1CB" }}>
                📋 Document upload coming in next release. Your ID number is stored encrypted.
              </div>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Residential address</h2>
              <div>
                <label style={labelStyle}>Street address</label>
                <input style={inputStyle} placeholder="123 Main Street" value={form.address} onChange={e => set("address", e.target.value)} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={labelStyle}>City</label>
                  <input style={inputStyle} placeholder="Brampton" value={form.city} onChange={e => set("city", e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>Postal code</label>
                  <input style={inputStyle} placeholder="L6T 0A1" value={form.postal_code} onChange={e => set("postal_code", e.target.value)} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Country</label>
                <select style={inputStyle} value={form.country} onChange={e => set("country", e.target.value)}>
                  <option>Canada</option>
                  <option>United States</option>
                  <option>United Kingdom</option>
                </select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Review your information</h2>
              {[
                ["Full name", form.full_name],
                ["Date of birth", form.date_of_birth],
                ["Nationality", form.nationality],
                ["ID type", form.id_type.replace("_", " ")],
                ["ID number", form.id_number],
                ["Address", `${form.address}, ${form.city}, ${form.postal_code}`],
                ["Country", form.country],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", fontSize: 13 }}>
                  <span style={{ color: "#a8afa4" }}>{k}</span>
                  <span style={{ fontWeight: 500, textTransform: "capitalize" }}>{v}</span>
                </div>
              ))}
              <div style={{ background: "#0a2e22", border: "1px solid rgba(29,158,117,0.2)", borderRadius: 10, padding: "12px 16px", fontSize: 12, color: "#9FE1CB", marginTop: 16 }}>
                🔒 Your information is encrypted and stored securely.
              </div>
            </div>
          )}

          {error && (
            <div style={{ background: "#2a1515", border: "1px solid #6b2a2a", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#f87171", marginTop: 16 }}>{error}</div>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24, gap: 12 }}>
            {step > 0 ? (
              <button onClick={() => setStep(s => s - 1)} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.12)", color: "#f0f2ee", padding: "12px 24px", borderRadius: 10, cursor: "pointer", fontFamily: "'Sora',sans-serif", fontSize: 14 }}>← Back</button>
            ) : <div />}
            {step < 3 ? (
              <button onClick={() => setStep(s => s + 1)} style={{ background: TEAL, color: "white", border: "none", padding: "12px 28px", borderRadius: 10, cursor: "pointer", fontFamily: "'Sora',sans-serif", fontSize: 14, fontWeight: 600 }}>Continue →</button>
            ) : (
              <button onClick={handleSubmit} disabled={loading} style={{ background: TEAL, color: "white", border: "none", padding: "12px 28px", borderRadius: 10, cursor: loading ? "not-allowed" : "pointer", fontFamily: "'Sora',sans-serif", fontSize: 14, fontWeight: 600, opacity: loading ? 0.7 : 1 }}>
                {loading ? "Submitting..." : "Submit for review ✓"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
