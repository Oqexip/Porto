"use client";

import Link from "next/link";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";

const links = [
  { label: "★ PROFILE ★", href: "/", bg: "bg-blue", text: "text-white", mobileText: "text-white" },
  { label: "PROJECTS", href: "/projects", bg: "bg-yellow", text: "text-[#111]", mobileText: "text-[#111]" },
  { label: "CERTIFICATES", href: "/certificates", bg: "bg-green", text: "text-[#111]", mobileText: "text-[#111]" },
  { label: "CONTACT", href: "/contact", bg: "bg-pink", text: "text-[#111]", mobileText: "text-white" },
] as const;

const pressable =
  "border-[3px] border-line shadow-[4px_4px_0_var(--line)] transition-all duration-150 ease-[ease]";

const iconButton = `${pressable} aspect-square size-[46px] min-h-[46px] min-w-[46px] cursor-pointer place-items-center bg-paper p-0 text-ink hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_var(--line)] max-desk:size-[38px] max-desk:min-h-[38px] max-desk:min-w-[38px]`;

const mobileItem =
  "flex w-full items-center justify-center border-[3px] border-line px-4 py-[13px] text-center font-retro text-[13px] leading-[normal] font-normal tracking-[0.05em] uppercase shadow-[4px_4px_0_var(--line)] transition-[transform,translate,box-shadow] duration-100 ease-[ease] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_var(--line)]";

export default function Header({ back = false }: { back?: boolean }) {
  const [open, setOpen] = useState(false);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  return (
    <header className="pt-[42px] pb-[30px] max-desk:py-[22px] max-phone:p-0">
      <div className="mx-auto flex min-h-20 items-center justify-between gap-5 border-4 border-line bg-paper p-[18px] shadow-[9px_9px_0_var(--line)] desk:min-h-[90px] desk:w-[min(1280px,calc(100%-48px))] desk:px-6 max-desk:w-[min(100%-34px,900px)] max-phone:min-h-16 max-phone:w-full max-phone:border-0 max-phone:px-4 max-phone:py-3 max-phone:shadow-none">
        {back ? (
          <Link
            href="/"
            className={`${pressable} inline-flex items-center gap-2 bg-blue px-5 py-3 font-retro text-[12px] font-normal text-white hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[1px_1px_0_var(--line)] max-xs:text-[10px]`}
          >
            ← BACK TO HOME
          </Link>
        ) : (
          <nav
            className="flex gap-[19px] max-desk:gap-2 max-phone:hidden"
            aria-label="Primary navigation"
          >
            {links.map(({ label, href, bg, text }) => (
              <Link
                key={href}
                href={href}
                className={`${pressable} ${bg} ${text} px-5 py-3 font-retro text-[12px] leading-[normal] font-normal tracking-[-0.05em] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[1px_1px_0_var(--line)] max-desk:px-[9px] max-desk:py-2`}
              >
                {label}
              </Link>
            ))}
          </nav>
        )}
        <div className="ml-auto flex items-center gap-6 max-desk:gap-2.5">
          <button
            className={`${iconButton} grid`}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {mounted && theme === "dark" ? (
              <Sun size={21} />
            ) : (
              <Moon size={21} />
            )}
          </button>
          <button
            className={`${pressable} bg-red px-8 py-3 font-retro text-[12px] font-normal text-white hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[0_0_0_currentColor] max-desk:p-2.5 max-phone:hidden`}
            onClick={() => router.push("/development")}
          >
            ☠ <span>DON&apos;T CLICK ME</span>
          </button>
          <button
            className={`${iconButton} hidden max-phone:grid`}
            onClick={() => setOpen((wasOpen) => !wasOpen)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={21} strokeWidth={2.5} /> : <Menu size={21} strokeWidth={2.5} />}
          </button>
        </div>
      </div>
      <nav
        className="relative z-50 flex w-full animate-menu-slide flex-col gap-2.5 border-t-[3px] border-line bg-bg px-5 pt-4 pb-6 shadow-[0_8px_0_rgba(0,0,0,0.15)] phone:hidden"
        id="mobile-menu"
        aria-label="Mobile navigation"
        hidden={!open}
      >
        {links.map(({ label, href, bg, mobileText }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className={`${mobileItem} ${bg} ${mobileText}`}
          >
            {label}
          </Link>
        ))}
        <button
          type="button"
          className={`${mobileItem} cursor-pointer bg-red text-white`}
          onClick={() => {
            setOpen(false);
            router.push("/development");
          }}
        >
          ☠ DON&apos;T CLICK ME
        </button>
      </nav>
    </header>
  );
}
