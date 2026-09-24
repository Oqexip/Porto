"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { AlertOctagon, CornerDownRight, Home, RefreshCcw } from "lucide-react";
import CursorTrail from "@/components/CursorTrail";
import { errorActionStyles } from "@/components/errorActionStyles";

const EXCUSES = [
  "The developer fell asleep coding this page.",
  "A black hole swallowed this specific route.",
  "It was compiled at 3 AM and vanished into thin air.",
  "The server is on a coffee break.",
  "Classified info. You don't have security clearance.",
];

export default function NotFound() {
  const [excuseIndex, setExcuseIndex] = useState(0);
  const path = usePathname() ?? "/unknown-route";

  useEffect(() => {
    document.documentElement.classList.add("error-html-bg");
    document.body.classList.add("error-body-bg");
    return () => {
      document.documentElement.classList.remove("error-html-bg");
      document.body.classList.remove("error-body-bg");
    };
  }, []);

  const randomizeExcuse = () => {
    setExcuseIndex((prev) => (prev + 1) % EXCUSES.length);
  };

  return (
    <>
      <CursorTrail />
      <main className="error-page page-enter">
        <section className="error-card">
          <div className="error-head">
            <span>root@ilham-server:~ / ERROR.LOG</span>
            <AlertOctagon size={16} className="anim-pulse" />
          </div>
          <div className="error-body">
            <p className="flex items-center gap-1.5 text-sm font-black text-[var(--pink)]">
              <CornerDownRight size={14} /> GET {path}
            </p>
            <h1>FATAL 404</h1>
            <p className={errorActionStyles.description}>
              Route not found. The requested page appears to have escaped into the void.
            </p>

            <div className="my-6 flex flex-col gap-2 border-2 border-dashed border-[var(--yellow)] bg-[rgba(248,231,28,0.05)] p-4">
              <span
                className="text-[11px] font-black text-[var(--yellow)]"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                EXCUSE GENERATOR:
              </span>
              <p className="m-0 text-sm italic">&quot;{EXCUSES[excuseIndex]}&quot;</p>
              <button
                className={errorActionStyles.button}
                style={{ fontFamily: "var(--font-geist-mono)" }}
                onClick={randomizeExcuse}
              >
                <RefreshCcw size={13} /> Generate Another
              </button>
            </div>

            <div className="error-actions">
              <Link
                href="/"
                className={errorActionStyles.backLink}
                style={{ fontFamily: "var(--font-pixel)" }}
              >
                <Home size={15} /> BACK TO HOME
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
