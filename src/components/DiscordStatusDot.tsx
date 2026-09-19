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
      color = "bg-success";
      break;
    case "dnd":
      color = "bg-danger";
      break;
    case "idle":
      color = "bg-warning";
      break;
    default:
      color = "bg-muted";
  }
  return (
    <Hover className={className} hoverText={discordData.status}>
      <span
        className={`flex aspect-square size-full rounded-full ${color} transition-colors`}
      />
    </Hover>
  );
}
