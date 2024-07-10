"use client";
import { useState } from "react";

export default function ExpandingPill({
  defaultText,
  children,
}: {
  defaultText: React.ReactNode;
  children: React.ReactNode[];
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <button
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        className="flex items-center gap-1"
      >
        <span>{defaultText}</span>
        <div
          className={`flex gap-1 transition-all duration-500  w-auto overflow-hidden ${
            expanded ? "max-w-full" : "max-w-0"
          }`}
        >
          {children.slice(1).map((child, i) => (
            <div key={i}>{child}</div>
          ))}
        </div>
      </button>
    </div>
  );
}
