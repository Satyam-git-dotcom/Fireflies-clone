"use client";

import Link from "next/link";
import { Lock } from "lucide-react";

export default function LoginPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0b0b0b", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-inter), sans-serif", padding: 20 }}>
      
      <div style={{ width: "100%", maxWidth: 1000, height: 600, display: "flex", borderRadius: 16, overflow: "hidden", backgroundColor: "#111111", border: "1px solid #222" }}>
        
        {/* Left Side - Login Form */}
        <div style={{ flex: 1, padding: "60px 40px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            {/* Logo */}
            <div style={{ width: 40, height: 40, backgroundColor: "#222", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 32 }}>
              <div style={{ width: 16, height: 16, backgroundColor: "#f43f5e", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 8, height: 8, border: "2px solid white" }} />
              </div>
            </div>

            <h1 style={{ fontSize: "2rem", fontWeight: 600, color: "#fff", marginBottom: 24, lineHeight: 1.3 }}>
              Get the #1 AI Assistant for <br /> Your Meetings
            </h1>

            <p style={{ color: "#888", fontSize: "0.85rem", marginBottom: 32, lineHeight: 1.5 }}>
              By clicking "Continue", you agree to our <span style={{ textDecoration: "underline", color: "#a78bfa", cursor: "pointer" }}>Terms of Service</span>, acknowledge <br />
              <span style={{ textDecoration: "underline", color: "#a78bfa", cursor: "pointer" }}>Privacy Policy</span> & consent to Fireflies recording and using your voice data to <br />
              provide Fireflies' services.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <Link href="/dashboard" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", backgroundColor: "#1a1a1a", border: "1px solid #333", borderRadius: 8, color: "#fff", fontSize: "0.95rem", fontWeight: 500, cursor: "pointer" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" style={{ width: 18, height: 18 }} />
                  Continue with Google
                </div>
                <span style={{ color: "#888" }}>→</span>
              </Link>
              
              <Link href="/dashboard" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", backgroundColor: "#1a1a1a", border: "1px solid #333", borderRadius: 8, color: "#fff", fontSize: "0.95rem", fontWeight: 500, cursor: "pointer" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <img src="https://www.svgrepo.com/show/475661/microsoft-color.svg" alt="Microsoft" style={{ width: 18, height: 18 }} />
                  Continue with Microsoft
                </div>
                <span style={{ color: "#888" }}>→</span>
              </Link>
            </div>

            <div style={{ textAlign: "center", marginTop: 24 }}>
              <span style={{ color: "#888", fontSize: "0.9rem", textDecoration: "underline", cursor: "pointer" }}>Use Single Sign-On</span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#10b981", fontSize: "0.7rem", fontWeight: 600, letterSpacing: 0.5 }}>
            <Lock size={12} /> SOC 2 TYPE II · GDPR · HIPAA · 256-BIT ENCRYPTION
          </div>
        </div>

        {/* Right Side - Testimonial / Graphic */}
        <div style={{ flex: 1, backgroundColor: "#0a0a0a", padding: "60px 40px", borderLeft: "1px solid #222", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          
          <div style={{ backgroundColor: "#1f1d24", padding: 24, borderRadius: 16, border: "1px solid #2a2536", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)" }}>
            <div style={{ fontSize: "1rem", fontWeight: 600, color: "#fff", marginBottom: 4 }}>Marketing Sync</div>
            <div style={{ fontSize: "0.8rem", color: "#888", marginBottom: 16 }}>Jan 15, 11:30 AM</div>
            
            <div style={{ display: "flex", gap: 8, fontSize: "0.85rem", color: "#ccc", marginBottom: 8 }}>
              🚀 Priorities: <span style={{ color: "#a78bfa" }}>00:00 - 10:12</span>
            </div>
            <ul style={{ paddingLeft: 24, fontSize: "0.85rem", color: "#ccc", marginBottom: 16 }}>
              <li style={{ marginBottom: 4 }}>Ensure clarity on messaging, target audience, and primary channels</li>
              <li style={{ marginBottom: 4 }}><div style={{ width: "80%", height: 8, backgroundColor: "#333", borderRadius: 4, display: "inline-block" }} /></li>
              <li><div style={{ width: "60%", height: 8, backgroundColor: "#333", borderRadius: 4, display: "inline-block" }} /></li>
            </ul>

            <div style={{ backgroundColor: "#2a2536", padding: "12px 16px", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "0.85rem", color: "#ccc" }}>List out all the tasks for the new website.</span>
              <div style={{ width: 24, height: 24, backgroundColor: "#a78bfa", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>↑</div>
            </div>
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h2 style={{ margin: 0, color: "#fff", fontSize: "1.2rem", display: "flex", alignItems: "center", gap: 8 }}>
                <svg width="24" height="24" viewBox="0 0 76 65" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="#ffffff"/></svg>
                Vercel
              </h2>
              <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#fff", fontSize: "0.9rem" }}>
                <span style={{ color: "#f97316" }}>G</span> 4.8 / 5
              </div>
            </div>

            <p style={{ color: "#ccc", fontSize: "1rem", lineHeight: 1.6, marginBottom: 24 }}>
              "Fireflies keeps me 100% present in meetings without losing any of the details."
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", backgroundColor: "#333", overflow: "hidden" }}>
                <img src="https://i.pravatar.cc/100?img=11" alt="Sarup" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%)" }} />
              </div>
              <div>
                <div style={{ color: "#fff", fontWeight: 500, fontSize: "0.95rem" }}>Sarup Banskota</div>
                <div style={{ color: "#888", fontSize: "0.85rem" }}>Head of Growth</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
