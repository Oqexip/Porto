"use client";

import { AtSign, Camera, Code2, Mail, MapPin, Phone, Send } from "lucide-react";
import Header from "@/components/Header";
import { FormEvent, useState } from "react";

const contacts = [
  [Mail, "EMAIL", "ilhamkumbang07@gmail.com"],
  [Phone, "PHONE", "+62 850-5479-5585"],
  [MapPin, "LOCATION", "Jakarta Metropolitan Area, Indonesia"],
] as const;

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  function submit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
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
              <input required name="name" placeholder="Your name" />
            </label>
            <label className="field">
              EMAIL
              <input
                required
                type="email"
                name="email"
                placeholder="you@example.com"
              />
            </label>
            <label className="field">
              MESSAGE
              <textarea
                required
                name="message"
                rows={6}
                placeholder="Write your message here..."
              />
            </label>
            <button className="brutal-button" type="submit">
              <Send size={16} /> KIRIM PESAN
            </button>
            <p className="form-note" aria-live="polite">
              {sent && "Payload received! I will get back to you soon."}
            </p>
          </form>
        </section>
      </main>
    </>
  );
}
