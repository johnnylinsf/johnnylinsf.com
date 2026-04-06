import { awards } from "@/data/awards";
import { ArrowUpRight } from "lucide-react";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

export default function AwardsSection() {
  return (
    <div className="space-y-1">
      {awards.map((a, i) => {
        const hasLink = !!a.link;

        const content = (
          <div
            className={`py-2 -mx-2 px-2 rounded-lg ${
              hasLink ? "group hover:bg-accent-light transition-colors" : ""
            }`}
          >
            <div className="flex items-baseline justify-between gap-3">
              <span
                className={`text-sm font-medium text-foreground ${
                  hasLink ? "group-hover:underline" : ""
                }`}
              >
                {a.name}
                {hasLink && (
                  <ArrowUpRight
                    size={12}
                    className="inline ml-1 text-muted opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                )}
              </span>
              <span className="text-xs text-muted/60 whitespace-nowrap shrink-0">
                {formatDate(a.date)}
              </span>
            </div>
            {a.description && (
              <p className="text-xs text-muted mt-0.5 leading-relaxed">
                {a.description}
              </p>
            )}
          </div>
        );

        if (hasLink) {
          return (
            <a
              key={i}
              href={a.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {content}
            </a>
          );
        }

        return <div key={i}>{content}</div>;
      })}
    </div>
  );
}
