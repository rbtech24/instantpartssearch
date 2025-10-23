import { useQuery } from "@tanstack/react-query";
import { TrendingUp } from "lucide-react";
import { PartCard } from "@/components/PartCard";
import type { SearchHistory, PartResult } from "@shared/schema";

export function RecentSearches() {
  const { data, isLoading } = useQuery<{ searches: SearchHistory[] }>({
    queryKey: ["/api/recent-searches"],
    refetchInterval: 30000,
  });

  // Flatten all parts from recent searches into a single array
  const recentParts: PartResult[] = [];
  if (data?.searches) {
    for (const search of data.searches) {
      if (search.parts && search.parts.length > 0) {
        recentParts.push(...search.parts);
      }
    }
  }

  // Take first 12 unique parts (by ID)
  const uniqueParts = recentParts.filter((part, index, self) => 
    index === self.findIndex(p => p.id === part.id)
  ).slice(0, 12);

  if (isLoading || uniqueParts.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 pb-8" data-testid="section-recent-parts">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-xl font-semibold" data-testid="heading-recent-parts">
            Recently Found Parts
          </h2>
          <span className="text-sm text-muted-foreground">
            Popular searches by other users
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {uniqueParts.map((part) => (
            <PartCard
              key={part.id}
              part={part}
              onCompare={() => {}}
              isSelected={false}
              data-testid={`card-recent-part-${part.id}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
