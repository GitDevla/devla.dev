"use client";
import { useState } from "react";
import SkillCard from "../Cards/SkillCard";

export default function SkillSection({
  techStack,
}: {
  techStack: ITechSkill[];
}) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  let categories = [
    ...new Set(techStack.flatMap((tech: ITechSkill) => tech.category)),
  ];
  categories = categories.sort((a, b) => a.localeCompare(b));

  return (
    <section className="my-10">
      <h2 className="mb-3 text-1xl  font-bold uppercase">Tech Stack</h2>
      <div className="flex gap-5 justify-evenly mb-5">
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
      <div className="grid grid-rows-3 h-[calc(100%/3)] overflow-hidden grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-2 ">
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
