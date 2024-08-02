"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Title() {
  let pathname = usePathname();
  let isHome = pathname === "/";
  if (isHome) {
    pathname = "";
  }
  pathname = "~" + pathname;
  return (
    <Link href={"/"}>
      <div className="group flex">
        <div className="mr-[1ch]">anon@devla.dev:{pathname}$</div>
        <div className="duration-400 max-w-[0ch] overflow-hidden whitespace-nowrap transition-all ease-steps4 group-hover:max-w-[4ch]">
          cd ~
        </div>
        <div className="animate-blink">_</div>
      </div>
    </Link>
  );
}
