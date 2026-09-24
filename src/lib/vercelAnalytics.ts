export type TrafficDay = {
  date: string;
  pageviews: number;
  visitors: number;
};

export type TopPage = {
  path: string;
  pageviews: number;
  visitors: number;
};

export type TrafficReport = {
  totalPageviews: number;
  totalVisitors: number;
  periodPageviews: number;
  days: TrafficDay[];
  topPages: TopPage[];
};

export type TrafficResult =
  | { status: "ready"; report: TrafficReport }
  | { status: "setup" }
  | { status: "unavailable" };

const API_BASE = "https://api.vercel.com/v1/query/web-analytics/visits";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function metric(value: unknown): number {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
    throw new Error("Invalid Web Analytics response");
  }
  return value;
}

async function query(
  endpoint: "count" | "aggregate",
  params: URLSearchParams,
  token: string,
): Promise<unknown> {
  const response = await fetch(`${API_BASE}/${endpoint}?${params}`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`Web Analytics returned ${response.status}`);
  }

  return response.json();
}

export async function getTrafficReport(range: 7 | 30): Promise<TrafficResult> {
  const token = process.env.VERCEL_ANALYTICS_TOKEN;
  const projectId =
    process.env.VERCEL_ANALYTICS_PROJECT_ID ?? process.env.VERCEL_PROJECT_ID;

  if (!token || !projectId) return { status: "setup" };

  const base = new URLSearchParams({ projectId });
  if (process.env.VERCEL_ANALYTICS_TEAM_ID) {
    base.set("teamId", process.env.VERCEL_ANALYTICS_TEAM_ID);
  }

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const start = new Date(today);
  start.setUTCDate(start.getUTCDate() - range + 1);

  const period = new URLSearchParams(base);
  period.set("since", start.toISOString().slice(0, 10));
  period.set("until", today.toISOString().slice(0, 10));

  const dailyParams = new URLSearchParams(period);
  dailyParams.set("by", "day");

  const pagesParams = new URLSearchParams(period);
  pagesParams.set("by", "requestPath");
  pagesParams.set("limit", "6");

  try {
    const [totalsResponse, dailyResponse, pagesResponse] = await Promise.all([
      query("count", base, token),
      query("aggregate", dailyParams, token),
      query("aggregate", pagesParams, token),
    ]);

    if (
      !isRecord(totalsResponse) ||
      !isRecord(totalsResponse.data) ||
      !isRecord(dailyResponse) ||
      !Array.isArray(dailyResponse.data) ||
      !isRecord(pagesResponse) ||
      !Array.isArray(pagesResponse.data)
    ) {
      throw new Error("Invalid Web Analytics response");
    }

    const dailyMap = new Map<string, TrafficDay>();
    for (const row of dailyResponse.data) {
      if (!isRecord(row) || typeof row.timestamp !== "string") {
        throw new Error("Invalid daily analytics row");
      }
      const date = row.timestamp.slice(0, 10);
      dailyMap.set(date, {
        date,
        pageviews: metric(row.pageviews),
        visitors: metric(row.visitors),
      });
    }

    const days = Array.from({ length: range }, (_, index) => {
      const date = new Date(start);
      date.setUTCDate(start.getUTCDate() + index);
      const key = date.toISOString().slice(0, 10);
      return dailyMap.get(key) ?? { date: key, pageviews: 0, visitors: 0 };
    });

    const topPages = pagesResponse.data
      .map((row): TopPage => {
        if (!isRecord(row) || typeof row.requestPath !== "string") {
          throw new Error("Invalid page analytics row");
        }
        return {
          path: row.requestPath,
          pageviews: metric(row.pageviews),
          visitors: metric(row.visitors),
        };
      })
      .filter((page) => page.path !== "Others")
      .sort((a, b) => b.pageviews - a.pageviews)
      .slice(0, 5);

    return {
      status: "ready",
      report: {
        totalPageviews: metric(totalsResponse.data.pageviews),
        totalVisitors: metric(totalsResponse.data.visitors),
        periodPageviews: days.reduce((sum, day) => sum + day.pageviews, 0),
        days,
        topPages,
      },
    };
  } catch (error) {
    console.error("Unable to load Vercel Web Analytics:", error);
    return { status: "unavailable" };
  }
}
