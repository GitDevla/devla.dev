import SimpleIcon from "../SimpleIcon";

export default function SkillCard({ Tech }: { Tech: ITechSkill }) {
  const { name, icon, href } = Tech;
  return (
    <a href={href} target={"_blank"}>
      <div className={"card grid grid-cols-[1fr_3fr] items-center gap-x-4 p-3"}>
        <div>
          <SimpleIcon
            name={icon}
            sizes={"(min-width: 600px) 32px, calc(7.14vw - 9px)"}
          ></SimpleIcon>
        </div>
        <span className={"truncate text-sm"}>{name}</span>
      </div>
    </a>
  );
}
