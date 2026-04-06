import { readFile } from "fs/promises";
import { join } from "path";
import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  const content = await readFile(join(process.cwd(), "src/content/work-with-me.mdx"), "utf-8");
  const markdown = `# Work with me\n\n${content}`;
  return new NextResponse(markdown, {
    headers: { "Content-Type": "text/markdown; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
