import "./styles/globals.css";

export const metadata = { title: "Dubai & Abu Dhabi Family Planner" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-50 text-neutral-900">{children}</body>
    </html>
  );
}
