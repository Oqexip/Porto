import Link from "next/link";
export default function NotFound() {
  return (
    <main className="error-page">
      <section className="error-card">
        <div className="error-head">root@ilham-server:~ / ERROR.LOG</div>
        <div className="error-body">
          <p>&gt; GET /unknown-route</p>
          <h1>FATAL 404</h1>
          <p>
            Route not found. The requested page appears to have escaped into the
            void.
          </p>
          <p>&gt; suggested_action: return_to_safety()</p>
          <Link href="/">← BACK TO HOME</Link>
        </div>
      </section>
    </main>
  );
}
