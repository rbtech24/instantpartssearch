import { PartCard } from '../PartCard';
import type { PartResult } from '@shared/schema';

export default function PartCardExample() {
  const mockPart: PartResult = {
    id: "1",
    title: "Whirlpool Refrigerator Door Gasket",
    partNumber: "WPW10321304",
    supplier: "RepairClinic",
    price: 42.99,
    currency: "USD",
    availability: "in_stock",
    productUrl: "https://example.com/part",
    shippingInfo: "Free shipping",
  };

  return (
    <div className="w-full max-w-sm">
      <PartCard 
        part={mockPart}
        onCompare={(id) => console.log('Compare part:', id)}
      />
    </div>
  );
}
