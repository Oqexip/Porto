"use client";

import { AtSign, Camera, Code2, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import Header from "@/components/Header";
import { FormEvent, useState } from "react";

const contacts = [
  [Mail, "EMAIL", "ilhamkumbang07@gmail.com"],
  [Phone, "PHONE", "+62 859-5479-5585"],
  [MapPin, "LOCATION", "Jakarta Metropolitan Area, Indonesia"],
] as const;

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const message = formData.get("message")?.toString() || "";

    try {
      const response = await fetch("https://formsubmit.co/ajax/ilhamkumbang07@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `Pesan Baru Portfolio dari ${name}`,
          _template: "table",
          _captcha: "false",
        }),
      });

      const data = await response.json();

      if (response.ok || data.success === "true" || data.success === true) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Gagal mengirim pesan. Silakan coba lagi.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Terjadi kesalahan koneksi. Silakan coba beberapa saat lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header back />
      <main className="page-shell sub-page page-enter">
        <section className="page-heading">
          <h1>LET&apos;S CONNECT</h1>
          <p>
            Have a project, an interesting problem, or a great music
            recommendation? Send a signal.
          </p>
        </section>
        <section className="contact-layout">
          <div>
            <div className="contact-list">
              {contacts.map(([Icon, label, value]) => (
                <div className="contact-item" key={label}>
                  <span className="contact-icon">
                    <Icon size={23} />
                  </span>
                  <div>
                    <p>{label}</p>
                    <strong>{value}</strong>
                  </div>
                </div>
              ))}
            </div>
            <div className="social-row">
              <a href="https://github.com/Oqexip" target="_blank" rel="noreferrer">
                <Code2 size={16} /> GITHUB
              </a>
              <a href="https://www.instagram.com/ilhaaawm/" target="_blank" rel="noreferrer">
                <Camera size={16} /> INSTAGRAM
              </a>
              <a href="https://www.linkedin.com/in/ilham-sikumbang-3415752a0/" target="_blank" rel="noreferrer">
                <AtSign size={16} /> LINKEDIN
              </a>
            </div>
          </div>
          <form className="contact-form" onSubmit={submit}>
            <h2>SEND PAYLOAD</h2>
            <label className="field">
              NAME
              <input required name="name" placeholder="Your name" disabled={loading} />
            </label>
            <label className="field">
              EMAIL
              <input
                required
                type="email"
                name="email"
                placeholder="you@example.com"
                disabled={loading}
              />
            </label>
            <label className="field">
              MESSAGE
              <textarea
                required
                name="message"
                rows={6}
                placeholder="Write your message here..."
                disabled={loading}
              />
            </label>
            <button
              className="brutal-button"
              type="submit"
              disabled={loading}
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> MENGIRIM...
                </>
              ) : (
                <>
                  <Send size={16} /> KIRIM PESAN
                </>
              )}
            </button>
            <div className="form-note" aria-live="polite" style={{ marginTop: "12px" }}>
              {status === "success" && (
                <p style={{ color: "#159767", margin: 0, fontWeight: 700 }}>
                  ✓ Pesan berhasil dikirim ke ilhamkumbang07@gmail.com!
                </p>
              )}
              {status === "error" && (
                <p style={{ color: "#ef4444", margin: 0, fontWeight: 700 }}>
                  ✕ {errorMessage}
                </p>
              )}
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
