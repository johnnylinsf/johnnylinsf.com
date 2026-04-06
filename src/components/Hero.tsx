import { profile } from "@/data/profile";
import { XIcon, LinkedInIcon } from "./ui/SocialIcons";
import { Mail } from "lucide-react";
import Image from "next/image";

function renderHighlight(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const match = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
    if (match) {
      const isExternal = match[2].startsWith("http");
      return (
        <a
          key={i}
          href={match[2]}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-link underline decoration-link/30 hover:decoration-link"
        >
          {match[1]}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export default function Hero() {
  return (
    <section className="pt-16 pb-12">
      <div className="flex items-start gap-5 mb-6">
        <Image
          src="/headshot.png"
          alt="Johnny Lin"
          width={72}
          height={72}
          className="rounded-full ring-2 ring-border"
          priority
        />
        <div>
          <h1 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            {profile.headline}
          </h1>
          <p className="text-muted mt-1 flex items-center gap-1.5 text-sm">
            {profile.location}
          </p>
        </div>
      </div>

      <p className="text-lg text-foreground/80 leading-relaxed mb-5 max-w-xl">
        {profile.bio}
      </p>

      <ul className="space-y-1.5 mb-6">
        {profile.highlights.map((h, i) => (
          <li key={i} className="text-sm text-foreground/70 leading-relaxed flex gap-2">
            <span className="text-muted shrink-0">—</span>
            <span>{renderHighlight(h)}</span>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4">
        <a
          href={`mailto:${profile.contact.email}`}
          className="text-muted hover:text-foreground transition-colors"
          aria-label="Email"
        >
          <Mail size={18} />
        </a>
        <a
          href={profile.contact.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted hover:text-foreground transition-colors"
          aria-label="X (Twitter)"
        >
          <XIcon size={16} />
        </a>
        <a
          href={profile.contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted hover:text-foreground transition-colors"
          aria-label="LinkedIn"
        >
          <LinkedInIcon size={16} />
        </a>
        <span className="text-border">|</span>
        <a
          href={`mailto:${profile.contact.email}`}
          className="text-sm text-muted hover:text-foreground transition-colors"
        >
          {profile.contact.email}
        </a>
      </div>
    </section>
  );
}
