"use client";

import pullDiscordStatus from "@/services/Discord";
import { createContext, useContext, useEffect, useState } from "react";

const defaultDiscordStatus = "offline";
const DiscordStatus = createContext(defaultDiscordStatus);

export function DiscordContext({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [status, setStatus] = useState(defaultDiscordStatus);
  useEffect(() => {
    pullDiscordStatus().then((data) => {
      setStatus(data.data.discord_status);
    });

    const interval = setInterval(() => {
      pullDiscordStatus().then((data) => {
        if (status != data.data.discord_status)
          setStatus(data.data.discord_status);
      });
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, []);
  return (
    <DiscordStatus.Provider value={status}>{children}</DiscordStatus.Provider>
  );
}

export const useDiscordStatus = () => useContext(DiscordStatus);
