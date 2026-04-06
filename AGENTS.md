<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AGENTS.md

## Project overview

Johnny Lin's personal website at johnnylinsf.com. Next.js 16 site with all content in TypeScript data files (`src/data/`) and MDX files (`src/content/`). Statically generated, deployed on Vercel.

## Architecture

- **Framework:** Next.js 16, App Router, `src/` directory, `@/*` path alias
- **Styling:** Tailwind CSS v4 with `@theme inline` in `src/app/globals.css`
- **Content:** TypeScript data files for structured data, MDX for prose pages
- **Components:** `src/components/` with UI primitives in `src/components/ui/`

## Key conventions

- **Content in data files, not components.** Section components import from `src/data/` and render. No content strings hardcoded in components.
- **MDX for prose pages.** Sub-pages like `/charities`, `/bubble`, and writing use MDX in `src/content/`.
- **Dynamic routes** use `generateStaticParams`. Writing at `/writing/[slug]`, projects at `/projects/[slug]`.
- **Experience grouped by company** automatically, sorted by recency, active roles first. Just add entries to `experience.ts`.
- **Writing with a `slug`** = hosted internally (needs matching MDX file in `src/content/articles/`). Writing with `externalUrl` = links out.
- **Dark mode** via `.dark` class + CSS variable swaps + `prefers-color-scheme` media query fallback. Flash prevention inline script in `layout.tsx`.
- **Brand icons** (X, LinkedIn) are custom SVGs in `src/components/ui/SocialIcons.tsx`.
- **Agent-friendly:** Every page has a `/md` route handler serving markdown. `llms.txt` and `llms-full.md` are dynamically generated from data files.
- **All routes are static.** Use `export const dynamic = "force-static"` on route handlers. No edge/server rendering.

## File structure

```
src/
├── app/               # Routes (App Router)
│   ├── writing/       # /writing and /writing/[slug]
│   ├── projects/      # /projects and /projects/[slug]
│   ├── experience/    # /experience
│   ├── llms.txt/      # Dynamic llms.txt route handler
│   └── llms-full.md/  # Dynamic llms-full.md route handler
├── components/        # React components
│   └── ui/            # Primitives (Badge, Collapsible, SocialIcons)
├── content/           # MDX prose pages
│   └── articles/      # Blog post MDX files
└── data/              # TypeScript content files
    ├── writing.ts     # Writing entries (WritingEntry type)
    ├── projects.ts    # Projects
    ├── experience.ts  # Work experience
    ├── profile.ts     # Bio, contact, highlights
    ├── awards.ts      # Accomplishments
    ├── skills.ts      # Skills by category
    ├── education.ts   # Education
    ├── freelancing.ts # Freelancing info
    └── types.ts       # All TypeScript interfaces
```

## Content editing

### Add writing
1. Add entry to `src/data/writing.ts` with `slug`, `description`, `date`, `wordCount`
2. Create `src/content/articles/[slug].mdx`

### Add project
1. Add entry to `src/data/projects.ts` with `slug`, optional `relatedArticles` (uses writing slugs)

### Add experience
1. Add entry to `src/data/experience.ts` — same-company roles auto-group, active roles float to top

## Build & deploy

```bash
npm run build   # always verify before pushing
git push        # triggers Vercel deploy
```
