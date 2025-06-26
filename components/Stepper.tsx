export default function Stepper({
  step,
}: {
  step: number;
}) {
  const labels = ["Details", "Curriculum", "Pricing", "Review"];
  return (
    <ol className="mb-8 flex gap-4">
      {labels.map((label, idx) => (
        <li
          key={label}
          className={`flex items-center gap-2 text-sm ${
            idx <= step ? "font-semibold text-blue-600" : "text-slate-400"
          }`}
        >
          <span
            className={`grid h-6 w-6 place-content-center rounded-full border ${
              idx <= step ? "border-blue-600" : "border-slate-300"
            }`}
          >
            {idx + 1}
          </span>
          {label}
        </li>
      ))}
    </ol>
  );
}
