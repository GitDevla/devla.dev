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
    (a, b) => (categoryCount.get(b) || 0) - (categoryCount.get(a) || 0)
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
    <section className="my-10">
      <h2 className="mb-3 text-1xl  font-bold uppercase">Tech Stack</h2>
      <div className="flex  gap-y-1 flex-wrap justify-evenly mb-5 w-full">
        <div
          onMouseEnter={() => setHoveredCategory(null)}
          className={
            "p-4 w-full max-w-28 text-center rounded-full uppercase text-xs font-semibold text-secondaryText bg-accentbackground"
          }
        >
          <span className={!hoveredCategory ? "text-highlight" : ""}>All</span>
        </div>
        {categories.map((category, i) => (
          <div
            key={i}
            onMouseEnter={() => setHoveredCategory(category)}
            className={
              "p-4 w-full max-w-28 text-center rounded-full uppercase text-xs font-semibold text-secondaryText bg-accentbackground"
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
      <div className="grid h-[calc(100%/3)] overflow-hidden grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-2 ">
        {techStack.map(
          (tech, i) =>
            (!hoveredCategory || tech.category.includes(hoveredCategory)) && (
              <SkillCard key={i} Tech={tech}></SkillCard>
            )
        )}
      </div>
    </section>
  );
}
