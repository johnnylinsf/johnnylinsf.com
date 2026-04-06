import { projects } from "@/data/projects";
import Badge from "./ui/Badge";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

export default function ProjectsSection({ limit }: { limit?: number }) {
  const items = limit ? projects.slice(0, limit) : projects;

  return (
    <div className="space-y-1">
      {items.map((p) => (
        <Link
          key={p.slug}
          href={`/projects/${p.slug}`}
          className="group flex items-center justify-between gap-4 py-2.5 -mx-2 px-2 rounded-lg hover:bg-accent-light transition-colors"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <Badge variant={p.status}>
              {p.status === "current" ? "Active" : "Past"}
            </Badge>
            <span className="text-sm text-foreground group-hover:underline truncate">
              {p.name}
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-muted">
              {formatDate(p.startDate)}
            </span>
            <ArrowRight
              size={14}
              className="text-muted opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
