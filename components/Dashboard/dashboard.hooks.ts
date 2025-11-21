import { useState, useCallback } from "react";

import { fetchGitHubUser, fetchGitHubRepos } from "@/services/github-api";

import type { DashboardState, RepoSimulated } from "./dashboard.types";
import type { GitHubUser, GitHubRepoWithMeta } from "@/types/github";

export function useDashboard() {
  const [state, setState] = useState<DashboardState>({
    username: "",
    loading: false,
    error: null,
  });

  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepoWithMeta[]>([]);

  const handleChangeUsername = useCallback((value: string) => {
    setState((prev) => ({ ...prev, username: value }));
  }, []);

  const handleSearch = useCallback(async () => {
    if (!state.username.trim()) return;

    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const user = await fetchGitHubUser(state.username);
      const repos = await fetchGitHubRepos(state.username);

      setUser(user);
      setRepos(repos);
    } catch {
      setState((prev) => ({ ...prev, error: "Usuário não encontrado" }));
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  }, [state.username]);

  const addSimulatedRepo = useCallback(() => {
    const now = new Date().toISOString();

    const newRepo: RepoSimulated = {
      id: Date.now(),
      name: "mock-repo-simulado",
      full_name: `simulado/mock-repo-simulado`,
      description: "Criado automaticamente para simular tempo real.",
      stargazers_count: Math.floor(Math.random() * 10),
      forks_count: 0,
      language: "JavaScript",
      html_url: "https://github.com/simulado/mock-repo-simulado",
      updated_at: now,
      isMock: true,
      mockCreatedAt: now,
    };

    setRepos((prev) => [newRepo, ...prev]);
  }, []);

  return {
    state,
    user,
    repos,
    handleChangeUsername,
    handleSearch,
    addSimulatedRepo,
  };
}
