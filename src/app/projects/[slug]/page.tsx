import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { articles } from "@/data/articles";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Badge from "@/components/ui/Badge";
import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";

function renderDescription(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const match = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
    if (match) {
      return (
        <a
          key={i}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link underline decoration-link/30 hover:decoration-link"
        >
          {match[1]}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return params.then(({ slug }) => {
    const project = projects.find((p) => p.slug === slug);
    return {
      title: project?.name ?? "Project",
      description: project?.description,
    };
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-6 pt-14 pb-12">
          <Breadcrumbs items={[{ label: "Projects", href: "/projects" }, { label: project.name }]} />
          <div className="mb-6">
            <Badge variant={project.status}>
              {project.status === "current" ? "Current Project" : "Past Project"}
            </Badge>
          </div>

          <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold tracking-tight text-foreground mb-4">
            {project.name}
          </h1>

          <p className="text-sm text-muted mb-6">
            {formatDate(project.startDate)}
            {project.endDate && ` - ${formatDate(project.endDate)}`}
          </p>

          {project.description && (
            <div className="space-y-4 mb-6">
              {project.description.split("\n\n").map((para, i) => (
                <p key={i} className="text-foreground/80 leading-relaxed">
                  {renderDescription(para)}
                </p>
              ))}
            </div>
          )}

          {project.techStack && project.techStack.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-foreground mb-2">
                Tech Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((t) => (
                  <span
                    key={t}
                    className="inline-flex rounded-md bg-accent-light px-2.5 py-1 text-xs text-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90 transition-opacity"
            >
              Visit project
              <ExternalLink size={14} />
            </a>
          )}

          {project.relatedArticles && project.relatedArticles.length > 0 && (() => {
            const related = project.relatedArticles
              .map((slug) => articles.find((a) => a.slug === slug))
              .filter(Boolean);
            if (related.length === 0) return null;
            return (
              <div className="mt-8">
                <p className="text-xs text-muted/60 uppercase tracking-wide mb-2">Related articles</p>
                {related.map((a) => (
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
            );
          })()}
        </div>
      </main>
      <Footer />
    </>
  );
}
