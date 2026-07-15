"use client";

import { useEffect, useState } from "react";
import { Construction, Coffee, HardHat, Terminal, RefreshCw } from "lucide-react";
import Header from "@/components/Header";
import CursorTrail from "@/components/CursorTrail";

const DEV_LOGS = [
  "npm run dev",
  "Turbopack: compiling page /development...",
  "status: dev_server_active = true",
  "info: caffeinating the developer...",
  "warning: coffee levels low (24%)",
  "action: coffee_refilled = true",
  "status: coffee level = 100%",
  "compilation success: 12 warnings suppressed",
  "npm run build: pending...",
  "status: code_quality = 'questionable_but_works'",
  "info: trying to resolve 2 AM bugs...",
  "status: bugs squashed = 124",
  "status: current_progress = 'Refactoring CSS for the 10th time'",
];

export default function DevelopmentPage() {
  const [logs, setLogs] = useState<string[]>([]);
  const [coffeeCount, setCoffeeCount] = useState(0);
  const [progress, setProgress] = useState(65);

  useEffect(() => {
    setLogs([DEV_LOGS[0]]);
    const interval = setInterval(() => {
      setLogs((prev) => {
        if (prev.length >= DEV_LOGS.length) {
          return [DEV_LOGS[0]];
        }
        return [...prev, DEV_LOGS[prev.length]];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <CursorTrail />
      <Header back />
      <main className="page-shell sub-page page-enter">
        <div className="warning-stripes" aria-hidden="true" />
        
        <section className="page-heading">
          <h1>
            <Construction size={50} strokeWidth={2.5} />
            DEV PHASE
          </h1>
          <p>
            This section is currently under heavy construction. Hard hats and coffee are required beyond this point.
          </p>
        </section>

        <div className="dev-layout">
          <div className="dev-main-card">
            <div className="dev-card-header">
              <span>STATUS: IN_DEVELOPMENT</span>
              <HardHat size={20} className="anim-bob" />
            </div>
            
            <div className="dev-card-body">
              <h2>Estimated Progress</h2>
              <div className="dev-progress-container">
                <div className="dev-progress-bar" style={{ width: `${progress}%` }}>
                  <span>{progress}%</span>
                </div>
              </div>
              <p className="dev-status-text">
                Current Task: Fixing layout issues and drinking coffee.
              </p>

              <div className="dev-actions">
                <button className="brutal-button" onClick={() => {
                  setCoffeeCount(c => c + 1);
                  setProgress(p => Math.min(p + 1, 99));
                }}>
                  <Coffee size={16} /> Serve Coffee ({coffeeCount})
                </button>
                <button className="brutal-button yellow-btn" onClick={() => {
                  setProgress(Math.floor(Math.random() * 30) + 60);
                }}>
                  <RefreshCw size={16} /> Re-compile
                </button>
              </div>
            </div>
          </div>

          <div className="dev-terminal-card">
            <div className="dev-terminal-header">
              <span>
                <Terminal size={16} /> developer@ilham-server:~
              </span>
              <span className="window-dots">
                <i />
                <i />
                <i />
              </span>
            </div>
            <div className="dev-terminal-body">
              {logs.map((log, idx) => (
                <p key={idx} className={log.includes("warning") ? "log-warn" : log.includes("error") || log.includes("fail") ? "log-err" : "log-ok"}>
                  &gt; {log}
                </p>
              ))}
              <p className="log-prompt">developer@ilham-server:~# <span className="terminal-cursor">▋</span></p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
