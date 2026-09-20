interface IRecentCommit {
  repo: string;
  message: string;
  href: string;
  additions: number;
  deletions: number;
  committed_at: Date;
}

interface ICommitLanguage {
  name: string;
  color: string;
  bytes: number;
}

interface IRecentCommitActivity {
  commits: IRecentCommit[];
  languages: ICommitLanguage[];
}
