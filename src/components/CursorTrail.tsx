"use client";

import { useEffect, useRef, useState } from "react";

type Dot = { id: number; x: number; y: number; color: string };
const colors = ["#f8e71c", "#50e3c2", "#4a90e2", "#ff79c6", "#ff554d"];

export default function CursorTrail() {
  const [dots, setDots] = useState<Dot[]>([]); const last = useRef(0); const id = useRef(0);
  useEffect(() => { const move = (event: MouseEvent) => { if (event.timeStamp - last.current < 28) return; last.current = event.timeStamp; const dot = { id: id.current++, x: event.clientX, y: event.clientY, color: colors[id.current % colors.length] }; setDots((items) => [...items.slice(-7), dot]); window.setTimeout(() => setDots((items) => items.filter((item) => item.id !== dot.id)), 240); }; window.addEventListener("mousemove", move); return () => window.removeEventListener("mousemove", move); }, []);
  return <div className="cursor-trail" aria-hidden="true">{dots.map((dot, index) => <i key={dot.id} style={{ left: dot.x, top: dot.y, backgroundColor: dot.color, opacity: (index + 1) / dots.length }} />)}</div>;
}
