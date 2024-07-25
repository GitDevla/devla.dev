"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function keypressIsLetter(key: string) {
  return /^[a-zA-Z]$/.test(key);
}

function insideEditable(t: HTMLElement) {
  return (
    t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable
  );
}

export default function GlobalSearchClient({
  pages,
}: {
  pages: { title: string; href: string }[];
}) {
  const router = useRouter();
  const [shown, setShown] = useState(false);
  const input = useRef<HTMLInputElement | null>(null);
  const [search, setSearch] = useState("");
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setShown(false);
      if (e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) return;

      if (insideEditable(e.target as HTMLElement)) return;
      else if (keypressIsLetter(e.key)) {
        setShown(true);
        if (input.current) {
          input.current.focus();
          if (process.env.NODE_ENV == "production") input.current.value = e.key;
        }
      }
    });
  }, []);

  return (
    shown && (
      <div
        className="fixed z-50 top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center"
        onClick={(e) => {
          if (e.target === e.currentTarget) setShown(false);
        }}
      >
        <div className="p-4 rounded-lg w-96 bg-background">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg bg-background"
            placeholder="Search..."
            ref={input}
            autoFocus
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const page = pages.find((p) =>
                  p.title.toLowerCase().includes(search.toLocaleLowerCase())
                );
                console.log(page);
                if (page) {
                  router.push(page.href);
                  setShown(false);
                }
              }
            }}
          />
          <ul className="group">
            {pages
              .filter((p) =>
                p.title.toLowerCase().includes(search.toLocaleLowerCase() || "")
              )
              .map((page, i) => (
                <Link
                  href={page.href}
                  key={i}
                  onClick={() => setShown(false)}
                  className="first:bg-accentbackground hover:!bg-accentbackground first:group-hover:bg-inherit"
                >
                  <li className="border mb-2 rounded-lg p-2 bg-inherit">
                    <span className="capitalize">{page.title}</span>
                  </li>
                </Link>
              ))}
          </ul>
        </div>
      </div>
    )
  );
}
