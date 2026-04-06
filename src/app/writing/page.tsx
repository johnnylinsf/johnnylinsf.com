import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import WritingList from "@/components/WritingList";

export const metadata = { title: "Writing" };

export default function WritingPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-6 pt-14 pb-12">
          <Breadcrumbs items={[{ label: "Writing" }]} />
          <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-foreground mb-8">
            Writing
          </h1>
          <WritingList />
        </div>
      </main>
      <Footer />
    </>
  );
}
