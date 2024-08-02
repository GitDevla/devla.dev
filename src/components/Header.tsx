import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";
import { Title } from "./Title";

export default function Header() {
  return (
    <nav className="mb-5 flex items-center justify-between p-3 md:px-5">
      <div className="flex items-center">
        <p className="hidden md:block">
          <Title></Title>
        </p>

        <Link className="block md:hidden" href={"/"}>
          Go Home
        </Link>
      </div>
      <ThemeSwitcher></ThemeSwitcher>
    </nav>
  );
}
