"use client";

import React, { useEffect } from "react";
import { AlertCircle } from "lucide-react";

import { RepoInsightsCharts } from "@/components/RepoInsightsCharts";
import { UserProfileCard } from "@/components/UserProfile";
import { UserSearchForm } from "@/components/UserForm";
import { RepoList } from "@/components/RepoList";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { useDashboard } from "./dashboard.hooks";

export const GitHubDashboard: React.FC = () => {
  const {
    state,
    user,
    repos,
    handleChangeUsername,
    handleSearch,
    addSimulatedRepo,
  } = useDashboard();

  useEffect(() => {
    if (!user) return;

    const intervalId = window.setInterval(() => {
      addSimulatedRepo();
    }, 30_000);

    return () => window.clearInterval(intervalId);
  }, [user, addSimulatedRepo]);

  return (
    <section className="flex flex-col gap-6">
      {/* Busca */}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">Buscar usuário do GitHub</h2>

        <UserSearchForm
          value={state.username}
          isLoading={state.loading}
          onChange={handleChangeUsername}
          onSubmit={handleSearch}
        />

        <p className="text-xs text-muted-foreground">
          Dica: teste com <code className="rounded bg-muted px-1">vercel</code>,{" "}
          <code className="rounded bg-muted px-1">facebook</code> ou{" "}
          <code className="rounded bg-muted px-1">torvalds</code>.
        </p>
      </div>

      {/* Erro */}
      {state.error && (
        <div className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          <span>{state.error}</span>
        </div>
      )}

      {/* Perfil */}
      {user && <UserProfileCard user={user} />}

      {/* Conteúdo principal: Repositórios + Insights em abas */}
      {user && repos.length > 0 && (
        <section className="mt-2">
          <Tabs defaultValue="repos" className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <TabsList>
                <TabsTrigger value="repos">Repositórios</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
              </TabsList>

              <p className="text-xs text-muted-foreground">
                {repos.length} repositórios carregados (limite: 100)
              </p>
            </div>

            {/* Aba: Repositórios */}
            <TabsContent value="repos" className="space-y-4">
              <h3 className="text-base font-semibold">Repositórios públicos</h3>

              <div className="max-h-[520px] overflow-y-auto pr-2 -mr-2 rounded-xl border bg-card/40">
                <div className="p-3">
                  <RepoList repos={repos} />
                </div>
              </div>
            </TabsContent>

            {/* Aba: Insights */}
            <TabsContent value="insights" className="space-y-3">
              <div>
                <h3 className="text-base font-semibold">
                  Insights dos repositórios
                </h3>
                <p className="text-xs text-muted-foreground">
                  Linguagens mais usadas e total de estrelas por linguagem.
                </p>
              </div>

              <RepoInsightsCharts repos={repos} />
            </TabsContent>
          </Tabs>
        </section>
      )}

      {/* Usuário sem repositórios */}
      {user && repos.length === 0 && (
        <p className="mt-4 text-sm text-muted-foreground">
          Este usuário não possui repositórios públicos.
        </p>
      )}
    </section>
  );
};
