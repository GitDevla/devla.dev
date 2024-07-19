import ReposSection from "@/components/Sections/ReposSection";
import pullGiteaRepos from "@/services/Gitea";
import pullGithubRepos from "@/services/Github";
import { Metadata } from "next";

export const revalidate = 60 * 60 * 9;

export const metadata: Metadata = {
  title: "Repositories",
};

async function pullRepos() {
  let githubRepos = await pullGithubRepos();
  let giteaRepos = await pullGiteaRepos();
  let repos = githubRepos.concat(giteaRepos);
  return repos;
}

export default async function ReposPage() {
  const repos = await pullRepos();
  return (
    <>
      <h1 className="mb-3 text-2xl font-bold uppercase">Repositories</h1>
      <p>Collection of all my published repositories.</p>
      <p>
        Total: {repos.length} (Github:{" "}
        {repos.filter((r) => r.source === "github").length}, Gitea:{" "}
        {repos.filter((r) => r.source === "gitea").length})
      </p>
      <ReposSection repos={repos}></ReposSection>
    </>
  );
}
