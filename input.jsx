export function Input({ className = "", ...props }) {
  return <input className={`h-9 rounded-lg border border-neutral-300 px-3 text-sm outline-none focus:ring-2 focus:ring-neutral-300 ${className}`} {...props} />;
}
