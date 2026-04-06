import { education } from "@/data/education";

export default function EducationSection() {
  return (
    <div>
      {education.map((e, i) => (
        <div key={i}>
          <p className="text-sm font-semibold text-foreground">{e.school}</p>
          <p className="text-sm text-muted">{e.degree}</p>
          <p className="text-xs text-muted/60 mt-0.5">{e.duration}</p>
        </div>
      ))}
    </div>
  );
}
