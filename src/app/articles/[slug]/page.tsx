import { notFound } from "next/navigation";
import { articles } from "@/data/articles";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

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

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return params.then(({ slug }) => {
    const article = articles.find((a) => a.slug === slug);
    return { title: article?.name ?? "Article" };
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article || !article.slug) notFound();

  // Dynamically import the MDX content
  let Content: React.ComponentType;
  try {
    Content = (await import(`@/content/articles/${slug}.mdx`)).default;
  } catch {
    notFound();
  }

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
        </article>
      </main>
      <Footer />
    </>
  );
}
