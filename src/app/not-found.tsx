"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { AlertOctagon, CornerDownRight, Home, RefreshCcw } from "lucide-react";
import CursorTrail from "@/components/CursorTrail";

const EXCUSES = [
  "The developer fell asleep coding this page.",
  "A black hole swallowed this specific route.",
  "It was compiled at 3 AM and vanished into thin air.",
  "The server is on a coffee break.",
  "Classified info. You don't have security clearance.",
];

export default function NotFound() {
  const [excuseIndex, setExcuseIndex] = useState(0);
  const [path, setPath] = useState("/unknown-route");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPath(window.location.pathname);
    }
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
            <p className="err-path">
              <CornerDownRight size={14} /> GET {path}
            </p>
            <h1>FATAL 404</h1>
            <p className="err-desc">
              Route not found. The requested page appears to have escaped into the void.
            </p>

            <div className="excuse-box">
              <span className="excuse-label">EXCUSE GENERATOR:</span>
              <p>&quot;{EXCUSES[excuseIndex]}&quot;</p>
              <button className="excuse-btn" onClick={randomizeExcuse}>
                <RefreshCcw size={13} /> Generate Another
              </button>
            </div>

            <div className="error-actions">
              <Link href="/" className="back-link-btn">
                <Home size={15} /> BACK TO HOME
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
