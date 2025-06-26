export default function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border bg-white p-4 shadow">
      <h4 className="mb-2 text-sm font-semibold text-slate-600">{title}</h4>
      {children}
    </div>
  );
}
