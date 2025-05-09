import SimpleIcon from "../Image/SimpleIcon";

export default function SkillPill({ name }: Readonly<{ name: string }>) {
  return (
    <div
      className={
        "mr-1 flex items-center gap-1 rounded-full border border-primaryText bg-accentbackground p-1 px-2 text-xs"
      }
    >
      <SimpleIcon
        name={name}
        height={16}
        width={16}
        hideIfNotFound={true}
        className={"h-[16px] w-[16px]"}
      />
      <span className={"uppercase"}>{name}</span>
    </div>
  );
}
