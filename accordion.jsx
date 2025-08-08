import { useState } from "react";
export function Accordion({ children, className = "" }) { return <div className={className}>{children}</div>; }
export function AccordionItem({ value, children }) { return <div data-value={value} className="border rounded-xl overflow-hidden">{children}</div>; }
export function AccordionTrigger({ children, className = "" }) {
  const [open, setOpen] = useState(false);
  return (
    <button onClick={() => setOpen(o=>!o)} className={`w-full text-left px-4 py-3 bg-white hover:bg-neutral-50 ${className}`}>
      {children}<span className="float-right">▾</span>
      <input type="checkbox" checked={open} readOnly className="hidden" />
    </button>
  );
}
export function AccordionContent({ children }) { return <div className="px-4 py-3 bg-white border-t">{children}</div>; }
