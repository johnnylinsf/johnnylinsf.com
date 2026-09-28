import Link from "next/link";

export default function SectionShell({
  id,
  title,
  seeAllHref,
  children,
}: {
  id: string;
  title: string;
  seeAllHref?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="py-10 scroll-mt-16">
      <div className="flex items-baseline justify-between mb-5">
        <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold tracking-tight text-foreground">
          {title}
        </h2>
        {seeAllHref && (
          <Link
            href={seeAllHref}
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            See all &rarr;
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}
