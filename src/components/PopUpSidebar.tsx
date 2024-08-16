"use client";

import { useState } from "react";

export default function PopUpSidebar({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={`fixed left-0 top-0 h-screen w-screen ${!isOpen && "-translate-x-full"} z-50 bg-accentbackground bg-opacity-80 pl-5 pt-5 backdrop-blur-sm transition-transform sm:w-[30%] sm:max-w-[300px]`}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold">{title}</h1>
      </div>
      <div
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (target.tagName === "A") {
            setIsOpen(false);
          }
        }}
      >
        {children}
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute right-0 top-16 z-50 h-12 w-12 translate-x-1/2 rounded-full bg-accentbackground"
      >
        {isOpen ? "<" : ">"}
      </button>
    </nav>
  );
}
