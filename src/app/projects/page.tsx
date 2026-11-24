"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FolderGit2,
  GitFork,
  Search,
  X,
} from "lucide-react";
import Header from "@/components/Header";
import {
  pageHeading,
  pageHeadingText,
  pageShell,
  pixelHeading,
  pixelHeadingBox,
  pixelHeadingIcon,
  pixelHeadingMy,
  statusStrip,
} from "@/components/pageStyles";

interface Project {
  title: string;
  category: string;
  text: string;
  stack: string[];
  color: string;
  github?: string;
  preview?: string;
  image?: string;
}

const projects: Project[] = [
  {
    title: "Teknik Fair",
    category: "EVENT",
    text: "Website open house Fakultas Teknik Universitas Gadjah Mada.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    color: "blue",
    image: "/projects-img/teknikFair.png",
    preview: "https://teknikfair.com",
  },
  {
    title: "Website KPU KMTETI",
    category: "ELECTION",
    text: "Website resmi KPU KMTETI untuk pemilihan umum Technoration 2026, berisi informasi kandidat dan tahapan pemilu.",
    stack: ["React", "Vite", "Supabase"],
    color: "red",
    image: "/projects-img/kpuKMTETI.png",
    preview: "https://www.technorationkpukmteti-2026.my.id/",
  },
  {
    title: "OmongIn",
    category: "SOCIAL MEDIA",
    text: "Platform sosial media anonim untuk berbagi pesan dan pemikiran secara bebas.",
    stack: ["Laravel", "Tailwind CSS", "Vercel"],
    color: "pink",
    image: "/projects-img/omongin.png",
    github: "https://github.com/Oqexip/OmongIn.git",
  },
  {
    title: "EasyVert",
    category: "TOOL",
    text: "Konverter file tipe apapun menjadi apapun. 100% berjalan di sisi klien secara instan dan aman.",
    stack: ["Vite", "React", "Web"],
    color: "yellow",
    image: "/projects-img/easyvert.png",
    github: "https://github.com/Oqexip/EasyVert.git",
    preview: "https://easyvert.vercel.app/",
  },
  {
    title: "E-Ticketing",
    category: "Travel Agency App",
    text: "Aplikasi untuk memesan tiket pesawat. Dibuat dalam rangka sertifikasi Junior Programmer.",
    stack: ["Laravel", "Tailwind CSS", "Web"],
    color: "blue",
    image: "/projects-img/e-ticketing.png",
    github: "https://github.com/Oqexip/LSP_E-Ticketing.git",
  },
  {
    title: "Web Portofolio",
    category: "PORTFOLIO",
    text: "Website portofolio interaktif dengan estetika neo-brutalist dan tema retro modern.",
    stack: ["Next.js", "React", "Tailwind CSS"],
    color: "red",
    image: "/projects-img/portofolio.png",
    github: "https://github.com/Oqexip",
    preview: "https://www.oqexip.site/",
  },
  {
    title: "Hand Tracking",
    category: "COMPUTER VISION",
    text: "Aplikasi filter kamera interaktif menggunakan gesture tangan (hand tracking) dengan MediaPipe dan OpenCV. Anda dapat membuat portal dengan jari Anda yang akan menerapkan berbagai filter menarik (Mono, Dual-Tone, Pixelate, Invert, Sepia, Blur, Thermal, Sketch, Glitch, Neon, Galaxy).",
    stack: ["Python", "OpenCV", "MediaPipe"],
    color: "pink",
    image: "/projects-img/handTracker.png",
    github: "https://github.com/Oqexip/handTracking.git",
  },
];

const ITEMS_PER_PAGE = 4;
const categories = ["ALL CATEGORIES", ...new Set(projects.map((project) => project.category))];

const headerColors: Record<string, string> = {
  pink: "bg-pink",
  yellow: "bg-yellow",
  green: "bg-green",
  blue: "bg-blue",
  purple: "bg-[#c084fc]",
  orange: "bg-[#fb923c]",
  red: "bg-red",
  cyan: "bg-[#38bdf8]",
  lime: "bg-[#a3e635]",
};

const tagColors = [
  "bg-[#fef08a]",
  "bg-[#ffd1dc]",
  "bg-[#bbf7d0]",
  "bg-[#bfdbfe]",
  "bg-[#e9d5ff]",
  "bg-[#fed7aa]",
];

const projectButton =
  "inline-flex flex-1 cursor-pointer items-center justify-center gap-2 border-[2.5px] border-line px-4 py-[11px] font-retro text-[11px] shadow-[4px_4px_0_var(--line)] transition-[translate,box-shadow,background-color] duration-150 ease-[ease] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_var(--line)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0_var(--line)]";

const paginationButton =
  "inline-flex cursor-pointer items-center justify-center gap-1.5 border-[2.5px] border-line py-[9px] font-retro text-[11px] transition-[translate,box-shadow,background-color] duration-100 ease-[ease] select-none enabled:hover:-translate-x-[2px] enabled:hover:-translate-y-[2px] enabled:hover:bg-yellow enabled:hover:text-[#111] enabled:hover:shadow-[6px_6px_0_var(--line)] enabled:active:translate-x-[2px] enabled:active:translate-y-[2px] enabled:active:shadow-[1px_1px_0_var(--line)] disabled:cursor-not-allowed disabled:opacity-35";

const paginationArrow =
  "bg-paper px-[18px] text-ink shadow-[4px_4px_0_var(--line)] disabled:shadow-[2px_2px_0_var(--line)]";

export default function ProjectsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("ALL CATEGORIES");

  const searchTerm = query.trim().toLocaleLowerCase();
  const filteredProjects = projects.filter((project) => {
    const matchesCategory = category === "ALL CATEGORIES" || project.category === category;
    const searchableText = [project.title, project.category, project.text, ...project.stack]
      .join(" ")
      .toLocaleLowerCase();
    return matchesCategory && searchableText.includes(searchTerm);
  });
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedProjects = filteredProjects.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const clearFilters = () => {
    setQuery("");
    setCategory("ALL CATEGORIES");
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      const headingEl = document.getElementById("projects-heading");
      if (headingEl) {
        headingEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <Header back />
      <main className={pageShell}>
        <section className={pageHeading} id="projects-heading">
          <h1 className={pixelHeading}>
            <FolderGit2
              className={pixelHeadingIcon}
              size={68}
              strokeWidth={2.5}
            />
            <span className={pixelHeadingMy}>MY</span>
            <span className={pixelHeadingBox}>PROJECTS</span>
          </h1>
          <p className={pageHeadingText}>
            A small collection of things I&apos;ve built, shipped, explored, and
            occasionally refactored at 2 AM.
          </p>
          <div className={statusStrip}>
            STATUS: BUILDING / COMMITS: TOO MANY
          </div>
        </section>

        <section className="grid grid-cols-2 gap-8 max-tablet-lg:grid-cols-1">
          {displayedProjects.map((project, index) => {
            const globalIndex = startIndex + index;
            return (
              <article
                className="group/card relative flex flex-col overflow-hidden border-[3px] border-line bg-paper shadow-[8px_8px_0_var(--line)] transition-[translate,box-shadow] duration-200 ease-[cubic-bezier(0.2,0,0,1)] hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[12px_12px_0_var(--line)]"
                key={project.title}
              >
                {/* Header Bar */}
                <div
                  className={`flex items-center justify-between border-b-[3px] border-line px-[18px] py-3 text-[#111] ${headerColors[project.color]}`}
                >
                  <div className="flex items-center gap-[7px]">
                    {[0, 1, 2].map((dot) => (
                      <span
                        key={dot}
                        className="size-[11px] rounded-full border-2 border-[#111] bg-[rgba(255,255,255,0.6)]"
                      />
                    ))}
                  </div>
                  <span className="border-2 border-[#111] bg-white px-2.5 py-[3px] font-mono text-[11px] font-black tracking-[0.06em] text-[#111] shadow-[2px_2px_0_#111] dark:border-[#f7f6ef] dark:bg-[#1e1e1e] dark:text-[#f7f6ef] dark:shadow-[2px_2px_0_#f7f6ef]">
                    APP_ID: {String(globalIndex).padStart(3, "0")}
                  </span>
                </div>

                {/* Framed Image Showcase */}
                <div className="bg-[radial-gradient(var(--muted)_1px,transparent_1px)] bg-[length:14px_14px] px-5 pt-5 dark:bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)]">
                  <div className="relative h-[235px] w-full overflow-hidden border-[3px] border-[#111] bg-[#fffefa] shadow-[6px_6px_0_#111]">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        priority={index < 2}
                        loading="eager"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-350 ease-[ease] group-hover/card:scale-[1.05]"
                      />
                    ) : (
                      <div className="m-0 flex size-full flex-col justify-center bg-[#fffefa] p-4">
                        <span className="block h-3 w-[44%] bg-[#111]" />
                        <div className="mt-5 grid gap-[9px]">
                          <i className="block h-2.5 bg-[#c9c9c0]" />
                          <i className="block h-2.5 w-[70%] bg-blue" />
                          <i className="block h-2.5 w-[85%] bg-pink" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content Body */}
                <div className="flex flex-1 flex-col px-5 pt-[22px] pb-5 max-xs:p-[18px]">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                    <h2 className="m-0 font-retro text-[16px] leading-[1.4] tracking-[0.02em] text-ink uppercase">
                      {project.title}
                    </h2>
                    <span className="border-2 border-line bg-yellow px-2 py-0.5 font-mono text-[10px] font-black text-[#111] shadow-[2px_2px_0_var(--line)]">
                      {project.category}
                    </span>
                  </div>
                  <p className="mb-5 min-h-[50px] text-[14px] leading-[1.6] text-ink opacity-92">
                    {project.text}
                  </p>

                  <div className="mt-auto">
                    <span className="mb-[9px] inline-block font-retro text-[9px] tracking-[0.06em] text-muted">
                      TECH STACK
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((item, itemIdx) => (
                        <span
                          className={`border-2 border-[#111] px-2.5 py-1 font-mono text-[11px] font-black text-[#111] shadow-[2.5px_2.5px_0_#111] transition-[translate,box-shadow] duration-100 ease-[ease] select-none hover:-translate-x-px hover:-translate-y-px hover:shadow-[3.5px_3.5px_0_#111] ${tagColors[itemIdx % tagColors.length]}`}
                          key={item}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 mb-[18px] border-t-2 border-dashed border-muted opacity-40" />

                  <div className="flex gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${projectButton} bg-[#374151] text-white hover:bg-[#1f2937] dark:bg-[#2d3748]`}
                        aria-label={`View ${project.title} Repository`}
                      >
                        <GitFork size={15} strokeWidth={2.5} /> REPO
                      </a>
                    )}
                    {project.preview && (
                      <a
                        href={project.preview}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${projectButton} bg-[#4ade80] font-bold text-[#052e16] hover:bg-[#22c55e] hover:text-[#022c22] dark:bg-[#34d399] dark:text-[#064e3b]`}
                        aria-label={`View ${project.title} Live Preview`}
                      >
                        <ExternalLink size={15} strokeWidth={2.5} /> LIVE
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        {filteredProjects.length === 0 && (
          <div className="grid justify-items-start gap-3 border-[3px] border-dashed border-line bg-paper p-[34px]">
            <Search size={30} aria-hidden="true" />
            <h2 className="m-0 font-retro text-[clamp(15px,2vw,20px)] leading-[1.5] font-normal">
              NO MATCHES FOUND
            </h2>
            <p className="mb-2 text-muted">Try another name, technology, or category.</p>
            <button
              type="button"
              className="inline-flex min-h-11 items-center gap-2 border-[3px] border-line bg-yellow px-3.5 py-[9px] font-mono text-[12px] leading-[normal] font-extrabold text-[#111] shadow-[4px_4px_0_var(--line)] focus-visible:outline-[3px] focus-visible:outline-offset-[6px] focus-visible:outline-blue"
              onClick={clearFilters}
            >
              <X size={16} aria-hidden="true" /> CLEAR FILTERS
            </button>
          </div>
        )}

        {/* Pagination Section */}
        {totalPages > 1 && (
          <nav
            className="mt-[50px] flex flex-col items-center gap-4"
            aria-label="Projects pagination"
          >
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`${paginationButton} ${paginationArrow}`}
                aria-label="Previous Page"
              >
                <ChevronLeft size={16} strokeWidth={2.5} /> PREV
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`${paginationButton} min-w-11 px-3 ${
                      currentPage === pageNum
                        ? "translate-x-px translate-y-px bg-yellow font-black text-[#111] shadow-[2px_2px_0_var(--line)]"
                        : "bg-paper text-ink shadow-[4px_4px_0_var(--line)]"
                    }`}
                    aria-current={currentPage === pageNum ? "page" : undefined}
                  >
                    [{String(pageNum).padStart(2, "0")}]
                  </button>
                ),
              )}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`${paginationButton} ${paginationArrow}`}
                aria-label="Next Page"
              >
                NEXT <ChevronRight size={16} strokeWidth={2.5} />
              </button>
            </div>
            <div className="font-mono text-[12px] font-extrabold tracking-[0.05em] text-muted">
              PAGE {currentPage} OF {totalPages} {"//"} {filteredProjects.length} MATCHING
              PROJECTS
            </div>
          </nav>
        )}
      </main>
    </>
  );
}
