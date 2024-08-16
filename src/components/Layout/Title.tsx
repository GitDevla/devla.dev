"use client";

import { usePathname } from "next/navigation";
import TransitionLink from "@/components/TransitionLink";

export function Title() {
  let pathname = usePathname();
  let isHome = pathname === "/";
  if (isHome) {
    pathname = "";
  }
  pathname = "~" + pathname;
  return (
    <TransitionLink href={"/"}>
      <div className="group flex">
        <div className="mr-[1ch]">anon@devla.dev:{pathname}$</div>
        <div className="duration-400 max-w-[0ch] overflow-hidden whitespace-nowrap transition-all ease-steps4 group-hover:max-w-[4ch]">
          cd ~
        </div>
        <div className="animate-blink">_</div>
      </div>
    </TransitionLink>
  );
}
