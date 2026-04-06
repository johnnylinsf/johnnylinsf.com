import { articles } from "@/data/articles";
import { readFile } from "fs/promises";
import { join } from "path";
import { NextResponse } from "next/server";

export async function generateStaticParams() {
  return articles.filter((a) => a.slug).map((a) => ({ slug: a.slug! }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) {
    return new NextResponse("Not found", { status: 404 });
  }

  let content = "";
  try {
    const mdxPath = join(process.cwd(), "src", "content", "articles", `${slug}.mdx`);
    content = await readFile(mdxPath, "utf-8");
  } catch {
    content = article.description ?? "";
  }

  const header = [
    `# ${article.name}`,
    "",
    article.date ? `Date: ${article.date}` : "",
    article.wordCount ? `Word count: ${article.wordCount}` : "",
    article.description ? `\n> ${article.description}` : "",
    "",
    "---",
    "",
  ]
    .filter(Boolean)
    .join("\n");

  const markdown = header + content;

  return new NextResponse(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
