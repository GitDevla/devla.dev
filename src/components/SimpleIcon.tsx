import Image from "next/image";

export default function SimpleIcon({ name }: { name: string }) {
  return (
    <Image
      height="32"
      width="32"
      src={"https://cdn.simpleicons.org/" + name + "/fff"}
      alt={"Simple Icon - " + name}
    />
  );
}
