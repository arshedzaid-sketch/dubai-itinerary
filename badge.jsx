export function Badge({ variant = "secondary", className = "", children }) {
  const cls = variant === "secondary"
    ? "inline-flex items-center rounded-full bg-neutral-100 text-neutral-800 px-2 py-1"
    : "inline-flex items-center rounded-full border px-2 py-1";
  return <span className={`${cls} ${className}`}>{children}</span>;
}
