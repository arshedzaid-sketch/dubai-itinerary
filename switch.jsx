export function Switch({ checked, onCheckedChange, id }) {
  return (
    <label htmlFor={id} className="inline-flex items-center cursor-pointer select-none">
      <input id={id} type="checkbox" checked={checked} onChange={e=>onCheckedChange(e.target.checked)} className="hidden" />
      <span className={`w-10 h-6 rounded-full inline-flex items-center px-0.5 transition ${checked ? "bg-green-500" : "bg-neutral-300"}`}>
        <span className={`block w-5 h-5 bg-white rounded-full shadow transform transition ${checked ? "translate-x-4" : "translate-x-0"}`} />
      </span>
    </label>
  );
}
