"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { terminalCursor } from "@/components/pageStyles";

interface TerminalEntry {
  command: string;
  output: string[];
}

interface SecretTerminalProps {
  bugCount: number;
  onReplay: () => void;
}

const HELP_LINES = [
  "System: /help /status /whoami /date /history /clear",
  "Explore: /ls /projects /contact /development /home",
  "Other: /echo <text> /replay",
];

const ROUTES: Record<string, string> = {
  "/home": "/",
  "/projects": "/projects",
  "/contact": "/contact",
  "/development": "/development",
};

const consoleLine = "mt-0 mb-1.5";
const accent = "font-bold text-[#6ef6a9]";
const terminalButton =
  "min-h-11 border border-[#6ef6a9] px-[15px] py-2.5 font-mono text-[13px] leading-[normal] font-bold whitespace-nowrap hover:border-[#f6db6d] hover:bg-[#f6db6d] focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#f6db6d]";

export default function SecretTerminal({ bugCount, onReplay }: SecretTerminalProps) {
  const router = useRouter();
  const [command, setCommand] = useState("");
  const [entries, setEntries] = useState<TerminalEntry[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const consoleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [entries]);

  function runCommand(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = command.trim();
    if (!value) return;

    const firstSpace = value.search(/\s/);
    const name = (firstSpace === -1 ? value : value.slice(0, firstSpace)).toLowerCase();
    const args = firstSpace === -1 ? "" : value.slice(firstSpace).trim();

    setCommand("");
    if (name === "/clear" && !args) {
      setEntries([]);
      return;
    }
    if (name === "/replay" && !args) {
      onReplay();
      return;
    }
    if (ROUTES[name] && !args) {
      router.push(ROUTES[name]);
      return;
    }

    let output: string[];
    if (!name.startsWith("/")) {
      output = ["Commands start with /. Try /help."];
    } else if (args && name !== "/echo") {
      output = [`Usage: ${name} (no arguments). Type /help for available commands.`];
    } else {
      switch (name) {
        case "/help":
          output = HELP_LINES;
          break;
        case "/status":
          output = [`SYSTEM ONLINE · ${bugCount}/${bugCount} bugs squashed · 0 threats remaining`];
          break;
        case "/whoami":
          output = ["You are the operator who cleared the system. Nice work."];
          break;
        case "/date":
          output = [`Local date and time: ${new Intl.DateTimeFormat(undefined, { dateStyle: "full", timeStyle: "medium" }).format(new Date())}`];
          break;
        case "/history":
          output = entries.length ? entries.map((entry) => entry.command) : ["No previous commands in this session."];
          break;
        case "/ls":
          output = ["/  /projects  /contact  /development  /secret"];
          break;
        case "/echo":
          output = [args || "Usage: /echo <text>"];
          break;
        default:
          output = [`Command not found: ${name}. Type /help for available commands.`];
      }
    }
    setEntries((previous) => [
      ...previous,
      { command: value, output },
    ]);
  }

  return (
    <main className="grid min-h-dvh place-items-center p-[clamp(16px,4vw,48px)] font-mono text-[#e9f6ed] [background:radial-gradient(circle_at_50%_35%,#173b2a_0,transparent_55%),repeating-linear-gradient(to_bottom,transparent_0_3px,#ffffff06_3px_4px),#07110c]">
      <section
        className="flex min-h-[min(710px,calc(100dvh-48px))] w-[min(1040px,100%)] animate-terminal-appear flex-col border-2 border-[#6ef6a9] bg-[#0c1811] shadow-[10px_10px_0_#285a3d,0_0_80px_#6ef6a91a] motion-reduce:animate-none"
        aria-label="Secret terminal"
      >
        <header className="flex min-h-14 items-center gap-[18px] border-b-2 border-[#6ef6a9] bg-[#132b1d] px-[22px] py-2.5 text-[13px] font-bold text-[#e9f6ed] max-narrow:gap-2.5 max-narrow:px-3.5 max-narrow:text-[11px]">
          <span className="flex flex-none gap-[7px]" aria-hidden="true">
            {["bg-[#ff685f]", "bg-[#f6db6d]", "bg-[#6ef6a9]"].map((color) => (
              <i key={color} className={`size-[11px] rounded-full ${color}`} />
            ))}
          </span>
          <span>admin@ilham-server: ~ / secret</span>
          <span className="ml-auto whitespace-nowrap text-[#6ef6a9] max-narrow:hidden">● ONLINE</span>
        </header>

        <div className="flex min-w-0 flex-1 flex-col p-[clamp(24px,5vw,56px)]">
          <p className="mt-0 mb-3 text-[12px] font-bold tracking-[0.16em] text-[#f6db6d]">SYSTEM RECOVERY COMPLETE</p>
          <h1 className="m-0 text-[clamp(32px,6vw,68px)] leading-[1.1] tracking-[-0.07em] text-[#6ef6a9] [overflow-wrap:anywhere]">
            ACCESS GRANTED<span className={terminalCursor} aria-hidden="true">_</span>
          </h1>
          <p className="mt-3.5 mb-[34px] text-[clamp(15px,2vw,19px)] leading-[1.5] text-[#c4d8ca]">
            All {bugCount} bugs squashed. The terminal is yours.
          </p>

          <div
            ref={consoleRef}
            className="min-h-[170px] max-h-[36vh] flex-1 overflow-y-auto border border-[#3d7955] bg-[#08110c] p-[23px] text-[15px] leading-[1.65] text-[#c4d8ca] [overflow-wrap:anywhere] max-narrow:p-4 max-narrow:text-[13px]"
            role="log"
            aria-label="Terminal output"
            aria-live="polite"
          >
            <p className={consoleLine}><span className={accent}>$</span> /status</p>
            <p className={consoleLine}><span className={accent}>[ OK ]</span> {bugCount}/{bugCount} bugs eliminated</p>
            <p className={consoleLine}><span className={accent}>[ OK ]</span> secret terminal unlocked</p>
            <p className={`${consoleLine} mt-6 text-[#f6db6d]`}>Type <strong>/help</strong> to see available commands.</p>
            {entries.map((entry, index) => (
              <div key={index} className="mt-5">
                <p className={`${consoleLine} text-[#e9f6ed]`}><span className={accent}>$</span> {entry.command}</p>
                {entry.output.map((line) => <p key={line} className={consoleLine}>{line}</p>)}
              </div>
            ))}
          </div>

          <form
            className="mt-4 flex min-h-[62px] items-center gap-3 border border-[#6ef6a9] py-2 pr-2.5 pl-[18px] text-[15px] text-[#6ef6a9] focus-within:outline-2 focus-within:outline-offset-[3px] focus-within:outline-[#f6db6d] max-narrow:flex-wrap max-narrow:gap-2"
            onSubmit={runCommand}
          >
            <label htmlFor="secret-command" className="flex-none font-bold max-narrow:w-full">
              admin@ilham-server:~$
            </label>
            <input
              ref={inputRef}
              id="secret-command"
              className="w-0 min-w-0 flex-1 border-0 bg-transparent text-[#e9f6ed] caret-[#6ef6a9] outline-0 max-narrow:min-h-[30px]"
              value={command}
              onChange={(event) => setCommand(event.target.value)}
              placeholder="/help"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
            />
            <button type="submit" className={`${terminalButton} bg-[#6ef6a9] text-[#07110c]`}>
              RUN ↵
            </button>
          </form>
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-[#3d7955] px-[clamp(24px,5vw,56px)] py-[18px] text-[12px] tracking-[0.04em] text-[#a9c5b1]">
          <span>SESSION: SECURE <span aria-hidden="true">/</span> THREATS: 0</span>
          <div className="flex flex-wrap gap-2.5">
            <button type="button" onClick={onReplay} className={`${terminalButton} inline-flex items-center bg-transparent text-[#6ef6a9]`}>
              ↻ /replay
            </button>
            <Link href="/" className={`${terminalButton} inline-flex items-center bg-transparent text-[#6ef6a9]`}>
              ← /home
            </Link>
          </div>
        </footer>
      </section>
    </main>
  );
}
