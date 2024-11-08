"use client";
import { useState } from "react";

export default function Hover({
  children,
  className,
  hoverText,
}: {
  children?: React.ReactNode;
  className?: string;
  hoverText: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`${className} relative inline`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={"inline cursor-pointer"}>{children}</div>
      {isHovered && (
        <div
          className={
            "pointer-events-none absolute -top-1 left-1/2 h-auto -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md border border-border bg-accentbackground px-2 py-1 text-sm opacity-95 transition-opacity first-letter:capitalize"
          }
        >
          {hoverText}
        </div>
      )}
    </div>
  );
}
