# Ilham Sikumbang portfolio

## Visitor analytics

The public `/analytics` page shows real page views and visitors from Vercel Web Analytics. The tracking component is included in the app layout. The page displays an empty state until the Vercel project is connected; it never substitutes sample traffic numbers.

To connect it:

1. Enable **Web Analytics** for this project in the Vercel dashboard and redeploy.
2. Create a Vercel access token with access to the project.
3. Add these **server-side** environment variables to the Vercel project and redeploy:

   - `VERCEL_ANALYTICS_TOKEN`: the access token.
   - `VERCEL_ANALYTICS_PROJECT_ID`: the Vercel project ID. The app also accepts Vercel's `VERCEL_PROJECT_ID` if available.
   - `VERCEL_ANALYTICS_TEAM_ID`: the team ID, only for a team-owned project. Omit it for a personal project.

For local development, place the same values in an untracked `.env.local` file. Do not use a `NEXT_PUBLIC_` prefix for the token. The page fetches aggregate analytics on the server and caches responses for five minutes; visitors never receive the token.

The dashboard is public by design. It shows all-time production totals, a seven or thirty day page-view trend, and the most visited paths. Traffic begins accumulating after Web Analytics is enabled and the tracking code is deployed.

## Development

```bash
pnpm install
pnpm dev
```
