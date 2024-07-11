import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";
import { metadata } from "@/app/layout";
import { Title } from "./Title";

export default function Header() {
  const title = metadata.title?.toString().split(" | ")[1];

  return (
    <nav className="p-3 flex justify-between items-center pl-5 mb-5">
      <div className="flex items-center">
        {/* <SimpleIcon name="github"></SimpleIcon> */}
        <Link href={"/"}>
          <Title></Title>
        </Link>
      </div>
      <ThemeSwitcher></ThemeSwitcher>
    </nav>
  );
}
