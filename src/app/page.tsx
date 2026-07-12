"use client";

import { Music2, Pause, Play, Repeat2, Shuffle, SkipBack, SkipForward, Terminal, Volume2 } from "lucide-react";
import Header from "@/components/Header";
import CursorTrail from "@/components/CursorTrail";
import { useEffect, useState } from "react";

const skills = ["Laravel", "React", "Next.js", "Tailwind", "Docker", "Linux"];
const duration = 219;

function displayTime(seconds: number) { const safe = Math.floor(seconds); return `${Math.floor(safe / 60)}:${String(safe % 60).padStart(2, "0")}`; }

export default function Home() {
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => { const id = window.setInterval(() => setLoading((value) => value >= 100 ? 0 : value + 1), 45); return () => window.clearInterval(id); }, []);
  useEffect(() => { if (!playing) return; const id = window.setInterval(() => setProgress((value) => value >= duration ? 0 : value + .25), 250); return () => window.clearInterval(id); }, [playing]);
  const blocks = `${"■".repeat(Math.round(loading / 10))}${"□".repeat(10 - Math.round(loading / 10))}`;

  return <><CursorTrail /><Header /><main className="poster-shell page-enter"><section className="poster-board">
    <aside className="poster-side">
      <div className="poster-sticker">NO BUGS, ONLY FEATURES</div>
      <div className="poster-photo-frame">
        <div className="profile-photo" aria-label="Your profile photo area"><span className="profile-code">&lt;/&gt;</span><div className="portrait-head" /><div className="portrait-body" /></div>
      </div>
      <div className="poster-role">MOBILE DEVELOPER</div>
      <div className="poster-loading"><strong>LOADING...</strong><span>[{blocks}] &nbsp;{loading}%</span></div>
      <div className="poster-connector" />
      <div className="poster-stats"><div className="poster-stats-title">≡ SERVER_STATS.JSON</div><div><span>Processor</span><b>Intel Core i3-1115G4</b></div><div><span>Memory</span><b>12 GB RAM</b></div><div><span>Status</span><b className="optimal">OPTIMAL</b></div></div>
    </aside>
    <section className="poster-main">
      <div className="poster-title"><h1>Ilham</h1><h2>Sikumbang</h2></div>
      <div className="poster-badges"><span>FREELANCER ♚</span><span>FULLSTACK ▱</span><span>MOBILE DEV ▯</span></div>
      <section className="poster-player">
        <div className="poster-filter"><label htmlFor="playlist">PLAYLIST FILTER:</label><select id="playlist" defaultValue="all"><option value="all">ALL</option><option>Kessoku Band</option></select></div>
        <div className="poster-track"><div className={playing ? "poster-vinyl spinning" : "poster-vinyl"}><i /></div><div className="poster-song"><strong>KARAKARA</strong><small>KESSOKU BAND</small></div><div className="poster-controls"><Volume2 size={18} /><button aria-label="Shuffle"><Shuffle size={18} /></button><button aria-label="Previous" onClick={() => setProgress(0)}><SkipBack size={18} /></button><button className="poster-play" onClick={() => setPlaying(!playing)} aria-label={playing ? "Pause" : "Play"}>{playing ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" />}</button><button aria-label="Next" onClick={() => setProgress(duration)}><SkipForward size={18} /></button><button aria-label="Repeat" onClick={() => setProgress(0)}><Repeat2 size={18} /></button></div></div>
        <div className="poster-progress"><span style={{ width: `${(progress / duration) * 100}%` }} /></div><div className="poster-times"><span>{displayTime(progress)}</span><span>3:39</span></div>
        {playing && <iframe className="spotify-audio" title="Karakara by Kessoku Band" src="https://open.spotify.com/embed/track/2ADOoCVouvRdKBzIVkYf3H?utm_source=generator&theme=0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />}
      </section>
      <div className="poster-divider" />
      <section className="poster-terminal"><div className="poster-terminal-head"><span><Terminal size={16} /> root@ilham-server:~</span><span className="window-dots"><i /><i /><i /></span></div><div className="poster-terminal-body"><p className="poster-command">$ ./ilham --info</p><p>Hai! Aku web developer yang excited banget bikin website atau aplikasi yang kece dan bisa dipake. Fokus utamaku di frontend, tapi lagi gaspol juga belajar backend. Selalu open buat tantangan baru biar makin jago!</p><p className="poster-arsenal">TECH ARSENAL:</p><div className="poster-tech">{skills.map(skill => <span key={skill}>{skill}</span>)}</div><p className="poster-prompt">root@ilham-server:~# <i /></p></div></section>
    </section>
  </section></main></>;
}
