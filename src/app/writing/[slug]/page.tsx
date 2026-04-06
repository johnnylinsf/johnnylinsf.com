import { notFound } from "next/navigation";
import { articles } from "@/data/articles";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function generateStaticParams() {
  return articles.filter((a) => a.slug).map((a) => ({ slug: a.slug! }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return { title: "Article" };
  return {
    title: article.name,
    description: article.description,
    openGraph: {
      title: article.name,
      description: article.description,
      type: "article",
      publishedTime: article.date,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article || !article.slug) notFound();

  let Content: React.ComponentType;
  try {
    Content = (await import(`@/content/articles/${slug}.mdx`)).default;
  } catch {
    notFound();
  }

  const recommended = article.recommendedReads
    ?.map((s) => articles.find((a) => a.slug === s))
    .filter(Boolean);

  return (
    <>
      <Header />
      <main className="flex-1">
        <article className="mx-auto max-w-2xl px-6 pt-14 pb-12">
          <Breadcrumbs items={[{ label: "Writing", href: "/articles" }, { label: article.name }]} />
          <header className="mb-8">
            <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold tracking-tight text-foreground mb-3">
              {article.name}
            </h1>
            <div className="flex items-center gap-3 text-sm text-muted">
              {article.date && <time>{formatDate(article.date)}</time>}
              {article.wordCount && (
                <span>&middot; {Math.ceil(article.wordCount / 250)} min read</span>
              )}
            </div>
          </header>
          <div>
            <Content />
          </div>

          {recommended && recommended.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-xs text-muted/60 uppercase tracking-wide mb-3">Recommended reads</p>
              <div className="space-y-1">
                {recommended.map((a) => (
                  <Link
                    key={a!.slug}
                    href={`/writing/${a!.slug}`}
                    className="group block -mx-2 px-2 py-3 rounded-lg hover:bg-accent-light transition-colors"
                  >
                    <div className="flex items-baseline justify-between gap-3 mb-0.5">
                      <h3 className="text-sm font-medium text-foreground group-hover:underline">
                        {a!.name}
                        <ArrowRight
                          size={12}
                          className="inline ml-1 text-muted opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      </h3>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted/60">
                      {a!.date && (
                        <span>
                          {new Date(a!.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      )}
                      {a!.wordCount && (
                        <>
                          <span>&middot;</span>
                          <span>{Math.ceil(a!.wordCount / 250)} min read</span>
                        </>
                      )}
                    </div>
                    {a!.description && (
                      <p className="text-xs text-muted line-clamp-1 mt-1">
                        {a!.description}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
