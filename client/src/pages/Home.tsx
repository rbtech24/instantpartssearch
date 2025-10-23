import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SearchBar } from "@/components/SearchBar";
import { PartCard } from "@/components/PartCard";
import { SearchProgress } from "@/components/SearchProgress";
import { FilterPanel } from "@/components/FilterPanel";
import { EmptyState } from "@/components/EmptyState";
import { ThemeToggle } from "@/components/ThemeToggle";
import { RecentSearches } from "@/components/RecentSearches";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, SlidersHorizontal } from "lucide-react";
import type { PartResult } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("price-low");
  const [filters, setFilters] = useState<{
    minPrice?: number;
    maxPrice?: number;
    availability?: string[];
    suppliers?: string[];
  }>({});

  // Fetch search results from backend
  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/search', activeSearch, filters],
    queryFn: async () => {
      if (!activeSearch) return null;
      
      const response = await apiRequest('POST', '/api/search', {
        query: activeSearch,
        filters: Object.keys(filters).length > 0 ? filters : undefined,
      });
      
      return await response.json() as { 
        results: PartResult[]; 
        cached: boolean; 
        errors?: Array<{ supplier: string; error: string }>;
        successCount?: number;
        totalCount?: number;
        searchedAt: string 
      };
    },
    enabled: !!activeSearch,
  });

  const results = data?.results || [];
  const searchErrors = data?.errors || [];
  const hasSearched = !!activeSearch;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActiveSearch(query);
    setSelectedParts([]);
  };

  const handleCompare = (partId: string) => {
    setSelectedParts((prev) =>
      prev.includes(partId) ? prev.filter((id) => id !== partId) : [...prev, partId]
    );
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const sortedResults = [...results].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "availability":
        const availabilityOrder = { in_stock: 0, low_stock: 1, out_of_stock: 2 };
        return availabilityOrder[a.availability] - availabilityOrder[b.availability];
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">I</span>
              </div>
              <h1 className="text-2xl font-bold" data-testid="text-app-title">Instant Parts Search</h1>
            </div>
            <ThemeToggle />
          </div>
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search part number or description..."
            isLoading={isLoading}
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24">
              <FilterPanel onFilterChange={handleFilterChange} />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {error ? (
              <div className="text-center py-16">
                <p className="text-destructive font-semibold mb-2">Search Error</p>
                <p className="text-muted-foreground">
                  {error instanceof Error ? error.message : 'Failed to search. Please try again.'}
                </p>
              </div>
            ) : isLoading ? (
              <div className="max-w-md mx-auto">
                <SearchProgress 
                  suppliers={[
                    { name: "Amazon", status: "searching" },
                    { name: "RepairClinic", status: "searching" },
                  ]} 
                />
              </div>
            ) : !hasSearched ? (
              <EmptyState type="initial" />
            ) : results.length === 0 ? (
              <EmptyState type="no-results" query={searchQuery} />
            ) : (
              <>
                {/* Search Status Messages */}
                {searchErrors.length > 0 && (
                  <div className="mb-4 p-4 bg-muted rounded-md">
                    <p className="text-sm font-medium mb-2">
                      Some suppliers could not be searched:
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {searchErrors.map((err, idx) => (
                        <li key={idx}>
                          <span className="font-medium">{err.supplier}:</span> {err.error}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Results Header */}
                <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
                  <div className="flex items-center gap-4">
                    <p className="text-muted-foreground" data-testid="text-results-count">
                      {results.length} results found
                      {data?.cached && <span className="ml-2 text-xs">(cached)</span>}
                      {data?.successCount !== undefined && data?.totalCount !== undefined && (
                        <span className="ml-2 text-xs">
                          ({data.successCount}/{data.totalCount} suppliers)
                        </span>
                      )}
                    </p>
                    
                    {/* Mobile Filter Button */}
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="outline" size="sm" className="lg:hidden" data-testid="button-mobile-filters">
                          <Filter className="h-4 w-4 mr-2" />
                          Filters
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="left" className="w-80 overflow-y-auto">
                        <FilterPanel onFilterChange={handleFilterChange} />
                      </SheetContent>
                    </Sheet>
                  </div>

                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[180px]" data-testid="select-sort">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="availability">Availability</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Results Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {sortedResults.map((part) => (
                    <PartCard
                      key={part.id}
                      part={part}
                      onCompare={handleCompare}
                      isSelected={selectedParts.includes(part.id)}
                    />
                  ))}
                </div>

                {/* Comparison Bar */}
                {selectedParts.length > 0 && (
                  <div className="fixed bottom-0 left-0 right-0 border-t bg-card p-4 shadow-lg" data-testid="bar-comparison">
                    <div className="container mx-auto flex items-center justify-between gap-4">
                      <p className="font-medium">
                        {selectedParts.length} {selectedParts.length === 1 ? 'part' : 'parts'} selected for comparison
                      </p>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setSelectedParts([])}
                          data-testid="button-clear-selection"
                        >
                          Clear
                        </Button>
                        <Button data-testid="button-compare-selected">
                          Compare Selected
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Recently Found Parts Section */}
        <RecentSearches />
      </main>
    </div>
  );
}
