export function Card({ className = "", children }) {
  return <div className={`rounded-2xl border bg-white ${className}`}>{children}</div>;
}
export function CardHeader({ className = "", children }) {
  return <div className={`p-4 border-b ${className}`}>{children}</div>;
}
export function CardTitle({ className = "", children }) {
  return <h2 className={`font-semibold ${className}`}>{children}</h2>;
}
export function CardContent({ className = "", children }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}
