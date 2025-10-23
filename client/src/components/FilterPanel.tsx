import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import { useState } from "react";

interface FilterPanelProps {
  onFilterChange?: (filters: {
    minPrice?: number;
    maxPrice?: number;
    availability?: string[];
    suppliers?: string[];
  }) => void;
}

export function FilterPanel({ onFilterChange }: FilterPanelProps) {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>(["in_stock", "low_stock"]);
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([]);

  const suppliers = ["RepairClinic", "AppliancePartsPros", "PartSelect", "Sears Parts"];

  const handleAvailabilityToggle = (value: string) => {
    setSelectedAvailability(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const handleSupplierToggle = (supplier: string) => {
    setSelectedSuppliers(prev =>
      prev.includes(supplier) ? prev.filter(s => s !== supplier) : [...prev, supplier]
    );
  };

  const handleApplyFilters = () => {
    onFilterChange?.({
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      availability: selectedAvailability,
      suppliers: selectedSuppliers.length > 0 ? selectedSuppliers : undefined,
    });
  };

  const handleReset = () => {
    setPriceRange([0, 500]);
    setSelectedAvailability(["in_stock", "low_stock"]);
    setSelectedSuppliers([]);
    onFilterChange?.({});
  };

  return (
    <Card data-testid="card-filters">
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Filter className="h-5 w-5" />
          Filters
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          data-testid="button-reset-filters"
        >
          <X className="h-4 w-4 mr-1" />
          Reset
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Price Range</Label>
          <div className="pt-2">
            <Slider
              min={0}
              max={500}
              step={10}
              value={priceRange}
              onValueChange={setPriceRange}
              data-testid="slider-price-range"
            />
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span data-testid="text-min-price">${priceRange[0]}</span>
            <span data-testid="text-max-price">${priceRange[1]}</span>
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-semibold">Availability</Label>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Checkbox
                id="in-stock"
                checked={selectedAvailability.includes("in_stock")}
                onCheckedChange={() => handleAvailabilityToggle("in_stock")}
                data-testid="checkbox-in-stock"
              />
              <Label htmlFor="in-stock" className="text-sm font-normal cursor-pointer">
                In Stock
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="low-stock"
                checked={selectedAvailability.includes("low_stock")}
                onCheckedChange={() => handleAvailabilityToggle("low_stock")}
                data-testid="checkbox-low-stock"
              />
              <Label htmlFor="low-stock" className="text-sm font-normal cursor-pointer">
                Low Stock
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="out-of-stock"
                checked={selectedAvailability.includes("out_of_stock")}
                onCheckedChange={() => handleAvailabilityToggle("out_of_stock")}
                data-testid="checkbox-out-of-stock"
              />
              <Label htmlFor="out-of-stock" className="text-sm font-normal cursor-pointer">
                Out of Stock
              </Label>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-semibold">Suppliers</Label>
          <div className="space-y-2">
            {suppliers.map((supplier) => (
              <div key={supplier} className="flex items-center gap-2">
                <Checkbox
                  id={supplier}
                  checked={selectedSuppliers.includes(supplier)}
                  onCheckedChange={() => handleSupplierToggle(supplier)}
                  data-testid={`checkbox-supplier-${supplier.toLowerCase().replace(/\s+/g, "-")}`}
                />
                <Label htmlFor={supplier} className="text-sm font-normal cursor-pointer">
                  {supplier}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Button
          onClick={handleApplyFilters}
          className="w-full"
          data-testid="button-apply-filters"
        >
          Apply Filters
        </Button>
      </CardContent>
    </Card>
  );
}
