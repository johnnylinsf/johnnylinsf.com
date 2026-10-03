import { articles } from "@/data/writing";
import { NextResponse } from "next/server";

export const dynamic = "force-static";

function escapeXml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const base = "https://johnnylinsf.com";

  const items = articles
    .filter((a) => a.date && (a.slug || a.externalUrl))
    .sort((a, b) => b.date!.localeCompare(a.date!))
    .map((a) => {
      const url = a.slug ? `${base}/writing/${a.slug}` : a.externalUrl!;
      const pubDate = new Date(`${a.date}T00:00:00Z`).toUTCString();
      const desc = a.description
        ? `\n      <description>${escapeXml(a.description)}</description>`
        : "";
      return `    <item>
      <title>${escapeXml(a.name)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${pubDate}</pubDate>${desc}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Johnny Lin — Writing</title>
    <link>${base}/writing</link>
    <description>Writing by Johnny Lin.</description>
    <language>en-us</language>
    <atom:link href="${base}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
