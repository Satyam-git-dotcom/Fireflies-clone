"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Search, Bell, Video, Home, Plus, ChevronDown, Bot, LayoutGrid, Upload, Mic, SlidersHorizontal, Settings, Users, Sparkles, MessageSquare, Briefcase, Zap, X, ArrowUp, BarChart2, MoreHorizontal, Share, Link as LinkIcon, Download, FolderInput, Edit2, Trash2 } from "lucide-react";

export default function MeetingsLibrary() {
  const [meetings, setMeetings] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [showFilters, setShowFilters] = useState(false);
  const [currentTab, setCurrentTab] = useState<"meetings" | "uploads">("meetings");

  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
  const [editingMeeting, setEditingMeeting] = useState<any>(null);
  const [editTitle, setEditTitle] = useState("");

  const fetchMeetings = () => {
    fetch("http://localhost:8000/api/meetings/")
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
      await fetch(`http://localhost:8000/api/meetings/${id}`, { method: "DELETE" });
      fetchMeetings();
      setActiveMenuId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRenameSubmit = async () => {
    if (!editingMeeting) return;
    try {
      await fetch(`http://localhost:8000/api/meetings/${editingMeeting.id}`, {
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
      await fetch("http://localhost:8000/api/meetings/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMeeting)
      });
      fetchMeetings();
      setCurrentTab("meetings");
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
        <span>You are eligible for 7 days business plan free trial. <span style={{ color: "#a78bfa", cursor: "pointer", marginLeft: 4 }}>Start free trial →</span></span>
        <X size={14} color="#6b7280" style={{ position: "absolute", right: 16, cursor: "pointer" }} />
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        
        {/* 1. Far Left Mini Sidebar (Icons) */}
        <aside style={{ width: 60, backgroundColor: "#1b1a1f", display: "flex", flexDirection: "column", alignItems: "center", padding: "16px 0", borderRight: "1px solid #232227", gap: 24, zIndex: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: 4, backgroundColor: "#b48372", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: "bold", cursor: "pointer", color: "#fff" }}>S</div>
          <Home size={18} color="#6b7280" cursor="pointer" />
          <Bot size={18} color="#a78bfa" cursor="pointer" />
          <Video size={18} color="#e5e7eb" cursor="pointer" />
          <LayoutGrid size={18} color="#6b7280" cursor="pointer" />
          <Sparkles size={18} color="#6b7280" cursor="pointer" />
          <BarChart2 size={18} color="#6b7280" cursor="pointer" />
          <Briefcase size={18} color="#6b7280" cursor="pointer" />
          <div style={{ flex: 1 }} />
          <Zap size={18} color="#6b7280" cursor="pointer" />
          <Users size={18} color="#6b7280" cursor="pointer" />
          <Settings size={18} color="#6b7280" cursor="pointer" />
        </aside>

        {/* 2. Secondary Sidebar (Channels/Navigation) */}
        <aside style={{ width: 260, backgroundColor: "#18181b", display: "flex", flexDirection: "column", borderRight: "1px solid #27272a", zIndex: 10 }}>
          <div style={{ padding: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", backgroundColor: "#09090b", padding: "8px 12px", borderRadius: 8, border: "1px solid #27272a" }}>
              <Search size={14} color="#52525b" style={{ marginRight: 8 }} />
              <input type="text" placeholder="Search channels" style={{ background: "transparent", border: "none", color: "#f3f4f6", width: "100%", fontSize: "0.85rem", outline: "none" }} />
            </div>
          </div>

          <nav style={{ padding: "0 8px", display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 8, backgroundColor: currentTab === "meetings" ? "#2d244a" : "transparent", color: currentTab === "meetings" ? "#a78bfa" : "#a1a1aa", fontWeight: 500, fontSize: "0.9rem", cursor: "pointer" }} onClick={() => setCurrentTab("meetings")}>
              <span style={{ fontSize: "1.1rem", fontWeight: "bold" }}>#</span> My Meetings
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 8, color: "#a1a1aa", fontWeight: 500, fontSize: "0.9rem", cursor: "pointer" }}>
              <Video size={16} /> All Meetings
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 8, color: "#a1a1aa", fontWeight: 500, fontSize: "0.9rem", cursor: "pointer" }}>
              <Mic size={16} /> Voice Agent Meetings
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 8, backgroundColor: currentTab === "uploads" ? "#2d244a" : "transparent", color: currentTab === "uploads" ? "#a78bfa" : "#a1a1aa", fontWeight: 500, fontSize: "0.9rem", cursor: "pointer" }} onClick={() => setCurrentTab("uploads")}>
              <Upload size={16} /> Uploads <span style={{ backgroundColor: "#064e3b", color: "#34d399", fontSize: "0.65rem", padding: "2px 6px", borderRadius: 4, fontWeight: 700 }}>NEW</span>
            </div>
          </nav>
        </aside>

        {/* 3. Main Center Content */}
        <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", backgroundColor: "#111113", position: "relative", zIndex: 1 }}>
          
          {/* Topbar */}
          <header style={{ height: 64, borderBottom: "1px solid #27272a", display: "flex", alignItems: "center", padding: "0 24px", justifyContent: "space-between", backgroundColor: "#18181b" }}>
            <div style={{ color: "#f3f4f6", fontWeight: 500, fontSize: "0.95rem" }}>{currentTab === "meetings" ? "Meetings" : "Uploads"}</div>
            
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

          {currentTab === "meetings" ? (
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
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ fontSize: "0.8rem", color: "#a1a1aa", marginBottom: 8 }}>Today</div>
                    {filteredMeetings.map((meeting) => (
                      <div key={meeting.id} style={{ position: "relative" }}>
                        <Link href={`/meeting/${meeting.id}`} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", backgroundColor: "#18181b", border: "1px solid #27272a", borderRadius: 8, textDecoration: "none", color: "inherit", cursor: "pointer" }}>
                          
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
                          <div style={{ position: "absolute", right: 100, top: 40, zIndex: 100, backgroundColor: "#18181b", border: "1px solid #27272a", borderRadius: 8, padding: "8px 0", width: 180, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5)" }}>
                            <div style={{ padding: "8px 16px", fontSize: "0.85rem", color: "#d4d4d8", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}><Share size={14} color="#a1a1aa"/> Share</div>
                            <div style={{ padding: "8px 16px", fontSize: "0.85rem", color: "#d4d4d8", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}><LinkIcon size={14} color="#a1a1aa"/> Copy Link</div>
                            <div style={{ padding: "8px 16px", fontSize: "0.85rem", color: "#d4d4d8", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}><Download size={14} color="#a1a1aa"/> Download</div>
                            <div style={{ padding: "8px 16px", fontSize: "0.85rem", color: "#d4d4d8", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}><FolderInput size={14} color="#a1a1aa"/> Move to channel</div>
                            <div 
                              style={{ padding: "8px 16px", fontSize: "0.85rem", color: "#d4d4d8", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}
                              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setEditTitle(meeting.title); setEditingMeeting(meeting); setActiveMenuId(null); }}
                            ><Edit2 size={14} color="#a1a1aa"/> Rename</div>
                            <div 
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
            <div style={{ flex: 1, padding: "32px 40px", overflowY: "auto" }}>
              <div style={{ border: "1px dashed #2d244a", borderRadius: 12, backgroundColor: "#151320", padding: "40px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: 32 }}>
                <Upload size={24} color="#a78bfa" style={{ marginBottom: 16 }} />
                <div style={{ fontSize: "1rem", color: "#fff", fontWeight: 500, marginBottom: 8 }}>Upload audio or video recordings</div>
                <div style={{ fontSize: "0.85rem", color: "#a1a1aa", marginBottom: 24 }}>Up to 100 MB for video and 500 MB for audio. <span style={{ textDecoration: "underline", cursor: "pointer" }}>Supported format.</span></div>
                <button onClick={handleMockUpload} style={{ backgroundColor: "#18181b", border: "1px solid #2d244a", color: "#fff", padding: "8px 24px", borderRadius: 8, fontSize: "0.9rem", cursor: "pointer" }}>
                  Browse Files
                </button>
              </div>

              <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#fff", marginBottom: 16 }}>My Uploads</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
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
                    <div style={{ border: "1px solid #f59e0b", color: "#f59e0b", padding: "4px 12px", borderRadius: 6, fontSize: "0.8rem", display: "flex", alignItems: "center", gap: 6, backgroundColor: "rgba(245, 158, 11, 0.1)" }}>
                      ⏱ Processing transcript
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rename Modal */}
          {editingMeeting && (
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
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
          
          <div style={{ flex: 1, padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ backgroundColor: "#18181b", padding: 16, borderRadius: 8, border: "1px solid #2d244a", display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 16 }}>
              <div style={{ display: "flex", gap: -4 }}>
                <div style={{ width: 24, height: 24, backgroundColor: "#fff", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2, boxShadow: "0 0 5px rgba(0,0,0,0.5)" }}><img src="https://www.svgrepo.com/show/475689/slack-color.svg" alt="Slack" style={{ width: 14, height: 14 }} /></div>
                <div style={{ width: 24, height: 24, backgroundColor: "#fff", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1, marginLeft: -8, boxShadow: "0 0 5px rgba(0,0,0,0.5)" }}><img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Gmail" style={{ width: 14, height: 14 }} /></div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "0.85rem", color: "#f3f4f6", lineHeight: 1.4 }}>Connect Slack and Gmail <span style={{ color: "#a1a1aa" }}>— get answers with full context.</span></div>
                <div style={{ color: "#a78bfa", fontSize: "0.85rem", marginTop: 8, textAlign: "right", cursor: "pointer" }}>Connect <X size={12} style={{ display: "inline", marginLeft: 4 }} color="#52525b" /></div>
              </div>
            </div>

            <Sparkles size={20} color="#34d399" />
            <h3 style={{ fontSize: "1.1rem", fontWeight: 500, margin: 0 }}>Hi Satyam! <br /> Get answers from your uploads</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}>
              <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", backgroundColor: "#18181b", border: "1px solid #27272a", borderRadius: 8, fontSize: "0.85rem", color: "#d4d4d8", cursor: "pointer", textAlign: "left" }}><span style={{ color: "#fcd34d", fontSize: "1rem" }}>📝</span> Summarize my uploaded recordings</button>
              <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", backgroundColor: "#18181b", border: "1px solid #27272a", borderRadius: 8, fontSize: "0.85rem", color: "#d4d4d8", cursor: "pointer", textAlign: "left" }}><span style={{ color: "#fde047", fontSize: "1rem" }}>💡</span> Key ideas</button>
              <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", backgroundColor: "#18181b", border: "1px solid #27272a", borderRadius: 8, fontSize: "0.85rem", color: "#d4d4d8", cursor: "pointer", textAlign: "left" }}><span style={{ color: "#ef4444", fontSize: "1rem" }}>🎯</span> Key decisions</button>
            </div>
          </div>

          <div style={{ padding: 16, borderTop: "1px solid #27272a" }}>
            <div style={{ display: "inline-block", backgroundColor: "#18181b", border: "1px solid #27272a", padding: "4px 8px", borderRadius: 6, fontSize: "0.75rem", color: "#a1a1aa", marginBottom: 16 }}># Uploads</div>
            <div style={{ fontSize: "0.85rem", color: "#71717a", marginBottom: 16 }}>Ask anything. Type / to run AI skills.</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: 12 }}><Plus size={16} color="#71717a" /><LayoutGrid size={16} color="#71717a" /></div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}><Mic size={16} color="#71717a" /><div style={{ width: 28, height: 28, backgroundColor: "#2d244a", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", color: "#a78bfa", cursor: "pointer" }}><ArrowUp size={16} /></div></div>
            </div>
          </div>
        </aside>
      </div>

    </div>
  );
}
