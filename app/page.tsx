import { ModeToggle } from "@/components/ModeToggle";
import { GitHubDashboard } from "@/components/Dashboard";

export const HomePage: React.FC = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <h1 className="text-xl font-semibold">GitHub Insights Dashboard</h1>

          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Tema</span>
            <ModeToggle />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-6">
        <GitHubDashboard />
      </div>
    </main>
  );
};

export default HomePage;
