// Shared utility classes for the 404 and error actions.
export const errorActionStyles = {
  description: "leading-[1.6] text-[var(--muted)]",
  button:
    "flex cursor-pointer items-center gap-1.5 self-start border border-[var(--yellow)] bg-transparent p-[4px_8px] text-[10px] font-black text-[var(--yellow)] transition-all duration-200 hover:bg-[var(--yellow)] hover:text-[#111]",
  backLink:
    "inline-flex cursor-pointer items-center gap-2 border-[3px] border-[var(--line)] bg-[var(--blue)] p-[12px_20px] text-[11px] font-normal text-white no-underline shadow-[4px_4px_0_var(--line)] transition-[transform,box-shadow] duration-150 hover:translate-x-[3px] hover:translate-y-[3px] hover:text-white hover:shadow-[1px_1px_0_var(--line)]",
} as const;
