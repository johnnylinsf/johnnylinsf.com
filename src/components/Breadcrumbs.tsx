import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-1 text-xs text-muted min-w-0">
        <li className="shrink-0">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1 min-w-0">
            <ChevronRight size={12} className="shrink-0" />
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-foreground transition-colors shrink-0"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground truncate">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
