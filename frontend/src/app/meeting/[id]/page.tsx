"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import { Play, Pause, Search, Video, FileText, Bot, Menu, Sparkles, SlidersHorizontal, CheckSquare, MessageSquare, RotateCcw, RotateCw, Download, Star, Share, ThumbsUp, ThumbsDown } from "lucide-react";

export default function MeetingDetailView() {
  const params = useParams();
  const [meeting, setMeeting] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const maxTime = meeting?.transcripts.length ? Math.max(...meeting.transcripts.map((t: any) => t.end_time)) : 519; // ~8:39 default
  
  const [rightTab, setRightTab] = useState("transcript");

  useEffect(() => {
    fetch(`http://localhost:8000/api/meetings/${params.id}`)
      .then((res) => res.json())
      .then((data) => { setMeeting(data); setLoading(false); })
      .catch((err) => console.error(err));
  }, [params.id]);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => setCurrentTime((prev) => (prev >= maxTime ? prev : prev + 1)), 1000);
    } else if (timerRef.current) clearInterval(timerRef.current);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPlaying, maxTime]);

  const formatTime = (sec: number) => `${Math.floor(sec / 60).toString().padStart(2, '0')}:${Math.floor(sec % 60).toString().padStart(2, '0')}`;

  if (loading || !meeting) return <div style={{ padding: 40, color: "var(--text-muted)" }}>Loading...</div>;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
      
      {/* Top Header */}
      <header style={{ height: 56, borderBottom: "1px solid var(--border-dark)", display: "flex", alignItems: "center", padding: "0 16px", justifyContent: "space-between", backgroundColor: "var(--surface-dark)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Menu size={20} color="var(--text-muted)" />
          <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>#All Meetings / {meeting.title}</span>
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <button style={{ color: "#10b981", fontSize: "0.85rem", fontWeight: 500 }}>Upgrade</button>
          <div style={{ width: 1, height: 16, backgroundColor: "var(--border-dark)" }} />
          <button className="btn btn-primary" style={{ padding: "6px 12px", borderRadius: 4, display: "flex", gap: 8 }}><Share size={16} /> Share</button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="meeting-layout" style={{ flex: 1 }}>
        
        {/* Left Smart Search Panel */}
        <div className="panel-left">
          <div style={{ padding: "16px", borderBottom: "1px solid var(--border-dark)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 500 }}>Smart Search</span>
          </div>
          <div style={{ padding: 16 }}>
            <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: 12 }}>AI FILTERS</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <div style={{ backgroundColor: "#24272c", padding: "8px 12px", borderRadius: 8, fontSize: "0.8rem", display: "flex", justifyContent: "space-between" }}><span style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#10b981" }}/> Date & Time</span> <span>5</span></div>
              <div style={{ backgroundColor: "#24272c", padding: "8px 12px", borderRadius: 8, fontSize: "0.8rem", display: "flex", justifyContent: "space-between" }}><span style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#f59e0b" }}/> Tasks</span> <span>10</span></div>
            </div>
            
            <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", marginTop: 24, marginBottom: 12 }}>SENTIMENTS</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem" }}><span style={{ display: "flex", alignItems: "center", gap: 8 }}><div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#3b82f6" }}/> Positive</span> <span>39%</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem" }}><span style={{ display: "flex", alignItems: "center", gap: 8 }}><div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#f43f5e" }}/> Neutral</span> <span>58%</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem" }}><span style={{ display: "flex", alignItems: "center", gap: 8 }}><div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#f59e0b" }}/> Negative</span> <span>2%</span></div>
            </div>

            <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", marginTop: 24, marginBottom: 12 }}>SPEAKER TALKTIME</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.8rem", padding: "8px 0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 24, height: 24, borderRadius: 4, backgroundColor: "#10b981", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "bold" }}>K</div>
                Krish Ramineni
              </div>
              <span style={{ color: "var(--primary-color)" }}>100%</span>
            </div>
          </div>
        </div>

        {/* Center Panel (Notes & Summary) */}
        <div className="panel-center" style={{ overflowY: "auto", padding: "24px 40px" }}>
          
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
            <div style={{ display: "flex", backgroundColor: "var(--surface-dark)", borderRadius: 8, padding: 4 }}>
              <button style={{ padding: "6px 16px", borderRadius: 4, backgroundColor: "#33373e", fontSize: "0.85rem", fontWeight: 500 }}>Notes</button>
              <button style={{ padding: "6px 16px", borderRadius: 4, fontSize: "0.85rem", color: "var(--text-secondary)" }}>AI Skills <span style={{ backgroundColor: "#24272c", padding: "2px 6px", borderRadius: 12, marginLeft: 4 }}>0</span></button>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
            <div>
              <h1 style={{ fontSize: "1.8rem", fontWeight: 600, marginBottom: 8 }}>{meeting.title}</h1>
              <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 16, height: 16, backgroundColor: "#f43f5e", borderRadius: 4 }}/> Fred Fireflies</div>
                <span>{format(new Date(meeting.date), "MMM dd yyyy, h:mm a")}</span>
                <span>· English (Global)</span>
              </div>
            </div>
            <button className="btn btn-secondary" style={{ padding: "6px 12px" }}><Video size={16} /> Video</button>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: 24, borderBottom: "1px solid var(--border-dark)", paddingBottom: 16 }}>
            <Sparkles size={16} /> General Summary
          </div>

          <h3 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: 16 }}>Notes</h3>
          <p style={{ lineHeight: 1.7, fontSize: "0.95rem", color: "#d1d5db" }}>
            {meeting.summary ? meeting.summary.summary_text : "No summary available."}
          </p>

        </div>

        {/* Right Panel (Transcript / AskFred) */}
        <div className="panel-right">
          <div style={{ display: "flex", borderBottom: "1px solid var(--border-dark)" }}>
            <button 
              style={{ flex: 1, padding: "16px 0", borderBottom: rightTab === "askfred" ? "2px solid var(--primary-color)" : "2px solid transparent", color: rightTab === "askfred" ? "var(--primary-color)" : "var(--text-secondary)", fontWeight: 500, fontSize: "0.9rem", display: "flex", justifyContent: "center", gap: 8 }}
              onClick={() => setRightTab("askfred")}
            ><Bot size={18} /> AskFred</button>
            <button 
              style={{ flex: 1, padding: "16px 0", borderBottom: rightTab === "transcript" ? "2px solid var(--primary-color)" : "2px solid transparent", color: rightTab === "transcript" ? "var(--text-primary)" : "var(--text-secondary)", fontWeight: 500, fontSize: "0.9rem" }}
              onClick={() => setRightTab("transcript")}
            >Transcript</button>
          </div>
          
          <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border-dark)" }}>
            <div className="input-wrapper">
              <Search className="input-icon" size={14} />
              <input type="text" className="input with-icon" placeholder="Find or Replace" style={{ backgroundColor: "transparent", border: "none", padding: "8px 12px 8px 32px", fontSize: "0.85rem" }} />
            </div>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px", display: "flex", flexDirection: "column", gap: 32 }}>
            {meeting.transcripts.map((t: any) => (
              <div key={t.id} style={{ display: "flex", gap: 16 }}>
                <div style={{ width: 24, height: 24, borderRadius: 4, backgroundColor: "#10b981", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "bold", fontSize: "0.8rem", flexShrink: 0 }}>K</div>
                <div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8, fontSize: "0.85rem" }}>
                    <span style={{ fontWeight: 500, color: "var(--text-secondary)" }}>{t.speaker}</span>
                    <span style={{ color: "var(--primary-color)", cursor: "pointer" }} onClick={() => { setCurrentTime(t.start_time); setIsPlaying(true); }}>{formatTime(t.start_time)}</span>
                  </div>
                  <div style={{ fontSize: "0.95rem", lineHeight: 1.6, color: (currentTime >= t.start_time && currentTime <= t.end_time) ? "#fff" : "#d1d5db" }}>
                    {t.text}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Media Player */}
      <div className="bottom-player">
        <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", width: 120 }}>
          <span style={{ color: "#fff" }}>{formatTime(currentTime)}</span> / {formatTime(maxTime)}
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>1x</span>
          <RotateCcw size={18} color="var(--text-secondary)" cursor="pointer" onClick={() => setCurrentTime(Math.max(0, currentTime - 10))} />
          <button style={{ width: 32, height: 32, borderRadius: "50%", backgroundColor: "var(--primary-color)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", border: "none" }} onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? <Pause size={16} /> : <Play size={16} style={{ marginLeft: 2 }} />}
          </button>
          <RotateCw size={18} color="var(--text-secondary)" cursor="pointer" onClick={() => setCurrentTime(Math.min(maxTime, currentTime + 10))} />
          <Download size={18} color="var(--text-secondary)" cursor="pointer" />
        </div>

        <div style={{ display: "flex", gap: 16, width: 120, justifyContent: "flex-end" }}>
          <Star size={18} color="var(--text-secondary)" cursor="pointer" />
          <CheckSquare size={18} color="var(--text-secondary)" cursor="pointer" />
          <ThumbsUp size={18} color="var(--text-secondary)" cursor="pointer" />
          <ThumbsDown size={18} color="var(--text-secondary)" cursor="pointer" />
        </div>
      </div>
      
    </div>
  );
}
