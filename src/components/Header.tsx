import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";
import { Title } from "./Title";
import TransitionLink from "./TransitionLink";

export default function Header() {
  return (
    <nav className="mb-5 flex items-center justify-between p-3 md:px-5">
      <div className="flex items-center">
        <div className="hidden md:block">
          <Title></Title>
        </div>

        <TransitionLink className="block md:hidden" href={"/"}>
          {"<-"} Go Home
        </TransitionLink>
      </div>
      <ThemeSwitcher></ThemeSwitcher>
    </nav>
  );
}
