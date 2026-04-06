import { articles } from "@/data/articles";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { education } from "@/data/education";
import { awards } from "@/data/awards";
import { skills } from "@/data/skills";
import { freelancing } from "@/data/freelancing";
import { NextResponse } from "next/server";

export async function GET() {
  const sections: string[] = [];

  // About
  sections.push(`# ${profile.name}\n\n${profile.bio}\n\n${profile.location}`);

  // Current roles
  const currentRoles = experience
    .filter((e) => e.duration.includes("Present"))
    .map((e) => `- ${e.title} at ${e.company}${e.website ? ` (${e.website})` : ""} — ${e.duration}`)
    .join("\n");
  sections.push(`## Current Roles\n\n${currentRoles}`);

  // Experience
  const grouped = new Map<string, typeof experience>();
  for (const e of experience) {
    const existing = grouped.get(e.company) ?? [];
    existing.push(e);
    grouped.set(e.company, existing);
  }
  const expLines: string[] = ["## Experience\n"];
  for (const [company, roles] of grouped) {
    expLines.push(`### ${company}\n`);
    for (const r of roles) {
      expLines.push(`**${r.title}** — ${r.duration}${r.website ? ` | ${r.website}` : ""}`);
      if (r.description) {
        for (const d of r.description) expLines.push(`- ${d}`);
      }
      expLines.push("");
    }
  }
  sections.push(expLines.join("\n"));

  // Education
  const eduLines = education
    .map((e) => `${e.school} — ${e.degree} (${e.duration})`)
    .join("\n");
  sections.push(`## Education\n\n${eduLines}`);

  // Projects
  const projLines = projects
    .map((p) => {
      const parts = [`### ${p.name}\n`, `Status: ${p.status === "current" ? "Active" : "Past"} | ${p.startDate}${p.endDate ? ` - ${p.endDate}` : ""}`];
      if (p.link) parts.push(`Link: ${p.link}`);
      if (p.description) parts.push(`\n${p.description}`);
      if (p.techStack?.length) parts.push(`\nTech: ${p.techStack.join(", ")}`);
      return parts.join("\n");
    })
    .join("\n\n");
  sections.push(`## Projects\n\n${projLines}`);

  // Writing
  const writingLines = articles
    .map((a) => {
      const url = a.slug ? `https://johnnylinsf.com/writing/${a.slug}` : a.externalUrl ?? "";
      const meta = [a.date, a.wordCount ? `${a.wordCount} words` : ""].filter(Boolean).join(" | ");
      return `- [${a.name}](${url})${meta ? ` — ${meta}` : ""}${a.description ? `\n  ${a.description}` : ""}`;
    })
    .join("\n");
  sections.push(`## Writing\n\n${writingLines}`);

  // Awards
  const awardLines = awards
    .map((a) => `- **${a.name}** (${a.date})${a.description ? ` — ${a.description}` : ""}`)
    .join("\n");
  sections.push(`## Accomplishments\n\n${awardLines}`);

  // Skills
  const skillLines = skills
    .map((g) => `**${g.category}:** ${g.items.join(", ")}`)
    .join("\n\n");
  sections.push(`## Skills\n\n${skillLines}`);

  // Freelancing
  sections.push(`## Freelancing\n\n${freelancing.llcName}${freelancing.available ? " — Currently accepting projects" : ""}\n\n${freelancing.description}\n\nSpecialization: ${freelancing.specialization}\nContact: ${freelancing.email}`);

  // Contact
  sections.push(`## Contact\n\n- Email: ${profile.contact.email}\n- Twitter/X: ${profile.contact.twitter}\n- LinkedIn: ${profile.contact.linkedin}`);

  return new NextResponse(sections.join("\n\n---\n\n"), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
