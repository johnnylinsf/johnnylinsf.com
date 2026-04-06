import { readFile } from "fs/promises";
import { join } from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const content = await readFile(join(process.cwd(), "src/content/charities.mdx"), "utf-8");
  const markdown = `# Charities I've supported and care about\n\n${content}`;
  return new NextResponse(markdown, {
    headers: { "Content-Type": "text/markdown; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
