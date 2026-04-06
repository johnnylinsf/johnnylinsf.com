import { articles } from "@/data/articles";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function ArticlesSection({ limit }: { limit?: number }) {
  const items = limit ? articles.slice(0, limit) : articles;

  return (
    <div className="space-y-1">
      {items.map((a, i) => {
        const href = a.slug
          ? `/articles/${a.slug}`
          : a.externalUrl ?? "#";
        const isExternal = !a.slug && !!a.externalUrl;

        const inner = (
          <div className="group -mx-2 px-2 py-3 rounded-lg hover:bg-accent-light transition-colors">
            <div className="flex items-baseline justify-between gap-3 mb-0.5">
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
  );
}
