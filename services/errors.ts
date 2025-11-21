import axios from "axios";

export const handleGitHubApiError = (error: unknown): Error => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;

    if (status === 404) {
      return new Error("Usuário não encontrado.");
    }

    if (status === 403) {
      return new Error("Limite de requisições do GitHub atingido.");
    }

    if (status === 500) {
      return new Error("Erro interno no GitHub.");
    }
  }

  return new Error("Erro inesperado ao consultar a API.");
};
