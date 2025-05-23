"use client";
import Image from "next/image";

function typoFix(name: string) {
  switch (name) {
    case "chrome":
      return "googlechrome";
    case "tailwind css":
      return "tailwindcss";
    case "websocket":
      return "rocket";
    case "html":
      return "html5";
    case "css":
      return "css3";
    case "shell":
      return "gnubash";
    case "dockerfile":
      return "docker";
    case "scss":
      return "sass";
    case "batchfile":
      return "gnubash";
    default:
      return name;
  }
}

export default function SimpleIcon({
  name,
  width = 32,
  height = 32,
  className = "",
  sizes,
  useDefaultColor = false,
}: {
  name: string;
  width?: number;
  height?: number;
  hideIfNotFound?: boolean;
  className?: string;
  sizes?: string;
  useDefaultColor?: boolean;
}) {
  if (!name) return null;
  name = name.toLowerCase();
  name = typoFix(name);

  return (
    <div className={`${className}`}>
      <Image
        height={height}
        width={width}
        src={
          "https://cdn.simpleicons.org/" +
          name +
          (!useDefaultColor ? "/000/fff" : "")
        }
        sizes={sizes}
        alt={"Simple Icon - " + name}
        onError={(e) => {
          e.preventDefault();
          //@ts-ignore
          e.currentTarget.parentElement.style.display = "none";
          return false;
        }}
      />
    </div>
  );
}
