import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import SectionShell from "@/components/SectionShell";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";
import WritingSection from "@/components/WritingSection";
import AwardsSection from "@/components/AwardsSection";
import FreelancingSection from "@/components/FreelancingSection";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Johnny Lin",
  url: "https://johnnylinsf.com",
  jobTitle: "EECS Alum & Product Builder",
  affiliation: [
    { "@type": "Organization", name: "UC Berkeley" },
    { "@type": "Organization", name: "Hatch" },
    { "@type": "Organization", name: "Tella" },
    { "@type": "Organization", name: "Mission Bit" },
  ],
  sameAs: [
    "https://twitter.com/johnnylinsf",
    "https://linkedin.com/in/johnnylin8",
    "https://johnny-lin.medium.com",
  ],
};

export default function Home() {
  return (
    <>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-6">
          <Hero />

          <div className="border-t border-border" />

          <SectionShell
            id="experience"
            title="Experience"
            seeAllHref="/experience"
          >
            <ExperienceSection activeOnly />
          </SectionShell>

          <div className="border-t border-border" />

          <SectionShell
            id="writing"
            title="Writing"
            seeAllHref="/writing"
          >
            <WritingSection limit={3} />
          </SectionShell>

          <div className="border-t border-border" />

          <SectionShell
            id="projects"
            title="Projects"
            seeAllHref="/projects"
          >
            <ProjectsSection limit={4} />
          </SectionShell>

          <div className="border-t border-border" />

          <SectionShell id="education" title="Education">
            <EducationSection />
          </SectionShell>

          <div className="border-t border-border" />

          <SectionShell id="awards" title="Accomplishments">
            <AwardsSection />
          </SectionShell>

          <div className="border-t border-border" />

          <SectionShell id="skills" title="Skills">
            <SkillsSection />
          </SectionShell>

          <div className="border-t border-border" />

          <SectionShell id="freelancing" title="Freelancing">
            <FreelancingSection />
          </SectionShell>
        </div>
      </main>
      <Footer />
    </>
  );
}
