"use client";

import { usePathname } from "next/navigation";
import Link from "../Atoms/Link";

export function BreadcrumbTitle() {
  let pathname = usePathname();

  let paths = pathname.split("/").filter((path) => path !== "");
  paths = ["Home", ...paths];
  return (
    <div className={"group flex"}>
      {paths.map((path, index) => (
        <div key={index} className={"flex"}>
          <Link
            href={`/${paths.slice(1, index + 1).join("/")}`}
            className={`mr-1 capitalize ${index !== paths.length - 1 && "underlinea underlinea-secondaryText underlinea-w-0"}`}
            style={{
              fontWeight: index === paths.length - 1 ? "600" : "300",
              color:
                index === paths.length - 1
                  ? "rgb(var(--primaryText))"
                  : "rgb(var(--secondaryText))",
            }}
          >
            {path}
          </Link>
          {index !== paths.length - 1 && <div className={"mr-1"}>/</div>}
        </div>
      ))}
    </div>
  );
}
