import { readFile } from "fs/promises";
import { join } from "path";
import {
  afterGraduation,
  discountCategories,
  lastUpdated,
  noStudentDeal,
  studentDiscounts,
  topPicks,
} from "@/data/student-discounts";
import type { DiscountPick, StudentDiscount } from "@/data/types";
import { NextResponse } from "next/server";

export const dynamic = "force-static";

function terms(d: StudentDiscount) {
  return [`  ${d.length} · ${d.where} · ${d.verify}`, d.note && `  ${d.note}`].filter(Boolean).join("\n");
}

function picks(list: DiscountPick[], ordered: boolean, showDeal: boolean) {
  const byName = new Map(studentDiscounts.map((d) => [d.name, d]));
  return list
    .map((p, i) => {
      const d = byName.get(p.name);
      if (!d) return "";
      return `${ordered ? `${i + 1}.` : "-"} **[${d.name}](${d.url})** — ${showDeal ? `${d.deal}. ` : ""}${p.why}\n${terms(d)}`;
    })
    .filter(Boolean)
    .join("\n");
}

export async function GET() {
  const intro = await readFile(join(process.cwd(), "src/content/student-discounts.mdx"), "utf-8");

  const lines = [
    "# Student discounts",
    "",
    intro.trim(),
    "",
    "## My top 10",
    "",
    picks(topPicks, true, false),
    "",
    "## If you just graduated",
    "",
    picks(afterGraduation, false, true),
    "",
    `## All ${studentDiscounts.length} discounts`,
    "",
  ];

  for (const category of discountCategories) {
    lines.push(`### ${category}`, "");
    for (const d of studentDiscounts.filter((d) => d.category === category)) {
      lines.push(`- **[${d.name}](${d.url})** — ${d.deal}${d.iUseIt ? " (I use this)" : ""}`, terms(d));
    }
    lines.push("");
  }

  lines.push("## Tools I use that don't have a student deal (yet)", "");
  for (const n of noStudentDeal) lines.push(`- **${n.brand}** — ${n.note}`);
  lines.push("", "---", "", `*Last updated: ${lastUpdated}*`);

  return new NextResponse(lines.join("\n"), {
    headers: { "Content-Type": "text/markdown; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
