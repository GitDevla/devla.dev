import SimpleIcon from "../SimpleIcon";

export default function SkillCard({ Tech }: { Tech: ITechSkill }) {
  const { name, icon, href } = Tech;
  return (
    <a href={href} target="_blank">
      <div className="card grid grid-cols-[1fr_3fr] items-center gap-x-4 p-3">
        <SimpleIcon name={icon}></SimpleIcon>
        <span className="truncate text-sm">{name}</span>
      </div>
    </a>
  );
}
