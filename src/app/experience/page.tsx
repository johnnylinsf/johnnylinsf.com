import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import ExperienceSection from "@/components/ExperienceSection";

export const metadata = { title: "Experience" };

export default function ExperiencePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-6 pt-14 pb-12">
          <Breadcrumbs items={[{ label: "Experience" }]} />
          <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-foreground mb-8">
            Work Experience
          </h1>
          <ExperienceSection />
        </div>
      </main>
      <Footer />
    </>
  );
}
