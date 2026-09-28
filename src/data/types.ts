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

export type DiscountCategory =
  | "AI"
  | "Productivity"
  | "Design & video"
  | "Coding"
  | "Streaming & music"
  | "News & learning"
  | "Health"
  | "Laptops & gear"
  | "Shopping & food"
  | "Travel, phone & money";

export interface StudentDiscount {
  name: string;
  category: DiscountCategory;
  /** What you get, e.g. "$6.99/mo with Hulu included (normally $12.99)" */
  deal: string;
  /** How long it lasts */
  length: string;
  /** Which countries */
  where: string;
  /** How you prove you're a student */
  verify: string;
  note?: string;
  url: string;
  iUseIt?: boolean;
}

export interface DiscountPick {
  /** Matches a StudentDiscount name */
  name: string;
  why: string;
}

export interface NoStudentDeal {
  brand: string;
  note: string;
  url?: string;
}
