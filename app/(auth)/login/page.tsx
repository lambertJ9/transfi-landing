"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });
      if (error) throw error;
      router.push("/dashboard");
    } catch (err: any) {
      setError("Invalid email or password.");
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

  return (
    <div style={{ minHeight: "100vh", background: "#0d0f0c", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", fontFamily: "'Sora',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600&display=swap');
        input:focus { border-color: #1D9E75 !important; box-shadow: 0 0 0 3px rgba(29,158,117,0.15); }
      `}</style>

      <div style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "2rem", justifyContent: "center" }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "#1D9E75", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 16 16" fill="white"><path d="M2 8h5V3l7 5-7 5v-5H2z"/></svg>
          </div>
          <span style={{ fontSize: 20, fontWeight: 600, color: "#f0f2ee" }}>Transfi</span>
        </div>

        <div style={{ background: "#141614", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "2.5rem" }}>
          <h1 style={{ fontSize: 22, fontWeight: 600, color: "#f0f2ee", marginBottom: 8, textAlign: "center" }}>Welcome back</h1>
          <p style={{ fontSize: 14, color: "#a8afa4", textAlign: "center", marginBottom: "2rem" }}>
            Don't have an account? <a href="/register" style={{ color: "#1D9E75", textDecoration: "none" }}>Sign up</a>
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 500, color: "#a8afa4", marginBottom: 6, display: "block" }}>Email address</label>
              <input style={inputStyle} type="email" placeholder="ada@example.com"
                value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 500, color: "#a8afa4", marginBottom: 6, display: "block" }}>Password</label>
              <input style={inputStyle} type="password" placeholder="Your password"
                value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required />
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
              {loading ? "Signing in..." : "Sign in →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
