"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className="flex justify-center items-center p-2 w-20 h-10 rounded-full bg-accentbackground"
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
    >
      <p>{mounted ? (resolvedTheme === "light" ? "☾" : "☼") : " "}</p>
    </div>
  );
}
