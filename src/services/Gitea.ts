import { IGiteaResponse } from "@/types/IGiteaResponse";
import readJSON from "@/utils/ReadJSON";

const isDevelopment = process.env.NODE_ENV === "development";

export default async function pullGiteaRepos() {
  if (isDevelopment) {
    return await mockData();
  }

  const githubresp = await fetch(
    `${process.env.GITEA_URL}/api/v1/orgs/${process.env.GITEA_ID}/repos`
  );
  let data = await githubresp.json();

  let repos: IRepo[] = [];

  for (const repo of data) {
    const language = await fetch(repo.languages_url);
    const langjson = await language.json();
    const langs = Object.keys(langjson);

    repos.push({
      source: "gitea",
      name: repo.name,
      description: repo.description || "",
      href: repo.html_url,
      archived: repo.archived,
      mainLanguage: repo.language,
      languages: langs,
      stars: repo.stars_count,
      forks: repo.forks_count,
      watchers: repo.watchers_count,
      issues: repo.open_issues_count,
      pull_requests: 0,
      commits: 0,
      created_at: new Date(repo.created_at),
      updated_at: new Date(repo.updated_at),
    });
  }
  return repos;
}

async function mockData() {
  let data = (await readJSON(
    "src/services/mockData/fakegitea.json"
  )) as IGiteaResponse[];
  let repos: IRepo[] = [];
  for (const repo of data) {
    let langs = ["typescript", "javascript", "html", "css"];
    repos.push({
      source: "gitea",
      name: repo.name,
      description: repo.description || "",
      href: repo.html_url,
      archived: repo.archived,
      mainLanguage: repo.language,
      languages: langs,
      stars: repo.stars_count,
      forks: repo.forks_count,
      watchers: repo.watchers_count,
      issues: repo.open_issues_count,
      pull_requests: 0,
      commits: 0,
      created_at: new Date(repo.created_at),
      updated_at: new Date(repo.updated_at),
    });
  }
  return repos;
}
