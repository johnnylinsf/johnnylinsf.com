"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "/articles", label: "Writing" },
  { href: "/experience", label: "Experience" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <header className="sticky top-0 z-50 bg-card/85 backdrop-blur-md border-b border-border">
      <div className="mx-auto max-w-2xl px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="sm:hidden rounded-lg p-2 text-muted hover:text-foreground transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <Link
            href="/"
            className="font-[family-name:var(--font-heading)] font-bold text-foreground hover:text-muted transition-colors"
          >
            Johnny Lin
          </Link>
        </div>
        <nav className="flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hidden sm:inline-flex px-2.5 py-1 text-sm transition-colors ${
                isActive(link.href)
                  ? "text-foreground font-medium"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="sr-only"> (current page)</span>
              )}
            </Link>
          ))}
          <a
            href="mailto:johnny@johnnylinsf.com"
            className="hidden sm:inline-flex rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-background hover:opacity-90 transition-opacity ml-1"
          >
            Contact me
          </a>
          <ThemeToggle />
        </nav>
      </div>

      {mobileOpen && (
        <div className="sm:hidden border-t border-border bg-card">
          <nav className="mx-auto max-w-2xl px-6 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`py-2 text-sm transition-colors ${
                  isActive(link.href)
                    ? "text-foreground font-medium"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="mailto:johnny@johnnylinsf.com"
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex w-fit rounded-md bg-foreground px-4 py-2 text-xs font-medium text-background hover:opacity-90 transition-opacity"
            >
              Contact me
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
