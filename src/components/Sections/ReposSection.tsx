"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import RepoCard from "../Cards/RepoCard";

function matchesFilter(repos: IRepo, filter: string) {
  filter = filter.toLowerCase();
  return (
    repos.name.toLowerCase().includes(filter) ||
    repos.description.toLowerCase().includes(filter) ||
    repos.languages.some((l) => l.toLowerCase().includes(filter))
  );
}

function orderByStars(a: IRepo, b: IRepo) {
  return b.stars - a.stars;
}

function orderByLatest(a: IRepo, b: IRepo) {
  return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
}

function orderByDefault(a: IRepo, b: IRepo) {
  function weighedValue(repo: IRepo) {
    return (
      repo.stars * 2 +
      repo.watchers +
      repo.commits * 0.25 +
      (repo.updated_at.getTime() - new Date().getTime()) / 100000000000
    );
  }

  return weighedValue(b) - weighedValue(a);
}

function orderByName(a: IRepo, b: IRepo) {
  return a.name.localeCompare(b.name);
}

function orderBy(a: IRepo, b: IRepo, strategy: string) {
  switch (strategy) {
    case "stars":
      return orderByStars(a, b);
    case "latest":
      return orderByLatest(a, b);
    case "name":
      return orderByName(a, b);
    default:
      return orderByDefault(a, b);
  }
}

export default function ReposSection({ repos }: { repos: IRepo[] }) {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [filter, setFilter] = useState(query || "");
  const [orderByStrategy, setOrderByStrategy] = useState("default");

  let shownRepos = repos
    .filter((i) => matchesFilter(i, filter.trim()))
    .sort((a, b) => orderBy(a, b, orderByStrategy));

  return (
    <section className={"mt-8"} aria-labelledby={"browse-repositories"}>
      <h2 id={"browse-repositories"} className={"subheader"}>
        Browse repositories
      </h2>
      <div className={"my-4 grid grid-cols-1 gap-3 md:grid-cols-[3fr_1fr]"}>
        <div>
          <label
            htmlFor={"repo-search"}
            className={"mb-1 block text-sm text-muted"}
          >
            Search repositories
          </label>
          <input
            id={"repo-search"}
            className={
              "card w-full px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            }
            type={"search"}
            placeholder={"Name, description, or language"}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor={"repo-sort"}
            className={"mb-1 block text-sm text-muted"}
          >
            Sort by
          </label>
          <select
            id={"repo-sort"}
            className={
              "card w-full px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            }
            value={orderByStrategy}
            onChange={(e) => setOrderByStrategy(e.target.value)}
          >
            <option value={"default"}>Recommended</option>
            <option value={"name"}>Name (A–Z)</option>
            <option value={"latest"}>Recently updated</option>
            <option value={"stars"}>Most stars</option>
          </select>
        </div>
      </div>
      <div className={"mb-4 flex items-center justify-between gap-3 text-sm"}>
        <p role={"status"} className={"text-muted"}>
          {shownRepos.length} of {repos.length} repositories
        </p>
        {filter && (
          <button
            type={"button"}
            onClick={() => setFilter("")}
            className={"link"}
          >
            Clear search
          </button>
        )}
      </div>
      <div>
        {shownRepos.length > 0 ? (
          <div className={"grid grid-cols-1 gap-4 md:grid-cols-2"}>
            {shownRepos.map((repo) => (
              <RepoCard repo={repo} key={repo.href} />
            ))}
          </div>
        ) : (
          <div
            className={
              "rounded-lg border border-dashed border-border px-4 py-10 text-center"
            }
          >
            <p className={"font-semibold"}>No repositories found</p>
            <p className={"mt-1 text-sm text-muted"}>
              Try a different name or language, or clear your search.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
