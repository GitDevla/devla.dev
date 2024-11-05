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
      <div className={"peer inline cursor-pointer"}>{children}</div>
      <div
        className={
          "pointer-events-none absolute -top-1 left-1/2 h-auto -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md border border-border bg-accentbackground px-2 py-1 text-sm opacity-0 transition-opacity first-letter:capitalize peer-hover:opacity-95"
        }
      >
        {hoverText}
      </div>
    </div>
  );
}
