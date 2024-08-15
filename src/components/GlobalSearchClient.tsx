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
  const inputRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const [extended, setExtended] = useState(false);
  const [search, setSearch] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [mouseHover, setMouseHover] = useState(false);

  const matches = pages.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()),
  );

  function handleClickOutside(event: MouseEvent) {
    if (formRef.current && !formRef.current.contains(event.target as Node))
      setExtended(false);
  }

  function handleArrows(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    if (e.key === "ArrowDown")
      setFocusedIndex((prev) => (prev + 1) % matches.length);
    if (e.key === "ArrowUp")
      setFocusedIndex((prev) => (prev - 1 + matches.length) % matches.length);
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Escape") setExtended(false);
    if (e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) return;

    if (insideEditable(e.target as HTMLElement)) return;
    if (!keypressIsLetter(e.key)) return;

    setExtended(true);
    if (inputRef.current) {
      inputRef.current.focus();
      if (process.env.NODE_ENV == "production") inputRef.current.value = e.key;
    }
  }

  useEffect(() => {
    if (mouseHover) return;
    const activeElement = document.querySelector(
      `[tabindex='${focusedIndex}']`,
    ) as HTMLElement;
    if (activeElement)
      activeElement.scrollIntoView({
        block: "end",
        inline: "end",
        behavior: "smooth",
      });
  }, [focusedIndex]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (extended) document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [extended]);

  useEffect(() => {
    setFocusedIndex(0);
  }, [search, extended]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    navigateToPage(matches[focusedIndex]);
  }

  function navigateToPage(page: { title: string; href: string }) {
    router.push(page.href);
    setExtended(false);
    setSearch("");
    inputRef.current?.blur();
  }

  return (
    <form className="relative" ref={formRef} onSubmit={handleSubmit}>
      <input
        type="text"
        className="w-full rounded-lg bg-inherit p-2 outline-none"
        placeholder="Search..."
        ref={inputRef}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onClick={() => setExtended(true)}
        onKeyDown={handleArrows}
      />
      {extended && (
        <div className="absolute z-50 max-h-[200px] w-full overflow-scroll rounded-lg rounded-t-none border border-t-0 border-accentbackground bg-background p-2">
          <ul className="group">
            {matches.length ? (
              matches.map((page, i) => (
                <li
                  key={i}
                  tabIndex={i}
                  onClick={() => navigateToPage(page)}
                  className={`mb-2 cursor-pointer rounded-lg bg-inherit p-2 ${focusedIndex === i ? "!bg-accentbackground" : ""} outline-none`}
                  onMouseOver={() => {
                    setMouseHover(true);
                    setFocusedIndex(i);
                  }}
                  onMouseLeave={() => setMouseHover(false)}
                >
                  <span className="line-clamp-1 capitalize">
                    {page.type === "blog" && "Blog: "}
                    {page.title}
                  </span>
                </li>
              ))
            ) : (
              <li className="mb-2 p-2 text-secondaryText">No results found</li>
            )}
          </ul>
        </div>
      )}
    </form>
  );
}
