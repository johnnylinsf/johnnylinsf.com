import ProseLayout from "@/components/ProseLayout";
import Content from "@/content/stack.mdx";

export const metadata = {
  title: "Tech Stack",
};

export default function StackPage() {
  return (
    <ProseLayout
      title="My tech stack"
      breadcrumbs={[{ label: "Tech Stack" }]}
    >
      <Content />
    </ProseLayout>
  );
}
