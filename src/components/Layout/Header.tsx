import Image from "next/image";
import Logo from "@/../public/logo.svg";
import GlobalSearchServer from "@/components/GlobalSearchServer";
import { BreadcrumbTitle } from "@/components/Layout/BreadcrumbTitle";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import TransitionLink from "../TransitionLink";

export default function Header() {
  return (
    <nav className={"mb-5 flex items-center justify-between p-3 md:px-5"}>
      <div className={"flex items-center gap-2"}>
        <TransitionLink href={"/"}>
          <Image
            className={
              "aspect-square h-10 w-10 invert transition-transform hover:-rotate-6"
            }
            src={Logo}
            width={40}
            height={40}
            alt={"Logo"}
            priority
          />
        </TransitionLink>
        <BreadcrumbTitle />
      </div>
      <div className={"flex"}>
        <GlobalSearchServer />
        <ThemeSwitcher />
      </div>
    </nav>
  );
}
