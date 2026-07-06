import { articles } from "@/data/writing";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  const base = "https://johnnylinsf.com";

  const currentRoles = experience
    .filter((e) => e.duration.includes("Present"))
    .map((e) => `- ${e.title} at ${e.company} (${e.duration})`)
    .join("\n");

  const staticPages = [
    { path: "/writing", label: "Writing" },
    { path: "/experience", label: "Experience" },
    { path: "/projects", label: "Projects" },
    { path: "/work-with-me", label: "Work with me" },
    { path: "/bubble", label: "Bubble Experience" },
    { path: "/stack", label: "Tech Stack" },
    { path: "/charities", label: "Charities" },
    { path: "/privacy-policy", label: "Privacy Policy" },
  ];

  const pagesSection = staticPages
    .map((p) => `- [${p.label}](${base}${p.path}) | [.md](${base}${p.path}.md)`)
    .join("\n");

  const writingSection = articles
    .map((a) => {
      const url = a.slug ? `${base}/writing/${a.slug}` : a.externalUrl ?? "";
      const md = a.slug ? ` | [.md](${base}/writing/${a.slug}.md)` : "";
      const desc = a.description ? ` — ${a.description}` : "";
      return `- [${a.name}](${url})${md}${desc}`;
    })
    .join("\n");

  const projectsSection = projects
    .map((p) => {
      const desc = p.description ? ` — ${p.description}` : "";
      return `- [${p.name}](${base}/projects/${p.slug}) | [.md](${base}/projects/${p.slug}.md)${desc}`;
    })
    .join("\n");

  const content = `# ${profile.name}

> ${profile.bio}

## About

${profile.location}

## Current Roles

${currentRoles}

## Pages

All pages are available as markdown by appending .md to the URL.

- [Homepage](${base}/) | [Full content](${base}/llms-full.md)
${pagesSection}

## Writing

${writingSection}

## Projects

${projectsSection}

## Contact

- Email: ${profile.contact.email}
- Twitter/X: ${profile.contact.twitter}
- LinkedIn: ${profile.contact.linkedin}
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
