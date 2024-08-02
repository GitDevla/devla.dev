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
        className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-gray-800 bg-opacity-50"
        onClick={(e) => {
          if (e.target === e.currentTarget) setShown(false);
        }}
      >
        <div className="w-96 rounded-lg bg-background p-4">
          <input
            type="text"
            className="w-full rounded-lg border border-gray-300 bg-background p-2"
            placeholder="Search..."
            ref={input}
            autoFocus
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const page = pages.find((p) =>
                  p.title.toLowerCase().includes(search.toLocaleLowerCase()),
                );
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
                p.title
                  .toLowerCase()
                  .includes(search.toLocaleLowerCase() || ""),
              )
              .map((page, i) => (
                <Link
                  href={page.href}
                  key={i}
                  onClick={() => setShown(false)}
                  className="first:bg-accentbackground hover:!bg-accentbackground first:group-hover:bg-inherit"
                >
                  <li className="mb-2 rounded-lg border bg-inherit p-2">
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
