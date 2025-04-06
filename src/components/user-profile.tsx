import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { GitHubUser } from '@/types/github';
import { Users, GitFork, Calendar } from 'lucide-react';

interface UserProfileProps {
  user: GitHubUser;
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <Card className="w-full backdrop-blur-sm bg-card/95">
      <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
        <Avatar className="h-20 w-20 sm:h-24 sm:w-24 md:h-32 md:w-32">
          <AvatarImage src={user.avatar_url} alt={user.login} />
          <AvatarFallback>{user.login.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="text-center sm:text-left w-full">
          <CardTitle className="text-xl sm:text-2xl md:text-3xl mb-2 break-words">{user.name || user.login}</CardTitle>
          {user.bio && (
            <p className="text-muted-foreground text-xs sm:text-sm md:text-base break-words">
              {user.bio}
            </p>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
          <div className="flex items-center justify-center sm:justify-start gap-2 p-2 rounded-lg bg-muted/50">
            <GitFork className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
            <span className="font-medium text-sm sm:text-base">{user.public_repos} repositories</span>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-2 p-2 rounded-lg bg-muted/50">
            <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
            <span className="font-medium text-sm sm:text-base">
              {user.followers} followers · {user.following} following
            </span>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-2 p-2 rounded-lg bg-muted/50">
            <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
            <span className="font-medium text-sm sm:text-base">
              Joined {new Date(user.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}