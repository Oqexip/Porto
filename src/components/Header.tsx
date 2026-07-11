"use client";

import Link from "next/link";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const links = [["PROFILE", "/"], ["PROJECTS", "/projects"], ["CERTIFICATES", "/certificates"], ["CONTACT", "/contact"]] as const;

export default function Header({ back = false }: { back?: boolean }) {
  const [open, setOpen] = useState(false); const [mounted, setMounted] = useState(false); const { theme, setTheme } = useTheme();
  useEffect(() => setMounted(true), []);
  return <header className="site-header"><div className="header-inner">
    <Link href="/" className="brand">★ MAKDUM.DEV</Link>
    {back ? <Link href="/" className="back-link">← BACK TO HOME</Link> : <nav className="desktop-nav">{links.map(([label, href]) => <Link key={href} href={href}> {label === "PROFILE" ? "★ " : ""}{label}</Link>)}</nav>}
    <div className="header-actions"><button className="theme-toggle" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme">{mounted && theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}</button><button className="dont-click" onClick={() => alert("☠ You clicked it. The portfolio has been mildly cursed.")}>☠ <span>DON&apos;T CLICK ME</span></button><button className="mobile-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button></div>
  </div>{open && <nav className="mobile-menu">{links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}</nav>}</header>;
}
