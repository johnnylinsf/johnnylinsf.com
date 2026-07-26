# johnnylinsf.com

Personal website for Johnny Lin. Built with Next.js 16, Tailwind CSS v4, and MDX.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## How to edit content

All content lives in `src/data/` (structured data) and `src/content/` (prose pages). You don't need to touch React components to update content.

### Data files (`src/data/`)

| File | What it controls |
|------|-----------------|
| `profile.ts` | Name, headline, bio, location, contact info, highlights |
| `experience.ts` | Work experience (grouped by company, sorted by recency) |
| `projects.ts` | Projects with descriptions, tech stacks, links |
| `writing.ts` | Writing — `slug` for hosted, `externalUrl` for external |
| `awards.ts` | Accomplishments with descriptions and links |
| `skills.ts` | Skill categories and items |
| `education.ts` | Education entries |
| `freelancing.ts` | LLC info, availability, CTA |
| `types.ts` | TypeScript interfaces for all data |

### Prose pages (`src/content/`)

| File | Route |
|------|-------|
| `stack.mdx` | `/stack` |
| `charities.mdx` | `/charities` |
| `work-with-me.mdx` | `/work-with-me` |
| `bubble.mdx` | `/bubble` |
| `privacy-policy.mdx` | `/privacy-policy` |
| `articles/*.mdx` | `/writing/[slug]` |

Prose pages render through `src/components/ProseLayout.tsx`. Markdown element styling (headings, links, lists) is set once in root-level `mdx-components.tsx`, so `.mdx` files stay plain.

### Common tasks

**Add new writing:** Add an entry to `writing.ts` with a `slug`, `description`, `date`, and `wordCount`, then create `src/content/articles/[slug].mdx`. The sitemap, `llms.txt`, and the `.md` endpoint pick it up automatically.

**Add a new project:** Add an entry to `projects.ts` with a `slug`. It automatically gets a page at `/projects/[slug]`.

**Add work experience:** Add an entry to `experience.ts`. Roles at the same company are auto-grouped. Roles with `"Present"` in the `duration` float to the top and count as current.

**Add a new prose sub-page:** Five steps — the MDX file, `src/app/<slug>/page.tsx`, `src/app/<slug>/md/route.ts`, a `.md` rewrite in `next.config.ts`, and registration in `src/app/sitemap.ts` + `src/app/llms.txt/route.ts`. Skipping the rewrite makes the advertised `/<slug>.md` URL 404. Full checklist in [AGENTS.md](AGENTS.md).

**Change section order on homepage:** Reorder the `<SectionShell>` blocks in `src/app/page.tsx`.

**Change colors or dark mode:** Edit the CSS variables at the top of `src/app/globals.css`. Light values live in `:root`; dark values appear in both `.dark` and the `prefers-color-scheme` block — update both.

## Agent-friendly

Every page has a `.md` twin, served by a `md/route.ts` handler and mapped to the clean URL by a rewrite in `next.config.ts`:

- `/writing.md`, `/experience.md`, `/stack.md`, `/charities.md`, `/work-with-me.md`, `/bubble.md`, `/privacy-policy.md`
- `/writing/[slug].md` and `/projects/[slug].md` for individual posts and projects

Plus:

- `/llms.txt` — structured overview, generated from the data files
- `/llms-full.md` — complete site content as markdown
- `/sitemap.xml` — auto-generated from `writing.ts` and `projects.ts`
- `/robots.txt` — allows all crawlers

## Claude skills

Run these in Claude Code with `/`:

- `/add-writing` — add a new blog post
- `/add-project` — add a new project
- `/add-experience` — add work experience
- `/update-profile` — update bio, highlights, contact
- `/deploy` — build, commit, push

Repo conventions for agents (and humans) live in [AGENTS.md](AGENTS.md).

## Tech stack

- **Next.js 16.2** (App Router) + **React 19.2**
- **Tailwind CSS v4** (CSS-first `@theme inline`, no config file)
- **MDX** via `@next/mdx`
- **Framer Motion** (animations)
- **Lucide React** (icons)
- **Inter** + **Plus Jakarta Sans** via `next/font/google`
- **Vercel Analytics**
- **TypeScript**, ESLint flat config

Security headers and a Content-Security-Policy are set in `next.config.ts`. New third-party scripts or embeds require widening the CSP there.

## Deployment

Deployed on Vercel. Fully static — every route prerenders at build time. Push to `main` to trigger a deploy.

```bash
npm run lint   # eslint
npm run build  # verify locally before pushing
```

## License

Two different things live in this repo, licensed differently — see [LICENSE](LICENSE).

- **Site code** (`src/app/`, `src/components/`, config) — MIT. Fork it and build your own site.
- **Content** (`src/content/`, `src/data/`, `public/`) — © 2026 Johnny Lin, all rights reserved. The writing, bio, and headshot aren't up for reuse.
