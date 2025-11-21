import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { GitHubDashboard } from "@/components/Dashboard";

jest.mock("@/services/github-api", () => ({
  fetchGitHubUser: jest.fn(),
  fetchGitHubRepos: jest.fn(),
}));

import { fetchGitHubUser, fetchGitHubRepos } from "@/services/github-api";

describe("GitHubDashboard", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza o formulário de busca e textos iniciais", () => {
    render(<GitHubDashboard />);

    expect(screen.getByText("Buscar usuário do GitHub")).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(
        /Digite um username do GitHub \(ex: vercel, facebook, torvalds\)/i
      )
    ).toBeInTheDocument();
  });

  it("busca usuário e exibe o perfil e repositórios", async () => {
    const mockUser = {
      login: "vercel",
      avatar_url: "https://avatars.githubusercontent.com/u/14985020?v=4",
      html_url: "https://github.com/vercel",
      name: "Vercel",
      bio: "Desenvolvendo o futuro da web.",
      company: "@vercel",
      location: "Internet",
      blog: "https://vercel.com",
      followers: 1000,
      following: 10,
      public_repos: 50,
    };

    const mockRepos = [
      {
        id: 1,
        name: "next.js",
        description: "The React Framework",
        stargazers_count: 110_000,
        language: "JavaScript",
        html_url: "https://github.com/vercel/next.js",
        updated_at: "2024-01-01T00:00:00Z",
      },
      {
        id: 2,
        name: "vercel",
        description: "Develop. Preview. Ship.",
        stargazers_count: 20_000,
        language: "TypeScript",
        html_url: "https://github.com/vercel/vercel",
        updated_at: "2024-01-02T00:00:00Z",
      },
    ];

    (fetchGitHubUser as jest.Mock).mockResolvedValue(mockUser);
    (fetchGitHubRepos as jest.Mock).mockResolvedValue(mockRepos);

    render(<GitHubDashboard />);

    const user = userEvent.setup();

    const input = screen.getByPlaceholderText(/Digite um username/i);
    const button = screen.getByRole("button", { name: /Buscar/i });

    await user.type(input, "vercel");
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText("Vercel")).toBeInTheDocument();
    });

    expect(screen.getByText("next.js")).toBeInTheDocument();
    expect(screen.getByText("Develop. Preview. Ship.")).toBeInTheDocument();
  }, 10_000);

  it("atualiza a lista quando novos repositórios chegam em uma nova busca (simulação de tempo real)", async () => {
    const mockUser = {
      login: "vercel",
      avatar_url: "https://avatars.githubusercontent.com/u/14985020?v=4",
      html_url: "https://github.com/vercel",
      name: "Vercel",
      bio: "Desenvolvendo o futuro da web.",
      company: "@vercel",
      location: "Internet",
      blog: "https://vercel.com",
      followers: 1000,
      following: 10,
      public_repos: 50,
    };

    const firstRepos: any[] = [];
    const secondRepos = [
      {
        id: 99,
        name: "mock-repo-1",
        description: "Repositório mockado para simular atualização.",
        stargazers_count: 10,
        language: "TypeScript",
        html_url: "https://github.com/vercel/mock-repo-1",
        updated_at: "2024-02-01T00:00:00Z",
      },
    ];

    (fetchGitHubUser as jest.Mock).mockResolvedValue(mockUser);
    (fetchGitHubRepos as jest.Mock)
      .mockResolvedValueOnce(firstRepos)
      .mockResolvedValueOnce(secondRepos);

    render(<GitHubDashboard />);

    const user = userEvent.setup();

    const input = screen.getByPlaceholderText(/Digite um username/i);
    const button = screen.getByRole("button", { name: /Buscar/i });

    await user.type(input, "vercel");
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText("Vercel")).toBeInTheDocument();
    });

    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText("mock-repo-1")).toBeInTheDocument();
    });
  }, 10_000);
});
