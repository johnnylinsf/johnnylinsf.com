import { articles } from "@/data/writing";
import { projects } from "@/data/projects";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://johnnylinsf.com";

  const staticPages = [
    "",
    "/writing",
    "/experience",
    "/projects",
    "/work-with-me",
    "/bubble",
    "/charities",
    "/privacy-policy",
    "/llms.txt",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  const writingPages = articles
    .filter((a) => a.slug)
    .map((a) => ({
      url: `${base}/writing/${a.slug}`,
      lastModified: a.date ? new Date(a.date) : new Date(),
    }));

  const projectPages = projects.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: new Date(),
  }));

  return [...staticPages, ...writingPages, ...projectPages];
}
