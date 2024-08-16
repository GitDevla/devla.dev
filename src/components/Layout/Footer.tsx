import Link from "next/link";

export default function Footer() {
  return (
    <footer className="sticky top-[100vh] mb-5 mt-40">
      <p>
        This website is open-source on{" "}
        <Link
          href="https://github.com/GitDevla/devla.dev"
          target="_blank"
          className="link"
        >
          Github
        </Link>{" "}
        and still in development
      </p>
    </footer>
  );
}
