# johnnylinsf.com

Personal website for Johnny Lin. Built with Next.js, Tailwind CSS, and MDX.

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
| `profile.ts` | Name, bio, location, contact info, highlights |
| `experience.ts` | Work experience (grouped by company) |
| `projects.ts` | Projects with descriptions, tech stacks, links |
| `articles.ts` | Articles — `slug` for hosted, `externalUrl` for external |
| `awards.ts` | Accomplishments with descriptions and links |
| `skills.ts` | Skill categories and items |
| `education.ts` | Education entries |
| `freelancing.ts` | LLC info, availability, CTA |
| `types.ts` | TypeScript interfaces for all data |

### Prose pages (`src/content/`)

| File | Route |
|------|-------|
| `charities.mdx` | `/charities` |
| `work-with-me.mdx` | `/work-with-me` |
| `privacy-policy.mdx` | `/privacy-policy` |
| `bubble.mdx` | `/bubble` |
| `articles/*.mdx` | `/articles/[slug]` |

### Common tasks

**Add a new article:** Add an entry to `articles.ts` with a `slug` and `wordCount`, then create `src/content/articles/[slug].mdx` with the content.

**Add a new project:** Add an entry to `projects.ts` with a `slug`. It automatically gets a page at `/projects/[slug]`.

**Add work experience:** Add an entry to `experience.ts`. Roles at the same company are auto-grouped.

**Change section order on homepage:** Reorder the `<SectionShell>` blocks in `src/app/page.tsx`.

## Tech stack

- **Next.js 16** (App Router)
- **Tailwind CSS** (CSS-first `@theme`)
- **MDX** via `@next/mdx`
- **Framer Motion** (animations)
- **Lucide React** (icons)
- **Vercel Analytics**

## Deployment

Deployed on Vercel. Push to `main` to trigger a deploy.

```bash
npm run build  # verify locally before pushing
```
