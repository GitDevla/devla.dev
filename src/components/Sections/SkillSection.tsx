"use client";
import { useState } from "react";

export default function SkillSection({
  techStack,
  techCards,
}: {
  techStack: ITechSkill[];
  techCards: JSX.Element[];
}) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const categories = [
    ...new Set(techStack.flatMap((tech: ITechSkill) => tech.category)),
  ];
  return (
    <section className="my-10">
      <h2 className="mb-3 text-1xl  font-bold uppercase">Tech Stack</h2>
      <div className="flex gap-5 justify-evenly mb-5">
        {categories.map((category, i) => (
          <div
            key={i}
            onMouseEnter={() => setHoveredCategory(category)}
            className={
              "p-4 w-[11%] text-center rounded-full uppercase text-xs font-semibold text-secondaryText-light dark:text-secondaryText-dark bg-accentbackground-light dark:bg-accentbackground-dark"
            }
          >
            <span
              className={
                hoveredCategory === category
                  ? "text-highlight-light dark:text-highlight-dark "
                  : ""
              }
            >
              {category}
            </span>
          </div>
        ))}
      </div>
      <div className="grid grid-rows-3 h-[calc(100%/3)] overflow-hidden grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-2 ">
        {/* todo this is cheese af*/}
        {techStack.map(
          (tech, i) =>
            (!hoveredCategory || tech.category.includes(hoveredCategory)) &&
            techCards[i]
        )}
      </div>
    </section>
  );
}
