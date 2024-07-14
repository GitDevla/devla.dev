import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-40 mb-5 sticky top-[100vh]">
      <Link href="https://github.com/GitDevla/devla.dev" target="_blank">
        <p>This website is open-source on Github and still in development</p>
      </Link>
    </footer>
  );
}
