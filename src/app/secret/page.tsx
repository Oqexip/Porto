"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import CursorTrail from "@/components/CursorTrail";

interface LogLine {
  prefix: string;
  text: string;
  className?: string;
}

const LOG_LINES: LogLine[] = [
  { prefix: "ad/min@system:~#", text: "INITIATING BREACH PROTOCOL..." },
  { prefix: "admin@system:~#", text: "ACCESS GRANTED." },
  { prefix: "admin@system:~#", text: "DOWNLOADING TOP SECRET FILES..." },
  { prefix: "admin@system:~#", text: "WARNING: UNAUTHORIZED USER DETECTED!", className: "text-[#ff4136] font-black" },
  { prefix: "admin@system:~#", text: "SYSTEM LOCKDOWN IMMINENT.", className: "text-[#ff4136] font-black" },
  { prefix: "admin@system:~#", text: "SELF DEFENCE PROTOCOL ENABLED 👾", className: "text-[#ff554d] font-black" },
  { prefix: "admin@system:~#", text: "" },
];

export default function SecretPage() {
  const [squashed, setSquashed] = useState(0);
  const [bugs, setBugs] = useState(
    Array.from({ length: 8 }, (_, id) => ({
      id,
      x: 12 + ((id * 11) % 74),
      y: 62 + ((id * 19) % 25),
    })),
  );
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const isFinished = currentLineIndex >= LOG_LINES.length;

  useEffect(() => {
    if (currentLineIndex >= LOG_LINES.length) {
      return;
    }

    const currentLine = LOG_LINES[currentLineIndex];
    if (currentText.length < currentLine.text.length) {
      const timeout = setTimeout(() => {
        const nextChar = currentLine.text[currentText.length];
        setCurrentText((prev) => prev + nextChar);
      }, 50); // Slowed down from 30ms to 75ms per character
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentText("");
      }, 600); // Slowed down from 150ms to 600ms pause between lines
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentText]);

  function squash(id: number) {
    setSquashed((value) => value + 1);
    setBugs((items) => items.filter((bug) => bug.id !== id));
  }

  return (
    <>
      <CursorTrail />
      <main
        className="grid min-h-screen place-items-center overflow-hidden bg-black p-10 text-[#eee] max-[700px]:p-[15px]"
        style={{ fontFamily: "var(--font-geist-mono)" }}
      >
        <section className="relative min-h-[850px] w-[min(900px,100%)] border-[5px] border-[#ff4136] bg-[#151515] p-[52px_56px] shadow-[14px_14px_0_#ff4136] max-[700px]:min-h-[720px] max-[700px]:p-[28px_22px]">
          <header className="grid grid-cols-[1fr_220px_70px] items-start gap-[18px] border-b-[5px] border-[#ff4136] pb-6 text-[#ff4136] max-[700px]:grid-cols-1 max-[700px]:gap-[15px]">
            <h1
              className="m-0 text-[27px] leading-[1.4] font-normal max-[700px]:text-[18px]"
              style={{ fontFamily: "var(--font-pixel)" }}
            >
              ☠ CLASSIFIED TERMINAL
            </h1>
            <div className="border-[3px] border-[#fff000] p-[12px_14px] text-base leading-[1.5] font-extrabold text-[#fff000]">
              BUGS
              <br />
              SQUASHED: {squashed}
            </div>
            <span className="pt-3 text-[#ff4136] max-[700px]:hidden">[ REC ]</span>
          </header>
          <div className="py-[31px] text-[19px] leading-[1.4] max-[700px]:text-[13px]">
            {LOG_LINES.map((line, index) => {
              if (index < currentLineIndex) {
                return (
                  <p key={index} className={`m-0 mb-[19px] ${line.className ?? "text-[#50e3c2]"}`}>
                    <b className="text-[#fff000]">{line.prefix}</b> {line.text}
                  </p>
                );
              } else if (index === currentLineIndex) {
                return (
                  <p key={index} className={`m-0 mb-[19px] ${line.className ?? "text-[#50e3c2]"}`}>
                    <b className="text-[#fff000]">{line.prefix}</b> {currentText}
                    <span className="terminal-cursor">▋</span>
                  </p>
                );
              } else {
                return null;
              }
            })}
          </div>
          <div className={`relative min-h-[170px] border-t-2 border-dashed border-[#50e3c2] p-[24px_15px] text-center transition-[opacity,transform] duration-500 ${isFinished ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-[10px] opacity-0 pointer-events-none"}`}>
            <h2
              className="m-0 mb-[13px] text-[15px] leading-[1.5] font-normal max-[700px]:text-[11px]"
              style={{ fontFamily: "var(--font-pixel)" }}
            >
              &gt; INCOMING THREAT: PRODUCTION BUGS DETECTED!
            </h2>
            <p className="m-0 text-[15px] max-[700px]:text-xs">
              Squash as many bugs as you can before they escape. They&apos;re
              fast.
            </p>
            {bugs.map((bug) => (
              <button
                key={bug.id}
                className="secret-bug absolute border-0 bg-transparent text-[30px] text-[#ff4136] hover:scale-[1.3]"
                style={{ left: `${bug.x}%`, top: `${bug.y}%` }}
                onClick={() => squash(bug.id)}
                aria-label="Squash bug"
              >
                ☠
              </button>
            ))}
          </div>
          <Link
            href="/"
            className={`mx-auto mt-8 block w-max border-4 border-[#50e3c2] p-[20px_28px] text-sm font-normal text-[#50e3c2] shadow-[5px_5px_0_#50e3c2] transition-[opacity,transform] duration-500 max-[700px]:p-4 max-[700px]:text-[10px] ${isFinished ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-[10px] opacity-0 pointer-events-none"}`}
            style={{ fontFamily: "var(--font-pixel)" }}
          >
            RETURN TO SAFETY
          </Link>
        </section>
      </main>
    </>
  );
}

