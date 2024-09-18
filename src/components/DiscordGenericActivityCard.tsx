"use client";

import { useDiscordStatus } from "./Context/DiscordContext";

export default function DiscordGenericActivityCard({
  className,
  activity,
}: {
  className?: string;
  activity?: string;
}) {
  const discordData = useDiscordStatus();
  const activityD = discordData.activities
    .filter((i) => i.name != "Custom Status")
    .find((i) => (activity ? i.name == activity : i.name != "postToP"))!;

  return (
    activityD && (
      <div
        className={`flex max-w-48 items-center overflow-hidden rounded-md bg-accentbackground ${className}`}
      >
        {activityD.asset && (
          <img
            src={activityD.asset}
            alt="Activity Image"
            className="aspect-square h-10 rounded-md object-cover"
          />
        )}
        <div className="w-full overflow-hidden p-2">
          <p className="truncate text-sm font-semibold">{activityD.name}</p>
          <p className="truncate text-xs text-gray-400">{activityD.details}</p>
          <p className="truncate text-xs text-gray-400">
            {activityD.description}
          </p>
        </div>
      </div>
    )
  );
}
