import type { Metadata } from "next";
import Link from "next/link";
import { Activity, BarChart3, Eye, Users } from "lucide-react";
import Header from "@/components/Header";
import { getTrafficReport, type TrafficDay } from "@/lib/vercelAnalytics";

export const metadata: Metadata = {
  title: "Site Analytics | Ilham Sikumbang",
  description: "Live visitor and page view analytics for Ilham Sikumbang's portfolio.",
};

const panel =
  "border-[3px] border-[var(--line)] bg-[var(--paper)] shadow-[7px_7px_0_var(--line)]";

const number = new Intl.NumberFormat("en-US");
const dateLabel = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

function labelDate(date: string) {
  return dateLabel.format(new Date(`${date}T00:00:00.000Z`));
}

function StatCard({
  label,
  value,
  note,
  accent,
  icon: Icon,
}: {
  label: string;
  value: number;
  note: string;
  accent: string;
  icon: typeof Eye;
}) {
  return (
    <article className={`${panel} flex min-h-[165px] flex-col justify-between p-5`}>
      <div className="flex items-start justify-between gap-3">
        <h2 className="m-0 text-xs font-black tracking-[0.08em] uppercase">{label}</h2>
        <span
          className="grid size-10 shrink-0 place-items-center border-2 border-[#111] text-[#111]"
          style={{ backgroundColor: accent }}
        >
          <Icon size={20} aria-hidden="true" />
        </span>
      </div>
      <div>
        <p className="m-0 text-[clamp(2rem,5vw,3.25rem)] leading-none font-black tabular-nums">
          {number.format(value)}
        </p>
        <p className="mt-2 mb-0 text-xs font-semibold text-[var(--muted)]">{note}</p>
      </div>
    </article>
  );
}

function TrafficChart({ days, range }: { days: TrafficDay[]; range: 7 | 30 }) {
  const peak = Math.max(...days.map((day) => day.pageviews), 0);

  if (peak === 0) {
    return (
      <div className="grid min-h-[220px] place-items-center border-2 border-dashed border-[var(--line)] p-6 text-center">
        <p className="m-0 text-sm font-bold text-[var(--muted)]">
          No page views recorded in this period yet.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto pb-2">
        <div
          className={`flex h-[240px] items-end gap-1.5 border-b-2 border-[var(--line)] pt-4 ${range === 30 ? "min-w-[650px]" : "min-w-[330px]"}`}
          role="img"
          aria-label={`Daily page views for the last ${range} days, peaking at ${peak} views`}
        >
          {days.map((day, index) => (
            <div key={day.date} className="flex h-full min-w-0 flex-1 flex-col justify-end gap-2">
              <div
                className="w-full border-2 border-[#111] bg-[var(--blue)] shadow-[2px_2px_0_var(--line)]"
                style={{ height: `${Math.max(2, (day.pageviews / peak) * 100)}%` }}
                title={`${labelDate(day.date)}: ${day.pageviews} page views, ${day.visitors} visitors`}
              />
              <span className="h-4 text-center text-[10px] font-bold text-[var(--muted)]">
                {range === 7 || index % 5 === 0 || index === days.length - 1
                  ? labelDate(day.date)
                  : ""}
              </span>
            </div>
          ))}
        </div>
      </div>
      <details className="mt-5 border-t-2 border-dashed border-[var(--line)] pt-4">
        <summary className="flex min-h-11 cursor-pointer items-center text-xs font-black tracking-[0.06em] uppercase">
          View daily values
        </summary>
        <div className="mt-3 max-h-64 overflow-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b-2 border-[var(--line)]">
                <th scope="col" className="py-2">Day</th>
                <th scope="col" className="py-2 text-right">Page views</th>
                <th scope="col" className="py-2 text-right">Visitors</th>
              </tr>
            </thead>
            <tbody>
              {days.map((day) => (
                <tr key={day.date} className="border-b border-[var(--line)]">
                  <th scope="row" className="py-2 font-semibold">{labelDate(day.date)}</th>
                  <td className="py-2 text-right tabular-nums">{number.format(day.pageviews)}</td>
                  <td className="py-2 text-right tabular-nums">{number.format(day.visitors)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </>
  );
}

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>;
}) {
  const { range: requestedRange } = await searchParams;
  const range: 7 | 30 = requestedRange === "30" ? 30 : 7;
  const result = await getTrafficReport(range);

  return (
    <>
      <Header back />
      <main
        className="page-shell sub-page page-enter"
        style={{ fontFamily: "var(--font-geist-mono)" }}
      >
        <section className="page-heading">
          <h1 className="pixel-heading">
            <BarChart3 className="pixel-heading-icon" size={68} strokeWidth={2.5} aria-hidden="true" />
            <span className="pixel-heading-my">SITE</span>
            <span
              className="pixel-heading-box"
              style={{ fontSize: "clamp(1.4rem, 4.6vw, 3.6rem)" }}
            >
              ANALYTICS
            </span>
          </h1>
          <p>Real visitors, real page views. A small window into how this corner of the internet is doing.</p>
          <div className="status-strip">SOURCE: VERCEL WEB ANALYTICS / REFRESHES ABOUT EVERY 5 MINUTES</div>
        </section>

        {result.status !== "ready" ? (
          <section className={`${panel} p-7 sm:p-10`} aria-live="polite">
            <div className="mb-6 inline-grid size-14 place-items-center border-[3px] border-[#111] bg-[var(--yellow)] text-[#111] shadow-[4px_4px_0_#111]">
              <Activity size={28} aria-hidden="true" />
            </div>
            <h2 className="m-0 text-2xl font-black tracking-tight uppercase">
              {result.status === "setup" ? "Waiting for the signal" : "Signal temporarily unavailable"}
            </h2>
            <p className="mt-3 mb-0 max-w-[55ch] text-sm leading-relaxed text-[var(--muted)]">
              {result.status === "setup"
                ? "Traffic numbers will appear here once analytics is connected and the site receives visits."
                : "The traffic feed could not be loaded right now. Please check back soon."}
            </p>
          </section>
        ) : (
          <>
            <section className="grid grid-cols-1 gap-5 md:grid-cols-3" aria-label="Traffic summary">
              <StatCard
                label="Total page views"
                value={result.report.totalPageviews}
                note="Since tracking began"
                accent="var(--blue)"
                icon={Eye}
              />
              <StatCard
                label="Total visitors"
                value={result.report.totalVisitors}
                note="Since tracking began"
                accent="var(--green)"
                icon={Users}
              />
              <StatCard
                label={`${range}-day page views`}
                value={result.report.periodPageviews}
                note="Production traffic in the selected period"
                accent="var(--yellow)"
                icon={BarChart3}
              />
            </section>

            <div className="mt-8 grid grid-cols-1 items-start gap-7 lg:grid-cols-[minmax(0,1.6fr)_minmax(300px,1fr)]">
              <section className={`${panel} min-w-0 p-5 sm:p-7`} aria-labelledby="traffic-heading">
                <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="m-0 text-[11px] font-black tracking-[0.1em] text-[var(--muted)] uppercase">Traffic timeline</p>
                    <h2 id="traffic-heading" className="mt-1 mb-0 text-xl font-black uppercase">Daily page views</h2>
                  </div>
                  <nav className="flex gap-2" aria-label="Traffic date range">
                    {([7, 30] as const).map((days) => (
                      <Link
                        key={days}
                        href={days === 7 ? "/analytics" : "/analytics?range=30"}
                        aria-current={range === days ? "page" : undefined}
                        className={`grid min-h-11 min-w-11 place-items-center border-2 border-[var(--line)] px-3 py-2 text-xs font-black shadow-[3px_3px_0_var(--line)] transition-transform hover:translate-x-[2px] hover:translate-y-[2px] focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[var(--blue)] ${range === days ? "bg-[var(--yellow)] text-[#111]" : "bg-[var(--paper)] text-[var(--ink)]"}`}
                      >
                        {days}D
                      </Link>
                    ))}
                  </nav>
                </div>
                <TrafficChart days={result.report.days} range={range} />
              </section>

              <section className={`${panel} min-w-0 p-5 sm:p-7`} aria-labelledby="pages-heading">
                <p className="m-0 text-[11px] font-black tracking-[0.1em] text-[var(--muted)] uppercase">Most visited</p>
                <h2 id="pages-heading" className="mt-1 mb-5 text-xl font-black uppercase">Top pages</h2>
                {result.report.topPages.length === 0 ? (
                  <p className="m-0 text-sm text-[var(--muted)]">No page views in this period yet.</p>
                ) : (
                  <ol className="m-0 list-none space-y-4 p-0">
                    {result.report.topPages.map((page, index) => (
                      <li key={`${page.path}-${index}`} className="border-t-2 border-[var(--line)] pt-3">
                        <div className="flex items-start justify-between gap-3">
                          <span className="min-w-0 text-sm font-black" style={{ overflowWrap: "anywhere" }}>
                            <span className="mr-2 text-[var(--muted)]">{String(index + 1).padStart(2, "0")}</span>
                            {page.path}
                          </span>
                          <strong className="shrink-0 text-sm tabular-nums">{number.format(page.pageviews)}</strong>
                        </div>
                        <p className="mt-1 mb-0 text-xs text-[var(--muted)]">{number.format(page.visitors)} visitors</p>
                      </li>
                    ))}
                  </ol>
                )}
              </section>
            </div>
          </>
        )}
      </main>
    </>
  );
}
