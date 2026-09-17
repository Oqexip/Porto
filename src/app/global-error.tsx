"use client";

import { useEffect } from "react";
import ErrorContent from "@/components/ErrorContent";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="error-body-bg">
        <main className="error-page page-enter">
          <ErrorContent
            title="CRITICAL ERROR"
            headerText="root@ilham-server:~ / SYSTEM_CRASH.LOG"
            message={error.message || "An unexpected application error has occurred."}
            reset={reset}
          />
        </main>
      </body>
    </html>
  );
}
