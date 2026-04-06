"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { articles } from "@/data/writing";
import { projects } from "@/data/projects";
import { ArrowRight } from "lucide-react";

interface Suggestion {
  label: string;
  href: string;
  detail?: string;
}

function getSuggestions(path: string): Suggestion[] {
  const segments = path.toLowerCase().split("/").filter(Boolean);
  const slug = segments[segments.length - 1] ?? "";
  const section = segments[0] ?? "";

  const suggestions: Suggestion[] = [];

  // Old /articles/ URLs → redirect to /writing/
  if (section === "articles") {
    const match = articles.find((a) => a.slug === slug);
    if (match) {
      suggestions.push({
        label: match.name,
        href: `/writing/${match.slug}`,
        detail: "This moved to /writing",
      });
    }
    suggestions.push({ label: "All writing", href: "/writing" });
    return suggestions;
  }

  // Fuzzy match slug words against articles and projects
  if (slug) {
    const words = slug.replace(/-/g, " ").split(" ");

    for (const a of articles) {
      if (!a.slug) continue;
      const name = a.name.toLowerCase();
      if (words.some((w) => w.length > 2 && name.includes(w))) {
        suggestions.push({ label: a.name, href: `/writing/${a.slug}`, detail: "Writing" });
      }
    }

    for (const p of projects) {
      const name = p.name.toLowerCase();
      if (words.some((w) => w.length > 2 && name.includes(w))) {
        suggestions.push({ label: p.name, href: `/projects/${p.slug}`, detail: "Project" });
      }
    }
  }

  // Section-level guesses
  const sectionMap: Record<string, Suggestion> = {
    writing: { label: "All writing", href: "/writing" },
    blog: { label: "All writing", href: "/writing" },
    posts: { label: "All writing", href: "/writing" },
    projects: { label: "All projects", href: "/projects" },
    work: { label: "All projects", href: "/projects" },
    portfolio: { label: "All projects", href: "/projects" },
    experience: { label: "Experience", href: "/experience" },
    resume: { label: "Experience", href: "/experience" },
    cv: { label: "Experience", href: "/experience" },
    contact: { label: "Work with me", href: "/work-with-me" },
    hire: { label: "Work with me", href: "/work-with-me" },
    about: { label: "Homepage", href: "/" },
  };

  if (sectionMap[section]) {
    suggestions.push(sectionMap[section]);
  }

  // Deduplicate
  const seen = new Set<string>();
  return suggestions.filter((s) => {
    if (seen.has(s.href)) return false;
    seen.add(s.href);
    return true;
  }).slice(0, 3);
}

export default function NotFoundSuggestions() {
  const path = usePathname();
  const suggestions = getSuggestions(path);

  if (suggestions.length === 0) return null;

  return (
    <div>
      <p className="text-xs text-muted/60 uppercase tracking-wide mb-2">
        Were you looking for?
      </p>
      {suggestions.map((s) => (
        <Link
          key={s.href}
          href={s.href}
          className="group flex items-center justify-between gap-3 -mx-2 px-2 py-2.5 rounded-lg hover:bg-accent-light transition-colors"
        >
          <div className="min-w-0">
            <span className="text-sm text-foreground group-hover:underline">
              {s.label}
            </span>
            {s.detail && (
              <span className="text-xs text-muted/60 ml-2">{s.detail}</span>
            )}
          </div>
          <ArrowRight
            size={14}
            className="text-muted opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0"
          />
        </Link>
      ))}
    </div>
  );
}
