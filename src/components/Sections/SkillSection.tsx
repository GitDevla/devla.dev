"use client";
import { useState } from "react";
import SkillCard from "../Cards/SkillCard";

function orderByNumberOfOccurrences(techStack: ITechSkill[]) {
  let categories = [
    ...new Set(techStack.flatMap((tech: ITechSkill) => tech.category)),
  ];
  let categoryCount = new Map<string, number>();
  techStack.forEach((tech) => {
    tech.category.forEach((category) => {
      categoryCount.set(category, (categoryCount.get(category) || 0) + 1);
    });
  });
  return categories.sort(
    (a, b) => (categoryCount.get(b) || 0) - (categoryCount.get(a) || 0),
  );
}

export default function SkillSection({
  techStack,
}: {
  techStack: ITechSkill[];
}) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  let categories = orderByNumberOfOccurrences(techStack);
  techStack = techStack.sort((a, b) => a.name.localeCompare(b.name));
  return (
    <section>
      <h2 className="subheader">Tech Stack</h2>
      <div className="mb-5 flex w-full flex-wrap justify-evenly gap-y-1">
        <div
          onMouseEnter={() => setHoveredCategory(null)}
          className={
            "w-full max-w-28 rounded-full bg-accentbackground p-4 text-center text-xs font-semibold uppercase text-secondaryText"
          }
        >
          <span className={!hoveredCategory ? "text-highlight" : ""}>All</span>
        </div>
        {categories.map((category, i) => (
          <div
            key={i}
            onMouseEnter={() => setHoveredCategory(category)}
            className={
              "w-full max-w-28 rounded-full bg-accentbackground p-4 text-center text-xs font-semibold uppercase text-secondaryText"
            }
          >
            <span
              className={hoveredCategory === category ? "text-highlight" : ""}
            >
              {category}
            </span>
          </div>
        ))}
      </div>
      <div className="grid h-[calc(100%/3)] grid-cols-2 gap-x-2 gap-y-2 overflow-hidden md:grid-cols-3 lg:grid-cols-5">
        {techStack.map(
          (tech, i) =>
            (!hoveredCategory || tech.category.includes(hoveredCategory)) && (
              <SkillCard key={i} Tech={tech}></SkillCard>
            ),
        )}
      </div>
    </section>
  );
}
