import GlobalSearchServer from "@/components/GlobalSearchServer";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { BreadcrumbTitle } from "@/components/Layout/BreadcrumbTitle";
import Image from "next/image";
import TransitionLink from "../TransitionLink";

export default function Header() {
  return (
    <nav className="mb-5 flex items-center justify-between p-3 md:px-5">
      <div className="flex items-center gap-2">
        <TransitionLink href="/">
          <Image
            className="aspect-square h-10 w-10 invert transition-transform hover:-rotate-6"
            src="/logo.svg"
            width={40}
            height={40}
            alt="Logo"
            priority
          />
        </TransitionLink>
        <BreadcrumbTitle />
      </div>
      <div className="flex">
        <GlobalSearchServer></GlobalSearchServer>
        <ThemeSwitcher></ThemeSwitcher>
      </div>
    </nav>
  );
}
