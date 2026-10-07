"use client";
import { Search, Bell, User, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function Topbar() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <header className="topbar">
      <div className="input-wrapper" style={{ width: 400 }}>
        <Search className="input-icon" size={18} />
        <input
          type="text"
          className="input with-icon"
          placeholder="Search meetings, transcripts, people..."
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="btn btn-ghost" onClick={toggleTheme}>
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        <button className="btn btn-ghost">
          <Bell size={20} />
        </button>
        <button className="btn btn-ghost" style={{ padding: 6, borderRadius: "50%", background: "var(--border-color)" }}>
          <User size={20} />
        </button>
      </div>
    </header>
  );
}
