import ProseLayout from "@/components/ProseLayout";
import Content from "@/content/privacy-policy.mdx";

export const metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicyPage() {
  return (
    <ProseLayout
      title="Privacy Policy"
      breadcrumbs={[{ label: "Privacy Policy" }]}
    >
      <Content />
    </ProseLayout>
  );
}
