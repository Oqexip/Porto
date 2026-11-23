"use client";

import {
  Pause,
  Play,
  Repeat2,
  Shuffle,
  SkipBack,
  SkipForward,
  Terminal,
  Volume2,
} from "lucide-react";
import Header from "@/components/Header";
import CursorTrail from "@/components/CursorTrail";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

const skills = [
  "JS",
  "Python",
  "TS",
  "HTML",
  "CSS",
  "React",
  "Next.js",
  "Node.js",
  "PHP",
  "Laravel",
  "MySQL",
  "Postgres",
  "Git",
  "GitHub",
  "Docker",
  "Tinkercad",
];

interface Song {
  title: string;
  artist: string;
  url: string;
}

const songs: Song[] = [
  {
    title: "KARAKARA",
    artist: "KESSOKU BAND",
    url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/48/3c/65/483c65d0-7c08-7473-4d28-cbb770a9377c/mzaf_5498369525585995911.plus.aac.p.m4a",
  },
  {
    title: "Seishun Complex",
    artist: "KESSOKU BAND",
    url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/b5/98/a8/b598a8cf-40f4-78cb-16cf-390488c247cd/mzaf_12752398875140434205.plus.aac.p.m4a",
  },
  {
    title: "Guitar, Loneliness and Blue Planet",
    artist: "KESSOKU BAND",
    url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/d1/14/90/d1149047-7b3f-11e3-97c5-4ac52434d644/mzaf_13600435206444164514.plus.aac.p.m4a",
  },
  {
    title: "That Band",
    artist: "KESSOKU BAND",
    url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/0f/de/32/0fde325a-86e7-c96a-fea4-eb5ff62ae509/mzaf_12779311711819878654.plus.aac.p.m4a",
  },
  {
    title: "If I Could Be a Constellation",
    artist: "KESSOKU BAND",
    url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/d8/38/46/d838469e-cb2a-adab-605a-b3e4746dcc5e/mzaf_5809369360557803293.plus.aac.p.m4a",
  },
  {
    title: "Rockn' Roll, Morning Light Falls",
    artist: "KESSOKU BAND",
    url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/b0/cd/1f/b0cd1f01-5b90-0c61-5247-1c9816c48243/mzaf_8437637260780728287.plus.aac.p.m4a",
  },
  {
    title: "Never Forget",
    artist: "KESSOKU BAND",
    url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/68/15/e9/6815e9e1-6eaf-5e53-c0ee-bea74d1f3daf/mzaf_14849465541038066506.plus.aac.p.m4a",
  },
];

function displayTime(seconds: number) {
  const safe = Math.floor(seconds);
  return `${Math.floor(safe / 60)}:${String(safe % 60).padStart(2, "0")}`;
}

function calculateDaysSince(dateString: string): string {
  const created = new Date(dateString);
  const diffTime = Date.now() - created.getTime();
  if (!Number.isFinite(diffTime) || diffTime < 0) return "UNAVAILABLE";
  return `${Math.floor(diffTime / (1000 * 60 * 60 * 24))} DAYS`;
}

const badges = [
  ["WEEB", "bg-pink text-[#111]"],
  ["LARPER", "bg-blue text-white"],
  ["CODER", "bg-[#ff3b30] text-white"],
  ["WANNABE ENGINEER", "bg-yellow text-[#111]"],
] as const;

// The name is drawn in a pixel font and stretched 12% wider; the max-width keeps the stretched box inside its column.
const titleLine =
  "m-0 w-fit max-w-[calc(100%/1.12)] origin-left scale-x-[1.12] font-retro text-[clamp(1.8rem,8.5cqw,5.2rem)] leading-[1.13] font-normal tracking-[0.08em] max-phone:text-[clamp(1.6rem,8.5cqw,3.8rem)] max-phone:tracking-[-0.01em]";

const controlButton =
  "grid size-[43px] place-items-center border-4 border-line bg-paper text-ink max-phone:size-[34px] max-phone:border-[3px]";

export default function Home() {
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [duration, setDuration] = useState(30);
  const [muted, setMuted] = useState(false);
  const [loop, setLoop] = useState(false);

  const [totalContributions, setTotalContributions] = useState<string>("LOADING...");
  const [daysInGame, setDaysInGame] = useState<string>("LOADING...");

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const id = window.setInterval(
      () => setLoading((value) => (value >= 100 ? 0 : value + 1)),
      80,
    );
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    // Fetch GitHub User Info for DAYS_IN_GAME (username: Oqexip)
    fetch("https://api.github.com/users/Oqexip")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        setDaysInGame(
          typeof data?.created_at === "string"
            ? calculateDaysSince(data.created_at)
            : "UNAVAILABLE",
        );
      })
      .catch(() => {
        setDaysInGame("UNAVAILABLE");
      });

    // Fetch GitHub Contributions for TOTAL_CONTRIBUTION
    fetch("https://github-contributions-api.jogruber.de/v4/Oqexip")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data?.total || typeof data.total !== "object") {
          setTotalContributions("UNAVAILABLE");
          return;
        }
        const counts = Object.values(data.total);
        if (
          counts.length === 0 ||
          counts.some((count) => typeof count !== "number" || !Number.isFinite(count) || count < 0)
        ) {
          setTotalContributions("UNAVAILABLE");
          return;
        }
        const total = (counts as number[]).reduce((sum, count) => sum + count, 0);
        setTotalContributions(total.toLocaleString("en-US"));
      })
      .catch(() => {
        setTotalContributions("UNAVAILABLE");
      });
  }, []);

  // Keep the audio source and playback state in sync without reloading on pause.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const songUrl = songs[currentSongIndex].url;
    if (audio.src !== songUrl) {
      audio.src = songUrl;
      audio.load();
    }
    if (playing) {
      audio.play().catch((err) => {
        console.error("Playback failed:", err);
        setPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [currentSongIndex, playing]);

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

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const newTime = Number(e.currentTarget.value);
    audioRef.current.currentTime = newTime;
    setProgress(newTime);
  };

  const blocks = `${"■".repeat(Math.round(loading / 10))}${"□".repeat(10 - Math.round(loading / 10))}`;


  return (
    <>
      <CursorTrail />
      <Header />
      <main className="mx-auto mt-2.5 mb-[54px] animate-page-enter desk:w-[min(1280px,calc(100%-48px))] max-desk:w-[min(100%-34px,900px)] max-phone:mt-[18px] max-phone:w-[min(100%-22px,580px)]">
        <section className="grid min-h-[1230px] gap-7 border-4 border-line bg-paper shadow-[10px_10px_0_var(--line)] desk:min-h-[1080px] desk:grid-cols-[355px_minmax(0,1fr)] desk:px-9 desk:py-10 max-desk:grid-cols-1 max-desk:gap-[55px] max-desk:px-7 max-desk:py-12 max-phone:block max-phone:min-h-0 max-phone:px-[17px] max-phone:pt-11 max-phone:pb-7">
          <aside className="relative desk:flex desk:h-full desk:flex-col max-desk:grid max-desk:grid-cols-[365px_1fr] max-desk:items-start max-desk:gap-[30px] max-phone:block">
            <div className="absolute -top-[38px] -left-[29px] z-3 rotate-[11deg] border-4 border-line bg-[#ff3b30] px-[18px] py-2.5 font-mono text-[18px] leading-[normal] font-black tracking-[0.04em] text-white shadow-[5px_5px_0_var(--line)] max-desk:-left-5 max-phone:-top-[33px] max-phone:-left-[7px] max-phone:text-[11px]">
              NO BUGS, ONLY FEATURES
            </div>
            <div className="group relative w-[365px] border-4 border-line bg-paper p-3.5 shadow-[7px_7px_0_var(--line)] desk:w-[330px] max-phone:mx-auto max-phone:w-full max-phone:max-w-[365px]">
              <div
                className="relative flex h-[455px] items-end justify-center overflow-hidden border-[3px] border-line bg-[repeating-linear-gradient(45deg,#9e9e9e_0_23px,#b8b8b8_23px_46px)] grayscale transition-[filter] duration-250 ease-[ease] group-hover:bg-[repeating-linear-gradient(45deg,#4a90e2_0_23px,#50e3c2_23px_46px)] group-hover:grayscale-0 desk:h-[410px] max-phone:h-[420px]"
                aria-label="Your profile photo area"
              >
                <Image
                  src="/profile.jpg"
                  alt="Profile Photo"
                  fill
                  sizes="(max-width: 768px) 100vw, 365px"
                  priority
                  className="transition-transform duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.08]"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
            <div className="mt-9 w-[365px] border-4 border-line bg-yellow px-2.5 py-3.5 text-center font-mono text-[18px] leading-[normal] font-black tracking-[0.03em] text-[#111] shadow-[6px_6px_0_var(--line)] desk:w-[330px] max-desk:col-1 max-phone:mx-auto max-phone:w-full max-phone:max-w-[365px]">
              FULLSTUCK DEVELOPER
            </div>
            <div className="mx-auto grid w-[290px] gap-[9px] border-4 border-line bg-[#fffbe4] px-4 py-[13px] text-center font-mono text-[15px] leading-[normal] font-black text-ink shadow-[5px_5px_0_var(--line)] dark:bg-paper desk:mt-[42px] max-desk:col-1 max-desk:mt-2.5 max-phone:mt-[45px]">
              <strong className="text-blue">LOADING...</strong>
              <span>
                [{blocks}] &nbsp;{loading}%
              </span>
            </div>
            <div className="mx-auto mt-3 w-0 border-l-4 border-dashed border-[#aaa] desk:min-h-[60px] desk:grow max-desk:hidden" />
            <div className="border-4 border-line bg-[#fff9d8] font-mono text-[14px] leading-[normal] font-black shadow-[6px_6px_0_var(--line)] dark:bg-paper max-desk:col-1 max-phone:mt-[35px]">
              <div className="border-b-4 border-line bg-[#f3f3f7] px-[15px] py-4 text-[16px] dark:bg-[#151515]">
                ≡ STATS.JSON
              </div>
              {[
                ["CONTRIBUTIONS", totalContributions, "text-white"],
                ["DAYS_IN_GAME", daysInGame, "text-white"],
                ["Status", "ALIVE", "text-green"],
              ].map(([label, value, color]) => (
                <div
                  key={label}
                  className="flex items-center justify-between border-b border-[#ded7b5] px-[15px] py-[17px] last:border-0 dark:border-b-[#222]"
                >
                  <span>{label}</span>
                  <b className={`border-[1.5px] border-line bg-[#111] px-2 py-1 ${color}`}>{value}</b>
                </div>
              ))}
            </div>
          </aside>
          <section className="@container min-w-0 desk:flex desk:h-full desk:flex-col max-desk:row-1 max-phone:mt-[45px]">
            <div className="pb-[30px]">
              <h1 className={`${titleLine} text-ink dark:text-white`}>Ilham</h1>
              <h2 className={`${titleLine} -mt-2 text-blue`}>Sikumbang</h2>
            </div>
            <div className="mb-10 flex flex-wrap gap-[15px] desk:mb-7 max-phone:mb-[30px] max-phone:gap-[9px]">
              {badges.map(([label, color]) => (
                <span
                  key={label}
                  className={`border-4 border-line px-[15px] py-[9px] font-mono text-[17px] leading-[normal] font-black shadow-[5px_5px_0_var(--line)] max-phone:px-2 max-phone:py-[7px] max-phone:text-[10px] max-phone:shadow-[3px_3px_0_#111] ${color}`}
                >
                  {label}
                </span>
              ))}
            </div>
            <section className="border-4 border-line bg-green px-[18px] pt-[17px] pb-3.5 text-[#111] shadow-[7px_7px_0_var(--line)] max-phone:p-[13px]">
              <audio
                ref={audioRef}
                onLoadStart={() => setProgress(0)}
                onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime)}
                onDurationChange={(e) => {
                  const audioDuration = e.currentTarget.duration;
                  setDuration(
                    Number.isFinite(audioDuration) && audioDuration > 0
                      ? audioDuration
                      : 30,
                  );
                }}
                onEnded={() => {
                  setPlaying(false);
                  setProgress(0);
                }}
              />
              <div className="flex items-center justify-between gap-[22px] font-mono text-[17px] leading-[normal] font-black max-phone:grid max-phone:gap-2.5 max-phone:text-[13px]">
                <label htmlFor="playlist">NOW PLAYING:</label>
                <select
                  id="playlist"
                  className="w-[235px] border-4 border-line bg-paper px-2.5 py-[5px] font-mono text-[17px] leading-[normal] font-black text-ink max-phone:w-full max-phone:text-[13px]"
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
              <div className="flex min-h-[106px] items-center gap-[15px] max-phone:flex-wrap max-phone:py-2.5">
                <div
                  className={`grid size-[76px] flex-none place-items-center rounded-full border-4 border-[#111] bg-[url(/kessoku.jpg)] bg-cover bg-center bg-no-repeat ${playing ? "animate-spin-slow" : ""}`}
                >
                  <i className="block size-3 rounded-full border-2 border-black bg-[#111]" />
                </div>
                <div className="grid gap-1.5 font-mono">
                  <strong className="text-[18px] max-phone:text-[13px]">
                    {songs[currentSongIndex].title}
                  </strong>
                  <small className="font-black">{songs[currentSongIndex].artist}</small>
                </div>
                <div className="ml-auto flex items-center gap-2.5 max-phone:ml-0 max-phone:w-full max-phone:justify-end max-phone:gap-[5px]">
                  <button
                    aria-label="Mute"
                    className={controlButton}
                    onClick={() => setMuted(!muted)}
                    style={{
                      color: muted ? "var(--muted)" : "inherit",
                      background: "none",
                      border: "none",
                      padding: 0,
                    }}
                  >
                    <Volume2 size={18} />
                  </button>
                  <button
                    aria-label="Shuffle"
                    className={controlButton}
                    onClick={() => {
                      const randomIndex = Math.floor(
                        Math.random() * songs.length,
                      );
                      setCurrentSongIndex(randomIndex);
                      setPlaying(true);
                    }}
                  >
                    <Shuffle size={18} />
                  </button>
                  <button
                    aria-label="Previous"
                    className={controlButton}
                    onClick={() => {
                      if (
                        audioRef.current &&
                        audioRef.current.currentTime > 2
                      ) {
                        audioRef.current.currentTime = 0;
                        setProgress(0);
                      } else {
                        setCurrentSongIndex(
                          (prev) => (prev - 1 + songs.length) % songs.length,
                        );
                      }
                    }}
                  >
                    <SkipBack size={18} />
                  </button>
                  <button
                    className="grid size-[52px] place-items-center border-4 border-line bg-pink text-ink max-phone:size-[42px] max-phone:border-[3px]"
                    onClick={() => setPlaying(!playing)}
                    aria-label={playing ? "Pause" : "Play"}
                  >
                    {playing ? (
                      <Pause size={22} fill="currentColor" />
                    ) : (
                      <Play size={22} fill="currentColor" />
                    )}
                  </button>
                  <button
                    aria-label="Next"
                    className={controlButton}
                    onClick={() =>
                      setCurrentSongIndex((prev) => (prev + 1) % songs.length)
                    }
                  >
                    <SkipForward size={18} />
                  </button>
                  <button
                    aria-label="Repeat"
                    className={controlButton}
                    onClick={() => setLoop(!loop)}
                    style={loop ? { color: "var(--pink)" } : undefined}
                  >
                    <Repeat2 size={18} />
                  </button>
                </div>
              </div>
              <div className="relative h-3 border-2 border-[#111] bg-[#c8ffee] focus-within:outline-[3px] focus-within:outline-offset-4 focus-within:outline-blue">
                <span
                  className="block size-full origin-left bg-[#111] transition-transform duration-300 ease-[ease]"
                  style={{
                    transform: `scaleX(${Math.min(1, Math.max(0, progress / duration))})`,
                  }}
                />
                <input
                  type="range"
                  className="absolute inset-x-0 -inset-y-[2px] m-0 h-[calc(100%+4px)] w-full cursor-pointer opacity-0"
                  min={0}
                  max={duration}
                  step={0.1}
                  value={Math.min(progress, duration)}
                  onChange={handleSeekChange}
                  aria-label="Seek within song"
                  aria-valuetext={`${displayTime(progress)} of ${displayTime(duration)}`}
                />
              </div>
              <div className="mt-[7px] flex justify-between font-mono text-[13px] leading-[normal] font-black">
                <span>{displayTime(progress)}</span>
                <span>{displayTime(duration)}</span>
              </div>
            </section>
            <div className="mt-[70px] mb-[34px] border-t-[5px] border-dashed border-[#8b8b8b] desk:mt-12 desk:mb-7 max-phone:mt-[45px] max-phone:mb-[27px]" />
            <section className="border-4 border-line bg-paper text-ink shadow-[7px_7px_0_var(--line)] desk:mt-auto">
              <div className="flex items-center justify-between border-b-4 border-line bg-blue px-[18px] py-[15px] font-mono text-[17px] leading-[normal] font-black text-white max-phone:p-3 max-phone:text-[11px]">
                <span className="flex items-center gap-2.5">
                  <Terminal size={16} /> root@ilham-server:~
                </span>
                <span className="flex flex-row-reverse gap-[5px]">
                  {["bg-red", "bg-yellow", "bg-green"].map((color) => (
                    <i
                      key={color}
                      className={`size-[19px] rounded-full border-[3px] border-line max-phone:size-3.5 max-phone:border-2 ${color}`}
                    />
                  ))}
                </span>
              </div>
              <div className="px-10 py-[42px] font-mono text-[17px] leading-[1.62] font-normal desk:p-8 desk:text-[15px] max-phone:px-[19px] max-phone:py-[25px] max-phone:text-[13px]">
                <p className="mb-[22px] inline-block border-[3px] border-line bg-yellow px-2.5 py-1.5 font-black text-[#111]">
                  $ ./ilham --info
                </p>
                <p className="mb-[22px]">
                  Hai! Aku developer yang excited banget bikin website atau
                  ngotak-ngatik elektronik. Fokus utamaku di hardware,
                  tapi lagi gaspol juga buat belajar AI/ML. Selalu open buat
                  tantangan baru biar makin jago!
                </p>
                <p className="mb-[9px] w-max border-b-[3px] border-line font-black">TECH ARSENAL:</p>
                <div className="flex flex-wrap gap-3 max-phone:gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="border-[3px] border-line bg-paper px-[13px] py-[7px] font-mono text-[14px] leading-[normal] font-black text-ink shadow-[3px_3px_0_var(--line)] max-phone:px-2 max-phone:py-1.5 max-phone:text-[11px]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          </section>
        </section>
      </main>
    </>
  );
}
