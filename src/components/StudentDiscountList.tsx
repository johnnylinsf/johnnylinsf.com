import type { DiscountPick, StudentDiscount } from "@/data/types";

function Terms({ d }: { d: StudentDiscount }) {
  return (
    <>
      <span className="block text-[13px] text-muted">
        {d.length} · {d.where} · {d.verify}
      </span>
      {d.note && <span className="block text-[13px] text-muted">{d.note}</span>}
    </>
  );
}

function Name({ d }: { d: StudentDiscount }) {
  return (
    <a
      href={d.url}
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold text-link underline decoration-link/30 hover:decoration-link"
    >
      {d.name}
    </a>
  );
}

export function DiscountItem({ d }: { d: StudentDiscount }) {
  return (
    <li className="leading-relaxed pl-0.5">
      <Name d={d} /> — {d.deal}
      {d.iUseIt && <span className="text-muted"> (I use this)</span>}
      <Terms d={d} />
    </li>
  );
}

export function PickList({
  picks,
  discounts,
  ordered,
  showDeal = true,
}: {
  picks: DiscountPick[];
  discounts: StudentDiscount[];
  ordered?: boolean;
  /** Off when each `why` already describes the deal */
  showDeal?: boolean;
}) {
  const byName = new Map(discounts.map((d) => [d.name, d]));
  const List = ordered ? "ol" : "ul";

  return (
    <List
      className={`text-[15px] text-foreground/80 space-y-3 mb-4 ml-4 ${
        ordered ? "list-decimal" : "list-disc"
      }`}
    >
      {picks.map((pick) => {
        const d = byName.get(pick.name);
        if (!d) return null;
        return (
          <li key={pick.name} className="leading-relaxed pl-0.5">
            <Name d={d} /> — {showDeal && `${d.deal}. `}
            {pick.why}
            <Terms d={d} />
          </li>
        );
      })}
    </List>
  );
}
