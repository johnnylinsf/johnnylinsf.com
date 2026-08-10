import { Project } from "./types";

export const projects: Project[] = [
    {
    name: "CalGo",
    slug: "calgo",
    status: "current",
    startDate: "2026-06-22",
    endDate: "2026-08-10",
    link: "https://calgo-cs160.vercel.app",
    description:
      "A campus amenities map for UC Berkeley, built with Team 404 for CS 160 (User Interface Design and Development), Studio B.\n\nFinding a gender-inclusive restroom or a bottle filling station in a building you don't know usually means checking a few university sites, a map, and whatever sign is posted on the door. CalGo puts 1,525 amenities across 255 campus buildings in one place: restrooms, water fountains, bottle filling stations, printers, eateries, and lactation rooms. Each one shows its floor, its hours, and its accessibility attributes. You can use it without an account, filter by distance, opening hours, and accessibility, and hand off to Apple Maps, Google Maps, or Waze for directions.\n\nWe ran the full design cycle on it: six needfinding interviews, 33 sketches, two paper prototypes, five competing wireframes, a Figma hi-fi round, and a final usability evaluation. Every finding from that evaluation shipped, and every task beat its time goal. The [case study](https://calgo-cs160.vercel.app/story) walks through the whole process.",
    techStack: [
      "React",
      "Vite",
      "Leaflet",
      "Firebase",
      "Tailwind CSS",
      "Figma",
      "Vercel",
    ],
  },
  {
    name: "What was here?",
    slug: "what-was-here",
    status: "past",
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
    slug: "operationstart",
    status: "past",
    startDate: "2020-07-18",
    endDate: "2025-06-30",
    description:
      "OperationSTART started as a project my friends and I built during junior year of high school in 2020, right in the middle of COVID. We noticed that finding enrichment opportunities — internships, programs, summer activities — required a lot of digging. The opportunities existed, but they weren't widely marketed or easy to find unless you were already plugged in.\n\nAs SEO Scholars, we knew about some of these programs, but we realized most students didn't. So we set out to democratize access by building a single platform where students in San Francisco could discover and apply to opportunities that were already out there.\n\nWhat began as an idea evolved into a resource that hundreds of students used over five years.\n\nOn June 30, 2025, we made the difficult decision to shut down OperationSTART. The work and mission continue — we encourage anyone looking for similar resources to visit [Our415](https://our415.org), an initiative led by the San Francisco Department of Children, Youth and Their Families.",
    techStack: ["Bubble"],
    relatedArticles: ["giving-tuesday-2024"],
  },
  {
    name: "Mission Bit Instructor's Portal",
    slug: "mission-bit-instructors-portal",
    status: "past",
    startDate: "2020-06-01",
    endDate: "2021-03-01",
  },
];
