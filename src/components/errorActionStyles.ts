// Shared utility classes for the 404 and error pages.
export const errorPage =
  "grid min-h-[111.2vh] animate-page-enter place-items-center bg-red p-6 text-[#111]";

export const errorCard =
  "w-[min(720px,100%)] border-4 border-[#111] bg-[#151515] text-[#f8f7ef] shadow-[10px_10px_0_#111]";

export const errorHead =
  "border-b-4 border-[#111] bg-yellow px-[17px] py-[13px] font-mono text-[13px] leading-[normal] font-black text-[#111]";

export const errorBody = "p-8 font-mono";

export const errorTitle = "mt-0 mb-[15px] text-[clamp(2.5rem,7vw,5rem)] text-red";

export const errorActionStyles = {
  description: "leading-[1.6] text-[var(--muted)]",
  button:
    "flex cursor-pointer items-center gap-1.5 self-start border border-[var(--yellow)] bg-transparent p-[4px_8px] font-mono text-[var(--yellow)] transition-all duration-200 hover:bg-[var(--yellow)] hover:text-[#111]",
  backLink:
    "mt-4 inline-block cursor-pointer border-2 border-[#f8f7ef] bg-[var(--blue)] p-2.5 font-retro text-[11px] font-normal no-underline shadow-[4px_4px_0_var(--line)] transition-[transform,box-shadow] duration-150 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[1px_1px_0_var(--line)]",
} as const;
