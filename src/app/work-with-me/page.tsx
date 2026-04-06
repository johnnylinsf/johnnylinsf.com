import ProseLayout from "@/components/ProseLayout";
import Content from "@/content/work-with-me.mdx";

export const metadata = {
  title: "Work with me",
};

export default function WorkWithMePage() {
  return (
    <ProseLayout
      title="Work with me"
      breadcrumbs={[{ label: "Work with me" }]}
    >
      <Content />
    </ProseLayout>
  );
}
