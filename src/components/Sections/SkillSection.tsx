"use client";
import React, { Suspense, useState } from "react";
import SkillCard from "../Cards/SkillCard";
import TechCarusel from "../TechCarusel";

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

// TODO: clean this up later

export default function SkillSection({
  techStack,
  children,
}: {
  techStack: ITechSkill[];
  children: React.ReactNode;
}) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>("");
  let categories = orderByNumberOfOccurrences(techStack);
  techStack = techStack.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <section>
      <h2 className="subheader">Tech Stack</h2>
      <div className="mb-5 flex w-full flex-wrap justify-evenly gap-y-1">
        <div
          onClick={() => setHoveredCategory("")}
          className={
            "w-full max-w-28 cursor-pointer rounded-full bg-accentbackground p-4 text-center text-xs font-semibold uppercase text-secondaryText"
          }
        >
          <span className={!hoveredCategory ? "text-highlight" : ""}>All</span>
        </div>
        {categories.map((category, i) => (
          <div
            key={i}
            onClick={() => setHoveredCategory(category)}
            className={
              "w-full max-w-28 cursor-pointer rounded-full bg-accentbackground p-4 text-center text-xs font-semibold uppercase text-secondaryText"
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
      <div className="h-[200px] overflow-clip">
        {hoveredCategory ? (
          <div className="grid grid-cols-3 gap-x-2 gap-y-2 overflow-hidden md:grid-cols-4 lg:grid-cols-5">
            {techStack.map(
              (tech, i) =>
                (!hoveredCategory ||
                  tech.category.includes(hoveredCategory)) && (
                  <SkillCard key={i} Tech={tech}></SkillCard>
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
