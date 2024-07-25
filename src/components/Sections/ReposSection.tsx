"use client";

import { useState } from "react";
import RepoCard from "../Cards/RepoCard";

function matchesFilter(repos: IRepo, filter: string) {
  filter = filter.toLowerCase();
  return (
    repos.name.toLowerCase().includes(filter) ||
    repos.description.toLowerCase().includes(filter)
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
  const [filter, setFilter] = useState("");
  const [orderByStrategy, setOrderByStrategy] = useState("default");

  let shownRepos = repos
    .filter((i) => matchesFilter(i, filter))
    .sort((a, b) => orderBy(a, b, orderByStrategy));

  return (
    <div>
      <div className="grid grid-cols-[4fr_1fr] my-4 px-6 gap-6">
        <input
          className="card p-1"
          type="text"
          placeholder="Search..."
          onChange={(e) => setFilter(e.target.value)}
        />
        <select
          className="card p-1"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-4">
            {shownRepos.map((repo, i) => (
              <RepoCard repo={repo} key={i}></RepoCard>
            ))}
          </div>
        ) : (
          <p className="text-secondaryText text-center">
            No repositories match the search
          </p>
        )}
      </div>
    </div>
  );
}
