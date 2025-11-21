import type { GitHubRepo } from "@/types/github";

export type LanguageUsage = {
  language: string;
  count: number;
};

export type StarsByLanguage = {
  language: string;
  stars: number;
};

export const getLanguageUsage = (repos: GitHubRepo[]): LanguageUsage[] => {
  const counts = new Map<string, number>();

  for (const repo of repos) {
    const lang = repo.language || "Outros";
    counts.set(lang, (counts.get(lang) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([language, count]) => ({ language, count }))
    .sort((a, b) => b.count - a.count);
};

export const getStarsByLanguage = (repos: GitHubRepo[]): StarsByLanguage[] => {
  const stars = new Map<string, number>();

  for (const repo of repos) {
    const lang = repo.language || "Outros";
    stars.set(lang, (stars.get(lang) ?? 0) + repo.stargazers_count);
  }

  return Array.from(stars.entries())
    .map(([language, totalStars]) => ({
      language,
      stars: totalStars,
    }))
    .sort((a, b) => b.stars - a.stars);
};
