"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import CursorTrail from "@/components/CursorTrail";
import SecretTerminal from "@/components/SecretTerminal";
import { terminalCursor } from "@/components/pageStyles";

interface LogLine {
  prefix: string;
  text: string;
  className?: string;
}

const LOG_LINES: LogLine[] = [
  { prefix: "admin@system:~#", text: "INITIATING BREACH PROTOCOL..." },
  { prefix: "admin@system:~#", text: "ACCESS GRANTED." },
  { prefix: "admin@system:~#", text: "DOWNLOADING TOP SECRET FILES..." },
  { prefix: "admin@system:~#", text: "WARNING: UNAUTHORIZED USER DETECTED!", className: "text-[#ff4136] font-black" },
  { prefix: "admin@system:~#", text: "SYSTEM LOCKDOWN IMMINENT.", className: "text-[#ff4136] font-black" },
  { prefix: "admin@system:~#", text: "SELF DEFENCE PROTOCOL ENABLED 👾", className: "text-[#ff554d] font-black" },
  { prefix: "admin@system:~#", text: "" },
];

const INITIAL_BUGS = Array.from({ length: 8 }, (_, id) => ({
  id,
  x: 12 + ((id * 11) % 74),
  y: 62 + ((id * 19) % 25),
}));

export default function SecretPage() {
  const [bugs, setBugs] = useState(INITIAL_BUGS);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const firstBugRef = useRef<HTMLButtonElement>(null);
  const isFinished = currentLineIndex >= LOG_LINES.length;
  const squashed = INITIAL_BUGS.length - bugs.length;

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

  useEffect(() => {
    if (isFinished && bugs.length === INITIAL_BUGS.length) {
      firstBugRef.current?.focus();
    }
  }, [isFinished, bugs.length]);

  function squash(id: number) {
    setBugs((items) => items.filter((bug) => bug.id !== id));
  }

  if (isFinished && bugs.length === 0) {
    return <SecretTerminal bugCount={INITIAL_BUGS.length} onReplay={() => setBugs(INITIAL_BUGS)} />;
  }

  return (
    <>
      <CursorTrail />
      <main
        className="grid min-h-screen place-items-center overflow-hidden bg-black p-10 font-mono text-[#eee] max-[700px]:p-[15px]"
      >
        <section className="relative min-h-[850px] w-[min(900px,100%)] border-[5px] border-[#ff4136] bg-[#151515] p-[52px_56px] shadow-[14px_14px_0_#ff4136] max-[700px]:min-h-[720px] max-[700px]:p-[28px_22px]">
          <header className="grid grid-cols-[1fr_220px_70px] items-start gap-[18px] border-b-[5px] border-[#ff4136] pb-6 text-[#ff4136] max-[700px]:grid-cols-1 max-[700px]:gap-[15px]">
            <h1
              className="m-0 font-retro text-[27px] leading-[1.4] font-normal max-[700px]:text-[18px]"
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
                    <span className={terminalCursor}>▋</span>
                  </p>
                );
              } else {
                return null;
              }
            })}
          </div>
          {isFinished && <div className="relative min-h-[290px] border-t-2 border-dashed border-[#50e3c2] p-[24px_15px] text-center">
            <h2
              className="m-0 mb-[13px] font-retro text-[15px] leading-[1.5] font-normal max-[700px]:text-[11px]"
            >
              &gt; INCOMING THREAT: PRODUCTION BUGS DETECTED!
            </h2>
            <p className="m-0 text-[15px] max-[700px]:text-xs">
              Squash all {INITIAL_BUGS.length} bugs to unlock the terminal.
            </p>
            {bugs.map((bug) => (
              <button
                key={bug.id}
                ref={bug.id === 0 ? firstBugRef : undefined}
                className="absolute min-h-11 min-w-11 animate-bug-move focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#fff000] motion-reduce:animate-none border-0 bg-transparent text-[#ff4136] hover:scale-[1.3]"
                style={{ left: `${bug.x}%`, top: `${bug.y}%` }}
                onClick={() => squash(bug.id)}
                aria-label={`Squash bug ${bug.id + 1} of ${INITIAL_BUGS.length}`}
              >
                ☠
              </button>
            ))}
          </div>}
          {isFinished && <Link
            href="/"
            className="mx-auto mt-8 block w-max border-4 border-[#50e3c2] p-[20px_28px] text-sm font-normal shadow-[5px_5px_0_#50e3c2] font-retro max-[700px]:p-4 max-[700px]:text-[10px]"
          >
            RETURN TO SAFETY
          </Link>}
        </section>
      </main>
    </>
  );
}

