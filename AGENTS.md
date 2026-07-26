<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AGENTS.md

## Project overview

Johnny Lin's personal website at johnnylinsf.com. Next.js 16 site with all content in TypeScript data files (`src/data/`) and MDX files (`src/content/`). Statically generated, deployed on Vercel.

## Architecture

- **Framework:** Next.js 16.2 + React 19.2, App Router, `src/` directory, `@/*` path alias
- **Styling:** Tailwind CSS v4 with `@theme inline` in `src/app/globals.css` (no `tailwind.config`)
- **Content:** TypeScript data files for structured data, MDX (`@next/mdx`) for prose pages
- **Components:** `src/components/` with UI primitives in `src/components/ui/`
- **Fonts:** `next/font/google` — Inter (`--font-inter`) for body, Plus Jakarta Sans (`--font-heading`) for headings
- **Animation:** Framer Motion, used sparingly (`ExperienceSection`, `ui/Collapsible`)
- **Icons:** `lucide-react`, plus hand-rolled brand SVGs in `ui/SocialIcons.tsx`

## Key conventions

- **Content in data files, not components.** Section components import from `src/data/` and render. No content strings hardcoded in components.
- **MDX for prose pages.** Sub-pages (`/charities`, `/bubble`, `/stack`, `/work-with-me`, `/privacy-policy`) and articles live in `src/content/`. Prose pages render through `ProseLayout` (handles Header/Footer/Breadcrumbs/title).
- **MDX element styling** is centralized in root-level `mdx-components.tsx` via `useMDXComponents`. Don't style prose inside individual `.mdx` files.
- **Dynamic routes** use `generateStaticParams` — on both the page and its `md/route.ts`. Writing at `/writing/[slug]`, projects at `/projects/[slug]`.
- **`params` is a Promise** in Next 16 — `const { slug } = await params;`.
- **Experience grouped by company** automatically, sorted by recency, active roles first. Just add entries to `experience.ts`. "Active" = `duration` contains `"Present"` (also how `llms.txt` picks current roles).
- **Writing with a `slug`** = hosted internally (needs matching MDX file in `src/content/articles/`). Writing with `externalUrl` = links out.
- **Dark mode** via `.dark` class + CSS variable swaps + `prefers-color-scheme` media query fallback (`:root:not(.light)`). Flash prevention inline script in `layout.tsx`; toggle in `ThemeToggle.tsx`.
- **Agent-friendly:** Every page has a `md/route.ts` handler, exposed at the clean `/<path>.md` URL via a rewrite in `next.config.ts`. `llms.txt` and `llms-full.md` are generated from data files.
- **All routes are static.** Use `export const dynamic = "force-static"` on route handlers. No edge/server rendering.
- **Custom 404** at `src/app/not-found.tsx` — `NotFoundSuggestions.tsx` fuzzy-matches the bad path against writing/project slugs (e.g. legacy `/articles/*` URLs → `/writing/*`).
- **Security headers + CSP** are declared in `next.config.ts`. Adding an external embed or script means widening the CSP there (`frame-src` currently allows YouTube and Tella only).

## File structure

```
next.config.ts          # MDX setup, .md rewrites, security headers/CSP
mdx-components.tsx      # Global MDX element styling
src/
├── app/                # Routes (App Router)
│   ├── page.tsx        # Homepage (SectionShell blocks + Person JSON-LD)
│   ├── layout.tsx      # Fonts, metadata, theme-flash script, Analytics
│   ├── globals.css     # Tailwind v4 @theme inline + CSS variables
│   ├── not-found.tsx   # Custom 404
│   ├── sitemap.ts      # Generated sitemap
│   ├── writing/        # /writing, /writing/[slug], + md/ handlers
│   ├── projects/       # /projects, /projects/[slug], + md/ handler
│   ├── experience/     # /experience + md/ handler
│   ├── stack/          # Prose page + md/ handler
│   ├── charities/      #   "
│   ├── bubble/         #   "
│   ├── work-with-me/   #   "
│   ├── privacy-policy/ #   "
│   ├── llms.txt/       # Dynamic llms.txt route handler
│   └── llms-full.md/   # Dynamic llms-full.md route handler
├── components/         # React components
│   └── ui/             # Primitives (Badge, Collapsible, SocialIcons)
├── content/            # MDX prose pages
│   └── articles/       # Blog post MDX files
└── data/               # TypeScript content files
    ├── writing.ts      # Writing entries (WritingEntry type)
    ├── projects.ts     # Projects
    ├── experience.ts   # Work experience
    ├── profile.ts      # Bio, contact, highlights
    ├── awards.ts       # Accomplishments
    ├── skills.ts       # Skills by category
    ├── education.ts    # Education
    ├── freelancing.ts  # Freelancing info
    └── types.ts        # All TypeScript interfaces
public/
├── headshot.png        # Also the favicon/apple-icon
└── robots.txt          # Static, allows all crawlers
```

## Content editing

### Add writing
1. Add entry to `src/data/writing.ts` with `slug`, `description`, `date`, `wordCount`
2. Create `src/content/articles/[slug].mdx`

Sitemap, `llms.txt`, `llms-full.md`, and `/writing/[slug].md` all pick it up automatically.

### Add project
1. Add entry to `src/data/projects.ts` with `slug`, optional `relatedArticles` (uses writing slugs)

### Add experience
1. Add entry to `src/data/experience.ts` — same-company roles auto-group, active roles float to top

### Add a prose sub-page — 5 edits, and the rewrite is the one that gets missed
1. `src/content/<slug>.mdx` — the prose
2. `src/app/<slug>/page.tsx` — `ProseLayout` + `<Content />`
3. `src/app/<slug>/md/route.ts` — `force-static` handler reading the raw `.mdx`
4. `next.config.ts` — add `{ source: "/<slug>.md", destination: "/<slug>/md" }`. **Without this the `/<slug>.md` URL that `llms.txt` advertises 404s**, even though the handler exists.
5. Register the path in `src/app/sitemap.ts` **and** `src/app/llms.txt/route.ts`

### Reorder the homepage
Reorder the `<SectionShell>` blocks in `src/app/page.tsx`.

## Claude skills

Project skills in `.claude/skills/`: `add-writing`, `add-project`, `add-experience`, `update-profile`, `deploy`.

## Build & deploy

```bash
npm run dev     # local dev
npm run lint    # eslint (flat config, eslint.config.mjs)
npm run build   # always verify before pushing
git push        # triggers Vercel deploy
```
