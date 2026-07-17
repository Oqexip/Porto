import { Code2, ExternalLink, FolderGit2 } from "lucide-react";
import Header from "@/components/Header";

const projects = [
  {
    title: "OmongIn",
    text: "Sosil media anonim.",
    stack: ["Laravel", "Tailwind CSS", "Vercel"],
    color: "pink",
    github: "https://github.com/Oqexip/OmongIn.git",
  },
  {
    title: "EasyPDF App",
    text: "Toolkit PDF praktis untuk perangkat mobile, dibuat agar urusan dokumen tidak ribet.",
    stack: ["Flutter", "Dart", "Mobile"],
    color: "yellow",
    github: "https://github.com/Oqexip",
  },
  {
    title: "River",
    text: "Eksperimen mobile chatbot dengan antarmuka yang ringan dan responsif.",
    stack: ["React Native", "Expo", "Mobile"],
    color: "green",
    github: "https://github.com/Oqexip",
  },
  {
    title: "Day Counter App",
    text: "Aplikasi kecil untuk menghitung hari penting dengan pengalaman yang menyenangkan.",
    stack: ["React", "Tailwind CSS", "Web"],
    color: "blue",
    github: "https://github.com/Oqexip",
  },
];

export default function ProjectsPage() {
  return (
    <>
      <Header back />
      <main className="page-shell sub-page page-enter">
        <section className="page-heading">
          <h1>
            <FolderGit2 size={50} strokeWidth={2.5} />
            MY PROJECTS
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
          {projects.map((project, index) => (
            <article className="project-card" key={project.title}>
              <div className={`project-visual ${project.color}`}>
                <div className="screen-window">
                  <span className="screen-bar" />
                  <div className="screen-lines">
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
                <span className="project-number">0{index + 1}</span>
              </div>
              <div className="project-content">
                <h2>{project.title}</h2>
                <p>{project.text}</p>
                <div className="stack">
                  {project.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={project.github} target="_blank" rel="noreferrer">
                    <Code2 size={15} /> SOURCE
                  </a>
                  <a href="#" aria-label={`View ${project.title}`}>
                    <ExternalLink size={15} /> LIVE PREVIEW
                  </a>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
