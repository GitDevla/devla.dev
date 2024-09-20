"use client";

import { useDiscordStatus } from "./Context/DiscordContext";

export default function DiscordGenericActivityCard({
  className,
}: {
  className?: string;
}) {
  const discordData = useDiscordStatus();
  const activityD = discordData.activities
    .filter((i) => i.name != "Custom Status")
    .find((i) => i.name == "Code")!; //TODO: this is temporary till i figure out how to get activity icon hashes

  return (
    activityD && (
      <div
        className={`flex max-w-48 items-center overflow-hidden rounded-md bg-accentbackground bg-opacity-90 ${className}`}
      >
        {activityD.asset && (
          <img
            src={activityD.asset}
            alt="Activity Image"
            className="aspect-square h-full rounded-md object-cover"
          />
        )}
        <div className="w-full overflow-hidden p-2">
          <p className="truncate text-sm font-semibold">{activityD.name}</p>
          <p
            className="truncate text-xs text-gray-400"
            title={activityD.description}
          >
            {activityD.description}
          </p>
          <p
            className="truncate text-xs text-gray-400"
            title={activityD.details}
          >
            {activityD.details}
          </p>
        </div>
      </div>
    )
  );
}
