import { projects } from "@/data/projects";
import { NextResponse } from "next/server";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    return new NextResponse("Not found", { status: 404 });
  }

  const lines = [
    `# ${project.name}`,
    "",
    `Status: ${project.status === "current" ? "Active" : "Past"}`,
    `Date: ${formatDate(project.startDate)}${project.endDate ? ` - ${formatDate(project.endDate)}` : " - Present"}`,
    project.link ? `Link: ${project.link}` : "",
    "",
  ];

  if (project.description) {
    lines.push(project.description, "");
  }

  if (project.techStack?.length) {
    lines.push("## Tech Stack", "", ...project.techStack.map((t) => `- ${t}`), "");
  }

  const markdown = lines.filter((l) => l !== undefined).join("\n");

  return new NextResponse(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
