"use client";

import { useMemo } from "react";

import { RepoCard } from "@/components/RepoCard";

import type { GitHubRepoWithMeta } from "@/types/github";

import { sortReposByDate } from "@/lib/sort-repos";

interface RepoListProps {
  repos: GitHubRepoWithMeta[];
}

export const RepoList = ({ repos }: RepoListProps) => {
  const sortedRepos = useMemo(() => sortReposByDate(repos), [repos]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          Mostrando{" "}
          <span className="font-semibold text-foreground">
            {sortedRepos.length}
          </span>{" "}
          repositórios públicos
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sortedRepos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
};
