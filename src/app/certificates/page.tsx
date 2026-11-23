"use client";

import { useState } from "react";
import Image from "next/image";
import { Award, ExternalLink, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import {
  pageHeading,
  pageShell,
  pixelHeading,
  pixelHeadingBoxTeal,
  pixelHeadingIconTeal,
  pixelHeadingMy,
} from "@/components/pageStyles";

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
const logoColors = ["bg-blue", "bg-yellow", "bg-pink"];

const pressDown =
  "transition-all duration-150 ease-[ease] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#101010] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[0_0_0_#101010]";

export default function CertificatesPage() {
  const [selectedIssuer, setSelectedIssuer] = useState<IssuerItem | null>(null);

  return (
    <>
      <Header back />
      <main className={pageShell}>
        {selectedIssuer ? (
          /* Detailed Issuer View */
          <section>
            <div className="mt-6 mb-8 flex items-center justify-between gap-4 border-y-[3px] border-dashed border-line py-[18px]">
              <div className="border-[3px] border-[#101010] bg-yellow px-4 py-2 font-mono text-[16px] leading-[normal] font-black tracking-[-0.02em] text-[#101010] uppercase shadow-[3px_3px_0_#101010]">
                {selectedIssuer.name}
              </div>
              <button
                type="button"
                className={`inline-flex cursor-pointer items-center gap-2 border-[3px] border-[#101010] bg-pink px-[18px] py-2 font-mono text-[13px] leading-[normal] font-black tracking-[0.05em] text-white uppercase shadow-[4px_4px_0_#101010] ${pressDown}`}
                onClick={() => setSelectedIssuer(null)}
              >
                <ArrowLeft size={16} strokeWidth={3} />
                <span>BACK TO ISSUERS</span>
              </button>
            </div>

            <div>
              {selectedIssuer.certificates?.map((cert) => (
                <article
                  className="mb-8 flex w-full max-w-[580px] animate-cert-fade flex-col border-4 border-[#101010] bg-paper shadow-[8px_8px_0_var(--line)]"
                  key={cert.title}
                >
                  {/* Top blue bar */}
                  <div className="h-3.5 border-b-[3px] border-[#101010] bg-[#0284c7]" />

                  {/* Certificate Image Preview */}
                  <div className="flex items-center justify-center border-b-4 border-[#101010] bg-white p-2">
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      width={800}
                      height={550}
                      className="block h-auto w-full object-contain"
                      style={{ width: "100%", height: "auto" }}
                      priority
                    />
                  </div>

                  {/* Certificate Details */}
                  <div className="bg-paper p-6">
                    <div className="mb-3.5 inline-block bg-black px-3 py-[5px] font-mono text-[12px] leading-[normal] font-black tracking-[0.06em] text-white">
                      {cert.date}
                    </div>
                    <h2 className="mt-0 mb-2 text-[clamp(20px,3.5vw,26px)] leading-[1.2] font-black tracking-[-0.04em] text-ink uppercase">
                      {cert.title}
                    </h2>
                    <div className="mb-[22px] font-mono text-[13px] leading-[normal] font-extrabold tracking-[0.08em] text-muted">
                      ISSUER: {cert.issuer}
                    </div>

                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 border-[3px] border-[#101010] bg-paper px-[18px] py-2.5 font-mono text-[13px] leading-[normal] font-black tracking-[0.02em] text-ink uppercase shadow-[4px_4px_0_#101010] hover:bg-yellow hover:text-[#101010] ${pressDown}`}
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
            <section className={pageHeading}>
              <h1 className={pixelHeading}>
                <Award
                  className={pixelHeadingIconTeal}
                  size={68}
                  strokeWidth={2.5}
                />
                <span className={pixelHeadingMy}>PROOF OF</span>
                <span className={pixelHeadingBoxTeal}>SKILL</span>
              </h1>
              <div className="mt-[17px] flex flex-col gap-1.5 border-[3px] border-line bg-[#fffbe4] px-5 py-4 font-retro text-[10px] leading-[2] text-[#101010] shadow-[4px_4px_0_var(--line)] [text-shadow:none] dark:bg-[#1c1c16] dark:text-[#fffbe4]">
                <div>
                  &gt; SELECT * FROM credentials WHERE effort = &apos;consistent&apos; AND curiosity = &apos;high&apos;;
                </div>
              </div>
            </section>

            <section className="grid grid-cols-3 gap-[25px] max-tablet:grid-cols-2 max-xs:grid-cols-1">
              {issuers.map((issuer, index) => {
                const isClickable = !!issuer.certificates?.length;
                return (
                  <div
                    className={`flex min-h-[290px] flex-col justify-between border-[3px] border-line bg-paper p-[19px] shadow-[6px_6px_0_var(--line)] max-xs:min-h-[230px] ${
                      isClickable
                        ? "cursor-pointer transition-[translate,box-shadow] duration-150 ease-[ease] select-none hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[9px_9px_0_var(--line)] active:translate-x-px active:translate-y-px active:shadow-[4px_4px_0_var(--line)]"
                        : ""
                    }`}
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
                      <div
                        className={`grid size-[72px] place-items-center border-[3px] border-[#111] font-mono text-[22px] leading-[normal] font-black text-[#111] ${logoColors[index % logoColors.length]}`}
                      >
                        {issuer.mark}
                      </div>
                      <h2 className="mt-[17px] mb-2 text-[25px] tracking-[-0.06em]">{issuer.name}</h2>
                      <p className="font-mono text-[13px] leading-[1.5] font-semibold text-muted">
                        {issuer.text}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="self-start border-2 border-[#111] bg-green px-2 py-1.5 font-mono text-[11px] leading-[normal] font-black text-[#111]">
                        {issuer.count}
                      </span>
                      {issuer.badgeHint && (
                        <span className="font-mono text-[11px] font-black tracking-[0.05em] text-ink underline">
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
