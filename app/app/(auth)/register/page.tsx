"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    first_name: "", last_name: "", email: "",
    password: "", confirm_password: "",
    phone: "", country: "Canada",
  });

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm_password) {
      setError("Passwords do not match."); return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters."); return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            first_name: form.first_name,
            last_name: form.last_name,
            phone: form.phone,
            country: form.country,
          }
        }
      });
      if (error) throw error;
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "12px 16px", borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.12)", background: "#1a1e1a",
    color: "#f0f2ee", fontSize: 14, fontFamily: "'Sora',sans-serif",
    outline: "none", boxSizing: "border-box",
  };
  const labelStyle: React.CSSProperties = {
    fontSize: 12, fontWeight: 500, color: "#a8afa4",
    marginBottom: 6, display: "block",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0d0f0c", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", fontFamily: "'Sora',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600&display=swap');
        input:focus { border-color: #1D9E75 !important; box-shadow: 0 0 0 3px rgba(29,158,117,0.15); }
        select:focus { border-color: #1D9E75 !important; }
      `}</style>

      <div style={{ width: "100%", maxWidth: 460 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "2rem", justifyContent: "center" }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "#1D9E75", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 16 16" fill="white"><path d="M2 8h5V3l7 5-7 5v-5H2z"/></svg>
          </div>
          <span style={{ fontSize: 20, fontWeight: 600, color: "#f0f2ee" }}>Transfi</span>
        </div>

        <div style={{ background: "#141614", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "2.5rem" }}>
          <h1 style={{ fontSize: 22, fontWeight: 600, color: "#f0f2ee", marginBottom: 8, textAlign: "center" }}>Create your account</h1>
          <p style={{ fontSize: 14, color: "#a8afa4", textAlign: "center", marginBottom: "2rem" }}>
            Already have an account? <a href="/login" style={{ color: "#1D9E75", textDecoration: "none" }}>Sign in</a>
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[["first_name","First name","Ada"],["last_name","Last name","Obi"]].map(([k,l,p]) => (
                <div key={k}>
                  <label style={labelStyle}>{l}</label>
                  <input style={inputStyle} placeholder={p} value={form[k as keyof typeof form]}
                    onChange={e => set(k, e.target.value)} required />
                </div>
              ))}
            </div>

            <div>
              <label style={labelStyle}>Email address</label>
              <input style={inputStyle} type="email" placeholder="ada@example.com"
                value={form.email} onChange={e => set("email", e.target.value)} required />
            </div>

            <div>
              <label style={labelStyle}>Phone number</label>
              <input style={inputStyle} type="tel" placeholder="+1 416 000 0000"
                value={form.phone} onChange={e => set("phone", e.target.value)} />
            </div>

            <div>
              <label style={labelStyle}>Country</label>
              <select style={{ ...inputStyle }} value={form.country} onChange={e => set("country", e.target.value)}>
                <option>Canada</option>
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Password</label>
              <input style={inputStyle} type="password" placeholder="Min 8 characters"
                value={form.password} onChange={e => set("password", e.target.value)} required />
            </div>

            <div>
              <label style={labelStyle}>Confirm password</label>
              <input style={inputStyle} type="password" placeholder="Re-enter password"
                value={form.confirm_password} onChange={e => set("confirm_password", e.target.value)} required />
            </div>

            {error && (
              <div style={{ background: "#2a1515", border: "1px solid #6b2a2a", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#f87171" }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} style={{
              background: "#1D9E75", color: "white", border: "none", padding: "14px",
              borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "'Sora',sans-serif", opacity: loading ? 0.7 : 1, marginTop: 4,
            }}>
              {loading ? "Creating account..." : "Create account →"}
            </button>
          </form>

          <p style={{ fontSize: 11, color: "#5a6057", textAlign: "center", marginTop: "1.25rem", lineHeight: 1.6 }}>
            By signing up you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
