import { Metadata } from "next";
import { Suspense } from "react";
import ContributionCalendar from "@/components/ContributionCalendar";
import ReposSection from "@/components/Sections/ReposSection";
import pullGiteaRepos from "@/services/Gitea";
import { pullGithubContributions, pullGithubRepos } from "@/services/Github";

export const revalidate = 60 * 60 * 24;

export const metadata: Metadata = {
  title: "Repositories",
};

async function pullRepos() {
  let [githubRepos, giteaRepos] = await Promise.all([
    pullGithubRepos(),
    pullGiteaRepos(),
  ]);
  let repos = githubRepos.concat(giteaRepos);
  return repos;
}

export default async function ReposPage() {
  const repos = await pullRepos();

  return (
    <>
      <h1 className={"header"}>Repositories</h1>
      <p>Collection of all my published repositories.</p>
      <p>
        Total: {repos.length} (Github:{" "}
        {repos.filter((r) => r.source === "github").length}, Gitea:{" "}
        {repos.filter((r) => r.source === "gitea").length})
      </p>
      <div className={"py-2"}>
        <ContributionCalendar />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ReposSection repos={repos} />
      </Suspense>
    </>
  );
}
