export default function Badge({
  variant,
  children,
}: {
  variant: "current" | "past";
  children: React.ReactNode;
}) {
  const styles =
    variant === "current"
      ? "bg-green-light text-green"
      : "bg-accent-light text-muted";

  return (
    <span
      className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${styles}`}
    >
      {children}
    </span>
  );
}
