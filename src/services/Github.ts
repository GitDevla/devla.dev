import { IGithubResponse } from "@/types/IGithubResponse";
import { readJSON } from "@/utils/ReadJSON";

const isDevelopment = process.env.NODE_ENV === "development";

export default async function pullGithubRepos() {
  if (isDevelopment) {
    return await mockData();
  }
  const githubresp = await fetch(
    `https://api.github.com/users/${process.env.GITHUB_ID}/repos`
  );
  const data = await githubresp.json();

  let repos: IRepo[] = [];
  for (const repo of data) {
    const language = await fetch(repo.languages_url);
    const langjson = await language.json();
    const langs = Object.keys(langjson);

    repos.push({
      source: "github",
      name: repo.name,
      description: repo.description || "",
      href: repo.html_url,
      archived: repo.archived,
      mainLanguage: repo.language || "",
      languages: langs,
      stars: repo.stargazers_count,
      forks: repo.forks,
      watchers: repo.watchers,
      issues: repo.open_issues,
      pull_requests: 0,
      commits: 0,
      created_at: new Date(repo.created_at),
      updated_at: new Date(repo.updated_at),
    });
  }
  return repos;
}

async function mockData() {
  const data = (await readJSON(
    "src/services/mockData/fakegithub.json"
  )) as IGithubResponse[];
  let repos: IRepo[] = [];
  for (const repo of data) {
    let langs = ["typescript", "javascript", "html", "css"];
    repos.push({
      source: "github",
      name: repo.name,
      description: repo.description || "",
      href: repo.html_url,
      archived: repo.archived,
      mainLanguage: repo.language || "",
      languages: langs,
      stars: repo.stargazers_count,
      forks: repo.forks,
      watchers: repo.watchers,
      issues: repo.open_issues,
      pull_requests: 0,
      commits: 0,
      created_at: new Date(repo.created_at),
      updated_at: new Date(repo.updated_at),
    });
  }
  return repos;
}
