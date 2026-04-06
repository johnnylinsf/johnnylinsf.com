import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProjectsSection from "@/components/ProjectsSection";

export const metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-6 pt-14 pb-12">
          <Breadcrumbs items={[{ label: "Projects" }]} />
          <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-foreground mb-8">
            All Projects
          </h1>
          <ProjectsSection />
        </div>
      </main>
      <Footer />
    </>
  );
}
