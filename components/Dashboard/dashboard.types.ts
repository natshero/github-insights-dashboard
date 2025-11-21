import type { GitHubRepoWithMeta } from "@/types/github";

export interface DashboardState {
  username: string;
  loading: boolean;
  error: string | null;
}

export type RepoSimulated = GitHubRepoWithMeta & {
  isMock: true;
  mockCreatedAt: string;
};
