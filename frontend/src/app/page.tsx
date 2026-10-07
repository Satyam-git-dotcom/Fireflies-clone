"use client";

import Link from "next/link";
import { ChevronDown, Menu, Globe, Zap, Users, CheckCircle2, MessageSquare, Plus, Share, Bookmark, Search as SearchIcon, Play, Video, Smartphone, MonitorSmartphone, Headset, Bell, Sparkles, Copy, AudioLines } from "lucide-react";

export default function LandingPage() {
  return (
    <div style={{ minHeight: "100vh", fontFamily: "var(--font-inter), sans-serif", color: "#fff", backgroundColor: "#0b0819", overflowX: "hidden" }}>
      
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
              <div style={{ width: 12, height: 12, border: "2px solid white", borderRadius: "50%" }} />
            </div>
            fireflies.ai
          </div>
          
          <nav style={{ display: "flex", gap: 24, fontSize: "0.95rem", fontWeight: 500, color: "#d1d5db" }} className="hide-on-mobile">
            <span style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }} className="interactive">Product <ChevronDown size={14} /></span>
            <span style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }} className="interactive">Solutions <ChevronDown size={14} /></span>
            <span style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }} className="interactive">Integration <ChevronDown size={14} /></span>
            <span style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }} className="interactive">Resources <ChevronDown size={14} /></span>
            <span style={{ cursor: "pointer" }} className="interactive">Enterprise</span>
            <span style={{ cursor: "pointer" }} className="interactive">Pricing</span>
          </nav>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Link href="/login" style={{ fontWeight: 500, fontSize: "0.95rem" }} className="interactive">Login</Link>
          <button className="interactive" style={{ padding: "8px 16px", backgroundColor: "#fff", color: "#000", borderRadius: 8, fontWeight: 600, fontSize: "0.95rem" }}>Request Demo</button>
          <button className="interactive" style={{ padding: "8px 16px", backgroundColor: "#7c3aed", color: "#fff", borderRadius: 8, fontWeight: 600, fontSize: "0.95rem", border: "none" }}>Get Started</button>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ textAlign: "center", paddingTop: 60, paddingBottom: 60, paddingLeft: 20, paddingRight: 20 }}>
        <h1 style={{ fontSize: "4rem", fontWeight: 700, lineHeight: 1.2, marginBottom: 24, maxWidth: 800, margin: "0 auto" }}>
          Automate your <br /> meeting notes
        </h1>
        <p style={{ fontSize: "1.2rem", color: "#d1d5db", marginBottom: 40, maxWidth: 600, margin: "0 auto 40px auto" }}>
          Fireflies.ai helps your team transcribe, summarize, search, and analyze voice conversations.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
          <button className="interactive" style={{ padding: "14px 28px", backgroundColor: "#7c3aed", color: "#fff", borderRadius: 8, fontWeight: 600, fontSize: "1rem", display: "flex", alignItems: "center", gap: 8, border: "none" }}>Get Started for Free <span>→</span></button>
          <button className="interactive" style={{ padding: "14px 28px", backgroundColor: "transparent", color: "#fff", border: "1px solid #4b5563", borderRadius: 8, fontWeight: 600, fontSize: "1rem" }}>Request Demo</button>
        </div>
      </section>

      {/* Companies */}
      <section style={{ textAlign: "center", padding: "40px 0" }}>
        <p style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: 1, color: "#9ca3af", marginBottom: 32 }}>USED ACROSS <span style={{ color: "#fff" }}>1 MILLION+</span> COMPANIES</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 60, opacity: 0.6, flexWrap: "wrap", alignItems: "center" }}>
          <h2 style={{ margin: 0, fontSize: "1.5rem", display: "flex", alignItems: "center", gap: 8 }}><div style={{ width: 24, height: 24, backgroundColor: "#fff", borderRadius: 4, transform: "skewX(-15deg)" }}></div> AssemblyAI</h2>
          <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 300 }}>EMAAR<span style={{ display: "block", fontSize: "0.6rem", letterSpacing: 2 }}>MISR</span></h2>
          <h2 style={{ margin: 0, fontSize: "1.2rem", display: "flex", alignItems: "center", gap: 8 }}><div style={{ width: 24, height: 24, border: "2px solid #fff", borderRadius: "50%" }}></div> Leonardo.Ai</h2>
          <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 700 }}>Penn</h2>
        </div>
      </section>

      {/* Hero Mockup (Dark Image) */}
      <section className="fade-in-up" style={{ display: "flex", justifyContent: "center", padding: "40px", marginBottom: 40 }}>
        <div style={{ width: "100%", maxWidth: 1100, backgroundColor: "#fff", borderRadius: 12, overflow: "hidden", position: "relative", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)", border: "1px solid #27272a" }}>
          {/* Header */}
          <div style={{ height: 64, borderBottom: "1px solid #e5e7eb", display: "flex", alignItems: "center", padding: "0 24px", justifyContent: "space-between", backgroundColor: "#fff", color: "#374151" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Menu size={20} color="#9ca3af" />
              <span style={{ fontSize: "0.95rem", fontWeight: 500, color: "#9ca3af" }}># Sales /</span>
              <span style={{ fontSize: "0.95rem", fontWeight: 600, color: "#111827" }}>Kickoff Call - Fireflies.ai x Acme</span>
              <span style={{ backgroundColor: "#34d399", color: "#fff", padding: "2px 6px", borderRadius: 4, fontSize: "0.7rem", fontWeight: "bold" }}>REC</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <img src="https://www.svgrepo.com/show/475689/slack-color.svg" width={16} /> <ChevronDown size={14} color="#9ca3af" />
              <button style={{ backgroundColor: "#7c3aed", color: "#fff", padding: "6px 12px", borderRadius: 6, display: "flex", alignItems: "center", gap: 6, border: "none", fontSize: "0.85rem", fontWeight: 500 }}><Share size={14} /> Share <span style={{ color: "#c4b5fd" }}>&lt;&gt;</span></button>
              <Plus size={20} color="#9ca3af" />
              <Bell size={20} color="#9ca3af" />
              <div style={{ width: 28, height: 28, backgroundColor: "#10b981", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.8rem", fontWeight: "bold" }}>S</div>
            </div>
          </div>
          
          <div style={{ display: "flex", height: 500 }}>
            {/* Very Left Icon Sidebar */}
            <div style={{ width: 56, borderRight: "1px solid #e5e7eb", display: "flex", flexDirection: "column", alignItems: "center", padding: "24px 0", gap: 24, backgroundColor: "#fff" }}>
              <SearchIcon size={20} color="#9ca3af" />
              <Sparkles size={20} color="#9ca3af" />
              <Video size={20} color="#9ca3af" />
              <MessageSquare size={20} color="#9ca3af" />
              <Bookmark size={20} color="#9ca3af" />
            </div>

            {/* Left Main Content */}
            <div style={{ flex: 1.5, padding: "32px 40px", overflowY: "auto", borderRight: "1px solid #e5e7eb", backgroundColor: "#fff" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
                <div>
                  <h1 style={{ fontSize: "1.8rem", fontWeight: 600, color: "#111827", marginBottom: 12 }}>Kickoff Call – Fireflies.ai x Acme</h1>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: "0.85rem", color: "#6b7280" }}>
                    <div style={{ width: 20, height: 20, backgroundColor: "#10b981", borderRadius: 4 }} /> Sarah Watts, +3
                    <span style={{ marginLeft: 8 }}>Mar 15 · 11:30 AM</span>
                  </div>
                </div>
                <button style={{ padding: "6px 12px", border: "1px solid #e5e7eb", borderRadius: 6, color: "#374151", display: "flex", alignItems: "center", gap: 6, backgroundColor: "#fff" }}><Video size={16} /> Video</button>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#7c3aed", fontWeight: 500, fontSize: "0.9rem" }}>
                  <Sparkles size={16} /> Sales Notes <ChevronDown size={14} />
                  <Copy size={16} color="#9ca3af" style={{ marginLeft: 8 }} />
                </div>
                <div style={{ color: "#6b7280", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: 6 }}><Plus size={14}/> AI Apps</div>
              </div>

              <div style={{ color: "#374151", fontSize: "0.95rem", lineHeight: 1.6 }}>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 600, color: "#111827", marginBottom: 12 }}>Overview</h3>
                <p style={{ marginBottom: 24, color: "#4b5563" }}>The kickoff call served as an introduction between Fireflies.ai and Acme Inc. They aim to use Fireflies.ai primarily to streamline internal communications, automate sales call follow-ups, and improve meeting workflows.</p>

                <h3 style={{ fontSize: "1.05rem", fontWeight: 600, color: "#111827", marginBottom: 12 }}>Notes</h3>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 600, color: "#374151", marginBottom: 12 }}>
                  <div style={{ width: 16, height: 16, backgroundColor: "#3b82f6", borderRadius: 4 }} /> Use Case & Requirements: 00:00 - 10:12
                </div>
                <ul style={{ paddingLeft: 24, marginBottom: 24, color: "#4b5563" }}>
                  <li style={{ marginBottom: 8 }}>Acme wants their sales team more present during calls</li>
                  <li style={{ marginBottom: 8 }}>They want to automate data entry in <span style={{ fontWeight: 600 }}>HubSpot</span> CRM</li>
                  <li style={{ marginBottom: 8 }}>Team managers want to use Fireflies to provide call coaching</li>
                </ul>

                <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 600, color: "#374151", marginBottom: 12 }}>
                  <div style={{ width: 16, height: 16, backgroundColor: "#3b82f6", borderRadius: 4 }} /> Metrics & Goals: 10:15 - 20:43
                </div>
                <ul style={{ paddingLeft: 24, marginBottom: 24, color: "#4b5563" }}>
                  <li style={{ marginBottom: 8 }}>Acme is looking to buy Fireflies for <span style={{ fontWeight: 600 }}>50 seats</span></li>
                  <li style={{ marginBottom: 8 }}>Timeline for implementation is <span style={{ fontWeight: 600 }}>1 week</span></li>
                </ul>
              </div>
            </div>

            {/* Right Transcript Panel */}
            <div style={{ flex: 1, backgroundColor: "#fff", display: "flex", flexDirection: "column", position: "relative" }}>
              <div style={{ padding: "16px 24px", borderBottom: "1px solid #e5e7eb", fontSize: "0.95rem", fontWeight: 500, color: "#374151" }}>Transcript</div>
              <div style={{ padding: "16px 24px", borderBottom: "1px solid #e5e7eb" }}>
                <div style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 6, padding: "8px 12px", display: "flex", alignItems: "center", gap: 8 }}>
                  <SearchIcon size={14} color="#9ca3af" />
                  <span style={{ color: "#9ca3af", fontSize: "0.9rem" }}>Search</span>
                </div>
              </div>

              <div style={{ flex: 1, padding: "24px", overflowY: "auto", display: "flex", flexDirection: "column", gap: 24 }}>
                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ width: 24, height: 24, backgroundColor: "#10b981", borderRadius: 4, flexShrink: 0 }} />
                  <div>
                    <div style={{ display: "flex", gap: 8, fontSize: "0.85rem", marginBottom: 6 }}>
                      <span style={{ fontWeight: 500, color: "#374151" }}>Sarah <ChevronDown size={12}/></span>
                      <span style={{ color: "#3b82f6" }}>00:53</span>
                    </div>
                    <p style={{ fontSize: "0.95rem", color: "#4b5563", lineHeight: 1.5 }}>We're aiming for a seamless onboarding experience, especially around the integrations with Slack and HubSpot.</p>
                  </div>
                </div>
                
                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ width: 24, height: 24, backgroundColor: "#f59e0b", borderRadius: 4, flexShrink: 0, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: "bold" }}>J</div>
                  <div>
                    <div style={{ display: "flex", gap: 8, fontSize: "0.85rem", marginBottom: 6 }}>
                      <span style={{ fontWeight: 500, color: "#374151" }}>Janice <ChevronDown size={12}/></span>
                      <span style={{ color: "#3b82f6" }}>01:24</span>
                    </div>
                    <p style={{ fontSize: "0.95rem", color: "#4b5563", lineHeight: 1.5 }}>Absolutely, our team will work closely with your tech lead to ensure a smooth integration process.</p>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ width: 24, height: 24, backgroundColor: "#ec4899", borderRadius: 4, flexShrink: 0, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: "bold" }}>C</div>
                  <div>
                    <div style={{ display: "flex", gap: 8, fontSize: "0.85rem", marginBottom: 6 }}>
                      <span style={{ fontWeight: 500, color: "#374151" }}>Chris <ChevronDown size={12}/></span>
                      <span style={{ color: "#3b82f6" }}>01:47</span>
                    </div>
                    <p style={{ fontSize: "0.95rem", color: "#4b5563", lineHeight: 1.5 }}>I'll prep the technical requirements and reach out to them right after this meeting.</p>
                  </div>
                </div>
              </div>

              {/* Floating Chat Icon */}
              <div style={{ position: "absolute", bottom: -20, right: -20 }}>
                <div style={{ width: 48, height: 48, backgroundColor: "#7c3aed", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 15px -3px rgba(124, 58, 237, 0.4)", cursor: "pointer" }}>
                  <MessageSquare size={20} color="#fff" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* High Quality Meeting Transcription (White BG) */}
      <section style={{ backgroundColor: "#fff", color: "#000", padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div className="fade-in-up">
            <h2 style={{ fontSize: "3rem", fontWeight: 700, lineHeight: 1.2, marginBottom: 16 }}>
              High Quality Meeting <br />
              <span style={{ color: "#7c3aed" }}>Transcription</span> & <span style={{ color: "#7c3aed" }}>Recording</span>
            </h2>
            <button className="interactive" style={{ padding: "12px 24px", backgroundColor: "#7c3aed", color: "#fff", borderRadius: 8, fontWeight: 600, fontSize: "1rem", marginTop: 24, marginBottom: 60, display: "inline-flex", alignItems: "center", gap: 8, border: "none" }}>Get Started <span>→</span></button>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
              <div>
                <div style={{ marginBottom: 16 }}><div style={{ width: 24, height: 24, border: "2px dashed #000", borderRadius: "50%" }} /></div>
                <div style={{ fontWeight: 600, fontSize: "1.1rem", marginBottom: 8, color: "#111827" }}>95% Accurate</div>
                <p style={{ color: "#4b5563", fontSize: "0.95rem", lineHeight: 1.5 }}>Fireflies is the industry leader in transcription accuracy.</p>
              </div>
              <div>
                <div style={{ marginBottom: 16 }}><Globe size={24} color="#000" /></div>
                <div style={{ fontWeight: 600, fontSize: "1.1rem", marginBottom: 8, color: "#111827" }}>100+ Languages</div>
                <p style={{ color: "#4b5563", fontSize: "0.95rem", lineHeight: 1.5 }}>Transcribe meetings in English, Spanish, French, & several others.</p>
              </div>
              <div>
                <div style={{ marginBottom: 16 }}><Users size={24} color="#000" /></div>
                <div style={{ fontWeight: 600, fontSize: "1.1rem", marginBottom: 8, color: "#111827" }}>Speaker Recognition</div>
                <p style={{ color: "#4b5563", fontSize: "0.95rem", lineHeight: 1.5 }}>Fireflies identifies different speakers in meetings and audio files.</p>
              </div>
              <div>
                <div style={{ marginBottom: 16 }}><Zap size={24} color="#000" /></div>
                <div style={{ fontWeight: 600, fontSize: "1.1rem", marginBottom: 8, color: "#111827" }}>Auto-Language Detection</div>
                <p style={{ color: "#4b5563", fontSize: "0.95rem", lineHeight: 1.5 }}>Automatically switch languages from meeting to meeting with ease.</p>
              </div>
            </div>
          </div>
          
          <div className="fade-in-up" style={{ backgroundColor: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)", display: "flex", flexDirection: "column", height: 600 }}>
             <div style={{ padding: "16px 24px", borderBottom: "1px solid #e5e7eb", fontSize: "0.95rem", fontWeight: 500, color: "#374151" }}>Transcript</div>
             <div style={{ padding: "16px 24px", borderBottom: "1px solid #e5e7eb" }}>
               <div style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 6, padding: "8px 12px", display: "flex", alignItems: "center", gap: 8 }}>
                 <SearchIcon size={14} color="#9ca3af" />
                 <span style={{ color: "#9ca3af", fontSize: "0.9rem" }}>Search</span>
               </div>
             </div>
             
             <div style={{ padding: 24, flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
               <div style={{ display: "flex", gap: 16 }}>
                 <div style={{ width: 24, height: 24, borderRadius: 4, backgroundColor: "#b48372", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "10px", fontWeight: "bold" }}>C</div>
                 <div>
                   <div style={{ fontWeight: 500, fontSize: "0.9rem", marginBottom: 6, color: "#111827", display: "flex", gap: 8 }}>Cate <ChevronDown size={12} color="#9ca3af"/> <span style={{ color: "#3b82f6" }}>00:53</span></div>
                   <p style={{ fontSize: "0.95rem", color: "#4b5563", lineHeight: 1.5 }}>There's some concern about onboarding. Clients feel it's not intuitive enough.</p>
                   <div style={{ width: 12, height: 16, backgroundColor: "#60a5fa", marginTop: 8, borderRadius: 2 }} />
                 </div>
               </div>
               <div style={{ display: "flex", gap: 16 }}>
                 <div style={{ width: 24, height: 24, borderRadius: 4, backgroundColor: "#f59e0b", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "10px", fontWeight: "bold" }}>R</div>
                 <div>
                   <div style={{ fontWeight: 500, fontSize: "0.9rem", marginBottom: 6, color: "#111827", display: "flex", gap: 8 }}>Rohan <ChevronDown size={12} color="#9ca3af"/> <span style={{ color: "#3b82f6" }}>01:24</span></div>
                   <p style={{ fontSize: "0.95rem", color: "#4b5563", lineHeight: 1.5 }}>Noted. We'll pass that to product. On the seating front, how are we doing with capacity?</p>
                 </div>
               </div>
               <div style={{ display: "flex", gap: 16 }}>
                 <div style={{ width: 24, height: 24, borderRadius: 4, backgroundColor: "#ec4899", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "10px", fontWeight: "bold" }}>T</div>
                 <div>
                   <div style={{ fontWeight: 500, fontSize: "0.9rem", marginBottom: 6, color: "#111827", display: "flex", gap: 8 }}>Tom <ChevronDown size={12} color="#9ca3af"/> <span style={{ color: "#3b82f6" }}>01:47</span></div>
                   <div style={{ width: "80%", height: 12, backgroundColor: "#f3f4f6", borderRadius: 4, marginTop: 4 }}></div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Capture Meetings Anywhere & Anytime */}
      <section style={{ backgroundColor: "#fff", color: "#000", padding: "0px 48px 100px 48px", textAlign: "center" }}>
        <h2 className="fade-in-up" style={{ fontSize: "3rem", fontWeight: 700, marginBottom: 60 }}>
          <span style={{ color: "#7c3aed" }}>Capture</span> Meetings <span style={{ color: "#7c3aed" }}>Anywhere</span> & Anytime
        </h2>
        
        <div style={{ display: "flex", gap: 24, maxWidth: 1200, margin: "0 auto", textAlign: "left" }}>
          
          {/* Left Card: AI Note Taker Bot */}
          <div className="fade-in-up" style={{ flex: 1, backgroundColor: "#f5f3ff", borderRadius: 24, padding: "40px", overflow: "hidden", border: "1px solid #ede9fe", display: "flex", flexDirection: "column" }}>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: 12, color: "#111827" }}>AI Note Taker Bot</h3>
            <p style={{ fontSize: "1rem", color: "#4b5563", marginBottom: 40, lineHeight: 1.5 }}>
              Invite fred@fireflies.ai to a live meeting or have it autojoin your calendar meetings to record, transcribe, and summarize.
            </p>
            
            <div style={{ flex: 1, backgroundColor: "#000", borderRadius: 16, overflow: "hidden", position: "relative", minHeight: 250 }}>
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.8 }} />
              
              {/* Meeting Bottom Bar Mock */}
              <div style={{ position: "absolute", bottom: 16, left: 16, backgroundColor: "#1f2937", padding: "8px 12px", borderRadius: 24, display: "flex", gap: 12 }}>
                <Video size={16} color="#34d399" />
                <MessageSquare size={16} color="#3b82f6" />
                <Plus size={16} color="#a78bfa" />
              </div>

              {/* Bot Popups Mock */}
              <div style={{ position: "absolute", top: 20, right: 20, backgroundColor: "#fff", borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", gap: 16, boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}>
                <div style={{ width: 24, height: 24, backgroundColor: "#3b82f6", borderRadius: 4 }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.85rem", color: "#111827" }}>Sales Demo</div>
                  <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>Janice, +2</div>
                </div>
                <div style={{ width: 36, height: 20, backgroundColor: "#7c3aed", borderRadius: 10, position: "relative", marginLeft: 16 }}>
                  <div style={{ width: 16, height: 16, backgroundColor: "#fff", borderRadius: "50%", position: "absolute", right: 2, top: 2 }} />
                </div>
              </div>
              
              {/* Fireflies Bot Card */}
              <div style={{ position: "absolute", bottom: 20, right: 20, backgroundColor: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", borderRadius: 16, width: 220, height: 140, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.2)" }}>
                <div style={{ width: 48, height: 48, backgroundColor: "rgba(0,0,0,0.3)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                  <div style={{ width: 24, height: 24, backgroundColor: "#f43f5e", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 12, height: 12, border: "2px solid white", borderRadius: "50%" }} />
                  </div>
                </div>
                <div style={{ color: "#fff", fontSize: "0.85rem", fontWeight: 500 }}>Janice's Fireflies.ai Notetaker</div>
              </div>
            </div>
          </div>

          {/* Right Card: Chrome Extension */}
          <div className="fade-in-up" style={{ flex: 1, backgroundColor: "#fefce8", borderRadius: 24, padding: "40px", overflow: "hidden", border: "1px solid #fef08a", display: "flex", flexDirection: "column" }}>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: 12, color: "#111827" }}>Chrome Extension</h3>
            <p style={{ fontSize: "1rem", color: "#4b5563", marginBottom: 40, lineHeight: 1.5 }}>
              Automatically record your Google Meet calls and <span style={{ textDecoration: "underline", fontWeight: 600 }}>get real-time transcripts</span>.
            </p>
            
            <div style={{ flex: 1, backgroundColor: "#1f2937", borderRadius: 16, overflow: "hidden", position: "relative", minHeight: 250, padding: 16 }}>
              <div style={{ width: "80%", height: 160, borderRadius: 12, overflow: "hidden", position: "relative", border: "2px solid #3b82f6" }}>
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", bottom: 12, left: 12, color: "#fff", fontSize: "0.85rem", fontWeight: 500, textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>Michael Hines</div>
                <div style={{ position: "absolute", top: 12, right: 12, width: 24, height: 24, backgroundColor: "rgba(0,0,0,0.5)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <AudioLines size={12} color="#fff" />
                </div>
              </div>
              
              <div style={{ position: "absolute", bottom: 80, right: 20, backgroundColor: "#10b981", color: "#fff", padding: "4px 8px", borderRadius: 4, fontSize: "0.7rem", fontWeight: "bold", display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 8, height: 8, backgroundColor: "#fff", borderRadius: "50%" }} /> TRANSCRIBING
              </div>
              
              <div style={{ position: "absolute", bottom: 20, right: 20, backgroundColor: "#fff", borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)", width: 220 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 24, height: 24, backgroundColor: "#3b82f6", borderRadius: 4 }} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.85rem", color: "#111827", display: "flex", alignItems: "center", gap: 4 }}>Sales Demo <span style={{ width: 6, height: 6, backgroundColor: "#ef4444", borderRadius: "50%" }} /></div>
                    <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>02:14</div>
                  </div>
                </div>
                <div style={{ width: 24, height: 24, backgroundColor: "#fee2e2", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 8, height: 8, backgroundColor: "#ef4444", borderRadius: 2 }} />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 3 Bottom Apps Row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, maxWidth: 1200, margin: "40px auto 0", textAlign: "left" }}>
          <div className="interactive" style={{ padding: "24px", border: "1px solid #e5e7eb", borderRadius: 16 }}>
             <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
               <div style={{ width: 24, height: 24, backgroundColor: "#3b82f6", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}><Smartphone size={14} color="#fff" /></div>
               <div style={{ width: 24, height: 24, backgroundColor: "#10b981", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}><Play size={14} color="#fff" /></div>
             </div>
             <h4 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#111827", marginBottom: 8 }}>Mobile App</h4>
             <p style={{ fontSize: "0.9rem", color: "#4b5563" }}>Transcribe and summarize in-person meetings, interviews, and more.</p>
          </div>
          <div className="interactive" style={{ padding: "24px", border: "1px solid #e5e7eb", borderRadius: 16 }}>
             <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
               <div style={{ width: 24, height: 24, backgroundColor: "#f43f5e", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}><MonitorSmartphone size={14} color="#fff" /></div>
             </div>
             <h4 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#111827", marginBottom: 8 }}>Desktop App</h4>
             <p style={{ fontSize: "0.9rem", color: "#4b5563" }}>Transcribe and summarize your calls with the native Windows and Mac app.</p>
          </div>
          <div className="interactive" style={{ padding: "24px", border: "1px solid #e5e7eb", borderRadius: 16 }}>
             <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
               <div style={{ width: 24, height: 24, backgroundColor: "#10b981", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}><Headset size={14} color="#fff" /></div>
               <div style={{ width: 24, height: 24, backgroundColor: "#f59e0b", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>R</div>
             </div>
             <h4 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#111827", marginBottom: 8 }}>Dialers & API</h4>
             <p style={{ fontSize: "0.9rem", color: "#4b5563" }}>Transcribe calls from Aircall, Ringcentral and more using our seamless API.</p>
          </div>
        </div>
      </section>

      {/* Comprehensive AI Summaries (Dark BG) */}
      <section style={{ backgroundColor: "#0b0819", color: "#fff", padding: "100px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          
          <div className="fade-in-up" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 60 }}>
            <div>
               <h2 style={{ fontSize: "3rem", fontWeight: 700, marginBottom: 16 }}>
                 Comprehensive <span style={{ color: "#a78bfa" }}>AI Summaries</span>
               </h2>
               <p style={{ fontSize: "1.1rem", color: "#d1d5db", maxWidth: 600 }}>
                 Get detailed notes, action items, and customized summaries instantly after every meeting.
               </p>
            </div>
            <button className="interactive" style={{ padding: "12px 24px", backgroundColor: "#7c3aed", color: "#fff", borderRadius: 8, fontWeight: 600, fontSize: "1rem", border: "none" }}>Get Started <span>→</span></button>
          </div>
          
          {/* Summary tabs */}
          <div className="fade-in-up" style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 40 }}>
            <span className="interactive" style={{ padding: "10px 20px", backgroundColor: "#1f2937", borderRadius: 8, fontSize: "0.95rem", fontWeight: 500, color: "#9ca3af", cursor: "pointer" }}>Overview</span>
            <span className="interactive" style={{ padding: "10px 20px", backgroundColor: "#1f2937", borderRadius: 8, fontSize: "0.95rem", fontWeight: 500, color: "#9ca3af", cursor: "pointer" }}>Bullet Points</span>
            <span className="interactive" style={{ padding: "10px 20px", backgroundColor: "#e5e7eb", borderRadius: 8, fontSize: "0.95rem", fontWeight: 600, color: "#111827", cursor: "pointer" }}>Action Items</span>
            <span className="interactive" style={{ padding: "10px 20px", backgroundColor: "#1f2937", borderRadius: 8, fontSize: "0.95rem", fontWeight: 500, color: "#9ca3af", cursor: "pointer" }}>Custom Notes</span>
          </div>

          <div className="fade-in-up" style={{ backgroundColor: "#fff", borderRadius: 16, width: "100%", maxWidth: 1000, margin: "0 auto", overflow: "hidden", color: "#000", border: "1px solid #e5e7eb" }}>
            
            {/* Mockup Header */}
            <div style={{ height: 60, borderBottom: "1px solid #e5e7eb", display: "flex", alignItems: "center", padding: "0 24px", justifyContent: "space-between", backgroundColor: "#fff", color: "#374151" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <Menu size={20} color="#9ca3af" />
                <span style={{ fontSize: "0.95rem", fontWeight: 500, color: "#9ca3af" }}># Sales /</span>
                <span style={{ fontSize: "0.95rem", fontWeight: 600, color: "#111827" }}>Kickoff Call - Fireflies.ai x Acme</span>
                <span style={{ backgroundColor: "#34d399", color: "#fff", padding: "2px 6px", borderRadius: 4, fontSize: "0.7rem", fontWeight: "bold" }}>REC</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#4b5563", fontSize: "0.9rem", fontWeight: 500 }}>
                  <AudioLines size={16} /> Soundbite
                </div>
                <button style={{ backgroundColor: "#7c3aed", color: "#fff", padding: "6px 12px", borderRadius: 6, display: "flex", alignItems: "center", gap: 6, border: "none", fontSize: "0.85rem", fontWeight: 500 }}><Share size={14} /> Share</button>
                <div style={{ border: "1px solid #e5e7eb", borderRadius: 4, padding: 2 }}><Plus size={16} color="#9ca3af" /></div>
                <div style={{ width: 28, height: 28, backgroundColor: "#10b981", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.8rem", fontWeight: "bold" }}>S</div>
              </div>
            </div>

            <div style={{ padding: "40px 80px", color: "#374151", minHeight: 400 }}>
               
               <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                 <div style={{ padding: "2px 4px", border: "1px solid #e5e7eb", borderRadius: 4, fontSize: "0.7rem", fontWeight: "bold", color: "#ef4444" }}>17</div>
                 <h3 style={{ fontSize: "1.05rem", fontWeight: 600, color: "#111827", margin: 0 }}>Requests: 20:50 - 34:52</h3>
               </div>
               
               <ul style={{ paddingLeft: 32, marginBottom: 32, color: "#4b5563", display: "flex", flexDirection: "column", gap: 12 }}>
                 <li>Acme mainly uses Zoom but wants a deeper <span style={{ fontWeight: 600 }}>Fireflies</span> integration with <span style={{ fontWeight: 600 }}>Aircall</span>.</li>
                 <li>Chris would like more guidance on <span style={{ fontWeight: 600 }}>HubSpot</span> setup.</li>
               </ul>

               <h3 style={{ fontSize: "1.05rem", fontWeight: 600, color: "#111827", margin: "32px 0 16px 0" }}>Action Items</h3>
               
               <div style={{ fontSize: "1rem", color: "#4b5563", marginBottom: 12 }}>Chris</div>
               <ul style={{ paddingLeft: 32, marginBottom: 24, color: "#4b5563", display: "flex", flexDirection: "column", gap: 12 }}>
                 <li>Prepare technical requirements for setting up integrations. <span style={{ color: "#3b82f6" }}>01:47</span></li>
                 <li>Provide a final list of <span style={{ fontWeight: 600 }}>50 users</span> for initial training by Thursday. <span style={{ color: "#3b82f6" }}>24:42</span></li>
               </ul>

               <div style={{ fontSize: "1rem", color: "#4b5563", marginBottom: 12 }}>Sarah</div>
               <ul style={{ paddingLeft: 32, marginBottom: 24, color: "#4b5563", display: "flex", flexDirection: "column", gap: 12 }}>
                 <li>Schedule training sessions for the team, with weekly feedback calls. <span style={{ color: "#3b82f6" }}>02:19</span></li>
               </ul>

               <h3 style={{ fontSize: "1.05rem", fontWeight: 600, color: "#111827", margin: "32px 0 16px 0" }}>Meeting Outcome</h3>
               <p style={{ color: "#4b5563", paddingLeft: 8 }}>The call was productive. Acme has agreed to move forward with a 50-seat deployment next week.</p>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
