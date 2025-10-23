import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Package } from "lucide-react";
import type { PartResult } from "@shared/schema";

interface PartCardProps {
  part: PartResult;
  onCompare?: (partId: string) => void;
  isSelected?: boolean;
}

export function PartCard({ part, onCompare, isSelected = false }: PartCardProps) {
  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "in_stock":
        return "bg-chart-2 text-white";
      case "low_stock":
        return "bg-chart-3 text-white";
      case "out_of_stock":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case "in_stock":
        return "In Stock";
      case "low_stock":
        return "Low Stock";
      case "out_of_stock":
        return "Out of Stock";
      default:
        return "Unknown";
    }
  };

  return (
    <Card 
      className={`flex flex-col h-full hover-elevate transition-shadow ${isSelected ? "ring-2 ring-primary" : ""}`}
      data-testid={`card-part-${part.id}`}
    >
      <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 pb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base line-clamp-2 mb-1" data-testid={`text-part-title-${part.id}`}>
            {part.title}
          </h3>
          <p className="font-mono text-sm text-muted-foreground" data-testid={`text-part-number-${part.id}`}>
            {part.partNumber}
          </p>
        </div>
        <Badge className={`${getAvailabilityColor(part.availability)} shrink-0`} data-testid={`badge-availability-${part.id}`}>
          {getAvailabilityText(part.availability)}
        </Badge>
      </CardHeader>

      <CardContent className="flex-1 space-y-3">
        <div className="aspect-square w-full bg-muted rounded-md flex items-center justify-center overflow-hidden">
          {part.imageUrl ? (
            <img 
              src={part.imageUrl} 
              alt={part.title}
              className="w-full h-full object-cover"
              data-testid={`img-part-${part.id}`}
            />
          ) : (
            <Package className="h-16 w-16 text-muted-foreground" />
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Supplier</span>
            <span className="font-medium text-sm" data-testid={`text-supplier-${part.id}`}>{part.supplier}</span>
          </div>
          
          {part.shippingInfo && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Shipping</span>
              <span className="text-sm" data-testid={`text-shipping-${part.id}`}>{part.shippingInfo}</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-3 pt-4 border-t">
        <div className="flex items-baseline justify-between w-full">
          <span className="text-3xl font-bold" data-testid={`text-price-${part.id}`}>
            ${part.price.toFixed(2)}
          </span>
          <span className="text-sm text-muted-foreground">{part.currency}</span>
        </div>

        <div className="flex gap-2 w-full">
          <Button
            variant="default"
            className="flex-1"
            asChild
            data-testid={`button-view-${part.id}`}
          >
            <a href={part.productUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              View
            </a>
          </Button>
          {onCompare && (
            <Button
              variant={isSelected ? "secondary" : "outline"}
              onClick={() => onCompare(part.id)}
              data-testid={`button-compare-${part.id}`}
            >
              {isSelected ? "Selected" : "Compare"}
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
