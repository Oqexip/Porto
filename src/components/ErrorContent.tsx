"use client";

import { AlertOctagon, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";
import {
  errorActionStyles,
  errorBody,
  errorCard,
  errorHead,
  errorTitle,
} from "./errorActionStyles";

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
    <section className={errorCard}>
      <div className={errorHead}>
        <span>{headerText}</span>
        <AlertOctagon size={16} />
      </div>
      <div className={errorBody}>
        <h1 className={errorTitle}>{title}</h1>
        <p className={errorActionStyles.description}>
          {message || "An unexpected error occurred."}
        </p>
        <div className="mt-5 flex gap-2.5">
          <button
            type="button"
            className={errorActionStyles.button}
            onClick={() => reset()}
          >
            <RefreshCcw size={14} /> TRY AGAIN
          </button>
          <Link href="/" className={errorActionStyles.backLink}>
            <Home size={15} /> BACK TO HOME
          </Link>
        </div>
      </div>
    </section>
  );
}
