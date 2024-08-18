"use client";

import { usePathname } from "next/navigation";
import TransitionLink from "@/components/TransitionLink";

export function BreadcrumbTitle() {
  let pathname = usePathname();

  let paths = pathname.split("/").filter((path) => path !== "");
  paths = ["Home", ...paths];
  return (
    <div className="group flex">
      {paths.map((path, index) => (
        <div key={index} className="flex">
          <TransitionLink
            href={`/${paths.slice(1, index + 1).join("/")}`}
            className={`mr-1 capitalize hover:underline ${index === paths.length - 1 ? "font-bold" : "text-secondaryText"}`}
          >
            {path}
          </TransitionLink>
          {index !== paths.length - 1 && <div className="mr-1">{`/`}</div>}
        </div>
      ))}
    </div>
  );
}
