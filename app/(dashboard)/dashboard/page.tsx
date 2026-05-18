"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Profile, Transaction } from "@/lib/types";

const TEAL = "#1D9E75";

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      const { data: prof } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      setProfile(prof);
      const { data: tx } = await supabase.from("transactions").select("*")
        .eq("sender_id", user.id).order("created_at", { ascending: false }).limit(10);
      setTransactions(tx || []);
      setLoading(false);
    };
    load();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const statusColor = (s: string) => s === "completed" ? "#1D9E75" : s === "processing" ? "#f59e0b" : s === "failed" ? "#ef4444" : "#a8afa4";
  const kycColor = (s: string) => s === "approved" ? "#1D9E75" : s === "submitted" ? "#f59e0b" : s === "rejected" ? "#ef4444" : "#a8afa4";

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#0d0f0c", display: "flex", alignItems: "center", justifyContent: "center", color: "#f0f2ee", fontFamily: "'Sora',sans-serif" }}>
      Loading...
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#0d0f0c", fontFamily: "'Sora',sans-serif", color: "#f0f2ee" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');`}</style>

      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 2rem", borderBottom: "1px solid rgba(255,255,255,0.08)", background: "#0d0f0c", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: TEAL, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="white"><path d="M2 8h5V3l7 5-7 5v-5H2z"/></svg>
          </div>
          <span style={{ fontWeight: 600, fontSize: 17 }}>Transfi</span>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <a href="/kyc" style={{ fontSize: 13, color: "#a8afa4", textDecoration: "none" }}>Verify ID</a>
          <a href="/send" style={{ fontSize: 13, color: "#a8afa4", textDecoration: "none" }}>Send money</a>
          <button onClick={logout} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.12)", color: "#a8afa4", padding: "7px 16px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontFamily: "'Sora',sans-serif" }}>
            Sign out
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "2.5rem 2rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: 26, fontWeight: 600, marginBottom: 4 }}>Welcome back, {profile?.first_name} 👋</h1>
          <p style={{ color: "#a8afa4", fontSize: 14 }}>Here's your Transfi overview.</p>
        </div>

        {profile?.kyc_status !== "approved" && (
          <div style={{ background: "#1a1e1a", border: `1px solid ${profile?.kyc_status === "submitted" ? "#f59e0b" : TEAL}`, borderRadius: 14, padding: "1.25rem 1.5rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>
                {profile?.kyc_status === "submitted" ? "🕐 KYC under review" : "🔒 Verify your identity to send money"}
              </div>
              <div style={{ fontSize: 13, color: "#a8afa4" }}>
                {profile?.kyc_status === "submitted"
                  ? "Your documents are being reviewed. Usually takes 1–2 business days."
                  : "Complete identity verification to unlock transfers."}
              </div>
            </div>
            {profile?.kyc_status === "pending" && (
              <a href="/kyc" style={{ background: TEAL, color: "white", padding: "10px 20px", borderRadius: 8, textDecoration: "none", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap" }}>
                Verify now →
              </a>
            )}
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: "2rem" }}>
          {[
            { label: "Wallet balance", value: `$${profile?.wallet_balance?.toFixed(2) || "0.00"} CAD`, sub: profile?.kyc_status === "approved" ? "Available to send" : "Verify ID to fund" },
            { label: "Total transfers", value: transactions.length.toString(), sub: "All time" },
            { label: "Total sent", value: `$${transactions.reduce((s, t) => s + t.amount_sent, 0).toFixed(2)} CAD`, sub: "All time" },
            { label: "KYC status", value: profile?.kyc_status || "pending", sub: "Identity verification", color: kycColor(profile?.kyc_status || "pending") },
          ].map(s => (
            <div key={s.label} style={{ background: "#141614", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "1.25rem 1.5rem" }}>
              <div style={{ fontSize: 12, color: "#5a6057", fontWeight: 500, marginBottom: 6, textTransform: "uppercase", letterSpacing: ".06em" }}>{s.label}</div>
              <div style={{ fontSize: 22, fontWeight: 600, fontFamily: "'DM Mono',monospace", color: s.color || "#f0f2ee", marginBottom: 4, textTransform: "capitalize" }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "#a8afa4" }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 12, marginBottom: "2rem", flexWrap: "wrap" }}>
          <a href="/send" style={{ background: TEAL, color: "white", padding: "12px 24px", borderRadius: 10, textDecoration: "none", fontSize: 14, fontWeight: 600 }}>➡ Send money</a>
          <a href="/kyc" style={{ background: "#1a1e1a", border: "1px solid rgba(255,255,255,0.1)", color: "#f0f2ee", padding: "12px 24px", borderRadius: 10, textDecoration: "none", fontSize: 14 }}>🪪 Verify identity</a>
        </div>

        <div style={{ background: "#141614", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, overflow: "hidden" }}>
          <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ fontSize: 16, fontWeight: 600 }}>Recent transactions</h2>
          </div>
          {transactions.length === 0 ? (
            <div style={{ padding: "3rem", textAlign: "center", color: "#5a6057" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>💸</div>
              <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 6 }}>No transfers yet</div>
              <div style={{ fontSize: 13 }}>Your transfers will appear here.</div>
            </div>
          ) : transactions.map(tx => (
            <div key={tx.id} style={{ padding: "1rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.04)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
              <div>
                <div style={{ fontWeight: 500, fontSize: 14 }}>{tx.recipient_name}</div>
                <div style={{ fontSize: 12, color: "#a8afa4" }}>{tx.recipient_country} · {tx.reference}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 600, fontFamily: "'DM Mono',monospace", fontSize: 15 }}>${tx.amount_sent.toFixed(2)} CAD</div>
                <div style={{ fontSize: 11, color: statusColor(tx.status), textTransform: "capitalize", fontWeight: 500 }}>{tx.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
