"use client";

import { AlertOctagon, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

interface ErrorContentProps {
  title: string;
  headerText: string;
  message?: string;
  reset: () => void;
}

export default function ErrorContent({
  title,
  headerText,
  message,
  reset,
}: ErrorContentProps) {
  return (
    <section className="error-card">
      <div className="error-head">
        <span>{headerText}</span>
        <AlertOctagon size={16} className="anim-pulse" />
      </div>
      <div className="error-body">
        <h1>{title}</h1>
        <p className="err-desc">
          {message || "An unexpected error occurred."}
        </p>
        <div
          className="error-actions"
          style={{ marginTop: "20px", display: "flex", gap: "10px" }}
        >
          <button type="button" className="excuse-btn" onClick={() => reset()}>
            <RefreshCcw size={14} /> TRY AGAIN
          </button>
          <Link href="/" className="back-link-btn">
            <Home size={15} /> BACK TO HOME
          </Link>
        </div>
      </div>
    </section>
  );
}
