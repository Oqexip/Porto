"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";

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
    <main className="secret-terminal-screen">
      <section className="secret-terminal-window" aria-label="Secret terminal">
        <header className="secret-terminal-bar">
          <span className="secret-terminal-dots" aria-hidden="true"><i /><i /><i /></span>
          <span>admin@ilham-server: ~ / secret</span>
          <span className="secret-terminal-online">● ONLINE</span>
        </header>

        <div className="secret-terminal-body">
          <p className="secret-terminal-eyebrow">SYSTEM RECOVERY COMPLETE</p>
          <h1>ACCESS GRANTED<span className="terminal-cursor" aria-hidden="true">_</span></h1>
          <p className="secret-terminal-summary">All {bugCount} bugs squashed. The terminal is yours.</p>

          <div ref={consoleRef} className="secret-terminal-console" role="log" aria-label="Terminal output" aria-live="polite">
            <p><span className="secret-terminal-prompt">$</span> /status</p>
            <p><span className="secret-terminal-ok">[ OK ]</span> {bugCount}/{bugCount} bugs eliminated</p>
            <p><span className="secret-terminal-ok">[ OK ]</span> secret terminal unlocked</p>
            <p className="secret-terminal-hint">Type <strong>/help</strong> to see available commands.</p>
            {entries.map((entry, index) => (
              <div key={index} className="secret-terminal-entry">
                <p><span className="secret-terminal-prompt">$</span> {entry.command}</p>
                {entry.output.map((line) => <p key={line}>{line}</p>)}
              </div>
            ))}
          </div>

          <form className="secret-terminal-form" onSubmit={runCommand}>
            <label htmlFor="secret-command">admin@ilham-server:~$</label>
            <input
              ref={inputRef}
              id="secret-command"
              value={command}
              onChange={(event) => setCommand(event.target.value)}
              placeholder="/help"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
            />
            <button type="submit">RUN ↵</button>
          </form>
        </div>

        <footer className="secret-terminal-footer">
          <span>SESSION: SECURE <span aria-hidden="true">/</span> THREATS: 0</span>
          <div>
            <button type="button" onClick={onReplay}>↻ /replay</button>
            <Link href="/">← /home</Link>
          </div>
        </footer>
      </section>
    </main>
  );
}
