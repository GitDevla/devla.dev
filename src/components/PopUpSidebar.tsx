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
      className={`fixed top-0 left-0 h-screen w-screen ${!isOpen && "-translate-x-full"} z-50 bg-raised/80 pt-6 pl-6 backdrop-blur-xs transition-transform sm:w-[30%] sm:max-w-[300px]`}
    >
      <div className={"flex items-center justify-between"}>
        <h1 className={"text-lg font-bold"}>{title}</h1>
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
        className={
          "absolute top-16 right-0 z-50 h-12 w-12 translate-x-1/2 rounded-full bg-raised"
        }
      >
        {isOpen ? "<" : ">"}
      </button>
    </nav>
  );
}
