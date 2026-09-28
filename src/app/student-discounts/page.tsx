import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import StudentDiscountsDirectory, {
  DiscountRow,
} from "@/components/StudentDiscountsDirectory";
import {
  afterGraduation,
  discountCategories,
  noStudentDeal,
  studentDiscounts,
  studentDiscountsMeta,
  topPicks,
} from "@/data/student-discounts";

export const metadata = {
  title: "Student Discounts",
  description: studentDiscountsMeta.description,
};

const bySlug = new Map(studentDiscounts.map((d) => [d.slug, d]));

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold tracking-tight text-foreground mb-2">
      {children}
    </h2>
  );
}

export default function StudentDiscountsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-6 pt-14 pb-12">
          <Breadcrumbs items={[{ label: "Student Discounts" }]} />
          <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-foreground mb-4">
            {studentDiscountsMeta.title}
          </h1>
          <div className="space-y-3 text-sm leading-relaxed text-muted mb-10">
            {studentDiscountsMeta.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <p className="text-xs">
              Last checked {studentDiscountsMeta.lastVerified}. Deals change
              often. Confirm the terms on the brand&apos;s page before you pay.
            </p>
          </div>

          <section className="mb-12">
            <SectionHeading>My top 10</SectionHeading>
            <p className="text-sm text-muted mb-3">
              {studentDiscountsMeta.rankingNote}
            </p>
            <ol>
              {topPicks.map((pick, i) => {
                const d = bySlug.get(pick.slug);
                if (!d) return null;
                return (
                  <li key={pick.slug}>
                    <DiscountRow d={d} rank={i + 1} why={pick.why} />
                  </li>
                );
              })}
            </ol>
          </section>

          <section className="mb-12">
            <SectionHeading>Just graduated? These still work</SectionHeading>
            <p className="text-sm text-muted mb-3">
              Deals tied to your age or alumni status instead of enrollment.
            </p>
            <ul>
              {afterGraduation.map((pick) => {
                const d = bySlug.get(pick.slug);
                if (!d) return null;
                return (
                  <li key={pick.slug}>
                    <DiscountRow d={d} why={pick.why} />
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="mb-12">
            <SectionHeading>The full directory</SectionHeading>
            <p className="text-sm text-muted mb-4">
              Tap any row for the fine print: how long it lasts, which
              countries, and how you verify.
            </p>
            <StudentDiscountsDirectory
              discounts={studentDiscounts}
              categories={discountCategories}
            />
          </section>

          <section>
            <SectionHeading>Tools I use with no student deal (yet)</SectionHeading>
            <ul className="space-y-2 text-sm">
              {noStudentDeal.map((n) => (
                <li key={n.brand}>
                  <span className="text-foreground font-medium">{n.brand}</span>
                  <span className="text-muted">: {n.note}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
