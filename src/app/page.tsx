"use client";

import { Music2, Pause, Play, Repeat2, Shuffle, SkipBack, SkipForward, Terminal, Volume2 } from "lucide-react";
import Header from "@/components/Header";
import CursorTrail from "@/components/CursorTrail";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

const skills = ["Laravel", "React", "Next.js", "Tailwind", "Docker", "Linux"];

interface Song {
  title: string;
  artist: string;
  url: string;
}

const songs: Song[] = [
  { title: "KARAKARA", artist: "KESSOKU BAND", url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/48/3c/65/483c65d0-7c08-7473-4d28-cbb770a9377c/mzaf_5498369525585995911.plus.aac.p.m4a" },
  { title: "Seishun Complex", artist: "KESSOKU BAND", url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/b5/98/a8/b598a8cf-40f4-78cb-16cf-390488c247cd/mzaf_12752398875140434205.plus.aac.p.m4a" },
  { title: "Guitar, Loneliness and Blue Planet", artist: "KESSOKU BAND", url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/d1/14/90/d1149047-7b3f-11e3-97c5-4ac52434d644/mzaf_13600435206444164514.plus.aac.p.m4a" },
  { title: "That Band", artist: "KESSOKU BAND", url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/0f/de/32/0fde325a-86e7-c96a-fea4-eb5ff62ae509/mzaf_12779311711819878654.plus.aac.p.m4a" },
  { title: "If I Could Be a Constellation", artist: "KESSOKU BAND", url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/d8/38/46/d838469e-cb2a-adab-605a-b3e4746dcc5e/mzaf_5809369360557803293.plus.aac.p.m4a" },
  { title: "Rockn' Roll, Morning Light Falls", artist: "KESSOKU BAND", url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/b0/cd/1f/b0cd1f01-5b90-0c61-5247-1c9816c48243/mzaf_8437637260780728287.plus.aac.p.m4a" },
  { title: "Never Forget", artist: "KESSOKU BAND", url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/68/15/e9/6815e9e1-6eaf-5e53-c0ee-bea74d1f3daf/mzaf_14849465541038066506.plus.aac.p.m4a" }
];

function displayTime(seconds: number) { const safe = Math.floor(seconds); return `${Math.floor(safe / 60)}:${String(safe % 60).padStart(2, "0")}`; }

export default function Home() {
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [duration, setDuration] = useState(30);
  const [muted, setMuted] = useState(false);
  const [loop, setLoop] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => { const id = window.setInterval(() => setLoading((value) => value >= 100 ? 0 : value + 1), 45); return () => window.clearInterval(id); }, []);

  // Sync play state
  useEffect(() => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.play().catch(err => {
        console.error("Playback failed:", err);
        setPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [playing]);

  // Sync track change
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.src = songs[currentSongIndex].url;
    audioRef.current.load();
    if (playing) {
      audioRef.current.play().catch(err => {
        console.error("Playback failed:", err);
        setPlaying(false);
      });
    } else {
      setProgress(0);
    }
  }, [currentSongIndex]);

  // Sync loop state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = loop;
    }
  }, [loop]);

  // Sync muted state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = muted;
    }
  }, [muted]);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * duration;
    audioRef.current.currentTime = newTime;
    setProgress(newTime);
  };

  const blocks = `${"■".repeat(Math.round(loading / 10))}${"□".repeat(10 - Math.round(loading / 10))}`;

  return <><CursorTrail /><Header /><main className="poster-shell page-enter"><section className="poster-board">
    <aside className="poster-side">
      <div className="poster-sticker">NO BUGS, ONLY FEATURES</div>
      <div className="poster-photo-frame">
        <div className="profile-photo" aria-label="Your profile photo area">
          <Image
            src="/profile.jpg"
            alt="Profile Photo"
            fill
            sizes="(max-width: 768px) 100vw, 365px"
            priority
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
      <div className="poster-role">MOBILE DEVELOPER</div>
      <div className="poster-loading"><strong>LOADING...</strong><span>[{blocks}] &nbsp;{loading}%</span></div>
      <div className="poster-connector" />
      <div className="poster-stats"><div className="poster-stats-title">≡ SERVER_STATS.JSON</div><div><span>Processor</span><b>Intel Core i3-1115G4</b></div><div><span>Memory</span><b>12 GB RAM</b></div><div><span>Status</span><b className="optimal">OPTIMAL</b></div></div>
    </aside>
    <section className="poster-main">
      <div className="poster-title"><h1>Ilham</h1><h2>Sikumbang</h2></div>
      <div className="poster-badges"><span>CODER ♚</span><span>FULLSTACK ▱</span><span>BACKEND ENGINEER ▯</span><span>AI/ML ▰</span></div>
      <section className="poster-player">
        <audio
          ref={audioRef}
          onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime)}
          onDurationChange={(e) => setDuration(e.currentTarget.duration || 30)}
          onEnded={() => {
            setPlaying(false);
            setProgress(0);
          }}
        />
        <div className="poster-filter">
          <label htmlFor="playlist">NOW PLAYING:</label>
          <select
            id="playlist"
            value={currentSongIndex}
            onChange={(e) => {
              setCurrentSongIndex(Number(e.target.value));
              setPlaying(true);
            }}
          >
            {songs.map((song, index) => (
              <option key={song.title} value={index}>
                {song.title}
              </option>
            ))}
          </select>
        </div>
        <div className="poster-track">
          <div className={playing ? "poster-vinyl spinning" : "poster-vinyl"}><i /></div>
          <div className="poster-song">
            <strong>{songs[currentSongIndex].title}</strong>
            <small>{songs[currentSongIndex].artist}</small>
          </div>
          <div className="poster-controls">
            <button
              aria-label="Mute"
              onClick={() => setMuted(!muted)}
              style={{ color: muted ? "var(--muted)" : "inherit", background: "none", border: "none", padding: 0 }}
            >
              <Volume2 size={18} />
            </button>
            <button
              aria-label="Shuffle"
              onClick={() => {
                const randomIndex = Math.floor(Math.random() * songs.length);
                setCurrentSongIndex(randomIndex);
                setPlaying(true);
              }}
            >
              <Shuffle size={18} />
            </button>
            <button
              aria-label="Previous"
              onClick={() => {
                if (audioRef.current && audioRef.current.currentTime > 2) {
                  audioRef.current.currentTime = 0;
                  setProgress(0);
                } else {
                  setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
                }
              }}
            >
              <SkipBack size={18} />
            </button>
            <button
              className="poster-play"
              onClick={() => setPlaying(!playing)}
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" />}
            </button>
            <button
              aria-label="Next"
              onClick={() => setCurrentSongIndex((prev) => (prev + 1) % songs.length)}
            >
              <SkipForward size={18} />
            </button>
            <button
              aria-label="Repeat"
              onClick={() => setLoop(!loop)}
              style={{ color: loop ? "var(--pink)" : "inherit" }}
            >
              <Repeat2 size={18} />
            </button>
          </div>
        </div>
        <div
          className="poster-progress"
          onClick={handleProgressClick}
          style={{ cursor: "pointer" }}
        >
          <span style={{ width: `${(progress / duration) * 100}%` }} />
        </div>
        <div className="poster-times">
          <span>{displayTime(progress)}</span>
          <span>{displayTime(duration)}</span>
        </div>
      </section>
      <div className="poster-divider" />
      <section className="poster-terminal"><div className="poster-terminal-head"><span><Terminal size={16} /> root@ilham-server:~</span><span className="window-dots"><i /><i /><i /></span></div><div className="poster-terminal-body"><p className="poster-command">$ ./ilham --info</p><p>Hai! Aku web developer yang excited banget bikin website atau aplikasi yang kece dan bisa dipake. Fokus utamaku di frontend, tapi lagi gaspol juga belajar backend. Selalu open buat tantangan baru biar makin jago!</p><p className="poster-arsenal">TECH ARSENAL:</p><div className="poster-tech">{skills.map(skill => <span key={skill}>{skill}</span>)}</div><p className="poster-prompt">root@ilham-server:~# <i /></p></div></section>
    </section>
  </section></main></>;
}
