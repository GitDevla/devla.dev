import RepoCard from "@/components/Cards/RepoCard";
import pullGiteaRepos from "@/services/Gitea";
import pullGithubRepos from "@/services/Github";
import { Metadata } from "next";

export const revalidate = 60 * 60 * 24;

export const metadata: Metadata = {
  title: "Repositories",
};

async function pullRepos() {
  let githubRepos = await pullGithubRepos();
  let giteaRepos = await pullGiteaRepos();
  let repos = githubRepos.concat(giteaRepos);
  repos.sort((a, b) => b.stars + b.watchers - (a.stars + a.watchers));
  return repos;
}

export default async function ReposPage() {
  const repos = await pullRepos();
  return (
    <>
      <h1 className="">Repos</h1>
      <p>Collection of all my published repositories.</p>
      <p>
        Total: {repos.length} (Github:{" "}
        {repos.filter((r) => r.source === "github").length}, Gitea:{" "}
        {repos.filter((r) => r.source === "gitea").length})
      </p>
      <div className="grid grid-cols-1 gap-5 mt-6">
        {repos.map((repo, i) => (
          <RepoCard repo={repo} key={i}></RepoCard>
        ))}
      </div>
    </>
  );
}
