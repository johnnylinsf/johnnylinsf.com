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
  | "Design & Creative"
  | "Developer"
  | "Streaming & Music"
  | "News & Learning"
  | "Wellness"
  | "Hardware"
  | "Shopping"
  | "Food & Delivery"
  | "Travel"
  | "Phone & Internet"
  | "Finance";

export interface StudentDiscount {
  slug: string;
  name: string;
  brand: string;
  category: DiscountCategory;
  /** One-line headline, e.g. "$5.99/mo, Hulu included" */
  offer: string;
  regularPrice?: string;
  studentPrice?: string;
  /** How long the deal lasts, renewal rules, caps */
  duration: string;
  /** Country restrictions */
  regions: string;
  eligibility: string;
  /** How you prove you're a student: SheerID, UNiDAYS, .edu email, etc. */
  verification: string;
  url: string;
  notes?: string;
  /** Tools I actually use */
  inMyStack?: boolean;
}

export interface NoStudentDeal {
  brand: string;
  note: string;
  url?: string;
}

export interface TopPick {
  slug: string;
  why: string;
}
