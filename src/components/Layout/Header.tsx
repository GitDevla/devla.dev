import GlobalSearchServer from "@/components/GlobalSearchServer";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { Title } from "@/components/Layout/Title";
import TransitionLink from "@/components/TransitionLink";

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
      <div className="flex">
        <GlobalSearchServer></GlobalSearchServer>
        <ThemeSwitcher></ThemeSwitcher>
      </div>
    </nav>
  );
}
