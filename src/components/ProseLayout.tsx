import Header from "./Header";
import Footer from "./Footer";
import Breadcrumbs, { Crumb } from "./Breadcrumbs";

export default function ProseLayout({
  title,
  breadcrumbs,
  children,
}: {
  title: string;
  breadcrumbs?: Crumb[];
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-6 pt-14 pb-12">
          {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
          <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-foreground mb-8">
            {title}
          </h1>
          <div>{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
