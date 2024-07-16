export default function ExpandingPill({
  defaultText,
  children,
}: {
  defaultText: React.ReactNode;
  children: React.ReactNode[];
}) {
  return (
    <div className="relative w-full gap-1">
      <div className="group flex">
        {defaultText}
        <div className="flex gap-1 transition-all w-0 overflow-hidden max-w-0 group-hover:max-w-full group-hover:w-full">
          {children.map((child, i) => (
            <div key={i}>{child}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
