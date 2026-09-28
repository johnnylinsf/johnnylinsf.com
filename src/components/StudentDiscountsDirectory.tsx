"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import type { DiscountCategory, StudentDiscount } from "@/data/types";

function DiscountTerms({ d }: { d: StudentDiscount }) {
  const rows: [string, string | undefined][] = [
    ["Price", d.studentPrice && d.regularPrice ? `${d.studentPrice} (normally ${d.regularPrice})` : d.studentPrice],
    ["How long", d.duration],
    ["Where", d.regions],
    ["Who", d.eligibility],
    ["Verify with", d.verification],
    ["Watch out", d.notes],
  ];

  return (
    <dl className="grid grid-cols-[5.5rem_1fr] gap-x-3 gap-y-1.5 text-xs">
      {rows
        .filter(([, v]) => v)
        .map(([label, value]) => (
          <div key={label} className="contents">
            <dt className="text-muted">{label}</dt>
            <dd className="text-foreground">{value}</dd>
          </div>
        ))}
    </dl>
  );
}

export function DiscountRow({
  d,
  rank,
  why,
}: {
  d: StudentDiscount;
  rank?: number;
  why?: string;
}) {
  return (
    <details className="group border-b border-border last:border-b-0">
      <summary className="cursor-pointer flex items-start justify-between gap-4 py-3 list-none [&::-webkit-details-marker]:hidden">
        <div className="flex items-start gap-3 min-w-0">
          {rank !== undefined && (
            <span className="w-5 shrink-0 text-sm font-semibold tabular-nums text-muted">
              {rank}
            </span>
          )}
          <div className="min-w-0">
            <p className="text-sm text-foreground group-hover:underline">
              {d.name}
              {d.inMyStack && (
                <span className="ml-2 inline-flex items-center rounded-md bg-green-light px-1.5 py-0.5 align-middle text-[10px] font-medium uppercase tracking-wide text-green">
                  I use this
                </span>
              )}
            </p>
            <p className="text-xs text-muted mt-0.5">{d.offer}</p>
          </div>
        </div>
        <span className="shrink-0 text-xs text-muted pt-0.5">{d.category}</span>
      </summary>
      <div className={`pb-4 ${rank !== undefined ? "pl-8" : ""}`}>
        {why && <p className="text-sm text-foreground mb-3">{why}</p>}
        <DiscountTerms d={d} />
        <a
          href={d.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-link hover:underline"
        >
          Get the deal <ArrowUpRight size={12} />
        </a>
      </div>
    </details>
  );
}

export default function StudentDiscountsDirectory({
  discounts,
  categories,
}: {
  discounts: StudentDiscount[];
  categories: DiscountCategory[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<DiscountCategory | "All">("All");
  const [stackOnly, setStackOnly] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return discounts.filter((d) => {
      if (category !== "All" && d.category !== category) return false;
      if (stackOnly && !d.inMyStack) return false;
      if (!q) return true;
      return [d.name, d.brand, d.offer, d.regions, d.verification]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [discounts, query, category, stackOnly]);

  const chip = (active: boolean) =>
    `rounded-md px-2.5 py-1 text-xs transition-colors ${
      active
        ? "bg-foreground text-background"
        : "bg-accent-light text-muted hover:text-foreground"
    }`;

  return (
    <div>
      <label className="relative block mb-3">
        <span className="sr-only">Search discounts</span>
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Notion, SheerID, Canada…"
          className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-foreground/20"
        />
      </label>

      <div className="flex flex-wrap gap-1.5 mb-6">
        <button
          type="button"
          onClick={() => setStackOnly(!stackOnly)}
          aria-pressed={stackOnly}
          className={chip(stackOnly)}
        >
          Only tools I use
        </button>
        {(["All", ...categories] as const).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            aria-pressed={category === c}
            className={chip(category === c)}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="text-xs text-muted mb-2">
        {filtered.length} of {discounts.length} discounts
      </p>

      {filtered.length > 0 ? (
        <div>
          {filtered.map((d) => (
            <DiscountRow key={d.slug} d={d} />
          ))}
        </div>
      ) : (
        <p className="py-6 text-sm text-muted">
          Nothing matches that. Try a different search or category.
        </p>
      )}
    </div>
  );
}
