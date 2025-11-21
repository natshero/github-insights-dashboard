"use client";

import React, { useMemo } from "react";

import { Star, GitBranch, Clock, Code2, ExternalLink } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import type { GitHubRepoWithMeta } from "@/types/github";

import { formatDateTime } from "@/lib/format";

interface RepoCardProps {
  repo: GitHubRepoWithMeta;
}

export const RepoCard: React.FC<RepoCardProps> = ({ repo }) => {
  const {
    name,
    description,
    html_url,
    language,
    stargazers_count,
    forks_count,
    updated_at,
    isMock,
  } = repo;

  const stars = stargazers_count ?? 0;
  const forks = forks_count ?? 0;

  const updatedLabel = useMemo(() => {
    if (!updated_at) return "Data não disponível";
    return formatDateTime(updated_at);
  }, [updated_at]);

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base font-semibold">
            {html_url ? (
              <a
                href={html_url}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                {name}
              </a>
            ) : (
              name
            )}
          </CardTitle>

          <div className="flex flex-col items-end gap-1">
            {isMock && (
              <Badge
                variant="outline"
                className="border-dashed text-[0.65rem] uppercase tracking-wide"
              >
                Simulado
              </Badge>
            )}

            {html_url && (
              <a
                href={html_url}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground"
                aria-label={`Abrir ${name} no GitHub`}
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        {description && (
          <p className="line-clamp-2 text-xs text-muted-foreground">
            {description}
          </p>
        )}
      </CardHeader>

      <CardContent className="mt-auto space-y-3 text-xs text-muted-foreground">
        <div className="flex flex-wrap items-center gap-2">
          {language && (
            <Badge
              variant="outline"
              className="inline-flex items-center gap-1 border-border text-[0.72rem]"
            >
              <Code2 className="h-3 w-3" />
              {language}
            </Badge>
          )}

          <div className="flex items-center gap-1">
            <Star className="h-3 w-3" />
            <span>{stars}</span>
            <span className="sr-only">estrelas</span>
          </div>

          <div className="flex items-center gap-1">
            <GitBranch className="h-3 w-3" />
            <span>{forks}</span>
            <span className="sr-only">forks</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>Atualizado em {updatedLabel}</span>
        </div>
      </CardContent>
    </Card>
  );
};
