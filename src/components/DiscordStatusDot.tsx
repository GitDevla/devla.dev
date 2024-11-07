"use client";

import { useDiscordStatus } from "./Context/DiscordContext";
import Hover from "./Atoms/Hover";

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
    <Hover className={className} hoverText={discordData.status}>
      <span
        className={`flex aspect-square size-full rounded-full ${color} transition-colors`}
      />
    </Hover>
  );
}
