import ProseLayout from "@/components/ProseLayout";
import Content from "@/content/bubble.mdx";

export const metadata = {
  title: "Bubble",
};

export default function BubblePage() {
  return (
    <ProseLayout
      title="Bubble"
      breadcrumbs={[{ label: "Bubble" }]}
    >
      <Content />
    </ProseLayout>
  );
}
