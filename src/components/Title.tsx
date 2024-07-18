"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function Title() {
  let pathname = usePathname();
  let isHome = pathname === "/";
  if (isHome) {
    pathname = "";
  }
  pathname = "~" + pathname;
  return (
    <Link href={"/"}>
      <div className="group flex ">
        <div className="mr-[1ch]">anon@devla.dev:{pathname}$</div>
        <div className="max-w-[0ch] group-hover:max-w-[4ch] transition-all ease-steps4 duration-400  overflow-hidden whitespace-nowrap">
          cd ~
        </div>
        <div className="animate-blink">_</div>
      </div>
    </Link>
  );
}
