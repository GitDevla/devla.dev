"use client";

import pullDiscordStatus from "@/services/Discord";
import { useEffect, useState } from "react";

export default function DiscordStatusDot({
  className,
}: {
  className?: string;
}) {
  const [status, setStatus] = useState("offline");

  useEffect(() => {
    pullDiscordStatus().then((data) => {
      setStatus(data.data.discord_status);
    });

    const interval = setInterval(() => {
      pullDiscordStatus().then((data) => {
        if (status != data.data.discord_status)
          setStatus(data.data.discord_status);
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  let color;
  switch (status) {
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
      <span className={`flex w-6 h-6 rounded-full ${color}`}></span>
    </div>
  );
}
