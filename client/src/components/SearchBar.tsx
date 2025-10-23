import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  isLoading?: boolean;
}

export function SearchBar({ onSearch, placeholder = "Search for parts...", isLoading = false }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-10 h-12 text-base"
            data-testid="input-search"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover-elevate active-elevate-2 rounded-sm p-1"
              data-testid="button-clear-search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button
          type="submit"
          size="default"
          disabled={!query.trim() || isLoading}
          data-testid="button-search"
          className="h-12 px-6"
        >
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </div>
    </form>
  );
}
