import SkillCard from "./Cards/SkillCard";

function splitIntoNChunks<T>(arr: T[], n: number): T[][] {
  const perChuck = Math.floor(arr.length / n);
  return Array.from({ length: n }, (_, i) =>
    arr.slice(i * perChuck, (i + 1) * perChuck),
  );
}

export default function TechCarusel({ tech }: { tech: any[] }) {
  const parts = splitIntoNChunks(tech, 3);
  switch (tech.length % 3) {
    case 1:
      parts[1].push(tech[tech.length - 1]);
      break;
    case 2:
      parts[0].push(tech[tech.length - 2]);
      parts[2].push(tech[tech.length - 1]);
  }
  return (
    <div className="group w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
      {parts.map((part, i) => (
        <CaruselRow key={i} tech={part}></CaruselRow>
      ))}
    </div>
  );
}

function CaruselRow({ tech, className }: { tech: any[]; className?: string }) {
  const animationDuration = tech.length * 3;
  return (
    <div className={`mb-2 flex gap-2 ${className}`}>
      <div
        className="group-hover:pause flex animate-infiniteScroll gap-2 will-change-transform"
        style={{ animationDuration: `${animationDuration}s` }}
      >
        {tech.map((tech, i) => (
          <div key={i} className="w-[175px]">
            <SkillCard Tech={tech}></SkillCard>
          </div>
        ))}
      </div>
      <div
        className="group-hover:pause flex animate-infiniteScroll gap-2 will-change-transform"
        aria-hidden="true"
        style={{ animationDuration: `${animationDuration}s` }}
      >
        {tech.map((tech, i) => (
          <div key={i} className="w-[175px]">
            <SkillCard Tech={tech}></SkillCard>
          </div>
        ))}
      </div>
    </div>
  );
}
