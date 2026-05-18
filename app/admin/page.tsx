"use client";
import { useState } from "react";

const TEAL = "#1D9E75";

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState("");
  const [authed, setAuthed] = useState(false);

  const load = async (adminKey: string) => {
    setLoading(true);
    const res = await fetch("/api/admin/stats", { headers: { "x-admin-key": adminKey } });
    if (!res.ok) { alert("Invalid admin key."); setLoading(false); return; }
    const d = await res.json();
    setData(d);
    setAuthed(true);
    setLoading(false);
  };

  const approveKyc = async (userId: string, action: string) => {
    await fetch("/api/admin/kyc", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-key": key },
      body: JSON.stringify({ user_id: userId, action }),
    });
    load(key);
  };

  const cardStyle: React.CSSProperties = {
    background: "#141614", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "1.5rem",
  };

  if (!authed) return (
    <div style={{ minHeight: "100vh", background: "#0d0f0c", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Sora',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600&display=swap');`}</style>
      <div style={{ background: "#141614", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "2.5rem", width: 360 }}>
        <div style={{ fontSize: 24, fontWeight: 600, color: "#f0f2ee", marginBottom: 8, textAlign: "center" }}>Admin Access</div>
        <p style={{ color: "#a8afa4", fontSize: 13, textAlign: "center", marginBottom: "1.5rem" }}>Enter your admin secret key</p>
        <input type="password" placeholder="Admin secret key" value={key}
          onChange={e => setKey(e.target.value)}
          onKeyDown={e => e.key === "Enter" && load(key)}
          style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "#1a1e1a", color: "#f0f2ee", fontSize: 14, fontFamily: "'Sora',sans-serif", outline: "none", boxSizing: "border-box", marginBottom: 12 }}
        />
        <button onClick={() => load(key)} style={{ width: "100%", background: TEAL, color: "white", border: "none", padding: "13px", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "'Sora',sans-serif" }}>
          {loading ? "Checking..." : "Access dashboard"}
        </button>
      </div>
    </div>
  );

  if (!data) return null;

  const { stats, recentUsers, recentTransactions } = data;

  return (
    <div style={{ minHeight: "100vh", background: "#0d0f0c", fontFamily: "'Sora',sans-serif", color: "#f0f2ee" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');`}</style>

      <nav style={{ padding: "1rem 2rem", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: TEAL, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="white"><path d="M2 8h5V3l7 5-7 5v-5H2z"/></svg>
          </div>
          <span style={{ fontWeight: 600, fontSize: 16 }}>Transfi</span>
          <span style={{ fontSize: 11, background: "#0a2e22", color: TEAL, padding: "3px 10px", borderRadius: 999, fontWeight: 600 }}>ADMIN</span>
        </div>
        <button onClick={() => load(key)} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "#a8afa4", padding: "7px 16px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontFamily: "'Sora',sans-serif" }}>
          ↻ Refresh
        </button>
      </nav>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2.5rem 2rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 4 }}>Traction Dashboard</h1>
          <p style={{ color: "#a8afa4", fontSize: 14 }}>Real-time metrics for DMZ/CDL applications and investor reporting.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: "2rem" }}>
          {[
            { label: "Total users", value: stats.totalUsers || 0, color: TEAL },
            { label: "Waitlist signups", value: stats.waitlistCount || 0, color: "#a78bfa" },
            { label: "Total transfers", value: stats.totalTransactions || 0, color: "#f59e0b" },
            { label: "Volume (CAD)", value: `$${parseFloat(stats.totalVolume || 0).toLocaleString()}`, color: TEAL },
            { label: "Completed", value: stats.completedTransactions || 0, color: "#34d399" },
            { label: "KYC approved", value: stats.kycStats?.approved || 0, color: "#34d399" },
          ].map(s => (
            <div key={s.label} style={cardStyle}>
              <div style={{ fontSize: 11, color: "#5a6057", fontWeight: 500, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 8 }}>{s.label}</div>
              <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "'DM Mono',monospace", color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: "2rem" }}>
          <div style={cardStyle}>
            <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: "1rem" }}>KYC Status Breakdown</h3>
            {Object.entries(stats.kycStats || {}).map(([status, count]) => (
              <div key={status} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ fontSize: 13, textTransform: "capitalize", color: "#a8afa4" }}>{status}</span>
                <span style={{ fontSize: 14, fontWeight: 600, fontFamily: "'DM Mono',monospace" }}>{count as number}</span>
              </div>
            ))}
          </div>

          <div style={cardStyle}>
            <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: "1rem" }}>Top Corridors</h3>
            {Object.entries(stats.countryCounts || {}).length === 0 ? (
              <p style={{ color: "#5a6057", fontSize: 13 }}>No transfers yet.</p>
            ) : Object.entries(stats.countryCounts || {})
              .sort(([,a],[,b]) => (b as number) - (a as number))
              .slice(0, 6)
              .map(([country, count]) => (
                <div key={country} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <span style={{ fontSize: 13, color: "#a8afa4" }}>{country}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, fontFamily: "'DM Mono',monospace" }}>{count as number} txns</span>
                </div>
              ))}
          </div>
        </div>

        <div style={{ ...cardStyle, marginBottom: "2rem", overflow: "hidden" }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: "1.25rem" }}>Recent users</h3>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  {["Name","Email","Country","KYC","Balance","Joined","Actions"].map(h => (
                    <th key={h} style={{ padding: "8px 12px", textAlign: "left", color: "#5a6057", fontWeight: 500, fontSize: 11, textTransform: "uppercase", letterSpacing: ".06em", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(recentUsers || []).map((u: any) => (
                  <tr key={u.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <td style={{ padding: "10px 12px", fontWeight: 500 }}>{u.first_name} {u.last_name}</td>
                    <td style={{ padding: "10px 12px", color: "#a8afa4" }}>{u.email}</td>
                    <td style={{ padding: "10px 12px", color: "#a8afa4" }}>{u.country || "—"}</td>
                    <td style={{ padding: "10px 12px" }}>
                      <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 999, background: u.kyc_status === "approved" ? "#0a2e22" : u.kyc_status === "submitted" ? "#2a2010" : "#1a1e1a", color: u.kyc_status === "approved" ? TEAL : u.kyc_status === "submitted" ? "#f59e0b" : "#a8afa4", fontWeight: 600 }}>
                        {u.kyc_status}
                      </span>
                    </td>
                    <td style={{ padding: "10px 12px", fontFamily: "'DM Mono',monospace" }}>${u.wallet_balance?.toFixed(2)}</td>
                    <td style={{ padding: "10px 12px", color: "#5a6057" }}>{new Date(u.created_at).toLocaleDateString()}</td>
                    <td style={{ padding: "10px 12px" }}>
                      {u.kyc_status === "submitted" && (
                        <div style={{ display: "flex", gap: 6 }}>
                          <button onClick={() => approveKyc(u.id, "approve")} style={{ background: TEAL, color: "white", border: "none", padding: "5px 12px", borderRadius: 6, cursor: "pointer", fontSize: 12, fontFamily: "'Sora',sans-serif" }}>Approve</button>
                          <button onClick={() => approveKyc(u.id, "reject")} style={{ background: "#2a1515", color: "#f87171", border: "1px solid #6b2a2a", padding: "5px 12px", borderRadius: 6, cursor: "pointer", fontSize: 12, fontFamily: "'Sora',sans-serif" }}>Reject</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ ...cardStyle, overflow: "hidden" }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: "1.25rem" }}>Recent transactions</h3>
          {(recentTransactions || []).length === 0 ? (
            <p style={{ color: "#5a6057", fontSize: 13 }}>No transactions yet.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                    {["Reference","Sender","Recipient","Country","Amount","Status","Date"].map(h => (
                      <th key={h} style={{ padding: "8px 12px", textAlign: "left", color: "#5a6057", fontWeight: 500, fontSize: 11, textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((tx: any) => (
                    <tr key={tx.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      <td style={{ padding: "10px 12px", fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#a8afa4" }}>{tx.reference}</td>
                      <td style={{ padding: "10px 12px" }}>{tx.sender_name || "—"}</td>
                      <td style={{ padding: "10px 12px" }}>{tx.recipient_name}</td>
                      <td style={{ padding: "10px 12px", color: "#a8afa4" }}>{tx.recipient_country}</td>
                      <td style={{ padding: "10px 12px", fontFamily: "'DM Mono',monospace", fontWeight: 600 }}>${tx.amount_sent?.toFixed(2)}</td>
                      <td style={{ padding: "10px 12px" }}>
                        <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 999, background: tx.status === "completed" ? "#0a2e22" : tx.status === "processing" ? "#2a2010" : "#1a1e1a", color: tx.status === "completed" ? TEAL : tx.status === "processing" ? "#f59e0b" : "#a8afa4", fontWeight: 600 }}>
                          {tx.status}
                        </span>
                      </td>
                      <td style={{ padding: "10px 12px", color: "#5a6057" }}>{new Date(tx.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
