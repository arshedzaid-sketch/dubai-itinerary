import { createContext, useContext, useState } from "react";
const TabsCtx = createContext(null);

export function Tabs({ defaultValue, children, className = "" }) {
  const [value, setValue] = useState(defaultValue);
  return <TabsCtx.Provider value={{ value, setValue }}><div className={className}>{children}</div></TabsCtx.Provider>;
}
export function TabsList({ children, className = "" }) {
  return <div className={`flex gap-2 rounded-xl border bg-white p-1 ${className}`}>{children}</div>;
}
export function TabsTrigger({ value, children }) {
  const ctx = useContext(TabsCtx);
  const active = ctx.value === value;
  return (
    <button onClick={() => ctx.setValue(value)} className={`px-3 py-2 text-sm rounded-lg transition ${active ? "bg-black text-white" : "text-neutral-700 hover:bg-neutral-100"}`}>
      {children}
    </button>
  );
}
export function TabsContent({ value, children, className = "" }) {
  const ctx = useContext(TabsCtx);
  if (ctx.value !== value) return null;
  return <div className={className}>{children}</div>;
}
