export default function Hover({
  children,
  className,
  hoverText,
}: {
  children: React.ReactNode;
  className?: string;
  hoverText: string;
}) {
  return (
    <span className={`group relative underline ${className}`}>
      {children}
      <div className="absolute left-1/2 top-0 h-auto -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md border border-border bg-accentbackground p-2 opacity-0 transition-opacity group-hover:opacity-95">
        {hoverText}
      </div>
    </span>
  );
}
