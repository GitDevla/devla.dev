"use client";
import { useState, ReactNode } from "react";
import SkillCard from "../Cards/SkillCard";

export default function SkillSection({
  techStack,
  categories,
  children,
}: {
  techStack: ITechSkill[];
  children: ReactNode;
  categories: string[];
}) {
  const [activeCategory, setActiveCategory] = useState<string>("");

  return (
    <section>
      <h2 className={"subheader"}>Tech Stack</h2>
      <div
        role={"tablist"}
        aria-label={"Tech stack categories"}
        className={"mb-6 flex w-full flex-wrap justify-center gap-2"}
      >
        {["", ...categories].map((category) => (
          <CategoryPill
            key={category}
            label={category || "All"}
            selected={activeCategory === category}
            onSelect={() => setActiveCategory(category)}
          />
        ))}
      </div>
      <div className={"min-h-[200px] overflow-clip"}>
        {activeCategory ? (
          <div
            className={
              "spotlight grid grid-cols-3 gap-2 overflow-hidden md:grid-cols-4 lg:grid-cols-5"
            }
          >
            {techStack.map(
              (tech, i) =>
                tech.category.includes(activeCategory) && (
                  <SkillCard key={i} Tech={tech} />
                ),
            )}
          </div>
        ) : (
          children
        )}
      </div>
    </section>
  );
}

function CategoryPill({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type={"button"}
      role={"tab"}
      aria-selected={selected}
      onClick={onSelect}
      className={`cursor-pointer rounded-full border px-4 py-2 text-xs font-bold tracking-wide uppercase transition-colors ${
        selected
          ? "border-primary bg-primary text-on-primary"
          : "border-border bg-surface text-muted hover:border-primary/40 hover:text-text"
      }`}
    >
      {label}
    </button>
  );
}
