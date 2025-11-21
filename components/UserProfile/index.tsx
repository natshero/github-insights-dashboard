import React, { useMemo } from "react";

import { Globe2, MapPin, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import type { GitHubUser } from "@/types/github";

interface UserProfileCardProps {
  user: GitHubUser;
}

const getInitialsFromUser = (user: GitHubUser): string => {
  if (user.name) {
    const parts = user.name
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0]?.toUpperCase())
      .slice(0, 2);

    if (parts.length > 0) return parts.join("");
  }

  return user.login.slice(0, 2).toUpperCase();
};

export const UserProfileCard: React.FC<UserProfileCardProps> = ({ user }) => {
  const initials = useMemo(() => getInitialsFromUser(user), [user]);

  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user.avatar_url} alt={user.login} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>

        <div className="space-y-1">
          <CardTitle className="text-xl font-semibold">
            {user.name || user.login}
          </CardTitle>
          <p className="text-sm text-muted-foreground">@{user.login}</p>

          <a
            href={user.html_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
          >
            <Globe2 className="h-3 w-3" />
            Ver perfil no GitHub
          </a>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {user.bio && (
          <p className="text-sm text-muted-foreground">{user.bio}</p>
        )}

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          {user.location && (
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {user.location}
            </span>
          )}

          {user.company && (
            <span className="inline-flex items-center gap-1">
              <Users className="h-4 w-4" />
              {user.company}
            </span>
          )}

          {user.blog && (
            <a
              href={
                user.blog.startsWith("http")
                  ? user.blog
                  : `https://${user.blog}`
              }
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-primary hover:underline"
            >
              <Globe2 className="h-4 w-4" />
              Site pessoal
            </a>
          )}
        </div>

        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
          <span>
            <span className="font-semibold text-foreground">
              {user.followers}
            </span>{" "}
            seguidores
          </span>
          <span>
            <span className="font-semibold text-foreground">
              {user.following}
            </span>{" "}
            seguindo
          </span>
          <span>
            <span className="font-semibold text-foreground">
              {user.public_repos}
            </span>{" "}
            repositórios públicos
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
