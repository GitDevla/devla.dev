import {
  IGithubCommitsResponse,
  IGithubResponse,
} from "@/types/IGithubResponse";
import isProduction from "@/utils/isProd";
import { readJSON } from "@/utils/ReadJSON";

async function fetchRepositoriesFromGitHub() {
  const header = {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    "Content-Type": "application/json",
  };
  const body = `{
	viewer {
		repositories(first: 100, after: null,ownerAffiliations:  [OWNER, ORGANIZATION_MEMBER]
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
  const githubresp = await fetch("https://api.github.com/graphql", {
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
  const githubresp = await fetch("https://api.github.com/graphql", {
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

const RECENT_COMMIT_COUNT = 5;

async function fetchRecentCommitsFromGithub() {
  const header = {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    "Content-Type": "application/json",
  };
  const body = `{
	viewer {
		repositories(first: 20, ownerAffiliations: [OWNER, ORGANIZATION_MEMBER]
			privacy: PUBLIC, orderBy: {field: PUSHED_AT, direction: DESC}) {
			nodes {
				name
				languages(first: 5, orderBy: {field: SIZE, direction: DESC}) {
					edges {
						size
						node {
							name
							color
						}
					}
				}
				defaultBranchRef {
					target {
						... on Commit {
							history(first: ${RECENT_COMMIT_COUNT}) {
								nodes {
									messageHeadline
									additions
									deletions
									committedDate
									url
								}
							}
						}
					}
				}
			}
		}
	}
}
  `;
  const githubresp = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: header,
    body: JSON.stringify({ query: body }),
  });
  return githubresp;
}

export async function pullGithubRecentCommits() {
  if (!isProduction) return await mockCommitData();

  const githubresp = await fetchRecentCommitsFromGithub();
  const data = (await githubresp.json()) as IGithubCommitsResponse;
  return parseGithubCommits(data);
}

async function mockCommitData() {
  const data = (await readJSON(
    "src/services/mockData/fakeGithubCommits.json",
  )) as IGithubCommitsResponse;

  return parseGithubCommits(data);
}

function parseGithubCommits(
  data: IGithubCommitsResponse,
): IRecentCommitActivity {
  const repos = data.data.viewer.repositories.nodes.filter(
    (repo) => repo.defaultBranchRef,
  );

  const commits = repos
    .flatMap((repo) =>
      repo.defaultBranchRef!.target.history.nodes.map((commit) => ({
        repo: repo.name,
        message: commit.messageHeadline,
        href: commit.url,
        additions: commit.additions,
        deletions: commit.deletions,
        committed_at: new Date(commit.committedDate),
      })),
    )
    .sort((a, b) => b.committed_at.getTime() - a.committed_at.getTime())
    .slice(0, RECENT_COMMIT_COUNT);

  const shownRepos = new Set(commits.map((commit) => commit.repo));
  const bytesPerLanguage = new Map<string, ICommitLanguage>();
  for (const repo of repos) {
    if (!shownRepos.has(repo.name)) continue;
    for (const language of repo.languages.edges) {
      const known = bytesPerLanguage.get(language.node.name);
      if (known) {
        known.bytes += language.size;
        continue;
      }
      bytesPerLanguage.set(language.node.name, {
        name: language.node.name,
        color: language.node.color || "var(--color-muted)",
        bytes: language.size,
      });
    }
  }
  const languages = [...bytesPerLanguage.values()].sort(
    (a, b) => b.bytes - a.bytes,
  );

  return { commits, languages };
}
