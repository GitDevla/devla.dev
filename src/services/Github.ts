import { IGithubResponse } from "@/types/IGithubResponse";
import isProduction from "@/utils/isProd";
import { readJSON } from "@/utils/ReadJSON";

async function fetchRepositoriesFromGitHub() {
  const header = {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    "Content-Type": "application/json",
  };
  const body = `{
	viewer {
		repositories(first: 100, after: null,ownerAffiliations: OWNER
			privacy: PUBLIC) {
			nodes {
				name
				description
				url
				isArchived
				
				primaryLanguage{
					name
				}
				languages(first: 5, after: null,orderBy:{field:SIZE,direction:DESC}) {
					nodes{
						name
					}
				}
				
				stargazerCount
				forkCount
				watchers{
					totalCount
				}
				issues{
					totalCount
				}
				pullRequests{
					totalCount
				}
				defaultBranchRef {
					target {
						... on Commit {
							history {
								totalCount
							}
						}
					}
				}
				
				updatedAt
				createdAt
			}
		}
	}
}
  `;
  const githubresp = await fetch(`https://api.github.com/graphql`, {
    method: "POST",
    headers: header,
    body: JSON.stringify({ query: body }),
  });
  return githubresp;
}

async function fetchContributionDataFromGithub() {
  let header = {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    "Content-Type": "application/json",
  };
  let body = `{
	viewer {
		contributionsCollection {
				contributionCalendar {
					totalContributions
					weeks {
						contributionDays {
							contributionCount
							date
						}
					}
				}
}}}
        `;
  const githubresp = await fetch(`https://api.github.com/graphql`, {
    method: "POST",
    headers: header,
    body: JSON.stringify({ query: body }),
  });
  return githubresp;
}

export async function pullGithubContributions() {
  if (!isProduction) {
    const data = await readJSON("src/services/mockData/fakeGithubContrib.json");
    const contributionCalendarData =
      data.data.viewer.contributionsCollection.contributionCalendar;
    return contributionCalendarData.weeks
      .map((week: any) => week.contributionDays)
      .flat() as { contributionCount: number; date: string }[];
  }

  const githubresp = await fetchContributionDataFromGithub();
  const data = (await githubresp.json()) as any;
  return data.data.viewer.contributionsCollection.contributionCalendar.weeks
    .map((week: any) => week.contributionDays)
    .flat() as { contributionCount: number; date: string }[];
}

export async function pullGithubRepos() {
  if (!isProduction) return await mockData();

  const githubresp = await fetchRepositoriesFromGitHub();
  const data = (await githubresp.json()) as IGithubResponse;
  return parseGithubData(data);
}

async function mockData() {
  const data = (await readJSON(
    "src/services/mockData/fakegithub.json",
  )) as IGithubResponse;

  return parseGithubData(data);
}

function parseGithubData(data: IGithubResponse) {
  let repos: IRepo[] = [];
  for (const repo of data.data.viewer.repositories.nodes) {
    repos.push({
      source: "github",
      name: repo.name,
      description: repo.description || "",
      href: repo.url,
      archived: repo.isArchived,
      mainLanguage: repo.primaryLanguage?.name || "",
      languages: repo.languages.nodes.map((lang) => lang.name),
      stars: repo.stargazerCount,
      forks: repo.forkCount,
      watchers: repo.watchers.totalCount,
      issues: repo.issues.totalCount,
      pull_requests: repo.pullRequests.totalCount,
      commits: repo.defaultBranchRef.target.history.totalCount,
      created_at: new Date(repo.createdAt),
      updated_at: new Date(repo.updatedAt),
    });
  }
  return repos;
}
