"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FolderGit2,
  GitFork,
} from "lucide-react";
import Header from "@/components/Header";

interface Project {
  title: string;
  category: string;
  text: string;
  stack: string[];
  color: string;
  github: string;
  preview?: string;
  image?: string;
}

const projects: Project[] = [
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
    color: "purple",
    image: "/projects-img/portofolio.png",
    github: "https://github.com/Oqexip",
    preview: "hhttps://www.oqexip.site/",
  },
  {
    title: "SkillShare",
    category: "LMS",
    text: "Tempat berbagi ilmu pengetahuan.",
    stack: ["Laravel", "TailwindCSS", "Mobile"],
    color: "green",
    github: "https://github.com/Oqexip/SkillShare.git",
  },
  {
    title: "Day Counter App",
    category: "UTILITY",
    text: "Aplikasi kecil untuk menghitung hari penting dengan pengalaman visual yang menyenangkan.",
    stack: ["React", "Tailwind CSS", "Web"],
    color: "blue",
    github: "https://github.com/Oqexip",
  },
  {
    title: "Hand Tracking",
    category: "COMPUTER VISION",
    text: "Aplikasi filter kamera interaktif menggunakan gesture tangan (hand tracking) dengan MediaPipe dan OpenCV. Anda dapat membuat portal dengan jari Anda yang akan menerapkan berbagai filter menarik (Mono, Dual-Tone, Pixelate, Invert, Sepia, Blur, Thermal, Sketch, Glitch, Neon, Galaxy).",
    stack: ["Python", "OpenCV", "MediaPipe"],
    color: "orange",
    image: "/projects-img/handTracker.png",
    github: "https://github.com/Oqexip/handTracking.git",
  },
];

const ITEMS_PER_PAGE = 4;

export default function ProjectsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedProjects = projects.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

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
      <main className="page-shell sub-page page-enter">
        <section className="page-heading" id="projects-heading">
          <h1 className="pixel-heading">
            <FolderGit2
              className="pixel-heading-icon"
              size={68}
              strokeWidth={2.5}
            />
            <span className="pixel-heading-my">MY</span>
            <span className="pixel-heading-box">PROJECTS</span>
          </h1>
          <p>
            A small collection of things I&apos;ve built, shipped, explored, and
            occasionally refactored at 2 AM.
          </p>
          <div className="status-strip">
            STATUS: BUILDING / COMMITS: TOO MANY
          </div>
        </section>

        <section className="project-grid">
          {displayedProjects.map((project, index) => {
            const globalIndex = startIndex + index;
            return (
              <article className="project-card" key={project.title}>
                {/* Header Bar */}
                <div className={`project-card-header ${project.color}`}>
                  <div className="project-header-dots">
                    <span className="project-header-dot dot-red" />
                    <span className="project-header-dot dot-yellow" />
                    <span className="project-header-dot dot-green" />
                  </div>
                  <span className="project-header-badge">
                    APP_ID: {String(globalIndex).padStart(3, "0")}
                  </span>
                </div>

                {/* Framed Image Showcase */}
                <div className="project-image-box">
                  <div className="project-screen-frame">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        priority={index < 2}
                        loading="eager"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="project-cover-image"
                      />
                    ) : (
                      <div className="screen-window">
                        <span className="screen-bar" />
                        <div className="screen-lines">
                          <i />
                          <i />
                          <i />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content Body */}
                <div className="project-content">
                  <div className="project-title-row">
                    <h2 className="project-title">{project.title}</h2>
                    <span className="project-category-badge">
                      {project.category}
                    </span>
                  </div>
                  <p className="project-description">{project.text}</p>

                  <div className="tech-stack-container">
                    <span className="tech-stack-label">TECH STACK</span>
                    <div className="stack">
                      {project.stack.map((item, itemIdx) => (
                        <span
                          className={`stack-tag tag-pastel-${itemIdx % 6}`}
                          key={item}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="project-card-divider" />

                  <div className="project-actions">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="project-btn project-btn-repo"
                      aria-label={`View ${project.title} Repository`}
                    >
                      <GitFork size={15} strokeWidth={2.5} /> REPO
                    </a>
                    {project.preview && (
                      <a
                        href={project.preview}
                        target="_blank"
                        rel="noreferrer"
                        className="project-btn project-btn-live"
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

        {/* Pagination Section */}
        {totalPages > 1 && (
          <nav className="project-pagination" aria-label="Projects pagination">
            <div className="pagination-controls">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-btn"
                aria-label="Previous Page"
              >
                <ChevronLeft size={16} strokeWidth={2.5} /> PREV
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`pagination-btn pagination-page-number ${
                      currentPage === pageNum ? "active" : ""
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
                className="pagination-btn"
                aria-label="Next Page"
              >
                NEXT <ChevronRight size={16} strokeWidth={2.5} />
              </button>
            </div>
            <div className="pagination-info">
              PAGE {currentPage} OF {totalPages} // {projects.length} TOTAL
              PROJECTS
            </div>
          </nav>
        )}
      </main>
    </>
  );
}
