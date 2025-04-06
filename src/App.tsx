import { useState, useEffect } from 'react';
import { UserSearch } from '@/components/user-search';
import { UserProfile } from '@/components/user-profile';
import { RepositoryList } from '@/components/repository-list';
import { CommitChart } from '@/components/commit-chart';
import { GitHubUser, GitHubRepo, CommitActivity } from '@/types/github';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { ThemeProvider } from '@/components/theme-provider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Users, GitFork } from 'lucide-react';

function App() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [commitData, setCommitData] = useState<CommitActivity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string>('');

  // Load GitHub token from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('github-token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // Save token to localStorage whenever it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('github-token', token);
    }
  }, [token]);

  const handleTokenChange = (newToken: string) => {
    setToken(newToken);
  };

  const getHeaders = () => {
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
    };
    
    if (token) {
      headers['Authorization'] = `token ${token}`;
    }
    
    return headers;
  };

  const handleSearch = async (username: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Fetch user data
      const userResponse = await fetch(`https://api.github.com/users/${username}`, {
        headers: getHeaders()
      });
      if (!userResponse.ok) {
        throw new Error(userResponse.status === 403 ? 'API rate limit exceeded. Please add a GitHub token.' : 'User not found');
      }
      const userData = await userResponse.json();
      setUser(userData);

      // Fetch repositories
      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=10`,
        { headers: getHeaders() }
      );
      const reposData = await reposResponse.json();
      setRepos(reposData);

      // Fetch commit activity for the last year
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

      const statsPromises = reposData.map(async (repo: GitHubRepo) => {
        try {
          const response = await fetch(
            `https://api.github.com/repos/${username}/${repo.name}/stats/participation`,
            { headers: getHeaders() }
          );
          if (!response.ok) return null;
          const data = await response.json();
          return data.owner;
        } catch {
          return null;
        }
      });

      const statsResults = await Promise.all(statsPromises);
      const validStats = statsResults.filter((stat) => stat !== null);

      // Combine weekly commits from all repositories
      const weeklyCommits = new Array(52).fill(0);
      validStats.forEach((stats) => {
        if (stats) {
          stats.forEach((count: number, index: number) => {
            weeklyCommits[index] += count;
          });
        }
      });

      // Convert to CommitActivity format
      const now = new Date();
      const commitActivity = weeklyCommits.map((total, index) => {
        const weekDate = new Date(now);
        weekDate.setDate(weekDate.getDate() - (51 - index) * 7);
        return {
          week: Math.floor(weekDate.getTime() / 1000),
          total,
          days: new Array(7).fill(Math.floor(total / 7))
        };
      });

      setCommitData(commitActivity);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setUser(null);
      setRepos([]);
      setCommitData([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen h-full w-full bg-background text-foreground flex flex-col">
        <div className="w-full h-full">
          {!user ? (
            <div className="flex flex-col items-center justify-center min-h-screen w-full p-4 sm:p-6 lg:p-8">
              <div className="w-full max-w-5xl">
                <div className="text-center mb-8">
                  <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
                    GitHub Profile Analyzer
                  </h1>
                  <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Discover insights about GitHub profiles, explore repositories, and visualize contribution patterns.
                  </p>
                </div>

                <div className="w-full bg-card rounded-xl border shadow-lg p-6 sm:p-8 mb-8">
                  <div className="mb-8">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      </svg>
                      Authentication (Optional)
                    </h2>
                    <p className="text-sm sm:text-base text-muted-foreground mb-4">
                      Add a GitHub token to increase API rate limits and access private repositories.
                    </p>
                    <div className="flex gap-2 items-center">
                      <Input
                        type="password"
                        placeholder="GitHub Personal Access Token"
                        value={token}
                        onChange={(e) => handleTokenChange(e.target.value)}
                        className="flex-1 h-12"
                      />
                      {token && (
                        <Button 
                          variant="outline" 
                          onClick={() => handleTokenChange('')}
                          size="icon"
                          className="h-12 w-12"
                        >
                          <X className="h-5 w-5" />
                        </Button>
                      )}
                    </div>
                    <div className="mt-2 text-xs sm:text-sm text-muted-foreground flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-yellow-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                      <span>
                        Don't have a token? {' '}
                        <a 
                          href="https://github.com/settings/tokens/new" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="underline hover:text-primary font-medium"
                        >
                          Create one here
                        </a>
                      </span>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      Find a GitHub Profile
                    </h2>
                    <UserSearch onSearch={handleSearch} isLoading={isLoading} />
                    {error && (
                      <Alert variant="destructive" className="mt-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                  <div className="bg-card rounded-lg border p-6 flex flex-col items-center text-center h-full">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-3">User Profiles</h3>
                    <p className="text-sm sm:text-base text-muted-foreground">Explore detailed information about GitHub users and their activity.</p>
                  </div>
                  <div className="bg-card rounded-lg border p-6 flex flex-col items-center text-center h-full">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <GitFork className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-3">Repositories</h3>
                    <p className="text-sm sm:text-base text-muted-foreground">Browse through user repositories sorted by latest updates.</p>
                  </div>
                  <div className="bg-card rounded-lg border p-6 flex flex-col items-center text-center h-full">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                        <polyline points="17 6 23 6 23 12"></polyline>
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium mb-3">Contribution Stats</h3>
                    <p className="text-sm sm:text-base text-muted-foreground">Visualize contribution activity with interactive charts.</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col w-full h-full">
              <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-10 shadow-sm w-full">
                <div className="w-full px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <h1 className="text-xl sm:text-2xl font-bold">
                    GitHub Profile Analyzer
                  </h1>
                  <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                    <div className="flex gap-2 items-center w-full sm:w-auto">
                      <Input
                        type="password"
                        placeholder="GitHub Token"
                        value={token}
                        onChange={(e) => handleTokenChange(e.target.value)}
                        className="w-full sm:w-48 h-9"
                      />
                      {token && (
                        <Button 
                          variant="outline" 
                          onClick={() => handleTokenChange('')}
                          size="icon"
                          className="h-9 w-9"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="w-full sm:w-auto">
                      <UserSearch onSearch={handleSearch} isLoading={isLoading} />
                    </div>
                  </div>
                </div>
              </header>

              <main className="flex-1 w-full px-4 py-6 space-y-8">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <UserProfile user={user} />
                <RepositoryList repositories={repos} />
                {commitData.length > 0 && <CommitChart commitData={commitData} />}
              </main>
            </div>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;