import {
  afterGraduation,
  discountCategories,
  noStudentDeal,
  studentDiscounts,
  studentDiscountsMeta,
  topPicks,
} from "@/data/student-discounts";
import type { StudentDiscount } from "@/data/types";
import { NextResponse } from "next/server";

export const dynamic = "force-static";

function terms(d: StudentDiscount) {
  const price = d.studentPrice && d.regularPrice ? `${d.studentPrice} (normally ${d.regularPrice})` : d.studentPrice;
  return [
    price && `  - Price: ${price}`,
    `  - How long: ${d.duration}`,
    `  - Where: ${d.regions}`,
    `  - Who: ${d.eligibility}`,
    `  - Verify with: ${d.verification}`,
    d.notes && `  - Watch out: ${d.notes}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export async function GET() {
  const bySlug = new Map(studentDiscounts.map((d) => [d.slug, d]));
  const lines = [
    `# ${studentDiscountsMeta.title}`,
    "",
    ...studentDiscountsMeta.intro.flatMap((p) => [p, ""]),
    `Last checked ${studentDiscountsMeta.lastVerified}.`,
    "",
    "## My top 10",
    "",
    studentDiscountsMeta.rankingNote,
    "",
  ];

  topPicks.forEach((pick, i) => {
    const d = bySlug.get(pick.slug);
    if (!d) return;
    lines.push(`${i + 1}. **[${d.name}](${d.url})**: ${d.offer}. ${pick.why}`, terms(d), "");
  });

  lines.push("## Just graduated? These still work", "");
  for (const pick of afterGraduation) {
    const d = bySlug.get(pick.slug);
    if (d) lines.push(`- **[${d.name}](${d.url})**: ${pick.why}`);
  }
  lines.push("");

  lines.push("## The full directory", "");
  for (const category of discountCategories) {
    const items = studentDiscounts.filter((d) => d.category === category);
    if (!items.length) continue;
    lines.push(`### ${category}`, "");
    for (const d of items) {
      lines.push(`- **[${d.name}](${d.url})**${d.inMyStack ? " (I use this)" : ""}: ${d.offer}`, terms(d));
    }
    lines.push("");
  }

  lines.push("## Tools I use with no student deal (yet)", "");
  for (const n of noStudentDeal) lines.push(`- **${n.brand}**: ${n.note}`);

  return new NextResponse(lines.join("\n"), {
    headers: { "Content-Type": "text/markdown; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
