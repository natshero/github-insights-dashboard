import { githubClient } from "./client";
import { handleGitHubApiError } from "./errors";

import type { GitHubUser, GitHubRepo } from "@/types/github";

export const fetchGitHubUser = async (
  username: string
): Promise<GitHubUser> => {
  const clean = username.trim();

  if (!clean) {
    throw new Error("Username é obrigatório.");
  }

  try {
    const { data } = await githubClient.get<GitHubUser>(`/users/${clean}`);
    return data;
  } catch (error) {
    throw handleGitHubApiError(error);
  }
};

export const fetchGitHubRepos = async (
  username: string
): Promise<GitHubRepo[]> => {
  const clean = username.trim();

  if (!clean) {
    throw new Error("Username é obrigatório.");
  }

  try {
    const { data } = await githubClient.get<GitHubRepo[]>(
      `/users/${clean}/repos`,
      {
        params: {
          per_page: 100,
          sort: "updated",
        },
      }
    );
    return data;
  } catch (error) {
    throw handleGitHubApiError(error);
  }
};
