import { articles } from "@/data/articles";
import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  const lines = ["# Writing", ""];

  for (const a of articles) {
    const url = a.slug
      ? `https://johnnylinsf.com/writing/${a.slug}`
      : a.externalUrl ?? "";
    lines.push(`## [${a.name}](${url})`);
    if (a.date) lines.push(`Date: ${a.date}`);
    if (a.wordCount) lines.push(`Read time: ${Math.ceil(a.wordCount / 250)} min`);
    if (a.description) lines.push(`\n${a.description}`);
    lines.push("");
  }

  return new NextResponse(lines.join("\n"), {
    headers: { "Content-Type": "text/markdown; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
