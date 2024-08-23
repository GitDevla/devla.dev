export default function ExpandingPill({
  defaultText,
  children,
}: {
  defaultText: React.ReactNode;
  children: React.ReactNode[];
}) {
  return (
    <div className="relative flex w-full gap-1">
      <div className="peer">{defaultText}</div>
      <div className="flex w-0 gap-1 overflow-hidden transition-[width] hover:w-full peer-hover:w-full">
        {children.map((child, i) => (
          <div key={i}>{child}</div>
        ))}
      </div>
    </div>
  );
}
