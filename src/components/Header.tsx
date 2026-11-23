"use client";

import Link from "next/link";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";

const links = [
  ["★ PROFILE ★", "/"],
  ["PROJECTS", "/projects"],
  ["CERTIFICATES", "/certificates"],
  ["CONTACT", "/contact"],
] as const;

export default function Header({ back = false }: { back?: boolean }) {
  const [open, setOpen] = useState(false);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  return (
    <header className="site-header">
      <div className="header-inner">
        {back ? (
          <Link href="/" className="back-link">
            ← BACK TO HOME
          </Link>
        ) : (
          <nav className="desktop-nav" aria-label="Primary navigation">
            {links.map(([label, href]) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
          </nav>
        )}
        <div className="header-actions">
          <button
            className="theme-toggle"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {mounted && theme === "dark" ? (
              <Sun size={21} />
            ) : (
              <Moon size={21} />
            )}
          </button>
          <button className="dont-click" onClick={() => router.push("/development")}>
            ☠ <span>DON&apos;T CLICK ME</span>
          </button>
          <button
            className="mobile-toggle"
            onClick={() => setOpen((wasOpen) => !wasOpen)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={21} strokeWidth={2.5} /> : <Menu size={21} strokeWidth={2.5} />}
          </button>
        </div>
      </div>
        <nav className="mobile-menu" id="mobile-menu" aria-label="Mobile navigation" hidden={!open}>
          {links.map(([label, href]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
          <button
            type="button"
            className="mobile-menu-btn mobile-dont-click"
            onClick={() => {
              setOpen(false);
              router.push("/development");
            }}
          >
            ☠ DON&apos;T CLICK ME
          </button>
        </nav>
    </header>
  );
}
