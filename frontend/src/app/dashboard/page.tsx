"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { Search, Bell, Video, Home, Plus, ChevronDown, Bot, LayoutGrid, Upload, Mic, SlidersHorizontal, Settings, Users, Sparkles, MessageSquare, Briefcase, Zap, X, ArrowUp, BarChart2, MoreHorizontal, Share, Link as LinkIcon, Download, FolderInput, Edit2, Trash2, CheckCircle2, Rss, Calendar, CalendarDays, ExternalLink, HelpCircle } from "lucide-react";

export default function MeetingsLibrary() {
  const [meetings, setMeetings] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [showFilters, setShowFilters] = useState(false);
  
  // Navigation states
  const [currentNav, setCurrentNav] = useState<"home" | "meetings">("home");
  const [currentTab, setCurrentTab] = useState<"my_meetings" | "all_meetings" | "uploads">("my_meetings");

  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
  const [editingMeeting, setEditingMeeting] = useState<any>(null);
  const [editTitle, setEditTitle] = useState("");

  const fetchMeetings = () => {
    fetch("https://fireflies-clone-backend-ta0o.onrender.com/api/meetings/")
      .then((res) => res.json())
      .then((data) => setMeetings(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await fetch(`https://fireflies-clone-backend-ta0o.onrender.com/api/meetings/${id}`, { method: "DELETE" });
      fetchMeetings();
      setActiveMenuId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRenameSubmit = async () => {
    if (!editingMeeting) return;
    try {
      await fetch(`https://fireflies-clone-backend-ta0o.onrender.com/api/meetings/${editingMeeting.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          title: editTitle, 
          duration: editingMeeting.duration, 
          participants: editingMeeting.participants 
        })
      });
      fetchMeetings();
      setEditingMeeting(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleMockUpload = async () => {
    const newMeeting = {
      title: "new_upload_" + Math.floor(Math.random() * 1000) + ".wav",
      duration: 1800,
      participants: "Satyam V",
      date: new Date().toISOString()
    };
    try {
      await fetch("https://fireflies-clone-backend-ta0o.onrender.com/api/meetings/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMeeting)
      });
      fetchMeetings();
      setCurrentTab("my_meetings");
    } catch (err) {
      console.error(err);
    }
  };

  const filteredMeetings = meetings.filter(m => 
    m.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (m.participants && m.participants.toLowerCase().includes(searchTerm.toLowerCase()))
  ).sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden", backgroundColor: "#111315", color: "#f3f4f6", fontFamily: "var(--font-inter), sans-serif" }}>
      
      {/* 7 Days Trial Banner */}
      <div style={{ backgroundColor: "#1d163a", color: "#d1d5db", padding: "8px 24px", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "0.85rem", borderBottom: "1px solid #1f2228", position: "relative" }}>
        <span>You are eligible for 7 days business plan free trial. <span className="interactive" style={{ color: "#a78bfa", marginLeft: 4 }}>Start free trial →</span></span>
        <X size={14} color="#6b7280" style={{ position: "absolute", right: 16, cursor: "pointer" }} />
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        
        {/* 1. Primary Sidebar (Collapsed or Expanded) */}
        {currentNav === "home" ? (
          <aside style={{ width: 240, backgroundColor: "#1b1a1f", display: "flex", flexDirection: "column", borderRight: "1px solid #232227", zIndex: 10 }}>
            <div style={{ padding: "16px", borderBottom: "1px solid #232227", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} className="interactive">
              <div style={{ width: 24, height: 24, borderRadius: 4, backgroundColor: "#b48372", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: "bold", color: "#fff" }}>S</div>
              <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>Satyam</span>
              <ChevronDown size={14} color="#6b7280" style={{ marginLeft: "auto" }} />
            </div>
            <nav style={{ flex: 1, padding: "12px", display: "flex", flexDirection: "column", gap: 4 }}>
              <div className="interactive" style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px", borderRadius: 8, backgroundColor: "#2d244a", color: "#f3f4f6", fontSize: "0.9rem" }}>
                <Home size={18} /> Home
              </div>
              <div className="interactive" style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px", borderRadius: 8, color: "#a1a1aa", fontSize: "0.9rem" }} onClick={() => toast("AskFred Chat coming soon")}>
                <Bot size={18} color="#a78bfa" /> AskFred
              </div>
              <div className="interactive" style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px", borderRadius: 8, color: "#a1a1aa", fontSize: "0.9rem" }} onClick={() => setCurrentNav("meetings")}>
                <Video size={18} /> Meetings
              </div>
              <div className="interactive" style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px", borderRadius: 8, color: "#a1a1aa", fontSize: "0.9rem" }} onClick={() => toast("Tasks coming soon")}>
                <CheckCircle2 size={18} /> Tasks
              </div>
              <div className="interactive" style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px", borderRadius: 8, color: "#a1a1aa", fontSize: "0.9rem" }} onClick={() => toast("AI Skills coming soon")}>
                <Sparkles size={18} /> AI Skills
              </div>
              
              <div style={{ margin: "16px 0", height: 1, backgroundColor: "#27272a" }} />
              
              <div className="interactive" style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px", borderRadius: 8, color: "#a1a1aa", fontSize: "0.9rem" }} onClick={() => toast("Analytics coming soon")}>
                <BarChart2 size={18} /> Analytics
              </div>
              <div className="interactive" style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px", borderRadius: 8, color: "#a1a1aa", fontSize: "0.9rem" }} onClick={() => toast("Voice Agents coming soon")}>
                <Briefcase size={18} /> Voice Agents
              </div>
              <div className="interactive" style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px", borderRadius: 8, color: "#a1a1aa", fontSize: "0.9rem" }} onClick={() => toast("Upgrade coming soon")}>
                <Zap size={18} /> Upgrade <span style={{ marginLeft: "auto", fontSize: "0.7rem", color: "#34d399", fontWeight: "bold" }}>40% OFF</span>
              </div>
            </nav>
            <div style={{ padding: "16px" }}>
              <div className="interactive" style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px", backgroundColor: "#18181b", borderRadius: 8, border: "1px solid #27272a", marginBottom: 16, fontSize: "0.85rem", cursor: "pointer" }} onClick={() => toast("Email Assistant coming soon")}>
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" width={16} /> Try Email Assistant
              </div>
              <div className="interactive" style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px", borderRadius: 8, color: "#a1a1aa", fontSize: "0.9rem" }} onClick={() => toast("Integrations coming soon")}>
                <LayoutGrid size={18} /> Integrations
              </div>
              <div className="interactive" style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px", borderRadius: 8, color: "#a1a1aa", fontSize: "0.9rem" }} onClick={() => toast("Settings coming soon")}>
                <Settings size={18} /> Settings
              </div>
              
              <div style={{ marginTop: 16, padding: "16px", backgroundColor: "#18181b", borderRadius: 12, border: "1px solid #27272a", display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ fontSize: "0.85rem", color: "#fff" }}>Invite coworkers to your Fireflies team</div>
                <button style={{ width: "100%", padding: "8px", backgroundColor: "#7c3aed", color: "#fff", borderRadius: 6, fontSize: "0.85rem", fontWeight: 500, border: "none" }}>Create Team</button>
              </div>
            </div>
          </aside>
        ) : (
          <aside style={{ width: 60, backgroundColor: "#1b1a1f", display: "flex", flexDirection: "column", alignItems: "center", padding: "16px 0", borderRight: "1px solid #232227", gap: 24, zIndex: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 4, backgroundColor: "#b48372", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: "bold", cursor: "pointer", color: "#fff" }}>S</div>
            <Home size={18} color="#6b7280" cursor="pointer" onClick={() => setCurrentNav("home")} />
            <Bot size={18} color="#a78bfa" cursor="pointer" onClick={() => setCurrentNav("home")} />
            <Video size={18} color="#e5e7eb" cursor="pointer" />
            <CheckCircle2 size={18} color="#6b7280" cursor="pointer" onClick={() => toast("Tasks coming soon")} />
            <Sparkles size={18} color="#6b7280" cursor="pointer" onClick={() => toast("AI Skills coming soon")} />
            <BarChart2 size={18} color="#6b7280" cursor="pointer" onClick={() => toast("Analytics coming soon")} />
            <Briefcase size={18} color="#6b7280" cursor="pointer" onClick={() => toast("Voice Agents coming soon")} />
            <div style={{ flex: 1 }} />
            <LayoutGrid size={18} color="#6b7280" cursor="pointer" onClick={() => toast("Integrations coming soon")} />
            <Settings size={18} color="#6b7280" cursor="pointer" onClick={() => toast("Settings coming soon")} />
          </aside>
        )}

        {/* 2. Secondary Sidebar (Only when currentNav === "meetings") */}
        {currentNav === "meetings" && (
          <aside style={{ width: 260, backgroundColor: "#18181b", display: "flex", flexDirection: "column", borderRight: "1px solid #27272a", zIndex: 10 }}>
            <div style={{ padding: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", backgroundColor: "#09090b", padding: "8px 12px", borderRadius: 8, border: "1px solid #27272a" }}>
                <Search size={14} color="#52525b" style={{ marginRight: 8 }} />
                <input type="text" placeholder="Search channels" style={{ background: "transparent", border: "none", color: "#f3f4f6", width: "100%", fontSize: "0.85rem", outline: "none" }} />
              </div>
            </div>

            <nav style={{ padding: "0 8px", display: "flex", flexDirection: "column", gap: 4 }}>
              <div className="interactive" style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 8, backgroundColor: currentTab === "my_meetings" ? "#2d244a" : "transparent", color: currentTab === "my_meetings" ? "#a78bfa" : "#a1a1aa", fontWeight: 500, fontSize: "0.9rem", cursor: "pointer" }} onClick={() => setCurrentTab("my_meetings")}>
                <span style={{ fontSize: "1.1rem", fontWeight: "bold" }}>#</span> My Meetings
              </div>
              <div className="interactive" style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 8, backgroundColor: currentTab === "all_meetings" ? "#2d244a" : "transparent", color: currentTab === "all_meetings" ? "#a78bfa" : "#a1a1aa", fontWeight: 500, fontSize: "0.9rem", cursor: "pointer" }} onClick={() => setCurrentTab("all_meetings")}>
                <Video size={16} /> All Meetings
              </div>
              <div className="interactive" style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 8, color: "#a1a1aa", fontWeight: 500, fontSize: "0.9rem", cursor: "pointer" }} onClick={() => toast("Voice Agent Meetings coming soon")}>
                <Mic size={16} /> Voice Agent Meetings
              </div>
              <div className="interactive" style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 8, backgroundColor: currentTab === "uploads" ? "#2d244a" : "transparent", color: currentTab === "uploads" ? "#a78bfa" : "#a1a1aa", fontWeight: 500, fontSize: "0.9rem", cursor: "pointer" }} onClick={() => setCurrentTab("uploads")}>
                <Upload size={16} /> Uploads <span style={{ backgroundColor: "#064e3b", color: "#34d399", fontSize: "0.65rem", padding: "2px 6px", borderRadius: 4, fontWeight: 700 }}>NEW</span>
              </div>
            </nav>
          </aside>
        )}

        {/* 3. Main Center Content */}
        <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", backgroundColor: "#111113", position: "relative", zIndex: 1 }}>
          
          {/* Topbar */}
          <header style={{ height: 64, borderBottom: "1px solid #27272a", display: "flex", alignItems: "center", padding: "0 24px", justifyContent: "space-between", backgroundColor: "#18181b" }}>
            <div style={{ color: "#f3f4f6", fontWeight: 500, fontSize: "0.95rem" }}>{currentNav === "home" ? "Home" : currentTab === "my_meetings" || currentTab === "all_meetings" ? "Meetings" : "Uploads"}</div>
            
            <div style={{ display: "flex", alignItems: "center", backgroundColor: "#09090b", padding: "8px 12px", borderRadius: 8, border: "1px solid #27272a", width: 400 }}>
              <Search size={16} color="#52525b" style={{ marginRight: 8 }} />
              <input type="text" placeholder="Search by title or keyword" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ background: "transparent", border: "none", color: "#f3f4f6", width: "100%", fontSize: "0.85rem", outline: "none" }} />
              <span style={{ color: "#52525b", fontSize: "0.7rem", fontWeight: 600, border: "1px solid #27272a", padding: "2px 4px", borderRadius: 4 }}>⌘K</span>
            </div>

            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <span style={{ fontSize: "0.85rem", color: "#d4d4d8" }}><span style={{ color: "#34d399", backgroundColor: "#064e3b", padding: "2px 6px", borderRadius: 4 }}>{meetings.length}</span> Free meetings</span>
              <button style={{ color: "#10b981", fontSize: "0.85rem", fontWeight: 500, background: "none", border: "none", cursor: "pointer" }}>Upgrade</button>
              <Bell size={18} color="#a1a1aa" cursor="pointer" />
              <button style={{ backgroundColor: "#7c3aed", color: "#fff", padding: "8px 16px", borderRadius: 8, display: "flex", alignItems: "center", gap: 8, fontSize: "0.9rem", fontWeight: 500, cursor: "pointer", border: "none" }}>
                <Video size={16} /> Capture <ChevronDown size={14} />
              </button>
            </div>
          </header>

          {/* Context Switching Logic */}
          {currentNav === "home" ? (
            <div className="fade-in-up" style={{ flex: 1, padding: "40px", overflowY: "auto" }}>
              <h1 style={{ fontSize: "1.5rem", fontWeight: 500, color: "#fff", marginBottom: 32, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span>Good Evening, Satyam <span style={{ fontSize: "1.2rem" }}>🌙</span></span>
                <div style={{ display: "flex", gap: 16, fontSize: "0.85rem", color: "#a1a1aa" }}>
                  <span className="interactive"><MessageSquare size={14} /> Feedback</span>
                  <span className="interactive"><Settings size={14} /> Manage</span>
                </div>
              </h1>

              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", color: "#a1a1aa", marginBottom: 16 }}><Sparkles size={14}/> Personal Assistant <HelpCircle size={12}/></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 40 }}>
                <div className="interactive" style={{ backgroundColor: "#18181b", padding: 24, borderRadius: 12, border: "1px solid #27272a", display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center" }}><Rss size={16} color="#fff" /></div>
                  <div style={{ fontWeight: 500, color: "#fff" }}>Daily Brief</div>
                  <div style={{ fontSize: "0.85rem", color: "#a1a1aa" }}>No brief yet</div>
                </div>
                <div className="interactive" style={{ backgroundColor: "#18181b", padding: 24, borderRadius: 12, border: "1px solid #27272a", display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: "#f43f5e", display: "flex", alignItems: "center", justifyContent: "center" }}><CalendarDays size={16} color="#fff" /></div>
                  <div style={{ fontWeight: 500, color: "#fff" }}>Meeting Prep</div>
                  <div style={{ fontSize: "0.85rem", color: "#a1a1aa" }}>No upcoming meetings</div>
                </div>
                <div className="interactive" style={{ backgroundColor: "#18181b", padding: 24, borderRadius: 12, border: "1px solid #27272a", display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: "#84cc16", display: "flex", alignItems: "center", justifyContent: "center" }}><LayoutGrid size={16} color="#fff" /></div>
                  <div style={{ fontWeight: 500, color: "#fff" }}>Tasks</div>
                  <div style={{ fontSize: "0.85rem", color: "#a1a1aa" }}>0 New tasks</div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #27272a", marginBottom: 24 }}>
                <div style={{ display: "flex", gap: 24 }}>
                  <div style={{ paddingBottom: 12, borderBottom: "2px solid #a78bfa", color: "#f3f4f6", fontSize: "0.9rem", fontWeight: 500, cursor: "pointer" }}>Recent</div>
                  <div style={{ paddingBottom: 12, color: "#a1a1aa", fontSize: "0.9rem", cursor: "pointer" }}>Upcoming</div>
                  <div style={{ paddingBottom: 12, color: "#a1a1aa", fontSize: "0.9rem", cursor: "pointer" }}>AI Feed</div>
                </div>
                <div style={{ color: "#a1a1aa", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}><Settings size={14}/> Settings</div>
              </div>

              <div className="fade-in-up" style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40 }}>
                {meetings.slice(0, 1).map((m) => (
                  <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: "#b48372", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "#fff", fontWeight: "bold" }}>S</div>
                    <div>
                      <div style={{ fontWeight: 500, color: "#fff", display: "flex", alignItems: "center", gap: 8 }}>{m.title} <ExternalLink size={12} color="#a1a1aa"/></div>
                      <div style={{ fontSize: "0.85rem", color: "#a1a1aa", marginTop: 4 }}>{format(new Date(m.date), "MMM dd · h:mm a")}</div>
                    </div>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
                  <div style={{ backgroundColor: "#2d244a", color: "#a78bfa", padding: "4px 12px", borderRadius: 4, fontSize: "0.8rem", fontWeight: 500 }}>All caught up!</div>
                </div>
              </div>

              <h3 style={{ fontSize: "1.1rem", fontWeight: 500, color: "#fff", marginBottom: 16 }}>Try More</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div className="interactive" style={{ backgroundColor: "#18181b", padding: 24, borderRadius: 12, border: "1px solid #27272a" }}>
                  <MonitorPlayIcon color="#3b82f6" />
                  <div style={{ fontWeight: 500, color: "#fff", marginTop: 16, marginBottom: 8 }}>Desktop App</div>
                  <div style={{ fontSize: "0.85rem", color: "#a1a1aa", marginBottom: 24, lineHeight: 1.5 }}>Capture conversations without any bot present in your meeting.</div>
                  <button style={{ backgroundColor: "#7c3aed", color: "#fff", padding: "8px 16px", borderRadius: 8, border: "none", fontSize: "0.9rem", fontWeight: 500 }}>Download</button>
                </div>
                <div className="interactive" style={{ backgroundColor: "#18181b", padding: 24, borderRadius: 12, border: "1px solid #27272a" }}>
                  <SmartphoneIcon color="#f43f5e" />
                  <div style={{ fontWeight: 500, color: "#fff", marginTop: 16, marginBottom: 8 }}>Mobile App</div>
                  <div style={{ fontSize: "0.85rem", color: "#a1a1aa", marginBottom: 24, lineHeight: 1.5 }}>Record in-person conversations and review meetings on the go.</div>
                  <div style={{ display: "flex", gap: 12 }}>
                    <div style={{ width: 32, height: 32, backgroundColor: "#27272a", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>🍏</div>
                    <div style={{ width: 32, height: 32, backgroundColor: "#27272a", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>▶️</div>
                  </div>
                </div>
              </div>
            </div>
          ) : currentTab === "my_meetings" || currentTab === "all_meetings" ? (
            <>
              {/* Filters Row */}
              <div style={{ padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #27272a" }}>
                <div style={{ display: "flex", gap: 12 }}>
                  <button style={{ padding: "6px 16px", backgroundColor: "#18181b", border: "1px solid #27272a", borderRadius: 6, fontSize: "0.85rem", color: "#d4d4d8", cursor: "pointer" }}>Hosted by me</button>
                  <button style={{ padding: "6px 16px", backgroundColor: "transparent", border: "none", fontSize: "0.85rem", color: "#a1a1aa", cursor: "pointer" }}>Shared with me</button>
                  <div style={{ width: 1, backgroundColor: "#27272a", margin: "0 4px" }} />
                  <button style={{ padding: "6px 16px", backgroundColor: showFilters ? "#2d244a" : "transparent", border: showFilters ? "1px solid #2d244a" : "1px solid #27272a", borderRadius: 6, display: "flex", alignItems: "center", gap: 6, fontSize: "0.85rem", color: showFilters ? "#a78bfa" : "#d4d4d8", cursor: "pointer" }} onClick={() => setShowFilters(!showFilters)}>
                    <SlidersHorizontal size={14} /> Filters
                  </button>
                </div>
              </div>

              {/* Meetings List */}
              <div style={{ flex: 1, overflowY: "auto", padding: "24px" }} onClick={() => setActiveMenuId(null)}>
                {filteredMeetings.length === 0 ? (
                  <div style={{ color: "#a1a1aa", textAlign: "center", marginTop: 40 }}>Looks like you haven't recorded a meeting yet</div>
                ) : (
                  <div className="fade-in-up" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ fontSize: "0.8rem", color: "#a1a1aa", marginBottom: 8 }}>Today</div>
                    {filteredMeetings.map((meeting) => (
                      <div key={meeting.id} style={{ position: "relative" }}>
                        <Link href={`/meeting/${meeting.id}`} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", backgroundColor: "#18181b", border: "1px solid #27272a", borderRadius: 8, textDecoration: "none", color: "inherit", cursor: "pointer" }} className="interactive">
                          
                          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                            <div style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: "#27272a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <Video size={20} color="#a1a1aa" />
                            </div>
                            <div>
                              <div style={{ fontWeight: 500, color: "#fff", display: "flex", alignItems: "center", gap: 8 }}>{meeting.title} <ArrowUp size={12} color="#a1a1aa" style={{ transform: "rotate(45deg)" }}/></div>
                              <div style={{ fontSize: "0.8rem", color: "#a1a1aa", marginTop: 4 }}>
                                {format(new Date(meeting.date), "MMM d · h:mm a")} · {meeting.duration ? `${Math.floor(meeting.duration / 60)} min` : "30 min"} · {meeting.participants?.split(",")[0] || "Satyam"}
                              </div>
                            </div>
                          </div>

                          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <div 
                              style={{ padding: 6, borderRadius: 6, border: "1px solid #27272a", cursor: "pointer" }}
                              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveMenuId(activeMenuId === meeting.id ? null : meeting.id); }}
                            >
                              <MoreHorizontal size={16} color="#a1a1aa" />
                            </div>
                            <button style={{ backgroundColor: "transparent", border: "1px solid #27272a", borderRadius: 6, padding: "6px 12px", color: "#a1a1aa", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: 6 }}>
                              Details <ChevronDown size={14}/>
                            </button>
                          </div>

                        </Link>

                        {/* Dropdown Menu */}
                        {activeMenuId === meeting.id && (
                          <div className="fade-in-up" style={{ position: "absolute", right: 100, top: 40, zIndex: 100, backgroundColor: "#18181b", border: "1px solid #27272a", borderRadius: 8, padding: "8px 0", width: 180, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5)" }}>
                            <div className="interactive" style={{ padding: "8px 16px", fontSize: "0.85rem", color: "#d4d4d8", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}><Share size={14} color="#a1a1aa"/> Share</div>
                            <div className="interactive" style={{ padding: "8px 16px", fontSize: "0.85rem", color: "#d4d4d8", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}><LinkIcon size={14} color="#a1a1aa"/> Copy Link</div>
                            <div className="interactive" style={{ padding: "8px 16px", fontSize: "0.85rem", color: "#d4d4d8", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}><Download size={14} color="#a1a1aa"/> Download</div>
                            <div className="interactive" style={{ padding: "8px 16px", fontSize: "0.85rem", color: "#d4d4d8", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}><FolderInput size={14} color="#a1a1aa"/> Move to channel</div>
                            <div className="interactive" 
                              style={{ padding: "8px 16px", fontSize: "0.85rem", color: "#d4d4d8", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}
                              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setEditTitle(meeting.title); setEditingMeeting(meeting); setActiveMenuId(null); }}
                            ><Edit2 size={14} color="#a1a1aa"/> Rename</div>
                            <div className="interactive" 
                              style={{ padding: "8px 16px", fontSize: "0.85rem", color: "#ef4444", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}
                              onClick={(e) => handleDelete(e, meeting.id)}
                            ><Trash2 size={14} color="#ef4444"/> Delete</div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="fade-in-up" style={{ flex: 1, padding: "32px 40px", overflowY: "auto" }}>
              <div style={{ border: "1px dashed #2d244a", borderRadius: 12, backgroundColor: "#151320", padding: "40px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: 32 }}>
                <Upload size={24} color="#a78bfa" style={{ marginBottom: 16 }} />
                <div style={{ fontSize: "1rem", color: "#fff", fontWeight: 500, marginBottom: 8 }}>Upload audio or video recordings</div>
                <div style={{ fontSize: "0.85rem", color: "#a1a1aa", marginBottom: 24 }}>Up to 100 MB for video and 500 MB for audio. <span style={{ textDecoration: "underline", cursor: "pointer" }}>Supported format.</span></div>
                <button onClick={handleMockUpload} style={{ backgroundColor: "#18181b", border: "1px solid #2d244a", color: "#fff", padding: "8px 24px", borderRadius: 8, fontSize: "0.9rem", cursor: "pointer" }}>
                  Browse Files
                </button>
              </div>

              <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#fff", marginBottom: 16 }}>My Uploads</h3>
              <div className="fade-in-up" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {filteredMeetings.map((meeting) => (
                  <div key={meeting.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", backgroundColor: "#18181b", border: "1px solid #27272a", borderRadius: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "bold", fontSize: "0.8rem" }}>WAV</div>
                      <div>
                        <div style={{ fontWeight: 500, color: "#fff" }}>{meeting.title}</div>
                        <div style={{ fontSize: "0.8rem", color: "#a1a1aa", marginTop: 4 }}>
                          {format(new Date(meeting.date), "MMM d")} · {meeting.duration ? `${Math.floor(meeting.duration / 60)} min` : "30 min"} · 21 MB
                        </div>
                      </div>
                    </div>
                    <div className="fade-in-up" style={{ border: "1px solid #f59e0b", color: "#f59e0b", padding: "4px 12px", borderRadius: 6, fontSize: "0.8rem", display: "flex", alignItems: "center", gap: 6, backgroundColor: "rgba(245, 158, 11, 0.1)" }}>
                      ⏱ Processing transcript
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rename Modal */}
          {editingMeeting && (
            <div className="fade-in-up" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
              <div style={{ width: 400, backgroundColor: "#18181b", border: "1px solid #27272a", borderRadius: 12, overflow: "hidden", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px", borderBottom: "1px solid #27272a" }}>
                  <div style={{ fontWeight: 600, color: "#fff", fontSize: "1rem" }}>Meeting Title</div>
                  <X size={16} color="#71717a" cursor="pointer" onClick={() => setEditingMeeting(null)} />
                </div>
                <div style={{ padding: 24 }}>
                  <input 
                    type="text" 
                    value={editTitle} 
                    onChange={(e) => setEditTitle(e.target.value)} 
                    style={{ width: "100%", backgroundColor: "#111113", border: "1px solid #3f3f46", color: "#fff", padding: "10px 12px", borderRadius: 6, outline: "none", fontSize: "0.95rem" }} 
                  />
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 24 }}>
                    <button onClick={() => setEditingMeeting(null)} style={{ padding: "8px 16px", backgroundColor: "transparent", border: "1px solid #3f3f46", borderRadius: 6, color: "#d4d4d8", fontSize: "0.9rem", cursor: "pointer" }}>Cancel</button>
                    <button onClick={handleRenameSubmit} style={{ padding: "8px 16px", backgroundColor: "#7c3aed", border: "none", borderRadius: 6, color: "#fff", fontSize: "0.9rem", cursor: "pointer" }}>Change Title</button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>

        {/* 4. Right Sidebar (Ask Fred) - Shared between tabs for context */}
        <aside style={{ width: 320, backgroundColor: "#111113", display: "flex", flexDirection: "column", borderLeft: "1px solid #27272a", zIndex: 1 }}>
          <div style={{ padding: "16px", borderBottom: "1px solid #27272a", display: "flex", alignItems: "center", justifyContent: "space-between", fontWeight: 500, fontSize: "0.95rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Bot size={18} color="#a78bfa" /> Ask Fred</div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <MessageSquare size={16} color="#71717a" />
              <Plus size={18} color="#71717a" />
            </div>
          </div>
          
          <div style={{ flex: 1, padding: 24, display: "flex", flexDirection: "column", gap: 16, overflowY: "auto" }}>
            <div className="fade-in-up" style={{ backgroundColor: "#18181b", padding: 16, borderRadius: 8, border: "1px solid #2d244a", display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 16 }}>
              <div style={{ display: "flex", gap: -4 }}>
                <div style={{ width: 24, height: 24, backgroundColor: "#fff", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2, boxShadow: "0 0 5px rgba(0,0,0,0.5)" }}><img src="https://www.svgrepo.com/show/475689/slack-color.svg" alt="Slack" style={{ width: 14, height: 14 }} /></div>
                <div style={{ width: 24, height: 24, backgroundColor: "#fff", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1, marginLeft: -8, boxShadow: "0 0 5px rgba(0,0,0,0.5)" }}><img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Gmail" style={{ width: 14, height: 14 }} /></div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "0.85rem", color: "#f3f4f6", lineHeight: 1.4 }}>Connect Slack and Gmail <span style={{ color: "#a1a1aa" }}>— get answers with full context.</span></div>
                <div style={{ color: "#a78bfa", fontSize: "0.85rem", marginTop: 8, textAlign: "right", cursor: "pointer" }} onClick={() => toast("Connect integrations coming soon")}>Connect <X size={12} style={{ display: "inline", marginLeft: 4 }} color="#52525b" /></div>
              </div>
            </div>

            <Sparkles size={20} color="#34d399" className="fade-in-up" />
            <h3 className="fade-in-up" style={{ fontSize: "1.1rem", fontWeight: 500, margin: 0, color: "#fff" }}>Hi Satyam! <br /> {currentNav === "home" ? "Get ready for your meeting" : "Get answers from your uploads"}</h3>
            
            <div className="fade-in-up" style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}>
              {currentNav === "home" ? (
                <>
                  <button className="interactive" style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", backgroundColor: "#18181b", border: "1px solid #27272a", borderRadius: 8, fontSize: "0.85rem", color: "#d4d4d8", cursor: "pointer", textAlign: "left" }}><span style={{ color: "#fcd34d", fontSize: "1rem" }}>✨</span> What's my day looking like?</button>
                  <button className="interactive" style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", backgroundColor: "#18181b", border: "1px solid #27272a", borderRadius: 8, fontSize: "0.85rem", color: "#d4d4d8", cursor: "pointer", textAlign: "left" }}><span style={{ color: "#ef4444", fontSize: "1rem" }}>❓</span> Pending tasks across all meetings</button>
                  <button className="interactive" style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", backgroundColor: "#18181b", border: "1px solid #27272a", borderRadius: 8, fontSize: "0.85rem", color: "#d4d4d8", cursor: "pointer", textAlign: "left" }}><span style={{ color: "#34d399", fontSize: "1rem" }}>✅</span> List out my action items from the past week</button>
                </>
              ) : (
                <>
                  <button className="interactive" style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", backgroundColor: "#18181b", border: "1px solid #27272a", borderRadius: 8, fontSize: "0.85rem", color: "#d4d4d8", cursor: "pointer", textAlign: "left" }}><span style={{ color: "#fcd34d", fontSize: "1rem" }}>📝</span> Summarize my uploaded recordings</button>
                  <button className="interactive" style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", backgroundColor: "#18181b", border: "1px solid #27272a", borderRadius: 8, fontSize: "0.85rem", color: "#d4d4d8", cursor: "pointer", textAlign: "left" }}><span style={{ color: "#fde047", fontSize: "1rem" }}>💡</span> Key ideas</button>
                  <button className="interactive" style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", backgroundColor: "#18181b", border: "1px solid #27272a", borderRadius: 8, fontSize: "0.85rem", color: "#d4d4d8", cursor: "pointer", textAlign: "left" }}><span style={{ color: "#ef4444", fontSize: "1rem" }}>🎯</span> Key decisions</button>
                </>
              )}
            </div>
          </div>

          <div style={{ padding: 16, borderTop: "1px solid #27272a" }}>
            <div style={{ display: "inline-block", backgroundColor: "#18181b", border: "1px solid #27272a", padding: "4px 8px", borderRadius: 6, fontSize: "0.75rem", color: "#a1a1aa", marginBottom: 16 }}>{currentNav === "home" ? "# Home" : "# Uploads"}</div>
            <div style={{ fontSize: "0.85rem", color: "#71717a", marginBottom: 16 }}>Ask anything. Type / to run AI skills.</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: 12 }}><Plus size={16} color="#71717a" /><LayoutGrid size={16} color="#71717a" /></div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}><Mic size={16} color="#71717a" /><div className="interactive" style={{ width: 28, height: 28, backgroundColor: "#2d244a", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", color: "#a78bfa", cursor: "pointer" }} onClick={() => toast("LLM Chat Coming Soon!")}><ArrowUp size={16} /></div></div>
            </div>
          </div>
        </aside>
      </div>

    </div>
  );
}

const MonitorPlayIcon = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="14" x="2" y="3" rx="2" />
    <line x1="8" x2="16" y1="21" y2="21" />
    <line x1="12" x2="12" y1="17" y2="21" />
  </svg>
);

const SmartphoneIcon = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
    <path d="M12 18h.01" />
  </svg>
);
