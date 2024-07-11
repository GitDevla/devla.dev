"use client";

import { Metadata } from "next";
import { usePathname, useRouter } from "next/navigation";

// is this lazy?

export function Title() {
  const pathname = usePathname();
  return (
    <div>
      <p>{pathname}</p>
    </div>
  );
}
