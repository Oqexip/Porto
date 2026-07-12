"use client";

import { useEffect, useRef, useState } from "react";

type Dot = {
  id: number;
  x: number;
  y: number;
  color: string;
};

const colors = [
  "#f8e71c",
  "#50e3c2",
  "#4a90e2",
  "#ff79c6",
  "#ff554d",
];

const MIN_DISTANCE = 15;
const MIN_DISTANCE_SQ = MIN_DISTANCE * MIN_DISTANCE;

export default function CursorTrail() {
  const [dots, setDots] = useState<Dot[]>([]);
  const last = useRef(0);
  const id = useRef(0);
  const lastPosition = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const move = (event: MouseEvent) => {
      // Throttle
      if (event.timeStamp - last.current < 28) return;

      const scaleFactor = 0.9;
      const pageX = event.pageX / scaleFactor;
      const pageY = event.pageY / scaleFactor;

      // Simpan posisi pertama
      if (!lastPosition.current) {
        lastPosition.current = {
          x: pageX,
          y: pageY,
        };
        return;
      }

      const dx = pageX - lastPosition.current.x;
      const dy = pageY - lastPosition.current.y;

      // Cursor belum bergerak cukup jauh
      if (dx * dx + dy * dy < MIN_DISTANCE_SQ) return;

      last.current = event.timeStamp;

      lastPosition.current = {
        x: pageX,
        y: pageY,
      };

      const dotId = id.current++;

      const dot: Dot = {
        id: dotId,
        x: pageX,
        y: pageY,
        color: colors[dotId % colors.length],
      };

      setDots((items) => [...items.slice(-7), dot]);

      const timeout = window.setTimeout(() => {
        setDots((items) => items.filter((item) => item.id !== dotId));
      }, 240);

      return () => clearTimeout(timeout);
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <div className="cursor-trail" aria-hidden="true">
      {dots.map((dot, index) => (
        <i
          key={dot.id}
          style={{
            left: dot.x,
            top: dot.y,
            backgroundColor: dot.color,
            opacity: (index + 1) / dots.length,
          }}
        />
      ))}
    </div>
  );
}