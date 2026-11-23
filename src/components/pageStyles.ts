// Shared Tailwind class strings for the inner pages (projects, certificates, contact, analytics, development).

export const pageShell =
  "mx-auto w-[min(1180px,calc(100%-40px))] animate-page-enter pt-[54px] pb-[72px] max-xs:w-[min(100%-28px,1180px)] max-xs:pt-[34px] max-xs:pb-[50px]";

export const pageHeading = "mb-11 max-tablet:mb-[34px]";

export const pageHeadingTitle = "m-0 max-xs:text-[2.8rem]";

export const pageHeadingText =
  "mt-4 mb-0 max-w-[720px] font-mono text-[15px] leading-[1.6] font-semibold text-muted";

export const pixelHeading = `${pageHeadingTitle} inline-flex flex-wrap items-center gap-4 font-retro font-bold uppercase`;

export const pixelHeadingIcon = "size-[clamp(52px,6vw,68px)] shrink-0 stroke-[#ffe600] text-[#ffe600]";

export const pixelHeadingIconTeal = "size-[clamp(52px,6vw,68px)] shrink-0 stroke-[#50e3c2] text-[#50e3c2]";

export const pixelHeadingMy = "text-[clamp(2rem,5vw,3.6rem)] tracking-[-0.02em] text-ink";

export const pixelHeadingBox =
  "inline-block -rotate-3 border-4 border-black bg-[#ffe600] px-[18px] pt-2 pb-2.5 text-[clamp(2rem,5vw,3.6rem)] leading-none font-bold tracking-[0.02em] whitespace-nowrap text-black shadow-[6px_6px_0_#000]";

export const pixelHeadingBoxTeal = pixelHeadingBox.replace("bg-[#ffe600]", "bg-[#50e3c2]");

export const statusStrip =
  "mt-[17px] inline-block border-[3px] border-[#111] bg-yellow px-[11px] py-2 font-mono text-[11px] leading-[normal] font-black text-[#111] shadow-[4px_4px_0_#111]";
