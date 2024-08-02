import Link from "next/link";

export default function LinkCard({
  name,
  description: desctiption,
  href,
}: {
  name: string;
  description: string;
  href: string;
}) {
  return (
    <Link href={href}>
      <div className="card h-full transition-colors">
        <h3 className="font-bold">{name}</h3>
        <p className="text-sm text-secondaryText">{desctiption}</p>
      </div>
    </Link>
  );
}
