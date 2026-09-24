"use client";

import { AlertOctagon, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";
import { errorActionStyles } from "./errorActionStyles";

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
        <p className={errorActionStyles.description}>
          {message || "An unexpected error occurred."}
        </p>
        <div
          className="error-actions"
          style={{ marginTop: "20px", display: "flex", gap: "10px" }}
        >
          <button
            type="button"
            className={errorActionStyles.button}
            style={{ fontFamily: "var(--font-geist-mono)" }}
            onClick={() => reset()}
          >
            <RefreshCcw size={14} /> TRY AGAIN
          </button>
          <Link
            href="/"
            className={errorActionStyles.backLink}
            style={{ fontFamily: "var(--font-pixel)" }}
          >
            <Home size={15} /> BACK TO HOME
          </Link>
        </div>
      </div>
    </section>
  );
}
