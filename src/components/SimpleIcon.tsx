import Image from "next/image";

export default async function SimpleIcon({
  name,
  width = 32,
  height = 32,
  hideIfNotFound = false,
  className = "",
}: {
  name: string;
  width?: number;
  height?: number;
  hideIfNotFound?: boolean;
  className?: string;
}) {
  if (!name) return null;
  name = name.toLowerCase();
  if (hideIfNotFound) {
    let exists = await fetch("https://cdn.simpleicons.org/" + name + "/fff");
    if (!exists.ok) return null;
  }
  return (
    <div className={className}>
      <Image
        height={height}
        width={width}
        src={"https://cdn.simpleicons.org/" + name + "/fff"}
        alt={"Simple Icon - " + name}
      />
    </div>
  );
}
