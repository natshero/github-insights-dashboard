import type { GitHubRepoWithMeta } from "@/types/github";

export const sortReposByDate = (repos: GitHubRepoWithMeta[]) => {
  return [...repos].sort((a, b) => {
    const aTime = new Date(a.updated_at ?? "").getTime();
    const bTime = new Date(b.updated_at ?? "").getTime();
    return bTime - aTime;
  });
};
