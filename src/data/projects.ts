import { Project } from "./types";

export const projects: Project[] = [
  {
    name: "What was here?",
    slug: "what-was-here",
    status: "current",
    startDate: "2026-03-14",
    link: "https://wwh.johnnylinsf.com",
    description:
      "Fun project to explore San Francisco's Archaeology. Search any address to see what used to be there and what is still currently there - all powered by public city data.",
    techStack: ["Vercel", "Claude"],
  },
  {
    name: "Internal project: Mission Bit Volunteer Portal",
    slug: "mission-bit-volunteer-portal",
    status: "current",
    startDate: "2025-04-21",
    description:
      "An internal volunteer management portal for Mission Bit.",
    techStack: ["Bubble", "Salesforce REST API", "Postmark"],
  },
  {
    name: "TicketingNest",
    slug: "ticketingnest",
    status: "current",
    startDate: "2024-05-20",
    link: "https://ticketingnest.com",
    relatedArticles: ["ticketingnest"],
  },
  {
    name: "Internal project: Mission Bit Attendance System",
    slug: "mission-bit-attendance-system",
    status: "current",
    startDate: "2022-04-01",
    relatedArticles: ["mission-bit-attendance-system"],
  },
  {
    name: "Tastes Like Home",
    slug: "tastes-like-home",
    status: "past",
    startDate: "2024-01-26",
    endDate: "2024-01-28",
    link: "https://tasteslikehome.bubbleapps.io/version-test",
    description:
      "A startup created over a weekend (~40 hours) in the Impact Startup Disco class. Tastes Like Home is a two-sided marketplace for home cooks and international/exchange students. Home cooks make a post offering seats at their dining room table, making food from their cuisine for students to bond with their shared culture. The MVP was built in Bubble in about 3 hours.",
    techStack: ["Bubble"],
  },
  {
    name: "Heep",
    slug: "heep",
    status: "past",
    startDate: "2023-05-25",
    endDate: "2023-07-28",
    link: "https://heep.so",
    description:
      "Heep is a freelance platform for hiring no-code, low-code, and automation experts. Heep allows businesses to find and hire no-code experts to help them with website development, app development, UI/UX design, and automation.",
    techStack: ["Bubble"],
  },
  {
    name: "OperationSTART Platform",
    slug: "operationstart-platform",
    status: "past",
    startDate: "2020-07-18",
    endDate: "2025-06-30",
    link: "https://operationstart.org",
    description:
      "The platform for OperationSTART, a youth-led organization I co-founded in 2020 that works to bridge the opportunity divide. Everything on the platform is customized to the needs of OperationSTART to fulfill their mission.",
    techStack: ["Bubble"],
  },
  {
    name: "Mission Bit Instructor's Portal",
    slug: "mission-bit-instructors-portal",
    status: "past",
    startDate: "2020-06-01",
    endDate: "2021-03-01",
  },
];
