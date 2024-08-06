"use client";

import { useEffect, useState } from "react";

export default function GoToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(window.scrollY > 200);
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className={`fixed bottom-4 right-9 z-50 h-12 w-12 rounded-full bg-accentbackground p-2 text-center ${visible ? "opacity-100" : "pointer-events-none opacity-0"} transition-opacity`}
    >
      ▲
    </button>
  );
}
