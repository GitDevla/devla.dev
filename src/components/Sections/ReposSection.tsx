"use client";

import { useState } from "react";
import RepoCard from "../Cards/RepoCard";
import { useSearchParams } from "next/navigation";

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
  return b.stars + b.watchers - (a.stars + a.watchers);
  //todo
}

function orderBy(a: IRepo, b: IRepo, strategy: string) {
  switch (strategy) {
    case "stars":
      return orderByStars(a, b);
    case "latest":
      return orderByLatest(a, b);
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
    .filter((i) => matchesFilter(i, filter))
    .sort((a, b) => orderBy(a, b, orderByStrategy));

  return (
    <div>
      <div className="my-4 grid grid-cols-[2fr_1fr] md:grid-cols-[3fr_1fr] md:gap-6 md:px-6">
        <input
          className="card w-full p-1"
          type="text"
          placeholder="Search..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <select
          className="card w-full p-1"
          value={orderByStrategy}
          onChange={(e) => setOrderByStrategy(e.target.value)}
        >
          <option disabled>Order By</option>
          <option value="default">Default</option>
          <option value="latest">Latest</option>
          <option value="stars">Stars</option>
        </select>
      </div>
      <div>
        {shownRepos.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-4 gap-y-5 md:grid-cols-2">
            {shownRepos.map((repo, i) => (
              <RepoCard repo={repo} key={i}></RepoCard>
            ))}
          </div>
        ) : (
          <p className="text-center text-secondaryText">
            No repositories match the search
          </p>
        )}
      </div>
    </div>
  );
}
