import SkillCard from "../Cards/SkillCard";

function splitIntoNChunks<T>(arr: T[], n: number): T[][] {
  const perChuck = Math.floor(arr.length / n);
  return Array.from({ length: n }, (_, i) =>
    arr.slice(i * perChuck, (i + 1) * perChuck),
  );
}

export default function TechSkillShowcase({ tech }: { tech: any[] }) {
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
    <div
      className={
        "group w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]"
      }
    >
      {parts.map((part, i) => (
        <CaruselRow key={i} tech={part} />
      ))}
    </div>
  );
}

function CaruselRow({ tech }: { tech: any[] }) {
  const animationDuration = tech.length * 7;
  return (
    <div className={"mb-2 flex gap-2"}>
      {[1, 2].map((_, i) => (
        <div
          className={"group-hover:pause flex animate-infiniteScroll gap-2"}
          style={{ animationDuration: `${animationDuration}s` }}
          key={i}
        >
          {tech.map((tech, i) => (
            <div key={i} className={"w-[30vw] max-w-[175px]"}>
              <SkillCard Tech={tech} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
