"use client";

import { AtSign, Camera, Code2, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import Header from "@/components/Header";
import {
  brutalButton,
  pageHeading,
  pageHeadingText,
  pageHeadingTitle,
  pageShell,
} from "@/components/pageStyles";
import { FormEvent, useState } from "react";

const contacts = [
  [Mail, "EMAIL", "ilhamkumbang07@gmail.com", "bg-yellow"],
  [Phone, "PHONE", "+62 859-5479-5585", "bg-pink"],
  [MapPin, "LOCATION", "Jakarta Metropolitan Area, Indonesia", "bg-green"],
] as const;

const socials = [
  [Code2, "GITHUB", "https://github.com/Oqexip"],
  [Camera, "INSTAGRAM", "https://www.instagram.com/ilhaaawm/"],
  [AtSign, "LINKEDIN", "https://www.linkedin.com/in/ilham-sikumbang-3415752a0/"],
] as const;

const field = "mb-[15px] grid gap-[7px] font-mono text-[12px] leading-[normal] font-black";

const fieldInput =
  "resize-y border-[3px] border-line bg-bg p-[11px] text-ink outline-none focus:shadow-[3px_3px_0_var(--blue)]";

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
          _captcha: "true",
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
      <main className={pageShell}>
        <section className={pageHeading}>
          <h1 className={pageHeadingTitle}>LET&apos;S CONNECT</h1>
          <p className={pageHeadingText}>
            Have a project, an interesting problem, or a great music
            recommendation? Send a signal.
          </p>
        </section>
        <section className="grid grid-cols-[0.85fr_1.15fr] gap-12 max-tablet:grid-cols-1 max-tablet:gap-[45px]">
          <div>
            <div className="grid gap-[15px]">
              {contacts.map(([Icon, label, value, iconColor]) => (
                <div
                  className="flex items-center gap-3.5 border-[3px] border-line bg-paper p-4 shadow-[5px_5px_0_var(--line)]"
                  key={label}
                >
                  <span className={`border-2 border-[#111] p-2.5 text-[#111] ${iconColor}`}>
                    <Icon size={23} />
                  </span>
                  <div>
                    <p className="mt-0 mb-[3px] font-mono text-[11px] leading-[normal] font-extrabold text-muted">
                      {label}
                    </p>
                    <strong className="text-[15px]">{value}</strong>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-[30px] flex flex-wrap gap-2.5">
              {socials.map(([Icon, label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-[3px] border-line bg-paper px-3 py-[9px] font-mono text-[12px] leading-[normal] font-black shadow-[3px_3px_0_var(--line)]"
                >
                  <Icon size={16} /> {label}
                </a>
              ))}
            </div>
          </div>
          <form
            className="border-[3px] border-line bg-paper p-[25px] shadow-[7px_7px_0_var(--line)] max-xs:p-[18px]"
            onSubmit={submit}
          >
            <h2 className="mt-0 mb-5 font-mono text-[22px] leading-[normal] font-black">SEND PAYLOAD</h2>
            <label className={field}>
              NAME
              <input
                required
                name="name"
                placeholder="Your name"
                disabled={loading}
                className={fieldInput}
              />
            </label>
            <label className={field}>
              EMAIL
              <input
                required
                type="email"
                name="email"
                placeholder="you@example.com"
                disabled={loading}
                className={fieldInput}
              />
            </label>
            <label className={field}>
              MESSAGE
              <textarea
                required
                name="message"
                rows={6}
                placeholder="Write your message here..."
                disabled={loading}
                className={fieldInput}
              />
            </label>
            <button
              className={`${brutalButton} inline-flex items-center gap-2 bg-red disabled:cursor-not-allowed disabled:opacity-70`}
              type="submit"
              disabled={loading}
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
            <div
              className="mt-3 mb-0 min-h-5 font-mono text-[12px] leading-[normal] font-extrabold text-[#159767]"
              aria-live="polite"
            >
              {status === "success" && (
                <p className="m-0 font-bold text-[#159767]">
                  ✓ Pesan berhasil dikirim ke ilhamkumbang07@gmail.com!
                </p>
              )}
              {status === "error" && (
                <p className="m-0 font-bold text-[#ef4444]">
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
