import { Search, Package } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface EmptyStateProps {
  type: "initial" | "no-results";
  query?: string;
}

export function EmptyState({ type, query }: EmptyStateProps) {
  if (type === "initial") {
    return (
      <Card className="border-dashed" data-testid="card-empty-initial">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="rounded-full bg-muted p-6 mb-4">
            <Search className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Search for Parts</h3>
          <p className="text-muted-foreground max-w-md mb-6">
            Enter a part number or description to search across multiple suppliers instantly
          </p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="font-medium">Try searching for:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <code className="px-2 py-1 bg-muted rounded">WPW10321304</code>
              <code className="px-2 py-1 bg-muted rounded">refrigerator door seal</code>
              <code className="px-2 py-1 bg-muted rounded">washer agitator</code>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card data-testid="card-empty-no-results">
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <div className="rounded-full bg-muted p-6 mb-4">
          <Package className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No Parts Found</h3>
        <p className="text-muted-foreground max-w-md mb-4">
          We couldn't find any results for <span className="font-semibold">"{query}"</span>
        </p>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>Try:</p>
          <ul className="list-disc list-inside text-left">
            <li>Checking your spelling</li>
            <li>Using different keywords</li>
            <li>Searching by part number instead</li>
            <li>Adjusting your filters</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
