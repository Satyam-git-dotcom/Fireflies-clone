"use client";

import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";

export default function LandingPage() {
  return (
    <div style={{ minHeight: "100vh", fontFamily: "var(--font-inter), sans-serif", color: "#fff", backgroundColor: "#0b0819" }}>
      
      {/* Top Banner */}
      <div style={{ backgroundColor: "#7c3aed", color: "#fff", padding: "8px", textAlign: "center", fontSize: "0.85rem", fontWeight: 500 }}>
        <span style={{ backgroundColor: "#10b981", color: "#fff", padding: "2px 6px", borderRadius: 4, marginRight: 8, fontSize: "0.75rem" }}>NEW</span>
        Meet Fireflies Talk: Free, unlimited dictation wherever you type. <span style={{ textDecoration: "underline", cursor: "pointer" }}>See Now</span>
      </div>

      {/* Navbar */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 48px", maxWidth: 1440, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700, fontSize: "1.2rem", color: "#fff" }}>
            <div style={{ width: 24, height: 24, backgroundColor: "#f43f5e", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 12, height: 12, border: "2px solid white" }} />
            </div>
            fireflies.ai
          </div>
          
          <nav style={{ display: "flex", gap: 24, fontSize: "0.95rem", fontWeight: 500, color: "#d1d5db" }} className="hide-on-mobile">
            <span style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>Product <ChevronDown size={14} /></span>
            <span style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>Solutions <ChevronDown size={14} /></span>
            <span style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>Integration <ChevronDown size={14} /></span>
            <span style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>Resources <ChevronDown size={14} /></span>
            <span style={{ cursor: "pointer" }}>Enterprise</span>
            <span style={{ cursor: "pointer" }}>Pricing</span>
          </nav>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Link href="/login" style={{ fontWeight: 500, fontSize: "0.95rem" }}>Login</Link>
          <button style={{ padding: "8px 16px", backgroundColor: "#fff", color: "#000", borderRadius: 8, fontWeight: 600, fontSize: "0.95rem" }}>Request Demo</button>
          <button style={{ padding: "8px 16px", backgroundColor: "#7c3aed", color: "#fff", borderRadius: 8, fontWeight: 600, fontSize: "0.95rem" }}>Get Started</button>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ textAlign: "center", paddingTop: 80, paddingBottom: 60, px: 20 }}>
        <h1 style={{ fontSize: "4rem", fontWeight: 700, lineHeight: 1.2, marginBottom: 24, maxWidth: 800, margin: "0 auto" }}>
          The #1 AI Assistant For <br /> Your Meetings
        </h1>
        <p style={{ fontSize: "1.2rem", color: "#d1d5db", marginBottom: 40 }}>
          Transcribe, summarize, search, and analyze all your team conversations.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
          <button style={{ padding: "12px 24px", backgroundColor: "#7c3aed", color: "#fff", borderRadius: 8, fontWeight: 600, fontSize: "1rem", display: "flex", alignItems: "center", gap: 8 }}>Get Started <span>→</span></button>
          <button style={{ padding: "12px 24px", backgroundColor: "transparent", color: "#fff", border: "1px solid #4b5563", borderRadius: 8, fontWeight: 600, fontSize: "1rem" }}>Request Demo</button>
        </div>
      </section>

      {/* Hero Graphic Mockup */}
      <section style={{ display: "flex", justifyContent: "center", padding: "0 40px", marginBottom: 80 }}>
        <div style={{ width: "100%", maxWidth: 1000, height: 600, backgroundColor: "#fff", borderRadius: 16, overflow: "hidden", position: "relative", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}>
          {/* Top Mock Window Bar */}
          <div style={{ height: 40, backgroundColor: "#f3f4f6", borderBottom: "1px solid #e5e7eb", display: "flex", alignItems: "center", padding: "0 16px", gap: 8 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ef4444" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#f59e0b" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#10b981" }} />
          </div>
          
          <div style={{ display: "flex", height: "100%" }}>
            {/* Sidebar mock */}
            <div style={{ width: 60, borderRight: "1px solid #e5e7eb", display: "flex", flexDirection: "column", alignItems: "center", padding: "16px 0", gap: 24 }}>
              <Menu size={20} color="#6b7280" />
              <div style={{ width: 24, height: 24, borderRadius: "50%", backgroundColor: "#f3f4f6" }} />
              <div style={{ width: 24, height: 24, borderRadius: "50%", backgroundColor: "#f3f4f6" }} />
            </div>
            {/* Main content mock */}
            <div style={{ flex: 1, padding: 40 }}>
              <div style={{ fontSize: "1.5rem", fontWeight: 600, color: "#111827", marginBottom: 24 }}>Kickoff Call - Fireflies.ai x Acme</div>
              <div style={{ display: "flex", gap: 40 }}>
                <div style={{ flex: 2 }}>
                  <div style={{ height: 20, width: "100%", backgroundColor: "#f3f4f6", borderRadius: 4, marginBottom: 12 }} />
                  <div style={{ height: 20, width: "80%", backgroundColor: "#f3f4f6", borderRadius: 4, marginBottom: 12 }} />
                  <div style={{ height: 20, width: "90%", backgroundColor: "#f3f4f6", borderRadius: 4, marginBottom: 12 }} />
                  
                  <div style={{ marginTop: 40, height: 20, width: "40%", backgroundColor: "#f3f4f6", borderRadius: 4, marginBottom: 12 }} />
                  <div style={{ height: 20, width: "100%", backgroundColor: "#f3f4f6", borderRadius: 4, marginBottom: 12 }} />
                </div>
                <div style={{ flex: 1, borderLeft: "1px solid #e5e7eb", paddingLeft: 24 }}>
                  <div style={{ height: 20, width: "60%", backgroundColor: "#f3f4f6", borderRadius: 4, marginBottom: 16 }} />
                  <div style={{ height: 60, width: "100%", backgroundColor: "#f3f4f6", borderRadius: 8, marginBottom: 16 }} />
                  <div style={{ height: 60, width: "100%", backgroundColor: "#f3f4f6", borderRadius: 8, marginBottom: 16 }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Companies */}
      <section style={{ textAlign: "center", padding: "40px 0" }}>
        <p style={{ fontSize: "0.85rem", fontWeight: 600, letterSpacing: 1, color: "#9ca3af", marginBottom: 32 }}>USED ACROSS 1 MILLION+ COMPANIES</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 60, opacity: 0.6, flexWrap: "wrap", alignItems: "center" }}>
          <h2 style={{ margin: 0, fontSize: "1.5rem" }}>AssemblyAI</h2>
          <h2 style={{ margin: 0, fontSize: "1.5rem" }}>EMAAR</h2>
          <h2 style={{ margin: 0, fontSize: "1.5rem" }}>Leonardo.Ai</h2>
          <h2 style={{ margin: 0, fontSize: "1.5rem" }}>Penn</h2>
        </div>
      </section>

      {/* White Section for Features */}
      <section style={{ backgroundColor: "#fff", color: "#000", padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: "3rem", fontWeight: 700, lineHeight: 1.2, marginBottom: 16 }}>
              High Quality Meeting <br />
              <span style={{ color: "#7c3aed" }}>Transcription</span> & <span style={{ color: "#7c3aed" }}>Recording</span>
            </h2>
            <button style={{ padding: "12px 24px", backgroundColor: "#7c3aed", color: "#fff", borderRadius: 8, fontWeight: 600, fontSize: "1rem", marginTop: 24, marginBottom: 40, display: "inline-flex", alignItems: "center", gap: 8 }}>Get Started <span>→</span></button>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: "1.1rem", marginBottom: 8 }}>95% Accurate</div>
                <p style={{ color: "#4b5563", fontSize: "0.95rem" }}>Fireflies is the industry leader in transcription accuracy.</p>
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: "1.1rem", marginBottom: 8 }}>100+ Languages</div>
                <p style={{ color: "#4b5563", fontSize: "0.95rem" }}>Transcribe meetings in English, Spanish, French, & several others.</p>
              </div>
            </div>
          </div>
          
          <div style={{ backgroundColor: "#f9fafb", borderRadius: 16, padding: 32, border: "1px solid #f3f4f6", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}>
             {/* Transcript Mockup */}
             <div style={{ borderBottom: "1px solid #e5e7eb", paddingBottom: 16, marginBottom: 16 }}>
               <input type="text" placeholder="Search" style={{ width: "100%", padding: "8px 12px", borderRadius: 6, border: "1px solid #e5e7eb", backgroundColor: "#fff" }} />
             </div>
             <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
               <div style={{ width: 32, height: 32, borderRadius: "50%", backgroundColor: "#10b981" }} />
               <div>
                 <div style={{ fontWeight: 500, fontSize: "0.9rem", marginBottom: 4 }}>Cate <span style={{ color: "#7c3aed", marginLeft: 8 }}>00:53</span></div>
                 <p style={{ fontSize: "0.95rem", color: "#374151" }}>There's some concern about onboarding. Clients feel it's not intuitive enough.</p>
               </div>
             </div>
             <div style={{ display: "flex", gap: 16 }}>
               <div style={{ width: 32, height: 32, borderRadius: "50%", backgroundColor: "#f59e0b" }} />
               <div>
                 <div style={{ fontWeight: 500, fontSize: "0.9rem", marginBottom: 4 }}>Rohan <span style={{ color: "#7c3aed", marginLeft: 8 }}>01:24</span></div>
                 <p style={{ fontSize: "0.95rem", color: "#374151" }}>Noted. We'll pass that to product. On the seating front, how are we doing with capacity?</p>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Dark Section - Comprehensive AI Summaries */}
      <section style={{ backgroundColor: "#0b0819", color: "#fff", padding: "100px 48px", textAlign: "center" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ fontSize: "3rem", fontWeight: 700, marginBottom: 16 }}>
            Comprehensive <span style={{ color: "#a78bfa" }}>AI Summaries</span>
          </h2>
          <p style={{ fontSize: "1.1rem", color: "#d1d5db", maxWidth: 600, margin: "0 auto", marginBottom: 32 }}>
            Get detailed notes, action items, and customized summaries instantly after every meeting.
          </p>
          <button style={{ padding: "12px 24px", backgroundColor: "#7c3aed", color: "#fff", borderRadius: 8, fontWeight: 600, fontSize: "1rem", marginBottom: 40 }}>Get Started <span>→</span></button>
          
          {/* Summary tabs */}
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 40 }}>
            <span style={{ padding: "8px 16px", backgroundColor: "#1f2937", borderRadius: 8, fontSize: "0.9rem", fontWeight: 500 }}>Overview</span>
            <span style={{ padding: "8px 16px", backgroundColor: "#7c3aed", borderRadius: 8, fontSize: "0.9rem", fontWeight: 500 }}>Bullet Points</span>
            <span style={{ padding: "8px 16px", backgroundColor: "#1f2937", borderRadius: 8, fontSize: "0.9rem", fontWeight: 500 }}>Action Items</span>
            <span style={{ padding: "8px 16px", backgroundColor: "#1f2937", borderRadius: 8, fontSize: "0.9rem", fontWeight: 500 }}>Custom Notes</span>
          </div>

          <div style={{ backgroundColor: "#fff", borderRadius: 16, height: 400, width: "100%", maxWidth: 900, margin: "0 auto", padding: 40, textAlign: "left", color: "#000" }}>
            <div style={{ fontSize: "1.1rem", fontWeight: 500, marginBottom: 16, color: "#374151" }}>Notes</div>
            <ul style={{ paddingLeft: 24, display: "flex", flexDirection: "column", gap: 16 }}>
              <li style={{ fontSize: "1rem", color: "#4b5563" }}>Acme wants their sales team more present during calls</li>
              <li style={{ fontSize: "1rem", color: "#4b5563" }}>They want to automate data entry in HubSpot CRM</li>
              <li style={{ fontSize: "1rem", color: "#4b5563" }}>Team managers want to use Fireflies to provide call coaching</li>
            </ul>
          </div>
        </div>
      </section>

    </div>
  );
}
