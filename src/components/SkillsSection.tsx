import { skills } from "@/data/skills";
import Collapsible from "./ui/Collapsible";
import Link from "next/link";

export default function SkillsSection() {
  return (
    <div className="space-y-2">
      <p className="text-sm text-muted mb-3">
        Looking for my{" "}
        <a
          href="https://bubble.io"
          target="_blank"
          rel="noopener noreferrer"
          className="text-link underline decoration-link/30 hover:decoration-link"
        >
          Bubble
        </a>{" "}
        skills? Check out{" "}
        <Link href="/bubble" className="text-link underline decoration-link/30 hover:decoration-link">
          this page
        </Link>
        .
      </p>
      {skills.map((group) => (
        <Collapsible key={group.category} title={group.category}>
          <div className="flex flex-wrap gap-1.5">
            {group.items.map((item) => (
              <span
                key={item}
                className="inline-flex rounded-md bg-accent-light px-2.5 py-1 text-xs text-foreground"
              >
                {item}
              </span>
            ))}
          </div>
        </Collapsible>
      ))}
    </div>
  );
}
