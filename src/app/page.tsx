import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import SectionShell from "@/components/SectionShell";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";
import ArticlesSection from "@/components/ArticlesSection";
import AwardsSection from "@/components/AwardsSection";
import FreelancingSection from "@/components/FreelancingSection";

export default function Home() {
  return (
    <>
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
            <ExperienceSection limit={4} />
          </SectionShell>

          <div className="border-t border-border" />

          <SectionShell
            id="articles"
            title="Writing"
            seeAllHref="/articles"
          >
            <ArticlesSection limit={3} />
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
