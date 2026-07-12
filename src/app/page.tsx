"use client";

import { Music2, Pause, Play, Repeat2, Shuffle, SkipBack, SkipForward, Terminal, Volume2 } from "lucide-react";
import Header from "@/components/Header";
import { useState } from "react";

const skills = ["Laravel", "React", "Next.js", "Tailwind", "Docker", "Linux"];

export default function Home() {
  const [playing, setPlaying] = useState(false);

  return <><Header /><main className="poster-shell page-enter"><section className="poster-board">
    <aside className="poster-side">
      <div className="poster-sticker">NO BUGS, ONLY FEATURES</div>
      <div className="poster-photo-frame">
        <div className="profile-photo" aria-label="Your profile photo area">
          <span className="profile-code">&lt;/&gt;</span><div className="portrait-head" /><div className="portrait-body" />
        </div>
        <span className="poster-photo-label">PHOTO</span>
      </div>
      <div className="poster-role">MOBILE DEVELOPER</div>
      <div className="poster-loading"><strong>LOADING...</strong><span>[■■■■■■■■□□] &nbsp;86%</span></div>
      <div className="poster-connector" />
      <div className="poster-stats">
        <div className="poster-stats-title">≡ SERVER_STATS.JSON</div>
        <div><span>Processor</span><b>Intel Core i3-1115G4</b></div>
        <div><span>Memory</span><b>12 GB RAM</b></div>
        <div><span>Status</span><b className="optimal">OPTIMAL</b></div>
      </div>
    </aside>

    <section className="poster-main">
      <div className="poster-title"><h1>MAKDUM</h1><h2>IBROHIM</h2></div>
      <div className="poster-badges"><span>FREELANCER ♚</span><span>FULLSTACK ▱</span><span>MOBILE DEV ▯</span></div>
      <section className="poster-player">
        <div className="poster-filter"><label htmlFor="playlist">PLAYLIST FILTER:</label><select id="playlist" defaultValue="all"><option value="all">ALL</option><option>Justin Bieber</option><option>Kaleb J</option><option>Tulus</option></select></div>
        <div className="poster-track"><div className={playing ? "poster-vinyl spinning" : "poster-vinyl"}><i /></div><div className="poster-song"><strong>BABY FT. LUDACRIS</strong><small>JUSTIN BIEBER</small></div><div className="poster-controls"><Volume2 size={18} /><button aria-label="Shuffle"><Shuffle size={18}/></button><button aria-label="Previous"><SkipBack size={18}/></button><button className="poster-play" onClick={() => setPlaying(!playing)} aria-label={playing ? "Pause" : "Play"}>{playing ? <Pause size={22} fill="currentColor"/> : <Play size={22} fill="currentColor"/>}</button><button aria-label="Next"><SkipForward size={18}/></button><button aria-label="Repeat"><Repeat2 size={18}/></button></div></div>
        <div className="poster-progress"><span /></div><div className="poster-times"><span>0:00</span><span>3:39</span></div>
      </section>
      <div className="poster-divider" />
      <section className="poster-terminal">
        <div className="poster-terminal-head"><span><Terminal size={16}/> root@makdum-server:~</span><span className="window-dots"><i/><i/><i/></span></div>
        <div className="poster-terminal-body"><p className="poster-command">$ ./makdum --info</p><p>Hai! Aku web developer yang excited banget bikin website atau aplikasi yang kece dan bisa dipake. Fokus utamaku di frontend, tapi lagi gaspol juga belajar backend. Selalu open buat tantangan baru biar makin jago!</p><p className="poster-arsenal">TECH ARSENAL:</p><div className="poster-tech">{skills.map(skill => <span key={skill}>{skill}</span>)}</div><p className="poster-prompt">root@makdum-server:~# <i /></p></div>
      </section>
    </section>
  </section></main></>;
}
