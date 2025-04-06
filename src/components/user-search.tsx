import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Github, Loader2 } from 'lucide-react';

interface UserSearchProps {
  onSearch: (username: string) => void;
  isLoading: boolean;
}

export function UserSearch({ onSearch, isLoading }: UserSearchProps) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Github className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
          </div>
          <Input
            placeholder="Enter GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="pl-10 pr-[4.5rem] py-2 sm:py-6 text-sm sm:text-base w-full"
            autoComplete="off"
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <Button 
              type="submit" 
              disabled={isLoading || !username.trim()} 
              className="mr-1 h-[calc(100%-6px)] rounded-md"
              size="sm"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 animate-spin" />
                  <span className="sm:inline hidden">Searching...</span>
                  <span className="sm:hidden inline">...</span>
                </>
              ) : (
                <>
                  <Search className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                 
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
      <p className="text-xs text-muted-foreground mt-1 sm:mt-2 text-center sm:text-left hidden sm:block">
        Enter any GitHub username to explore their profile
      </p>
    </div>
  );
}