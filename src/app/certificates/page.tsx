"use client";

import { useState } from "react";
import Image from "next/image";
import { Award, ExternalLink, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";

interface IssuerCertificate {
  date: string;
  title: string;
  issuer: string;
  image: string;
  credentialUrl: string;
}

interface IssuerItem {
  id: string;
  name: string;
  mark: string;
  count: string;
  text: string;
  badgeHint?: string;
  certificates?: IssuerCertificate[];
}

const issuers: IssuerItem[] = [
  // {
  //   id: "dicoding",
  //   name: "Dicoding Indonesia",
  //   mark: "DI",
  //   count: "6 CREDENTIALS",
  //   text: "Learning paths and certified courses across web and cloud development.",
  // },
  {
    id: "imphnen",
    name: "IMPHNEN",
    mark: "IM",
    count: "1 CREDENTIAL",
    text: "A verified professional learning credential from IMPHNEN.",
    badgeHint: "CLICK TO VIEW",
    certificates: [
      {
        date: "02 AUGUST 2023",
        title: "SERTIFIKAT KOMPETENSI KEMALASAN",
        issuer: "IMPHNEN",
        image: "/certificate/imphnen.png",
        credentialUrl: "/certificate/imphnen-certificate.pdf",
      },
    ],
  },
  {
    id: "continuous-learning",
    name: "Continuous Learning",
    mark: "+1",
    count: "IN PROGRESS",
    text: "The next credential is always loading. Curiosity is the real certificate.",
  },
];

export default function CertificatesPage() {
  const [selectedIssuer, setSelectedIssuer] = useState<IssuerItem | null>(null);

  return (
    <>
      <Header back />
      <main className="page-shell sub-page page-enter">
        {selectedIssuer ? (
          /* Detailed Issuer View */
          <section className="issuer-detail-section">
            <div className="issuer-nav-bar">
              <div className="issuer-nav-badge">{selectedIssuer.name}</div>
              <button
                type="button"
                className="issuer-back-btn"
                onClick={() => setSelectedIssuer(null)}
              >
                <ArrowLeft size={16} strokeWidth={3} />
                <span>BACK TO ISSUERS</span>
              </button>
            </div>

            <div className="issuer-cert-list">
              {selectedIssuer.certificates?.map((cert) => (
                <article className="issuer-cert-card" key={cert.title}>
                  {/* Top blue bar */}
                  <div className="issuer-cert-bar" />

                  {/* Certificate Image Preview */}
                  <div className="issuer-cert-preview">
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      width={800}
                      height={550}
                      style={{ width: "100%", height: "auto" }}
                      priority
                    />
                  </div>

                  {/* Certificate Details */}
                  <div className="issuer-cert-details">
                    <div className="issuer-cert-date">{cert.date}</div>
                    <h2 className="issuer-cert-title">{cert.title}</h2>
                    <div className="issuer-cert-issuer">
                      ISSUER: {cert.issuer}
                    </div>

                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="issuer-cert-btn"
                    >
                      <ExternalLink size={16} strokeWidth={2.5} />
                      <span>VIEW CREDENTIAL</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : (
          /* Issuers List View */
          <>
            <section className="page-heading">
              <h1 className="pixel-heading">
                <Award
                  className="pixel-heading-icon-teal"
                  size={68}
                  strokeWidth={2.5}
                />
                <span className="pixel-heading-my">PROOF OF</span>
                <span className="pixel-heading-box-teal">SKILL</span>
              </h1>
              <div className="query-box-retro">
                <div>
                  &gt; SELECT * FROM credentials WHERE effort = &apos;consistent&apos; AND curiosity = &apos;high&apos;;
                </div>
              </div>
            </section>

            <section className="certificate-grid">
              {issuers.map((issuer) => {
                const isClickable = !!issuer.certificates?.length;
                return (
                  <div
                    className={`certificate-card ${isClickable ? "is-clickable" : ""}`}
                    key={issuer.name}
                    onClick={() => {
                      if (isClickable) {
                        setSelectedIssuer(issuer);
                      }
                    }}
                    role={isClickable ? "button" : undefined}
                    tabIndex={isClickable ? 0 : undefined}
                    onKeyDown={(e) => {
                      if (isClickable && (e.key === "Enter" || e.key === " ")) {
                        e.preventDefault();
                        setSelectedIssuer(issuer);
                      }
                    }}
                  >
                    <div>
                      <div className="credential-logo">{issuer.mark}</div>
                      <h2>{issuer.name}</h2>
                      <p>{issuer.text}</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "8px",
                        flexWrap: "wrap",
                      }}
                    >
                      <span className="credential-count">{issuer.count}</span>
                      {issuer.badgeHint && (
                        <span
                          style={{
                            fontFamily: "var(--font-geist-mono)",
                            fontSize: "11px",
                            fontWeight: 900,
                            letterSpacing: "0.05em",
                            color: "var(--ink)",
                            textDecoration: "underline",
                          }}
                        >
                          {issuer.badgeHint} ↗
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </section>
          </>
        )}
      </main>
    </>
  );
}
