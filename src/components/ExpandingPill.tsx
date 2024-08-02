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
        <div className="flex w-0 max-w-0 gap-1 overflow-hidden transition-all group-hover:w-full group-hover:max-w-full">
          {children.map((child, i) => (
            <div key={i}>{child}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
