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
  const [logs, setLogs] = useState<string[]>([DEV_LOGS[0]]);
  const [coffeeCount, setCoffeeCount] = useState(0);
  const [progress, setProgress] = useState(65);

  useEffect(() => {
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

        <div className="mt-10 grid grid-cols-[1fr_1.2fr] gap-8 max-[850px]:grid-cols-1">
          <div className="border-[3px] border-[var(--line)] bg-[var(--paper)] shadow-[7px_7px_0_var(--line)]">
            <div
              className="flex items-center justify-between border-b-[3px] border-[var(--line)] bg-[var(--pink)] p-[14px_18px] text-[15px] font-black text-[#111]"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              <span>STATUS: IN_DEVELOPMENT</span>
              <HardHat size={20} className="anim-bob" />
            </div>
            
            <div className="flex flex-col gap-4 p-6">
              <h2 className="m-0 text-xl font-black" style={{ fontFamily: "var(--font-geist-mono)" }}>Estimated Progress</h2>
              <div className="relative h-9 overflow-hidden border-[3px] border-[var(--line)] bg-[var(--bg)]">
                <div
                  className="flex h-full items-center border-r-[3px] border-[var(--line)] bg-[var(--green)] pl-3 transition-[width] duration-[400ms] ease-[ease]"
                  style={{ width: `${progress}%` }}
                >
                  <span className="text-sm font-black text-[#111]" style={{ fontFamily: "var(--font-geist-mono)" }}>{progress}%</span>
                </div>
              </div>
              <p className="m-0 text-sm font-semibold text-[var(--muted)]">
                Current Task: Fixing layout issues and drinking coffee.
              </p>

              <div className="mt-2 flex gap-3">
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

          <div className="flex h-[380px] flex-col overflow-hidden border-[3px] border-[var(--line)] bg-[#111] text-[#f7f7ef] shadow-[7px_7px_0_var(--line)]">
            <div
              className="flex items-center justify-between border-b-[3px] border-[var(--line)] bg-[var(--blue)] p-[12px_16px] text-sm font-black text-white"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              <span>
                <Terminal size={16} /> developer@ilham-server:~
              </span>
              <span className="window-dots flex-row-reverse">
                <i />
                <i />
                <i />
              </span>
            </div>
            <div
              className="flex grow flex-col overflow-y-auto p-4 text-[13px] leading-[1.5]"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              {logs.map((log, idx) => (
                <p
                  key={idx}
                  className={`m-0 mb-2 ${log.includes("warning") ? "text-[var(--yellow)]" : log.includes("error") || log.includes("fail") ? "text-[var(--red)]" : "text-[var(--green)]"}`}
                >
                  &gt; {log}
                </p>
              ))}
              <p className="mt-auto mb-2 text-white">developer@ilham-server:~# <span className="terminal-cursor">▋</span></p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
