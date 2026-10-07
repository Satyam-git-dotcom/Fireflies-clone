"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { Play, Pause, Search, Video, Bot, Menu, Sparkles, CheckSquare, MessageSquare, RotateCcw, RotateCw, Download, Star, Share, ThumbsUp, ThumbsDown, X, Edit3, Copy, MoreHorizontal, ChevronDown, Bell, Plus, Maximize, Send, AudioLines, MessageCircle, Bookmark, Info } from "lucide-react";

function MeetingDetailContent() {
  const params = useParams();
  const router = useRouter();
  const [meeting, setMeeting] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const maxTime = meeting?.transcripts?.length ? Math.max(...meeting.transcripts.map((t: any) => t.end_time)) : 344; // 05:44
  
  const [rightTab, setRightTab] = useState("transcript");
  const [transcriptSearch, setTranscriptSearch] = useState("");
  const [askFredInput, setAskFredInput] = useState("");
  const activeTranscriptRef = useRef<HTMLDivElement | null>(null);

  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [downloadTab, setDownloadTab] = useState<"Transcript" | "Summary" | "Audio">("Transcript");
  const [downloadFormat, setDownloadFormat] = useState("DOCX");
  const [includeTimestamp, setIncludeTimestamp] = useState(true);
  const [showSpeakerName, setShowSpeakerName] = useState(true);
  const [removeBranding, setRemoveBranding] = useState(false);

  useEffect(() => {
    fetch(`https://fireflies-clone-backend-ta0o.onrender.com/api/meetings/${params.id}`)
      .then((res) => res.json())
      .then((data) => { 
        setMeeting(data); 
        setLoading(false); 
      })
      .catch((err) => console.error(err));
  }, [params.id]);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => setCurrentTime((prev) => (prev >= maxTime ? prev : prev + 1)), 1000);
    } else if (timerRef.current) clearInterval(timerRef.current);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPlaying, maxTime]);

  useEffect(() => {
    if (activeTranscriptRef.current && isPlaying) {
      activeTranscriptRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [currentTime, isPlaying]);

  const formatTime = (sec: number) => `${Math.floor(sec / 60).toString().padStart(2, '0')}:${Math.floor(sec % 60).toString().padStart(2, '0')}`;

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(Number(e.target.value));
  };

  const handleDownload = () => {
    if (!meeting) return;
    
    let content = `Meeting: ${meeting.title}\nDate: ${new Date(meeting.date).toLocaleString()}\n\n`;
    
    if (meeting.summary) {
      content += `--- SUMMARY ---\n${meeting.summary.summary_text}\n\n`;
    }
    
    if (meeting.transcripts && meeting.transcripts.length > 0) {
      content += `--- TRANSCRIPT ---\n`;
      meeting.transcripts.forEach((t: any) => {
        content += `[${Math.floor(t.start_time / 60).toString().padStart(2, '0')}:${Math.floor(t.start_time % 60).toString().padStart(2, '0')}] ${t.speaker}: ${t.text}\n`;
      });
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${meeting.title}_export.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Transcript exported successfully!");
  };

  const handleAskFred = (e: React.FormEvent) => {
    e.preventDefault();
    if (!askFredInput.trim()) return;
    toast("LLM Chat Coming Soon! Your question: " + askFredInput, { icon: '🤖' });
    setAskFredInput("");
  };

  if (loading || !meeting) return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", alignItems: "center", justifyContent: "center", backgroundColor: "#111113" }}>
      <div className="spinner" style={{ marginBottom: 24 }}></div>
      <div style={{ color: "#a1a1aa", fontSize: "0.95rem", fontWeight: 500 }}>Loading meeting details...</div>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden", backgroundColor: "#111113", color: "#f3f4f6", fontFamily: "var(--font-inter), sans-serif" }}>
      
      {/* 7 Days Trial Banner */}
      <div style={{ backgroundColor: "#1d163a", color: "#d1d5db", padding: "8px 24px", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "0.85rem", borderBottom: "1px solid #1f2228", position: "relative" }}>
        <span>You are eligible for 7 days business plan free trial. <span style={{ color: "#a78bfa", cursor: "pointer", marginLeft: 4 }}>Start free trial →</span></span>
        <X size={14} color="#6b7280" style={{ position: "absolute", right: 16, cursor: "pointer" }} />
      </div>

      {/* Top Header */}
      <header style={{ height: 56, borderBottom: "1px solid #27272a", display: "flex", alignItems: "center", padding: "0 16px", justifyContent: "space-between", backgroundColor: "#18181b" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Menu size={20} color="#71717a" cursor="pointer" />
          <span style={{ fontSize: "0.9rem", color: "#a1a1aa", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ cursor: "pointer" }} onClick={() => router.push("/dashboard")}>#All Meetings</span> / <span style={{ color: "#f3f4f6" }}>{meeting.title}</span> <span style={{ width: 6, height: 6, backgroundColor: "#10b981", borderRadius: "50%", display: "inline-block" }} />
          </span>
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <button style={{ color: "#10b981", fontSize: "0.85rem", fontWeight: 500, background: "none", border: "none", cursor: "pointer" }}>Upgrade</button>
          <div style={{ width: 1, height: 16, backgroundColor: "#27272a" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#3b82f6", cursor: "pointer" }}>
            <span style={{ fontWeight: "bold" }}>&gt;</span><ChevronDown size={14} />
          </div>
          <button style={{ backgroundColor: "#7c3aed", color: "#fff", padding: "6px 12px", borderRadius: 4, display: "flex", alignItems: "center", gap: 8, border: "none", fontSize: "0.85rem", fontWeight: 500, cursor: "pointer" }}><Share size={14} /> Share <span style={{ color: "#a78bfa" }}>&lt;&gt;</span></button>
          <div style={{ width: 1, height: 16, backgroundColor: "#27272a" }} />
          <Plus size={18} color="#71717a" cursor="pointer" />
          <Bell size={18} color="#71717a" cursor="pointer" />
          <div style={{ width: 28, height: 28, borderRadius: 4, backgroundColor: "#b48372", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: "bold", cursor: "pointer", color: "#fff" }}>S</div>
        </div>
      </header>

      {/* Main Layout */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        
        {/* Far Left Mini Sidebar */}
        <aside style={{ width: 56, backgroundColor: "#09090b", display: "flex", flexDirection: "column", alignItems: "center", padding: "24px 0", borderRight: "1px solid #27272a", gap: 24, zIndex: 10 }}>
          <Search size={18} color="#7c3aed" cursor="pointer" onClick={() => toast("Search feature coming soon")} />
          <AudioLines size={18} color="#71717a" cursor="pointer" onClick={() => toast("Audio timeline coming soon")} />
          <MessageCircle size={18} color="#71717a" cursor="pointer" onClick={() => toast("Comments coming soon")} />
          <Bookmark size={18} color="#71717a" cursor="pointer" onClick={() => toast("Bookmarks coming soon")} />
          <div style={{ flex: 1 }} />
          <Info size={18} color="#71717a" cursor="pointer" onClick={() => toast("Meeting info coming soon")} />
        </aside>

        {/* Left Smart Search Panel */}
        <div style={{ width: 260, borderRight: "1px solid #27272a", display: "flex", flexDirection: "column", overflowY: "auto", backgroundColor: "#111113" }}>
          <div style={{ padding: "16px", borderBottom: "1px solid #27272a", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 500, fontSize: "0.95rem" }}>Smart Search</span>
          </div>
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#71717a", marginBottom: 12 }}>AI FILTERS</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <div style={{ backgroundColor: "#18181b", padding: "8px 12px", borderRadius: 8, fontSize: "0.8rem", display: "flex", justifyContent: "space-between", border: "1px solid #27272a" }}><span style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#10b981" }}/> Date & Time</span> <span>12</span></div>
              <div style={{ backgroundColor: "#18181b", padding: "8px 12px", borderRadius: 8, fontSize: "0.8rem", display: "flex", justifyContent: "space-between", border: "1px solid #27272a" }}><span style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#3b82f6" }}/> Metrics</span> <span>5</span></div>
              <div style={{ backgroundColor: "#18181b", padding: "8px 12px", borderRadius: 8, fontSize: "0.8rem", display: "flex", justifyContent: "space-between", border: "1px solid #27272a" }}><span style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#ec4899" }}/> Questions</span> <span>14</span></div>
              <div style={{ backgroundColor: "#18181b", padding: "8px 12px", borderRadius: 8, fontSize: "0.8rem", display: "flex", justifyContent: "space-between", border: "1px solid #27272a" }}><span style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#f59e0b" }}/> Tasks</span> <span>5</span></div>
            </div>
            
            <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#71717a", marginTop: 24, marginBottom: 12 }}>SENTIMENTS</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", backgroundColor: "#18181b", padding: "8px 12px", borderRadius: 8, border: "1px solid #27272a" }}><span style={{ display: "flex", alignItems: "center", gap: 8 }}><div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#ef4444" }}/> Neutral</span> <span>58%</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", backgroundColor: "#18181b", padding: "8px 12px", borderRadius: 8, border: "1px solid #27272a" }}><span style={{ display: "flex", alignItems: "center", gap: 8 }}><div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#3b82f6" }}/> Positive</span> <span>38%</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", backgroundColor: "#18181b", padding: "8px 12px", borderRadius: 8, border: "1px solid #27272a" }}><span style={{ display: "flex", alignItems: "center", gap: 8 }}><div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#f59e0b" }}/> Negative</span> <span>4%</span></div>
            </div>

            <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#71717a", marginTop: 24, marginBottom: 12 }}>SPEAKER TALKTIME</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.8rem", padding: "8px 12px", backgroundColor: "#18181b", borderRadius: 8, border: "1px solid #27272a" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "bold", fontSize: "0.7rem" }}>S</div>
                  Speaker 2
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <span style={{ color: "#a1a1aa", display: "flex", alignItems: "center", gap: 4 }}><div style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: "#ef4444" }}/> 209</span>
                  <span style={{ color: "#a78bfa", display: "flex", alignItems: "center", gap: 4 }}><div style={{ width: 12, height: 12, borderRadius: "50%", border: "2px solid #a78bfa", borderTopColor: "transparent" }}/> 61%</span>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.8rem", padding: "8px 12px", backgroundColor: "#18181b", borderRadius: 8, border: "1px solid #27272a" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: "#10b981", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "bold", fontSize: "0.7rem" }}>S</div>
                  Speaker 1
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <span style={{ color: "#a1a1aa", display: "flex", alignItems: "center", gap: 4 }}><div style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: "#f59e0b" }}/> 198</span>
                  <span style={{ color: "#818cf8", display: "flex", alignItems: "center", gap: 4 }}><div style={{ width: 12, height: 12, borderRadius: "50%", border: "2px solid #818cf8", borderTopColor: "transparent" }}/> 39%</span>
                </div>
              </div>
            </div>
            
            <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#71717a", marginTop: 24, marginBottom: 12, display: "flex", justifyContent: "space-between" }}>
              TOPIC TRACKERS <Plus size={14} cursor="pointer" />
            </div>
          </div>
        </div>

        {/* Center Panel (Notes & Summary) */}
        <div style={{ flex: 1, borderRight: "1px solid #27272a", display: "flex", flexDirection: "column", backgroundColor: "#111113", position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "center", padding: "12px 0", borderBottom: "1px solid transparent" }}>
            <div style={{ display: "flex", backgroundColor: "#18181b", borderRadius: 8, padding: 4, border: "1px solid #27272a" }}>
              <button style={{ padding: "6px 16px", borderRadius: 4, backgroundColor: "#3f3f46", fontSize: "0.85rem", fontWeight: 500, color: "#fff", border: "none" }}>Notes</button>
              <button style={{ padding: "6px 16px", borderRadius: 4, fontSize: "0.85rem", color: "#a1a1aa", background: "none", border: "none" }}>AI Skills <span style={{ backgroundColor: "#27272a", padding: "2px 6px", borderRadius: 12, marginLeft: 4 }}>0</span></button>
            </div>
            <Maximize size={16} color="#71717a" style={{ position: "absolute", right: 24, top: 24, cursor: "pointer" }} />
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "24px 80px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
              <div>
                <h1 style={{ fontSize: "1.8rem", fontWeight: 600, marginBottom: 12, color: "#fff" }}>{meeting.title}</h1>
                <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: "0.85rem", color: "#a1a1aa" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 20, height: 20, backgroundColor: "#b48372", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff" }}>S</div> Satyam V
                  </div>
                  <span>{format(new Date(meeting.date), "MMM dd yyyy, h:mm a")}</span>
                  <span>· English (Global)</span>
                </div>
              </div>
              <button style={{ padding: "6px 12px", backgroundColor: "#18181b", border: "1px solid #27272a", borderRadius: 6, color: "#d4d4d8", display: "flex", gap: 8, alignItems: "center", fontSize: "0.85rem", cursor: "pointer" }}><Video size={16} /> Video</button>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 16, color: "#a78bfa", fontSize: "0.9rem", marginBottom: 32 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}><Sparkles size={16} /> 1:1 <ChevronDown size={14}/></span>
              <span style={{ display: "flex", alignItems: "center", gap: 6, color: "#a78bfa", cursor: "pointer" }}><Edit3 size={14} /> Refine Summary</span>
              <Copy size={16} color="#a1a1aa" cursor="pointer" />
            </div>

            {/* Actual AI Summary Content */}
            <div className="fade-in-up" style={{ color: "#d4d4d8", fontSize: "0.95rem", lineHeight: 1.6 }}>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 600, color: "#fff", marginBottom: 24 }}>Current Focus Area</h3>
              
              {meeting.summary ? (
                <>
                  {meeting.summary.summary_text && <p style={{ marginBottom: 24, fontSize: "0.95rem" }}>{meeting.summary.summary_text}</p>}
                  
                  {meeting.summary.action_items && JSON.parse(meeting.summary.action_items).length > 0 && (
                    <>
                      <h4 style={{ fontWeight: 600, color: "#fff", marginTop: 24, marginBottom: 12 }}>Action Items</h4>
                      <ul style={{ paddingLeft: 0, display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
                        {JSON.parse(meeting.summary.action_items).map((item: any, idx: number) => {
                          const isObj = typeof item === 'object' && item !== null;
                          const text = isObj ? item.text : item;
                          const completed = isObj ? item.completed : false;
                          return (
                            <li key={idx} style={{ display: "flex", alignItems: "center", gap: 8, color: completed ? "#52525b" : "#a1a1aa", listStyleType: "none", cursor: "pointer" }} onClick={() => {
                              // Toggle complete
                              const currentItems = JSON.parse(meeting.summary.action_items).map((i: any) => typeof i === 'object' ? i : { text: i, completed: false });
                              currentItems[idx].completed = !currentItems[idx].completed;
                              const newSummary = { ...meeting.summary, action_items: JSON.stringify(currentItems) };
                              setMeeting({ ...meeting, summary: newSummary });
                              
                              fetch(`https://fireflies-clone-backend-ta0o.onrender.com/api/meetings/${meeting.id}/summary`, {
                                method: "PUT",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                  summary_text: newSummary.summary_text,
                                  action_items: newSummary.action_items,
                                  key_topics: newSummary.key_topics
                                })
                              });
                            }}>
                              <div style={{ width: 16, height: 16, border: "1px solid " + (completed ? "#34d399" : "#52525b"), borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: completed ? "#34d399" : "transparent" }}>
                                {completed && <CheckSquare size={12} color="#000" />}
                              </div>
                              <span style={{ textDecoration: completed ? "line-through" : "none" }}>{text}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </>
                  )}

                  <ul style={{ paddingLeft: 24, display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
                    {meeting.summary.key_topics && JSON.parse(meeting.summary.key_topics).map((topic: any, idx: number) => (
                      <li key={idx} style={{ fontWeight: 600, color: "#fff", listStyleType: "disc" }}>
                        {topic.title}
                        <ul style={{ paddingLeft: 24, display: "flex", flexDirection: "column", gap: 10, marginTop: 10, fontWeight: "normal" }}>
                          {topic.details.map((detail: string, dIdx: number) => (
                            <li key={dIdx} style={{ color: "#a1a1aa", listStyleType: "'◇  '" }} dangerouslySetInnerHTML={{ __html: detail.replace(/Interstellar/g, "<i>Interstellar</i>").replace(/Arrival/g, "<i>Arrival</i>") }}></li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p>No summary available for this meeting yet.</p>
              )}
            </div>

          </div>
        </div>

        {/* Right Panel (Transcript / AskFred) */}
        <div style={{ width: 340, display: "flex", flexDirection: "column", backgroundColor: "#111113" }}>
          <div style={{ display: "flex", borderBottom: "1px solid #27272a" }}>
            <button 
              style={{ flex: 1, padding: "16px 0", borderBottom: rightTab === "askfred" ? "2px solid #a78bfa" : "2px solid transparent", color: rightTab === "askfred" ? "#a78bfa" : "#a1a1aa", fontWeight: 500, fontSize: "0.9rem", display: "flex", justifyContent: "center", gap: 8, background: "none", borderTop: "none", borderLeft: "none", borderRight: "none", cursor: "pointer" }}
              onClick={() => setRightTab("askfred")}
            ><Bot size={18} /> AskFred</button>
            <button 
              style={{ flex: 1, padding: "16px 0", borderBottom: rightTab === "transcript" ? "2px solid #a78bfa" : "2px solid transparent", color: rightTab === "transcript" ? "#f3f4f6" : "#a1a1aa", fontWeight: 500, fontSize: "0.9rem", background: "none", borderTop: "none", borderLeft: "none", borderRight: "none", cursor: "pointer" }}
              onClick={() => setRightTab("transcript")}
            >Transcript</button>
          </div>
          
          {rightTab === "askfred" ? (
            <div style={{ flex: 1, padding: 24, display: "flex", flexDirection: "column", overflowY: "auto" }}>
              <div style={{ backgroundColor: "#18181b", padding: 16, borderRadius: 8, border: "1px solid #2d244a", display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 32 }}>
                <div style={{ display: "flex", gap: -4 }}>
                  <div style={{ width: 24, height: 24, backgroundColor: "#fff", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2, boxShadow: "0 0 5px rgba(0,0,0,0.5)" }}>
                    <img src="https://www.svgrepo.com/show/475689/slack-color.svg" alt="Slack" style={{ width: 14, height: 14 }} />
                  </div>
                  <div style={{ width: 24, height: 24, backgroundColor: "#fff", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1, marginLeft: -8, boxShadow: "0 0 5px rgba(0,0,0,0.5)" }}>
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Gmail" style={{ width: 14, height: 14 }} />
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "0.85rem", color: "#f3f4f6", lineHeight: 1.4 }}>
                    Connect Slack and Gmail <span style={{ color: "#a1a1aa" }}>— get answers with full context.</span>
                  </div>
                  <div style={{ color: "#a78bfa", fontSize: "0.85rem", marginTop: 8, textAlign: "right", cursor: "pointer" }} onClick={() => toast("Connect integrations coming soon")}>Connect <X size={12} style={{ display: "inline", marginLeft: 4 }} color="#52525b" /></div>
                </div>
              </div>

              <Sparkles size={20} color="#34d399" />
              <h3 style={{ fontSize: "1.1rem", fontWeight: 500, margin: "8px 0 24px 0", color: "#fff" }}>Hi Satyam! <br /> Ask anything about this meeting</h3>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ padding: "10px 16px", backgroundColor: "#18181b", border: "1px solid #27272a", borderRadius: 8, fontSize: "0.85rem", color: "#a1a1aa", cursor: "pointer" }}>Why was whale swimming scary?</div>
                <div style={{ padding: "10px 16px", backgroundColor: "#18181b", border: "1px solid #27272a", borderRadius: 8, fontSize: "0.85rem", color: "#a1a1aa", cursor: "pointer" }}>What did Zimbabwe offer culturally?</div>
                <div style={{ padding: "10px 16px", backgroundColor: "#18181b", border: "1px solid #27272a", borderRadius: 8, fontSize: "0.85rem", color: "#a1a1aa", cursor: "pointer" }}>Which Margot Robbie movie was mentioned?</div>
              </div>
            </div>
          ) : (
            <>
              <div style={{ padding: "12px 16px", borderBottom: "1px solid #27272a", backgroundColor: "#18181b" }}>
                <div style={{ display: "flex", alignItems: "center", backgroundColor: "#111113", padding: "8px 12px", borderRadius: 6, border: "1px solid #27272a" }}>
                  <Search size={14} color="#71717a" style={{ marginRight: 8 }} />
                  <input type="text" placeholder="Search" value={transcriptSearch} onChange={(e) => setTranscriptSearch(e.target.value)} style={{ backgroundColor: "transparent", border: "none", color: "#f3f4f6", fontSize: "0.85rem", width: "100%", outline: "none" }} />
                </div>
              </div>

              <div className="fade-in-up" style={{ flex: 1, overflowY: "auto", padding: "20px 24px", display: "flex", flexDirection: "column", gap: 32 }}>
                {meeting.transcripts?.map((t: any) => {
                  const isActive = currentTime >= t.start_time && currentTime <= t.end_time;
                  
                  // Highlight logic
                  const textSegments = transcriptSearch 
                    ? t.text.split(new RegExp(`(${transcriptSearch})`, 'gi')) 
                    : [t.text];

                  return (
                    <div 
                      key={t.id} 
                      ref={isActive ? activeTranscriptRef : null}
                      style={{ display: "flex", gap: 16, cursor: "pointer" }}
                      onClick={() => { setCurrentTime(t.start_time); setIsPlaying(true); }}
                    >
                      <div style={{ width: 24, height: 24, borderRadius: 4, backgroundColor: t.speaker === "Speaker 1" ? "#10b981" : "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "bold", fontSize: "0.7rem", flexShrink: 0 }}>
                        {t.speaker.charAt(t.speaker.length - 1)}
                      </div>
                      <div>
                        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8, fontSize: "0.85rem" }}>
                          <span style={{ fontWeight: 500, color: "#d4d4d8" }}>{t.speaker}</span>
                          <span style={{ color: "#3b82f6" }}>{formatTime(t.start_time)}</span>
                        </div>
                        <div style={{ fontSize: "0.95rem", lineHeight: 1.6, color: isActive ? "#fff" : "#a1a1aa", backgroundColor: isActive ? "rgba(255,255,255,0.05)" : "transparent", padding: isActive ? "4px 8px" : "0", borderRadius: 4, margin: isActive ? "-4px -8px" : "0" }}>
                          {textSegments.map((seg: string, i: number) => 
                            seg.toLowerCase() === transcriptSearch.toLowerCase() ? 
                            <mark key={i} style={{ backgroundColor: "#fef08a", color: "#000" }}>{seg}</mark> : 
                            <span key={i}>{seg}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
                {!meeting.transcripts?.length && <div style={{ color: "#71717a", textAlign: "center", marginTop: 40 }}>No transcript data available.</div>}
              </div>
            </>
          )}

          {/* AskFred Bottom Input (Visible when AskFred tab is active) */}
          {rightTab === "askfred" && (
            <div style={{ padding: 16, borderTop: "1px solid #27272a" }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                <span style={{ backgroundColor: "#18181b", border: "1px solid #27272a", padding: "4px 10px", borderRadius: 4, fontSize: "0.75rem", color: "#a1a1aa", display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#10b981" }}/> 1:1</span>
                <span style={{ backgroundColor: "#18181b", border: "1px solid #27272a", padding: "4px 10px", borderRadius: 4, fontSize: "0.75rem", color: "#a1a1aa", display: "flex", alignItems: "center", gap: 6 }}><Plus size={10} color="#10b981"/> Meeting Minutes Mailer</span>
              </div>
              <form onSubmit={handleAskFred} style={{ display: "flex", alignItems: "center", backgroundColor: "#18181b", padding: "12px", borderRadius: 8, border: "1px solid #27272a" }}>
                <input type="text" placeholder="Ask anything. Type / to run AI Skills" value={askFredInput} onChange={(e) => setAskFredInput(e.target.value)} style={{ background: "transparent", border: "none", color: "#f3f4f6", width: "100%", fontSize: "0.85rem", outline: "none" }} />
                <button type="submit" style={{ width: 24, height: 24, backgroundColor: "#2d244a", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", color: "#a78bfa", cursor: "pointer", border: "none" }}>↑</button>
              </form>
            </div>
          )}
        </div>

      </div>

      {/* Bottom Media Player with Seek Bar */}
      <div style={{ height: 80, backgroundColor: "#18181b", borderTop: "1px solid #27272a", display: "flex", flexDirection: "column" }}>
        
        {/* Seek Bar (Progress) */}
        <div style={{ height: 16, width: "100%", padding: "0 24px", display: "flex", alignItems: "center", marginTop: -8, position: "relative" }}>
          <input 
            type="range" 
            min="0" 
            max={maxTime} 
            value={currentTime} 
            onChange={handleSeek}
            style={{ width: "100%", height: 4, appearance: "none", background: `linear-gradient(to right, #a78bfa ${(currentTime/maxTime)*100}%, #3f3f46 ${(currentTime/maxTime)*100}%)`, borderRadius: 2, outline: "none", cursor: "pointer" }} 
            className="seek-slider"
          />
          <style dangerouslySetInnerHTML={{__html: `
            .seek-slider::-webkit-slider-thumb { appearance: none; width: 12px; height: 12px; border-radius: 50%; background: #a78bfa; cursor: pointer; transition: transform 0.1s; }
            .seek-slider::-webkit-slider-thumb:hover { transform: scale(1.3); }
          `}} />
        </div>

        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px" }}>
          <div style={{ fontSize: "0.85rem", color: "#a1a1aa", width: 120 }}>
            <span style={{ color: "#fff" }}>{formatTime(currentTime)}</span> / {formatTime(maxTime)}
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <span style={{ fontSize: "0.85rem", color: "#a1a1aa" }}>1x</span>
            <RotateCcw size={18} color="#a1a1aa" cursor="pointer" onClick={() => setCurrentTime(Math.max(0, currentTime - 10))} />
            <button style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", border: "none", cursor: "pointer" }} onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: 2 }} />}
            </button>
            <RotateCw size={18} color="#a1a1aa" cursor="pointer" onClick={() => setCurrentTime(Math.min(maxTime, currentTime + 10))} />
            <Download size={18} color="#a1a1aa" cursor="pointer" onClick={() => setShowDownloadModal(true)} />
          </div>

          <div style={{ display: "flex", gap: 16, width: 120, justifyContent: "flex-end" }}>
            <Star size={18} color="#a1a1aa" cursor="pointer" />
            <CheckSquare size={18} color="#a1a1aa" cursor="pointer" />
            <ThumbsUp size={18} color="#a1a1aa" cursor="pointer" />
            <ThumbsDown size={18} color="#a1a1aa" cursor="pointer" />
          </div>
        </div>
      </div>
      
      {/* Download Modal */}
      {showDownloadModal && (
        <div className="fade-in-up" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ width: 480, backgroundColor: "#18181b", border: "1px solid #27272a", borderRadius: 12, overflow: "hidden", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", borderBottom: "1px solid #27272a" }}>
              <div style={{ fontWeight: 500, color: "#fff", fontSize: "1rem" }}>Download Meeting</div>
              <X size={16} color="#71717a" cursor="pointer" onClick={() => setShowDownloadModal(false)} />
            </div>
            
            <div style={{ padding: "0 24px", borderBottom: "1px solid #27272a", display: "flex", gap: 24 }}>
              <div className="interactive" style={{ padding: "16px 0", color: downloadTab === "Transcript" ? "#f3f4f6" : "#a1a1aa", fontSize: "0.9rem", borderBottom: downloadTab === "Transcript" ? "2px solid #a78bfa" : "2px solid transparent", cursor: "pointer" }} onClick={() => setDownloadTab("Transcript")}>Transcript</div>
              <div className="interactive" style={{ padding: "16px 0", color: downloadTab === "Summary" ? "#f3f4f6" : "#a1a1aa", fontSize: "0.9rem", borderBottom: downloadTab === "Summary" ? "2px solid #a78bfa" : "2px solid transparent", cursor: "pointer" }} onClick={() => setDownloadTab("Summary")}>Summary</div>
              <div className="interactive" style={{ padding: "16px 0", color: downloadTab === "Audio" ? "#f3f4f6" : "#a1a1aa", fontSize: "0.9rem", borderBottom: downloadTab === "Audio" ? "2px solid #a78bfa" : "2px solid transparent", cursor: "pointer" }} onClick={() => setDownloadTab("Audio")}>Audio</div>
            </div>

            <div style={{ padding: 24 }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                {(downloadTab === "Audio" ? ["MP3"] : downloadTab === "Summary" ? ["DOCX", "PDF", "JSON", "MD"] : ["PDF", "DOCX", "SRT", "CSV", "JSON", "MD"]).map(fmt => (
                  <div key={fmt} className="interactive" style={{ padding: "6px 12px", border: downloadFormat === fmt ? "1px solid #a78bfa" : "1px solid #27272a", backgroundColor: downloadFormat === fmt ? "rgba(167, 139, 250, 0.1)" : "transparent", color: downloadFormat === fmt ? "#a78bfa" : "#a1a1aa", borderRadius: 6, fontSize: "0.85rem", cursor: "pointer" }} onClick={() => setDownloadFormat(fmt)}>
                    {fmt}
                  </div>
                ))}
              </div>

              {downloadTab !== "Audio" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 12, fontSize: "0.9rem", color: "#d4d4d8", cursor: "pointer" }}>
                    <div style={{ width: 16, height: 16, borderRadius: 4, backgroundColor: includeTimestamp ? "#7c3aed" : "transparent", border: includeTimestamp ? "none" : "1px solid #52525b", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setIncludeTimestamp(!includeTimestamp)}>
                      {includeTimestamp && <CheckSquare size={14} color="#fff" />}
                    </div>
                    Include timestamps
                  </label>
                  {downloadTab === "Transcript" && (
                    <label style={{ display: "flex", alignItems: "center", gap: 12, fontSize: "0.9rem", color: "#d4d4d8", cursor: "pointer" }}>
                      <div style={{ width: 16, height: 16, borderRadius: 4, backgroundColor: showSpeakerName ? "#7c3aed" : "transparent", border: showSpeakerName ? "none" : "1px solid #52525b", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setShowSpeakerName(!showSpeakerName)}>
                        {showSpeakerName && <CheckSquare size={14} color="#fff" />}
                      </div>
                      Show speaker name
                    </label>
                  )}
                  <label style={{ display: "flex", alignItems: "center", gap: 12, fontSize: "0.9rem", color: "#d4d4d8", cursor: "pointer" }}>
                    <div style={{ width: 16, height: 16, borderRadius: 4, backgroundColor: removeBranding ? "#7c3aed" : "transparent", border: removeBranding ? "none" : "1px solid #52525b", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setRemoveBranding(!removeBranding)}>
                      {removeBranding && <CheckSquare size={14} color="#fff" />}
                    </div>
                    Remove Fireflies Branding
                  </label>
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button onClick={() => { handleDownload(); setShowDownloadModal(false); }} style={{ padding: "8px 24px", backgroundColor: "#7c3aed", border: "none", borderRadius: 6, color: "#fff", fontSize: "0.9rem", cursor: "pointer" }}>Download</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MeetingDetailView() {
  return (
    <Suspense fallback={
      <div style={{ display: "flex", flexDirection: "column", height: "100vh", alignItems: "center", justifyContent: "center", backgroundColor: "#111113" }}>
        <div className="spinner" style={{ marginBottom: 24 }}></div>
        <div style={{ color: "#a1a1aa", fontSize: "0.95rem", fontWeight: 500 }}>Loading meeting...</div>
      </div>
    }>
      <MeetingDetailContent />
    </Suspense>
  );
}
