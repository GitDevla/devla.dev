export default function ExpandingPill({
  defaultText,
  children,
}: {
  defaultText: React.ReactNode;
  children: React.ReactNode[];
}) {
  return (
    <div>
      <button className="flex items-center gap-1 group">
        <span>{defaultText}</span>
        <div className="flex gap-1 transition-all duration-500  w-auto overflow-hidden max-w-0 group-hover:max-w-full">
          {children.slice(1).map((child, i) => (
            <div key={i}>{child}</div>
          ))}
        </div>
      </button>
    </div>
  );
}
