export interface IGithubResponse {
  data: {
    viewer: {
      repositories: {
        nodes: Array<{
          name: string;
          description?: string;
          url: string;
          isArchived: boolean;
          primaryLanguage?: {
            name: string;
          };
          languages: {
            nodes: Array<{
              name: string;
            }>;
          };
          stargazerCount: number;
          forkCount: number;
          watchers: {
            totalCount: number;
          };
          issues: {
            totalCount: number;
          };
          pullRequests: {
            totalCount: number;
          };
          defaultBranchRef: {
            target: {
              history: {
                totalCount: number;
              };
            };
          };
          updatedAt: string;
          createdAt: string;
        }>;
      };
    };
  };
}
