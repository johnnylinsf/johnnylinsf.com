"use client";

import { experience } from "@/data/experience";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface GroupedExperience {
  company: string;
  website?: string;
  totalMonths: number;
  roles: { title: string; duration: string; description?: string[] }[];
}

const MONTH_MAP: Record<string, number> = {
  January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
  July: 6, August: 7, September: 8, October: 9, November: 10, December: 11,
};

function parseDate(s: string): Date {
  if (s.trim() === "Present") return new Date();
  const parts = s.trim().split(" ");
  const month = MONTH_MAP[parts[0]] ?? 0;
  const year = parseInt(parts[1], 10);
  return new Date(year, month, 1);
}

function calcMonths(duration: string): number {
  const parts = duration.split(" - ");
  if (parts.length !== 2) return 0;
  const start = parseDate(parts[0]);
  const end = parseDate(parts[1]);
  return Math.max(0, (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()));
}

function formatTotalDuration(months: number): string {
  const yrs = Math.floor(months / 12);
  const mos = months % 12;
  if (yrs === 0) return `${mos} mo${mos !== 1 ? "s" : ""}`;
  if (mos === 0) return `${yrs} yr${yrs !== 1 ? "s" : ""}`;
  return `${yrs} yr${yrs !== 1 ? "s" : ""} ${mos} mo${mos !== 1 ? "s" : ""}`;
}

function getStartDate(duration: string): Date {
  const parts = duration.split(" - ");
  return parseDate(parts[0]);
}

function getMostRecentStart(roles: GroupedExperience["roles"]): Date {
  return roles.reduce((latest, r) => {
    const d = getStartDate(r.duration);
    return d > latest ? d : latest;
  }, new Date(0));
}

function groupExperience(): GroupedExperience[] {
  const groups: Map<string, GroupedExperience> = new Map();

  for (const e of experience) {
    const existing = groups.get(e.company);
    const months = calcMonths(e.duration);
    if (existing) {
      existing.roles.push({ title: e.title, duration: e.duration, description: e.description });
      existing.totalMonths += months;
    } else {
      groups.set(e.company, {
        company: e.company,
        website: e.website,
        totalMonths: months,
        roles: [{ title: e.title, duration: e.duration, description: e.description }],
      });
    }
  }

  const result = Array.from(groups.values());

  // Sort roles within each company by most recent first
  for (const g of result) {
    g.roles.sort((a, b) => getStartDate(b.duration).getTime() - getStartDate(a.duration).getTime());
  }

  // Sort: active companies first, then by most recent role start date
  result.sort((a, b) => {
    const aActive = a.roles.some((r) => r.duration.includes("Present"));
    const bActive = b.roles.some((r) => r.duration.includes("Present"));
    if (aActive !== bActive) return aActive ? -1 : 1;
    return getMostRecentStart(b.roles).getTime() - getMostRecentStart(a.roles).getTime();
  });

  return result;
}

function RoleItem({ role }: { role: GroupedExperience["roles"][0] }) {
  const [open, setOpen] = useState(false);
  const hasDescription = role.description && role.description.length > 0;

  return (
    <div className="py-1">
      <button
        onClick={() => hasDescription && setOpen(!open)}
        className={`w-full text-left flex items-baseline justify-between gap-3 ${
          hasDescription ? "cursor-pointer group" : ""
        }`}
        disabled={!hasDescription}
      >
        <span className="text-sm text-foreground flex items-center gap-1.5">
          {hasDescription && (
            <motion.span
              animate={{ rotate: open ? 90 : 0 }}
              transition={{ duration: 0.15 }}
              className="text-muted inline-block"
            >
              <ChevronRight size={12} />
            </motion.span>
          )}
          <span className={hasDescription ? "group-hover:underline" : ""}>
            {role.title}
          </span>
        </span>
        <span className="text-xs text-muted/60 whitespace-nowrap shrink-0">
          {role.duration}
        </span>
      </button>
      <AnimatePresence>
        {open && role.description && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <ul className="mt-1.5 ml-5 space-y-1.5 pb-1">
              {role.description.map((d, j) => (
                <li key={j} className="text-xs text-muted leading-relaxed flex gap-2">
                  <span className="text-muted shrink-0">—</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ExperienceSection({
  limit,
}: {
  limit?: number;
}) {
  const grouped = groupExperience();
  const items = limit ? grouped.slice(0, limit) : grouped;

  return (
    <div className="space-y-6">
      {items.map((g) => {
        const isActive = g.roles.some((r) => r.duration.includes("Present"));
        return (
        <div key={g.company}>
          <div className="flex items-center gap-2 mb-2">
            {isActive && (
              <span className="inline-flex h-2 w-2 rounded-full bg-green shrink-0" title="Current" />
            )}
            {g.website ? (
              <a
                href={g.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-foreground hover:underline transition-colors"
              >
                {g.company}
              </a>
            ) : (
              <span className="text-sm font-semibold text-foreground">
                {g.company}
              </span>
            )}
            <span className="text-xs text-muted/60">
              {formatTotalDuration(g.totalMonths)}
            </span>
          </div>
          <div className={`space-y-1 pl-3 border-l ${isActive ? "border-green/40" : "border-border"}`}>
            {g.roles.map((r, i) => (
              <RoleItem key={i} role={r} />
            ))}
          </div>
        </div>
        );
      })}
    </div>
  );
}
