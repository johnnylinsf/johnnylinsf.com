import { experience } from "@/data/experience";
import { NextResponse } from "next/server";

export async function GET() {
  const grouped = new Map<string, typeof experience>();
  for (const e of experience) {
    const existing = grouped.get(e.company) ?? [];
    existing.push(e);
    grouped.set(e.company, existing);
  }

  const lines = ["# Work Experience", ""];

  for (const [company, roles] of grouped) {
    lines.push(`## ${company}`, "");
    for (const r of roles) {
      lines.push(`### ${r.title}`, `${r.duration}${r.website ? ` | ${r.website}` : ""}`, "");
      if (r.description) {
        for (const d of r.description) lines.push(`- ${d}`);
        lines.push("");
      }
    }
  }

  return new NextResponse(lines.join("\n"), {
    headers: { "Content-Type": "text/markdown; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
