import SimpleIcon from "../SimpleIcon";

export default function SkillPill({ name }: Readonly<{ name: string }>) {
  return (
    <div className="text-xs bg-accentbackground p-1 px-2 flex items-center rounded-full mr-1 gap-1 border border-primaryText">
      <SimpleIcon
        name={name}
        height={16}
        width={16}
        hideIfNotFound={true}
        className="w-[16px] h-[16px]"
      ></SimpleIcon>
      <span className="uppercase font-thin">{name}</span>
    </div>
  );
}
