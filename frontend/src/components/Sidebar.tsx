"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Notebook, Folder, Settings, Search, PlusCircle } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Meetings", href: "/", icon: <Home size={18} /> },
    { name: "Notebook", href: "/notebook", icon: <Notebook size={18} /> },
    { name: "Channels", href: "/channels", icon: <Folder size={18} /> },
    { name: "Settings", href: "/settings", icon: <Settings size={18} /> },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div style={{width: 24, height: 24, borderRadius: '50%', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{width: 10, height: 10, borderRadius: '50%', background: '#fff'}}></div>
        </div>
        Fireflies.ai
      </div>

      <div style={{ padding: "0 12px", marginBottom: 20 }}>
        <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
          <PlusCircle size={18} /> Add Meeting
        </button>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`nav-item ${pathname === item.href ? "active" : ""}`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>
      
      <div style={{ padding: 20, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
        © 2026 Fireflies.ai Clone
      </div>
    </aside>
  );
}
