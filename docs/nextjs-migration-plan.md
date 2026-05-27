# AIark Next.js Migration Plan

This is a roadmap for moving AIark from the current static build to a Next.js App Router application. It is intentionally separate from the current UI polish work because the production site already has crawlable static counts, generated tool pages, generated category pages, generated use-case pages, and a sitemap.

## Why Migrate

- Add database-backed tool submissions and editorial review.
- Generate tool, category, and workflow pages from a single server-side data source.
- Add task recommendations that can evolve beyond simple client filtering.
- Keep SEO strong without committing generated HTML files.

## Target Stack

- Next.js App Router
- TypeScript
- Tailwind CSS plus CSS variables from `docs/design.md`
- Radix UI primitives for accessible dialogs, drawers, popovers, and menus
- Supabase or PostgreSQL for tools, categories, workflows, submissions, and audits
- Vercel for production deployment

## URL Contract

These URLs should remain stable:

- `/`
- `/tools/[slug]`
- `/categories/[slug]`
- `/use-cases/[slug]`
- `/sitemap.xml`
- `/robots.txt`

## Data Model

- `tools`: name, slug, domain, url, category, price, region, score, description, best_for, watch_out, tags, capabilities, scenarios, status
- `categories`: name, slug, icon, description, sort_order
- `scenarios`: label, slug, value, description, sort_order
- `workflows`: title, slug, scenario, category, note, tools, steps
- `submissions`: name, url, submitter, notes, status

## Migration Phases

1. Extract current `app.js` data into `data/tools.json`, `data/categories.json`, and `data/workflows.json`.
2. Scaffold Next.js App Router with static generation for homepage, tool pages, category pages, and use-case pages.
3. Port current CSS variables and components into Tailwind-compatible tokens without changing the visual system.
4. Rebuild search, filters, favorites, compare, theme, and sidebar state as client components.
5. Add tool detail drawer with a canonical static detail route behind it.
6. Replace JSON data with Supabase only after static parity is verified.
7. Add submit-tool flow and editorial status states.
8. Validate Lighthouse, sitemap, metadata, JSON-LD, and production redirects before switching domains.

## Acceptance Criteria

- Static source never shows `0 tools` for the full directory state.
- Homepage, category pages, tool pages, and workflow pages are generated at build time.
- Existing filters, compare, favorites, theme, sidebar, and card density still work.
- Core Web Vitals do not regress from the current static build.
- Production domain keeps the same canonical URLs.
