export interface Profile {
  name: string;
  headline: string;
  bio: string;
  location: string;
  contact: {
    email: string;
    twitter: string;
    linkedin: string;
  };
  highlights: string[];
  lastUpdated: string;
}

export interface Project {
  name: string;
  slug: string;
  status: "current" | "past";
  startDate: string;
  endDate?: string;
  link?: string;
  description?: string;
  techStack?: string[];
  relatedArticles?: string[];
}

export interface Experience {
  company: string;
  title: string;
  duration: string;
  website?: string;
  description?: string[];
}

export interface Education {
  school: string;
  degree: string;
  duration: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface WritingEntry {
  name: string;
  slug?: string;
  externalUrl?: string;
  description?: string;
  date?: string;
  wordCount?: number;
  recommended?: boolean;
  recommendedReads?: string[];
}

export interface Award {
  name: string;
  date: string;
  description?: string;
  link?: string;
}

export interface FreelancingInfo {
  llcName: string;
  available: boolean;
  description: string;
  email: string;
  specialization: string;
  subPages: { label: string; href: string }[];
}
