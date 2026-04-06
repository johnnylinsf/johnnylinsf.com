import { freelancing } from "@/data/freelancing";
import Link from "next/link";

export default function FreelancingSection() {
  return (
    <div className="rounded-lg bg-accent-light p-5">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm font-semibold text-foreground">
          {freelancing.llcName}
        </span>
        {freelancing.available && (
          <span className="inline-flex h-2 w-2 rounded-full bg-green" title="Available" />
        )}
        {freelancing.available && (
          <span className="text-xs text-green font-medium">
            Available
          </span>
        )}
      </div>
      <p className="text-sm text-muted leading-relaxed mb-3">
        {freelancing.description}{" "}
        Learn more about my{" "}
        <Link href="/bubble" className="text-link underline decoration-link/30 hover:decoration-link">
          Bubble experience
        </Link>
        .
      </p>
      <div className="flex gap-2">
        <a
          href={`mailto:${freelancing.email}?subject=Bubble%20Freelancing`}
          className="inline-flex rounded-md bg-foreground px-4 py-2 text-xs font-medium text-background hover:opacity-90 transition-opacity"
        >
          Get in touch
        </a>
        {freelancing.subPages.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className="inline-flex rounded-md border border-muted/40 px-4 py-2 text-xs font-medium text-foreground hover:border-foreground/50 hover:bg-card transition-colors"
          >
            {p.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
