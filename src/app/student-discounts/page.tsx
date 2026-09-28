import ProseLayout from "@/components/ProseLayout";
import Content from "@/content/student-discounts.mdx";
import { DiscountItem, PickList } from "@/components/StudentDiscountList";
import {
  afterGraduation,
  discountCategories,
  lastUpdated,
  noStudentDeal,
  studentDiscounts,
  topPicks,
} from "@/data/student-discounts";

export const metadata = {
  title: "Student Discounts",
  description:
    "100+ student discounts, starting with the tools I actually use, with how long each one lasts, where it works, and how to verify.",
};

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-semibold tracking-tight text-foreground mt-10 mb-4">
      {children}
    </h2>
  );
}

export default function StudentDiscountsPage() {
  return (
    <ProseLayout
      title="Student discounts"
      breadcrumbs={[{ label: "Student Discounts" }]}
    >
      <Content />

      <Heading>My top 10</Heading>
      <PickList
        picks={topPicks}
        discounts={studentDiscounts}
        ordered
        showDeal={false}
      />

      <Heading>If you just graduated</Heading>
      <p className="text-[15px] text-foreground/80 leading-relaxed mb-4">
        These go by age or alumni status instead of enrollment, so they
        still work.
      </p>
      <PickList picks={afterGraduation} discounts={studentDiscounts} />

      <Heading>All {studentDiscounts.length} discounts</Heading>
      {discountCategories.map((category) => (
        <section key={category}>
          <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">
            {category}
          </h3>
          <ul className="text-[15px] text-foreground/80 space-y-3 mb-4 ml-4 list-disc">
            {studentDiscounts
              .filter((d) => d.category === category)
              .map((d) => (
                <DiscountItem key={d.name} d={d} />
              ))}
          </ul>
        </section>
      ))}

      <Heading>Tools I use that don&apos;t have a student deal (yet)</Heading>
      <ul className="text-[15px] text-foreground/80 space-y-1 mb-4 ml-4 list-disc">
        {noStudentDeal.map((n) => (
          <li key={n.brand} className="leading-relaxed pl-0.5">
            <strong className="font-semibold text-foreground">{n.brand}</strong>{" "}
            — {n.note}
          </li>
        ))}
      </ul>

      <hr className="border-border my-8" />
      <p className="text-[15px] text-foreground/80 leading-relaxed mb-4">
        <em>Last updated: {lastUpdated}</em>
      </p>
    </ProseLayout>
  );
}
