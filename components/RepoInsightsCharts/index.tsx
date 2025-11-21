"use client";

import React, { useMemo } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { getLanguageUsage, getStarsByLanguage } from "@/lib/insights";

import type { GitHubRepo } from "@/types/github";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

interface RepoInsightsChartsProps {
  repos: GitHubRepo[];
}

const COLORS = [
  "#0ea5e9",
  "#22c55e",
  "#facc15",
  "#f97316",
  "#a855f7",
  "#ec4899",
  "#e11d48",
  "#22d3ee",
];

export const RepoInsightsCharts: React.FC<RepoInsightsChartsProps> = ({
  repos,
}) => {
  const { hasData, topLanguages, topStars } = useMemo(() => {
    const usage = getLanguageUsage(repos ?? []);
    const stars = getStarsByLanguage(repos ?? []);
    return {
      hasData: usage.length > 0 && stars.length > 0,
      topLanguages: usage.slice(0, 8),
      topStars: stars.slice(0, 8),
    };
  }, [repos]);

  if (!hasData) return null;

  return (
    <div className="mt-8 grid gap-4 md:grid-cols-2">
      <Card className="h-80">
        <CardHeader>
          <CardTitle className="text-sm font-semibold">
            Linguagens mais usadas
            <span className="block text-xs text-muted-foreground">
              Quantidade de repositórios por linguagem
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={topLanguages}
              margin={{ top: 10, right: 10, left: -20, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="language"
                tick={{ fontSize: 10 }}
                angle={-30}
                textAnchor="end"
                height={50}
              />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {topLanguages.map((entry, index) => (
                  <Cell
                    key={entry.language}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="h-80">
        <CardHeader>
          <CardTitle className="text-sm font-semibold">
            Estrelas por linguagem
            <span className="block text-xs text-muted-foreground">
              Total de estrelas por linguagem
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={topStars}
              margin={{ top: 10, right: 10, left: -20, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="language"
                tick={{ fontSize: 10 }}
                angle={-30}
                textAnchor="end"
                height={50}
              />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="stars" radius={[4, 4, 0, 0]}>
                {topStars.map((entry, index) => (
                  <Cell
                    key={entry.language}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
