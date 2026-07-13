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
  { prefix: "admin@system:~#", text: "INITIATING BREACH PROTOCOL..." },
  { prefix: "admin@system:~#", text: "ACCESS GRANTED." },
  { prefix: "admin@system:~#", text: "DOWNLOADING TOP SECRET FILES..." },
  { prefix: "admin@system:~#", text: "WARNING: UNAUTHORIZED USER DETECTED!", className: "secret-alert" },
  { prefix: "admin@system:~#", text: "SYSTEM LOCKDOWN IMMINENT.", className: "secret-alert" },
  { prefix: "admin@system:~#", text: "SELF DEFENCE PROTOCOL ENABLED 👾", className: "secret-joke" },
  { prefix: "admin@system:~#", text: "" },
];

const playTypewriterSound = () => {
  if (typeof window === "undefined") return;
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    // Square wave gives it a classic 8-bit retro computer/terminal vibe
    osc.type = "square";
    
    const now = audioCtx.currentTime;
    // Rapid pitch sweep downwards creates a crisp retro terminal clack/blip
    const startFreq = 800 + Math.random() * 300;
    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.03);
    
    // Increased volume (0.18) for a punchy, louder sound
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
    
    osc.start(now);
    osc.stop(now + 0.03);
  } catch (e) {
    // Ignore autoplay policy blocks
  }
};

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
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (currentLineIndex >= LOG_LINES.length) {
      setIsFinished(true);
      return;
    }

    const currentLine = LOG_LINES[currentLineIndex];
    if (currentText.length < currentLine.text.length) {
      const timeout = setTimeout(() => {
        const nextChar = currentLine.text[currentText.length];
        setCurrentText((prev) => prev + nextChar);
        if (nextChar !== " ") {
          playTypewriterSound();
        }
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
      <main className="secret-page">
        <section className="secret-terminal">
          <header>
            <h1>☠ CLASSIFIED TERMINAL</h1>
            <div>
              BUGS
              <br />
              SQUASHED: {squashed}
            </div>
            <span>[ REC ]</span>
          </header>
          <div className="secret-log">
            {LOG_LINES.map((line, index) => {
              if (index < currentLineIndex) {
                return (
                  <p key={index} className={line.className}>
                    <b>{line.prefix}</b> {line.text}
                  </p>
                );
              } else if (index === currentLineIndex) {
                return (
                  <p key={index} className={line.className}>
                    <b>{line.prefix}</b> {currentText}
                    <span className="terminal-cursor">▋</span>
                  </p>
                );
              } else {
                return null;
              }
            })}
          </div>
          <div className={`secret-game ${isFinished ? "visible" : ""}`}>
            <h2>&gt; INCOMING THREAT: PRODUCTION BUGS DETECTED!</h2>
            <p>
              Squash as many bugs as you can before they escape. They&apos;re
              fast.
            </p>
            {bugs.map((bug) => (
              <button
                key={bug.id}
                className="secret-bug"
                style={{ left: `${bug.x}%`, top: `${bug.y}%` }}
                onClick={() => squash(bug.id)}
                aria-label="Squash bug"
              >
                ☠
              </button>
            ))}
          </div>
          <Link href="/" className={`secret-return ${isFinished ? "visible" : ""}`}>
            RETURN TO SAFETY
          </Link>
        </section>
      </main>
    </>
  );
}

