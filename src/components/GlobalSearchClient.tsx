"use client";

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
  pages: { title: string; href: string; type: string }[];
}) {
  const router = useRouter();
  const [extended, setExtended] = useState(false);
  const input = useRef<HTMLInputElement | null>(null);
  const element = useRef<HTMLDivElement | null>(null);
  const [search, setSearch] = useState("");

  const matches = pages.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()),
  );

  function handleClickOutside(event: MouseEvent) {
    if (element.current && !element.current.contains(event.target as Node))
      setExtended(false);
  }

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setExtended(false);
      if (e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) return;

      if (insideEditable(e.target as HTMLElement)) return;
      if (!keypressIsLetter(e.key)) return;
      setExtended(true);
      if (input.current) {
        input.current.focus();
        if (process.env.NODE_ENV == "production") input.current.value = e.key;
      }
    });
  }, []);

  useEffect(() => {
    if (extended) document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [extended]);

  return (
    <div className="relative" ref={element}>
      <input
        type="text"
        className="w-full rounded-lg bg-inherit p-2 outline-none"
        placeholder="Search..."
        ref={input}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setExtended(true);
        }}
        onClick={() => setExtended(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const page = pages.find((p) =>
              p.title.toLowerCase().includes(search.toLocaleLowerCase()),
            );
            if (page) {
              navigateToPage(page);
            }
          }
        }}
      />
      {extended && (
        <div className="absolute z-50 max-h-[200px] w-full overflow-scroll rounded-lg rounded-t-none border border-t-0 border-accentbackground bg-background p-2">
          <ul className="group">
            {matches.length ? (
              matches.map((page, i) => (
                <li
                  key={i}
                  onClick={() => {
                    console.log("clicked");
                    navigateToPage(page);
                  }}
                  className="mb-2 cursor-pointer rounded-lg bg-inherit p-2 first:bg-accentbackground hover:!bg-accentbackground first:group-hover:bg-inherit"
                >
                  <span className="line-clamp-1 capitalize">
                    {page.type === "blog" && "Blog: "}
                    {page.title}
                  </span>
                </li>
              ))
            ) : (
              <li className="mb-2">No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );

  function navigateToPage(page: { title: string; href: string }) {
    router.push(page.href);
    setExtended(false);
    setSearch("");
  }
}
