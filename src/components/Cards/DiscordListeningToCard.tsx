"use client";

import { useDiscordStatus } from "../Context/DiscordContext";

export default function DiscordListeningToCard({
  className,
}: {
  className?: string;
}) {
  const discordData = useDiscordStatus();
  const activityD = discordData.activities
    .filter((i) => i.name != "Custom Status")
    .find((i) => i.name == "postToP")!;

  return (
    activityD && (
      <div
        className={`flex max-w-48 items-center overflow-hidden rounded-md bg-accentbackground bg-opacity-90 ${className}`}
      >
        {activityD.asset && (
          <img
            src={activityD.asset}
            alt={"Activity Image"}
            className={"aspect-square h-full rounded-md object-cover"}
          />
        )}
        <div className={"w-full overflow-hidden p-2"}>
          <p className={"truncate text-sm font-semibold"}>Listening to</p>
          <p
            className={"truncate text-xs font-semibold"}
            title={activityD.details}
          >
            {activityD.details}
          </p>
          <p
            className={"truncate text-xs text-gray-400"}
            title={activityD.description}
          >
            by {activityD.description}
          </p>
        </div>
      </div>
    )
  );
}
