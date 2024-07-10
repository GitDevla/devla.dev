"use client";

import { useState } from "react";

async function fetchStatus() {
  const response = await fetch(
    "https://api.lanyard.rest/v1/users/363301732836704257"
  );
  const data = (await response.json()) as ILanyardResponse;
  return data;
}

export default function DiscordStatusDot({
  className,
}: {
  className?: string;
}) {
  const [status, setStatus] = useState("offline");

  fetchStatus().then((data) => {
    setStatus(data.data.discord_status);
  });

  //   setInterval(() => {
  //     fetchStatus().then((data) => {
  //       if (status != data.data.discord_status)
  //         setStatus(data.data.discord_status);
  //     });
  //   }, 10000);

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
