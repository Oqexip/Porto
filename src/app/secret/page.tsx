"use client";

import Link from "next/link";
import { useState } from "react";

export default function SecretPage() {
  const [squashed, setSquashed] = useState(0);
  const [bugs, setBugs] = useState(
    Array.from({ length: 8 }, (_, id) => ({
      id,
      x: 12 + ((id * 11) % 74),
      y: 62 + ((id * 19) % 25),
    })),
  );
  function squash(id: number) {
    setSquashed((value) => value + 1);
    setBugs((items) => items.filter((bug) => bug.id !== id));
  }
  return (
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
          <p>
            <b>admin@system:~#</b> INITIATING BREACH PROTOCOL...
          </p>
          <p>
            <b>admin@system:~#</b> ACCESS GRANTED.
          </p>
          <p>
            <b>admin@system:~#</b> DOWNLOADING TOP SECRET FILES...
          </p>
          <p>
            <b>admin@system:~#</b> WARNING: UNAUTHORIZED USER DETECTED!
          </p>
          <p className="secret-alert">
            <b>admin@system:~#</b> SYSTEM LOCKDOWN IMMINENT.
          </p>
          <p className="secret-joke">
            <b>admin@system:~#</b> SELF DEFENCE PROTOCOL ENABLED 👾
          </p>
          <p>
            <b>admin@system:~#</b>
          </p>
        </div>
        <div className="secret-game">
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
        <Link href="/" className="secret-return">
          RETURN TO SAFETY
        </Link>
      </section>
    </main>
  );
}
