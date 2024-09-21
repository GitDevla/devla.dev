export default function Hover({
  children,
  className,
  hoverText,
}: {
  children?: React.ReactNode;
  className?: string;
  hoverText: string;
}) {
  return (
    <div className={`${className} relative inline`}>
      <div className={`peer inline cursor-pointer`}>{children}</div>
      <div className="pointer-events-none absolute left-1/2 top-0 h-auto -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md border border-border bg-accentbackground px-2 py-1 text-sm capitalize opacity-0 transition-opacity peer-hover:opacity-95">
        {hoverText}
      </div>
    </div>
  );
}
