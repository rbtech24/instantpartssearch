import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { PartCard } from "@/components/PartCard";
import { SearchProgress } from "@/components/SearchProgress";
import { FilterPanel } from "@/components/FilterPanel";
import { EmptyState } from "@/components/EmptyState";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, SlidersHorizontal } from "lucide-react";
import type { PartResult } from "@shared/schema";

// todo: remove mock functionality
const MOCK_PARTS: PartResult[] = [
  {
    id: "1",
    title: "Whirlpool Refrigerator Door Gasket Seal",
    partNumber: "WPW10321304",
    supplier: "RepairClinic",
    price: 42.99,
    currency: "USD",
    availability: "in_stock",
    productUrl: "https://example.com/part1",
    shippingInfo: "Free shipping",
  },
  {
    id: "2",
    title: "Whirlpool Door Seal Assembly",
    partNumber: "WPW10321304",
    supplier: "AppliancePartsPros",
    price: 45.50,
    currency: "USD",
    availability: "in_stock",
    productUrl: "https://example.com/part2",
    shippingInfo: "$5.99 shipping",
  },
  {
    id: "3",
    title: "OEM Refrigerator Door Gasket",
    partNumber: "WPW10321304",
    supplier: "PartSelect",
    price: 39.95,
    currency: "USD",
    availability: "low_stock",
    productUrl: "https://example.com/part3",
    shippingInfo: "Free shipping",
  },
  {
    id: "4",
    title: "Whirlpool Fridge Door Seal",
    partNumber: "WPW10321304",
    supplier: "Sears Parts",
    price: 48.00,
    currency: "USD",
    availability: "out_of_stock",
    productUrl: "https://example.com/part4",
    shippingInfo: "N/A",
  },
];

const MOCK_SUPPLIERS = [
  { name: "RepairClinic", status: "complete" as const },
  { name: "AppliancePartsPros", status: "complete" as const },
  { name: "PartSelect", status: "complete" as const },
  { name: "Sears Parts", status: "complete" as const },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState<PartResult[]>([]);
  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("price-low");

  // todo: remove mock functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);
    setHasSearched(true);

    // Simulate search delay
    setTimeout(() => {
      setResults(MOCK_PARTS);
      setIsSearching(false);
    }, 2000);
  };

  const handleCompare = (partId: string) => {
    setSelectedParts((prev) =>
      prev.includes(partId) ? prev.filter((id) => id !== partId) : [...prev, partId]
    );
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
                <span className="text-primary-foreground font-bold text-lg">P</span>
              </div>
              <h1 className="text-2xl font-bold" data-testid="text-app-title">PartsFind</h1>
            </div>
            <ThemeToggle />
          </div>
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search part number or description..."
            isLoading={isSearching}
          />
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24">
              <FilterPanel onFilterChange={(filters) => console.log('Filters:', filters)} />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {isSearching ? (
              <div className="max-w-md mx-auto">
                <SearchProgress suppliers={MOCK_SUPPLIERS} />
              </div>
            ) : !hasSearched ? (
              <EmptyState type="initial" />
            ) : results.length === 0 ? (
              <EmptyState type="no-results" query={searchQuery} />
            ) : (
              <>
                {/* Results Header */}
                <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
                  <div className="flex items-center gap-4">
                    <p className="text-muted-foreground" data-testid="text-results-count">
                      {results.length} results found
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
                        <FilterPanel onFilterChange={(filters) => console.log('Filters:', filters)} />
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
      </main>
    </div>
  );
}
