import { Award } from "lucide-react";
import Header from "@/components/Header";

const certificates = [
  { name: "Dicoding Indonesia", mark: "DI", count: "6 CREDENTIALS", text: "Learning paths and certified courses across web and cloud development." },
  { name: "IMPHNEN", mark: "IM", count: "1 CREDENTIAL", text: "A verified professional learning credential from IMPHNEN." },
  { name: "Continuous Learning", mark: "+1", count: "IN PROGRESS", text: "The next credential is always loading. Curiosity is the real certificate." },
];

export default function CertificatesPage() { return <><Header back /><main className="page-shell sub-page page-enter"><section className="page-heading"><h1><Award size={51} strokeWidth={2.5} />PROOF OF SKILL</h1><p><code>SELECT * FROM credentials WHERE effort = &apos;consistent&apos; AND curiosity = &apos;high&apos;;</code></p></section><section className="certificate-grid">{certificates.map(cert => <article className="certificate-card" key={cert.name}><div><div className="credential-logo">{cert.mark}</div><h2>{cert.name}</h2><p>{cert.text}</p></div><span className="credential-count">{cert.count}</span></article>)}</section></main></> }
