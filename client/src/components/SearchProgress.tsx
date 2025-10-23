import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";

interface SupplierStatus {
  name: string;
  status: "pending" | "searching" | "complete" | "error";
}

interface SearchProgressProps {
  suppliers: SupplierStatus[];
}

export function SearchProgress({ suppliers }: SearchProgressProps) {
  const completed = suppliers.filter(s => s.status === "complete" || s.status === "error").length;
  const total = suppliers.length;
  const progress = (completed / total) * 100;

  return (
    <Card data-testid="card-search-progress">
      <CardContent className="pt-6 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Searching suppliers...</span>
            <span className="text-muted-foreground">{completed}/{total}</span>
          </div>
          <Progress value={progress} className="h-2" data-testid="progress-search" />
        </div>

        <div className="space-y-2">
          {suppliers.map((supplier) => (
            <div
              key={supplier.name}
              className="flex items-center justify-between text-sm"
              data-testid={`supplier-status-${supplier.name.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <span className={supplier.status === "searching" ? "font-medium" : ""}>
                {supplier.name}
              </span>
              <div className="flex items-center gap-2">
                {supplier.status === "pending" && (
                  <span className="text-muted-foreground">Waiting...</span>
                )}
                {supplier.status === "searching" && (
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                )}
                {supplier.status === "complete" && (
                  <CheckCircle2 className="h-4 w-4 text-chart-2" />
                )}
                {supplier.status === "error" && (
                  <XCircle className="h-4 w-4 text-destructive" />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
