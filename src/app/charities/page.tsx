import ProseLayout from "@/components/ProseLayout";
import Content from "@/content/charities.mdx";

export const metadata = {
  title: "Charities I've Supported",
};

export default function CharitiesPage() {
  return (
    <ProseLayout
      title="Charities I've supported and care about"
      breadcrumbs={[{ label: "Charities" }]}
    >
      <Content />
    </ProseLayout>
  );
}
