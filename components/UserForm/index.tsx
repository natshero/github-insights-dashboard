"use client";

import { Search, Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { UserSearchFormProps } from "./userform.types";

export const UserSearchForm: React.FC<UserSearchFormProps> = ({
  value,
  isLoading,
  onChange,
  onSubmit,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-xl items-center gap-2"
    >
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder="Digite um username do GitHub (ex: vercel, facebook, torvalds)"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>

      <Button type="submit" disabled={isLoading}>
        <span className="relative flex items-center">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin opacity-100" />
          ) : (
            <Search className="mr-2 h-4 w-4 opacity-100" />
          )}
          <span>{isLoading ? "Buscando..." : "Buscar"}</span>
        </span>
      </Button>
    </form>
  );
};
