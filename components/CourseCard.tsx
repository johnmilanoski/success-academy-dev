import Image from "next/image";
export default function CourseCard({
  title,
  price,
}: {
  title: string;
  price: number;
}) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <Image
        src="/placeholder.svg"
        alt="course thumbnail"
        width={400}
        height={200}
        className="h-40 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="mb-1 line-clamp-2 text-sm font-semibold">{title}</h3>
        <p className="text-sm text-slate-500">${price}</p>
      </div>
    </div>
  );
}
