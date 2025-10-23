import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { SearchHistory } from "@shared/schema";

interface RecentSearchesProps {
  onSearchClick: (query: string) => void;
}

export function RecentSearches({ onSearchClick }: RecentSearchesProps) {
  const { data, isLoading } = useQuery<{ searches: SearchHistory[] }>({
    queryKey: ["/api/recent-searches"],
    refetchInterval: 30000,
  });

  if (isLoading || !data?.searches || data.searches.length === 0) {
    return null;
  }

  return (
    <section className="mt-8 pb-8" data-testid="section-recent-searches">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold" data-testid="heading-recent-searches">
            Recently Searched by Others
          </h2>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {data.searches.slice(0, 15).map((search) => (
            <Card
              key={search.id}
              className="hover-elevate active-elevate-2 cursor-pointer px-3 py-2 transition-all"
              onClick={() => onSearchClick(search.query)}
              data-testid={`card-recent-search-${search.id}`}
            >
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3 text-muted-foreground" />
                <span className="text-sm font-medium" data-testid={`text-search-query-${search.id}`}>
                  {search.query}
                </span>
                {search.resultCount !== undefined && search.resultCount > 0 && (
                  <Badge variant="secondary" className="text-xs" data-testid={`badge-result-count-${search.id}`}>
                    {search.resultCount} results
                  </Badge>
                )}
                <span className="text-xs text-muted-foreground" data-testid={`text-time-ago-${search.id}`}>
                  {formatDistanceToNow(new Date(search.searchedAt), { addSuffix: true })}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
