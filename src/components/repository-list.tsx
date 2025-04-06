import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { GitHubRepo } from '@/types/github';
import { Star, GitFork, Circle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface RepositoryListProps {
  repositories: GitHubRepo[];
}

export function RepositoryList({ repositories }: RepositoryListProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl md:text-2xl">Repositories</CardTitle>
        <CardDescription>Recent repositories from this user</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {repositories.map((repo) => (
            <Card key={repo.id} className="flex flex-col h-full">
              <CardHeader className="pb-2">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base sm:text-lg truncate">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline text-primary transition-colors"
                      >
                        {repo.name}
                      </a>
                    </CardTitle>
                    {repo.description && (
                      <CardDescription className="mt-1 line-clamp-2 text-xs sm:text-sm">
                        {repo.description}
                      </CardDescription>
                    )}
                  </div>
                  <div className="flex items-center gap-4 sm:flex-shrink-0">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500" />
                      <span className="text-xs sm:text-sm">{repo.stargazers_count}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
                      <span className="text-xs sm:text-sm">{repo.forks_count}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0 mt-auto">
                <div className="flex flex-wrap items-center gap-2">
                  {repo.language && (
                    <div className="flex items-center gap-1">
                      <Circle className="h-2 w-2 sm:h-3 sm:w-3 fill-current text-primary" />
                      <span className="text-xs sm:text-sm">{repo.language}</span>
                    </div>
                  )}
                  <Badge variant="secondary" className="text-xs">
                    Updated {new Date(repo.updated_at).toLocaleDateString()}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}