"use client";

import { useDiscordStatus } from "./Context/DiscordContext";

export default function DiscordStatusDot({
  className,
}: {
  className?: string;
}) {
  const discordData = useDiscordStatus();

  let color;
  switch (discordData.status) {
    case "online":
      color = "bg-green-500";
      break;
    case "dnd":
      color = "bg-red-500";
      break;
    case "idle":
      color = "bg-yellow-500";
      break;
    default:
      color = "bg-gray-500";
  }
  return (
    <div className={className}>
      <span
        className={`flex h-6 w-6 rounded-full ${color} transition-colors`}
      ></span>
    </div>
  );
}
