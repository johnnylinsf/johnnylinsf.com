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
- **Dynamic routes** use `generateStaticParams`. Writing at `/articles/[slug]`, projects at `/projects/[slug]`.
- **Experience grouped by company** automatically. Just add entries to `experience.ts`.
- **Writing with a `slug`** = hosted internally (needs matching MDX file). Writing with `externalUrl` = links out.
- **Dark mode** via `.dark` class + CSS variable swaps. Flash prevention inline script in `layout.tsx`.
- **Brand icons** (X, LinkedIn) are custom SVGs in `src/components/ui/SocialIcons.tsx`.

## File structure

```
src/
├── app/           # Routes (App Router)
├── components/    # React components
│   └── ui/        # Primitives (Badge, Collapsible, SocialIcons)
├── content/       # MDX prose pages
│   └── articles/  # Blog post MDX files
└── data/          # TypeScript content files
```

## Content editing

### Add writing
1. Add entry to `src/data/articles.ts` with `slug`, `description`, `date`, `wordCount`
2. Create `src/content/articles/[slug].mdx`

### Add project
1. Add entry to `src/data/projects.ts` with `slug`, optional `relatedArticles`

### Add experience
1. Add entry to `src/data/experience.ts` — same-company roles auto-group, active roles float to top

## Build & deploy

```bash
npm run build   # always verify before pushing
git push        # triggers Vercel deploy
```
