import ThemeSwitcher from "./ThemeSwitcher";
import { Title } from "./Title";

export default function Header() {
  return (
    <nav className="p-3 flex justify-between items-center pl-5 mb-5">
      <div className="flex items-center">
        <Title></Title>
      </div>
      <ThemeSwitcher></ThemeSwitcher>
    </nav>
  );
}
