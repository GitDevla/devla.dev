"use client";

import Link, { LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface TransitionLinkProps extends LinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}

export default function TransitionLink({
  children,
  href,
  className,
  ...props
}: TransitionLinkProps) {
  const path = usePathname();
  const router = useRouter();
  return (
    <Link
      className={className}
      onClick={async (e) => {
        if (href === path) {
          e.preventDefault();
          return;
        }
        if (process.env.NODE_ENV === "development") {
          return;
        }
        e.preventDefault();
        const main = document.querySelector("main");
        main?.classList.add("page-transition");
        await sleep(50);

        router.push(href);
        await sleep(50);
        main?.classList.remove("page-transition");
      }}
      href={href}
      {...props}
    >
      {children}
    </Link>
  );
}
