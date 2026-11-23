"use client";

import { useEffect } from "react";
import ErrorContent from "@/components/ErrorContent";
import { errorPage } from "@/components/errorActionStyles";

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
    <main className={errorPage}>
      <ErrorContent
        title="SOMETHING WENT WRONG"
        headerText="root@ilham-server:~ / ERROR.LOG"
        message={error.message || "An unexpected error occurred while loading this section."}
        reset={reset}
      />
    </main>
  );
}
