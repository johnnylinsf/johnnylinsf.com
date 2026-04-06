"use client";

import { useState } from "react";
import { articles } from "@/data/articles";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Search, X } from "lucide-react";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const tags = [
  { id: "mine", label: "My writing" },
  { id: "featured", label: "Featured in" },
  { id: "recommended", label: "Recommended" },
] as const;

type TagId = (typeof tags)[number]["id"];

export default function WritingList() {
  const [search, setSearch] = useState("");
  const [activeTags, setActiveTags] = useState<Set<TagId>>(new Set());

  function toggleTag(id: TagId) {
    setActiveTags((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const filtered = articles.filter((a) => {
    if (activeTags.size > 0) {
      const matchesMine = activeTags.has("mine") && !!a.slug;
      const matchesFeatured = activeTags.has("featured") && !a.slug && !!a.externalUrl;
      const matchesRecommended = activeTags.has("recommended") && !!a.recommended;
      if (!matchesMine && !matchesFeatured && !matchesRecommended) return false;
    }
    if (search) {
      const q = search.toLowerCase();
      return (
        a.name.toLowerCase().includes(q) ||
        a.description?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border bg-card pl-9 pr-3 py-1.5 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:border-muted transition-colors"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-6">
        {tags.map((t) => {
          const active = activeTags.has(t.id);
          return (
            <button
              key={t.id}
              onClick={() => toggleTag(t.id)}
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs transition-colors ${
                active
                  ? "bg-foreground text-background"
                  : "bg-card text-muted border border-border hover:text-foreground"
              }`}
            >
              {t.label}
              {active && <X size={10} />}
            </button>
          );
        })}
        {activeTags.size > 0 && (
          <button
            onClick={() => setActiveTags(new Set())}
            className="text-xs text-muted hover:text-foreground transition-colors px-1"
          >
            Clear
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted py-8 text-center">No results found.</p>
      ) : (
        <div className="space-y-1">
          {filtered.map((a, i) => {
            const href = a.slug
              ? `/writing/${a.slug}`
              : a.externalUrl ?? "#";
            const isExternal = !a.slug && !!a.externalUrl;

            const inner = (
              <div className="group -mx-2 px-2 py-3 rounded-lg hover:bg-accent-light transition-colors">
                <div className="flex items-start justify-between gap-3 mb-0.5">
                  <h3 className="text-sm font-medium text-foreground group-hover:underline transition-colors min-w-0">
                    {a.name}
                    {isExternal && (
                      <ArrowUpRight
                        size={12}
                        className="inline ml-1 text-muted opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    )}
                    {!isExternal && a.slug && (
                      <ArrowRight
                        size={12}
                        className="inline ml-1 text-muted opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    )}
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted/60">
                  {a.date && <span>{formatDate(a.date)}</span>}
                  {a.slug && a.wordCount && (
                    <>
                      <span>&middot;</span>
                      <span>{Math.ceil(a.wordCount / 250)} min read</span>
                    </>
                  )}
                  {a.recommended && (
                    <>
                      <span>&middot;</span>
                      <span className="text-link font-medium">Recommended</span>
                    </>
                  )}
                </div>
                {a.description && (
                  <p className="text-xs text-muted line-clamp-1 mt-1">
                    {a.description}
                  </p>
                )}
              </div>
            );

            if (isExternal) {
              return (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer">
                  {inner}
                </a>
              );
            }

            return (
              <Link key={i} href={href}>
                {inner}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
