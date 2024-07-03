import SimpleIcon from "../SimpleIcon";

export default function SkillCard({ Tech }: { Tech: ITechSkill }) {
  const { name, icon, href } = Tech;
  return (
    <a href={href} target="_blank">
      <div className="grid row-1 grid-cols-[1fr_3fr] items-center  w-full p-3 gap-x-4 card">
        <SimpleIcon name={icon}></SimpleIcon>
        <span className="truncate text-sm">{name}</span>
      </div>
    </a>
  );
}
