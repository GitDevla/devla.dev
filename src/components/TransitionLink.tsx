"use client";

import isProduction from "@/utils/isProd";
import Link, { LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

interface TransitionLinkProps extends LinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function TransitionLink({
  children,
  href,
  className,
  style,
  ...props
}: TransitionLinkProps) {
  const path = usePathname();
  const router = useRouter();
  return (
    <Link
      style={style}
      className={className}
      onClick={async (e) => {
        if (href === path) {
          e.preventDefault();
          return;
        }
        if (!isProduction) return;

        e.preventDefault();
        const main = document.querySelector("main");
        main?.classList.add("page-transition");
        await sleep(75);

        router.push(href);
        await sleep(75);
        main?.classList.remove("page-transition");
      }}
      href={href}
      {...props}
    >
      {children}
    </Link>
  );
}
