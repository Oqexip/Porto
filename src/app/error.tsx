"use client";

import { useEffect } from "react";
import ErrorContent from "@/components/ErrorContent";

export default function ErrorPage({
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
    <main className="error-page page-enter">
      <ErrorContent
        title="SOMETHING WENT WRONG"
        headerText="root@ilham-server:~ / ERROR.LOG"
        message={error.message || "An unexpected error occurred while loading this section."}
        reset={reset}
      />
    </main>
  );
}
