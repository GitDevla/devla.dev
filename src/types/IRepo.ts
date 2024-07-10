interface IRepo {
  source: string;
  name: string;
  description: string;
  href: string;
  archived: boolean;

  mainLanguage: string;
  languages: string[];

  stars: number;
  forks: number;
  watchers: number;
  issues: number;
  pull_requests: number;
  commits: number;

  created_at: Date;
  updated_at: Date;
}
