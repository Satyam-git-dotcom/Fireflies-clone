"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Search, Bell, Video, Home, UserCircle, Calendar, Upload, Plus, ChevronDown, Sparkles } from "lucide-react";

export default function MeetingsDashboard() {
  const [meetings, setMeetings] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/meetings/")
      .then((res) => res.json())
      .then((data) => setMeetings(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredMeetings = meetings.filter(m => m.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      
      {/* Left Sidebar */}
      <aside style={{ width: 240, backgroundColor: "var(--surface-dark)", display: "flex", flexDirection: "column", borderRight: "1px solid var(--border-dark)" }}>
        
        <div style={{ padding: "20px 16px", borderBottom: "1px solid var(--border-dark)", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
          <div style={{ width: 24, height: 24, borderRadius: 4, backgroundColor: "#d97757", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: "bold" }}>S</div>
          <span style={{ fontWeight: 500 }}>Satyam</span>
          <ChevronDown size={14} style={{ marginLeft: "auto", color: "var(--text-muted)" }} />
        </div>

        <nav style={{ padding: "16px 8px", flexGrow: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 8, backgroundColor: "#24272c", color: "#fff", fontWeight: 500, fontSize: "0.9rem" }}>
            <Home size={18} /> Home
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 8, color: "var(--text-secondary)", fontWeight: 500, fontSize: "0.9rem", cursor: "pointer" }}>
            <Sparkles size={18} /> AskFred
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 8, color: "var(--text-secondary)", fontWeight: 500, fontSize: "0.9rem", cursor: "pointer" }}>
            <Video size={18} /> Meetings
          </div>
        </nav>

        <div style={{ padding: 16 }}>
          <button className="btn btn-primary" style={{ width: "100%" }}>Download Desktop App</button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        
        {/* Topbar */}
        <header style={{ height: 64, borderBottom: "1px solid var(--border-dark)", display: "flex", alignItems: "center", padding: "0 24px", justifyContent: "space-between" }}>
          <div style={{ color: "var(--text-secondary)", fontWeight: 500 }}>Home</div>
          <div className="input-wrapper" style={{ width: 400 }}>
            <Search className="input-icon" size={16} />
            <input type="text" className="input with-icon" placeholder="Search by title or keyword" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ padding: "8px 12px 8px 36px", fontSize: "0.85rem", backgroundColor: "transparent" }} />
          </div>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}><span style={{ color: "#10b981" }}>3</span> Free meetings</span>
            <button style={{ border: "1px solid #10b981", color: "#10b981", padding: "4px 12px", borderRadius: 4, fontSize: "0.85rem" }}>Upgrade</button>
            <Bell size={20} color="var(--text-secondary)" />
            <button className="btn btn-primary" style={{ padding: "6px 12px" }}><Video size={16} /> Capture</button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "40px 80px" }}>
          
          <div className="banner">
            <div>
              <h1 style={{ fontSize: "1.8rem", fontWeight: 600, marginBottom: 8 }}>Welcome Aboard, Satyam!</h1>
              <p style={{ color: "var(--text-secondary)", maxWidth: 300, lineHeight: 1.6 }}>Fireflies is now ready to automate your meetings and streamline your workflows.</p>
            </div>
            <div style={{ width: 280, height: 160, backgroundColor: "var(--primary-color)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <div style={{ width: 0, height: 0, borderTop: "8px solid transparent", borderBottom: "8px solid transparent", borderLeft: "12px solid #fff", marginLeft: 4 }} />
              </div>
            </div>
          </div>

          <h2 style={{ fontSize: "1.2rem", fontWeight: 600, marginBottom: 8 }}>Quick Start</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: 24 }}>Capture your first meeting or upload a recording to see Fireflies in action.</p>

          <div style={{ display: "flex", gap: 24, marginBottom: 40 }}>
            <div className="quick-start-btn" style={{ borderLeft: "4px solid #f43f5e" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}><Calendar size={20} color="#f43f5e" /> Schedule Meeting</div>
            </div>
            <div className="quick-start-btn" style={{ borderLeft: "4px solid #10b981" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}><Upload size={20} color="#10b981" /> Upload File</div>
            </div>
            <div className="quick-start-btn" style={{ borderLeft: "4px solid #3b82f6" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}><Plus size={20} color="#3b82f6" /> Capture Meeting</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 24, borderBottom: "1px solid var(--border-dark)", paddingBottom: 12, marginBottom: 24 }}>
            <div style={{ fontWeight: 500, color: "#fff", cursor: "pointer" }}>Recent</div>
            <div style={{ fontWeight: 500, color: "var(--text-muted)", cursor: "pointer" }}>Upcoming</div>
            <div style={{ fontWeight: 500, color: "var(--text-muted)", cursor: "pointer" }}>AI Feed</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {filteredMeetings.map((meeting) => (
              <Link key={meeting.id} href={`/meeting/${meeting.id}`} style={{ display: "flex", gap: 16, alignItems: "center", padding: "16px", borderRadius: 8, cursor: "pointer" }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, width: 24, height: 24 }}>
                    <div style={{ backgroundColor: "#f43f5e", borderRadius: 2 }}></div>
                    <div style={{ backgroundColor: "#3b82f6", borderRadius: 2 }}></div>
                    <div style={{ backgroundColor: "#f59e0b", borderRadius: 2 }}></div>
                    <div style={{ backgroundColor: "#10b981", borderRadius: 2 }}></div>
                  </div>
                </div>
                <div>
                  <h3 style={{ fontWeight: 500, marginBottom: 4, color: "#fff" }}>{meeting.title}</h3>
                  <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                    {format(new Date(meeting.date), "E, MMM d yyyy, h:mm a")}
                  </div>
                </div>
              </Link>
            ))}
            {filteredMeetings.length === 0 && <div style={{ color: "var(--text-muted)" }}>No meetings found.</div>}
          </div>

        </div>
      </main>

    </div>
  );
}
