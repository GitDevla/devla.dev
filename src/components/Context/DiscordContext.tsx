"use client";

import pullDiscordStatus from "@/services/Discord";
import { createContext, useContext, useEffect, useState } from "react";

const defaultDiscordData: {
  status: string;
  activities: {
    name: string;
    description: string | undefined;
    details: string | undefined;
    asset: string | undefined;
  }[];
} = {
  status: "offline",
  activities: [],
};
const DiscordDataContext = createContext(defaultDiscordData);

export function DiscordContext({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [discordData, setDiscordData] = useState(defaultDiscordData);
  useEffect(() => {
    pullDiscordStatus().then((data) => {
      const status = data.data.discord_status;
      const activities = data.data.activities.map((activity) => ({
        name: activity.name,
        description: activity.state,
        details: activity.details,
        asset: "https://" + activity.assets?.large_image.split("/https/")[1],
      }));
      setDiscordData({ status, activities });
    });

    const interval = setInterval(() => {
      pullDiscordStatus().then((data) => {
        const status = data.data.discord_status;
        const activities = data.data.activities.map((activity) => ({
          name: activity.name,
          description: activity.state,
          details: activity.details,

          asset: "https://" + activity.assets?.large_image.split("/https/")[1],
        }));
        setDiscordData({ status, activities });
      });
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, []);
  return (
    <DiscordDataContext.Provider value={discordData}>
      {children}
    </DiscordDataContext.Provider>
  );
}

export const useDiscordStatus = () => useContext(DiscordDataContext);
