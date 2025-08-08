export function Button({ variant = "default", size = "md", className = "", ...props }) {
  const base = "inline-flex items-center justify-center rounded-lg border transition px-3 py-2 text-sm";
  const variants = {
    default: "bg-black text-white border-black hover:opacity-90",
    secondary: "bg-neutral-200 text-neutral-900 border-neutral-200 hover:bg-neutral-300",
    ghost: "bg-transparent border-transparent hover:bg-neutral-100",
    outline: "bg-white border-neutral-300 hover:bg-neutral-50"
  };
  const sizes = { sm: "px-2 py-1 text-xs", md: "px-3 py-2 text-sm", lg: "px-4 py-2 text-base" };
  return <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props} />;
}
