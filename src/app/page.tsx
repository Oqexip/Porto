"use client";

import { Music2, Pause, Play, Repeat2, Shuffle, SkipBack, SkipForward, Terminal } from "lucide-react";
import Header from "@/components/Header";
import { useState } from "react";

const skills = ["Laravel", "React", "Next.js", "Tailwind", "Docker", "Linux"];

export default function Home() {
  const [playing, setPlaying] = useState(false);

  return (
    <>
      <Header />
      <main className="page-shell home-page">
        <section className="hero-grid page-enter">
          <div className="profile-stack">
            <div className="sticker blue-sticker">NO BUGS, ONLY FEATURES</div>
            <div className="profile-card">
              <div className="profile-photo" aria-label="Illustrated profile placeholder">
                <span className="profile-code">&lt;/&gt;</span>
                <div className="portrait-head" />
                <div className="portrait-body" />
              </div>
              <div className="photo-label">PHOTO</div>
              <div className="role-label">MOBILE DEVELOPER</div>
            </div>
            <div className="loading-card">
              <div className="loading-meta"><span>LOADING...</span><span>100%</span></div>
              <div className="loading-track"><span /></div>
            </div>
          </div>

          <div className="intro-stack">
            <div className="server-card">
              <div className="server-heading"><span>≡</span> SERVER_STATS.JSON</div>
              <div className="stat-row"><span>Processor</span><strong>Intel Core i3-1115G4</strong></div>
              <div className="stat-row"><span>Memory</span><strong>12 GB RAM</strong></div>
              <div className="stat-row"><span>Status</span><strong className="status-good">● OPTIMAL</strong></div>
            </div>
            <div className="name-block">
              <p className="eyebrow">HELLO, I&apos;M</p>
              <h1>MAKDUM<br />IBROHIM</h1>
              <div className="badge-row"><span>FREELANCER</span><span>FULLSTACK</span><span>MOBILE DEV</span></div>
            </div>
            <p className="intro-copy">Building useful digital things with a little bit of chaos and a lot of curiosity.</p>
          </div>
        </section>

        <section className="home-lower">
          <div className="music-card brutal-card">
            <div className="music-topline"><span><Music2 size={18} /> NOW PLAYING</span><span className="live-dot">LIVE</span></div>
            <div className="filter-row"><label htmlFor="playlist">PLAYLIST FILTER:</label><select id="playlist" defaultValue="all"><option value="all">All</option><option>Justin Bieber</option><option>Kaleb J</option><option>Tulus</option></select></div>
            <div className="track-info">
              <div className="album-art"><div className={playing ? "vinyl spinning" : "vinyl"}><i /></div></div>
              <div><strong>Baby ft. Ludacris</strong><p>Justin Bieber</p><div className="mini-bars"><i /><i /><i /><i /><i /></div></div>
            </div>
            <div className="progress"><span /></div><div className="time-row"><span>0:42</span><span>3:34</span></div>
            <div className="player-controls">
              <button aria-label="Shuffle"><Shuffle size={17} /></button><button aria-label="Previous"><SkipBack size={18} /></button>
              <button className="play-button" onClick={() => setPlaying(!playing)} aria-label={playing ? "Pause" : "Play"}>{playing ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}</button>
              <button aria-label="Next"><SkipForward size={18} /></button><button aria-label="Repeat"><Repeat2 size={17} /></button>
            </div>
          </div>

          <div className="terminal-card brutal-card">
            <div className="terminal-head"><span className="window-dots"><i /><i /><i /></span><span><Terminal size={16} /> root@makdum-server:~</span></div>
            <div className="terminal-body">
              <p className="command">$ ./makdum --info</p>
              <p>Hai! Aku web developer yang excited banget bikin website atau aplikasi yang kece dan bisa dipake. Fokus utamaku di frontend, tapi lagi gaspol juga belajar backend. Selalu open buat tantangan baru biar makin jago!</p>
              <p className="arsenal">TECH ARSENAL:</p>
              <div className="tech-tags">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
              <p className="command cursor">root@makdum-server:~#</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
