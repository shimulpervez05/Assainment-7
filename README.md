# Bazar Dor — বাজারদর

A responsive Bengali market-price dashboard built with Next.js App Router, React, Tailwind CSS, Prisma, and Better Auth. The app includes category browsing, price movement sections, product search/sorting, product details, sign in/up, profile editing, loading skeletons, and a custom 404 page.

## Requirements

- Node.js 20 or newer
- npm

## Run locally (no external database setup required)

The project ZIP includes a local `.env` file with SQLite configured, so Prisma will not fail with `Environment variable not found: DATABASE_URL`. SQLite's database file is created at `prisma/dev.db` when you push the schema.

```bash
npm install
npx prisma generate
npx prisma db push
npm run dev
```

Open http://localhost:3000.

The market API base URL is configured in `.env` as `NEXT_PUBLIC_BAZARDOR_API_URL`. If the API is unavailable or returns a different shape, the interface uses demo fallback data; fallback prices are not live market prices.

## Authentication

Email/password authentication uses Better Auth and Prisma. Google and GitHub sign-in are optional; add the respective OAuth client ID and secret in `.env` to enable them. The local development secret is only for local use. Set a unique, strong `BETTER_AUTH_SECRET` in production.

## Deploying to Vercel

The included default database is SQLite for easy local setup. A local SQLite file is not persistent on Vercel, so use a hosted PostgreSQL database (for example, Neon or Supabase) for deployed authentication:

1. Create a hosted PostgreSQL database and copy its connection string.
2. Change `provider = "sqlite"` to `provider = "postgresql"` in `prisma/schema.prisma`.
3. Change `provider: 'sqlite'` to `provider: 'postgresql'` in `lib/auth.js`.
4. In Vercel Project Settings → Environment Variables, set `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` (your deployed URL), and `NEXT_PUBLIC_BAZARDOR_API_URL`.
5. Run `npx prisma generate` and `npx prisma db push` locally with the hosted PostgreSQL URL, or configure your deployment workflow to run the database migration safely.
6. Redeploy.

Do not commit real production secrets to GitHub.

## Tech stack

- Next.js 15 App Router, React 19
- Tailwind CSS 4
- Better Auth + Prisma
- Lucide React, React Hot Toast

## Main features

- Responsive layout for mobile, tablet, and desktop
- Market-price ticker and hero section
- Category navigation and category-specific product pages
- Rising/falling price sections and product grid
- Product sorting and detail view
- Authentication pages and protected product details
- Profile editing, loading skeletons, and not-found page
- README and environment examples
