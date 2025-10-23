import type { PartResult, SearchHistory } from "@shared/schema";

// Realistic demo parts data for showcasing the app
export const demoParts: PartResult[] = [
  {
    id: "demo-1",
    title: "Whirlpool Refrigerator Door Gasket",
    partNumber: "WPW10321304",
    supplier: "RepairClinic",
    price: 89.99,
    currency: "USD",
    availability: "in_stock",
    imageUrl: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=400&fit=crop",
    productUrl: "#",
    shippingInfo: "Free shipping on orders over $50"
  },
  {
    id: "demo-2",
    title: "GE Refrigerator Water Filter RPWFE",
    partNumber: "RPWFE",
    supplier: "Amazon",
    price: 54.99,
    currency: "USD",
    availability: "in_stock",
    imageUrl: "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400&h=400&fit=crop",
    productUrl: "#",
    shippingInfo: "Prime eligible"
  },
  {
    id: "demo-3",
    title: "Frigidaire Dishwasher Spray Arm",
    partNumber: "154568001",
    supplier: "PartSelect",
    price: 24.95,
    currency: "USD",
    availability: "in_stock",
    imageUrl: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=400&fit=crop",
    productUrl: "#"
  },
  {
    id: "demo-4",
    title: "Maytag Dryer Belt 12112425",
    partNumber: "12112425",
    supplier: "AppliancePartsPros",
    price: 18.50,
    currency: "USD",
    availability: "in_stock",
    imageUrl: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400&h=400&fit=crop",
    productUrl: "#",
    shippingInfo: "Ships within 1-2 business days"
  },
  {
    id: "demo-5",
    title: "Samsung Washer Door Boot Seal",
    partNumber: "DC64-01570A",
    supplier: "Sears Parts",
    price: 72.00,
    currency: "USD",
    availability: "in_stock",
    imageUrl: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&h=400&fit=crop",
    productUrl: "#"
  },
  {
    id: "demo-6",
    title: "LG Refrigerator Ice Maker Assembly",
    partNumber: "EAU61524007",
    supplier: "ReliableParts.com",
    price: 125.99,
    currency: "USD",
    availability: "low_stock",
    imageUrl: "https://images.unsplash.com/photo-1564053489984-317bbd824340?w=400&h=400&fit=crop",
    productUrl: "#",
    shippingInfo: "Only 3 left in stock"
  },
  {
    id: "demo-7",
    title: "Kenmore Range Burner Element",
    partNumber: "318372210",
    supplier: "RepairClinic",
    price: 45.75,
    currency: "USD",
    availability: "in_stock",
    imageUrl: "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=400&h=400&fit=crop",
    productUrl: "#"
  },
  {
    id: "demo-8",
    title: "Bosch Dishwasher Pump and Motor Assembly",
    partNumber: "00654575",
    supplier: "Amazon",
    price: 189.99,
    currency: "USD",
    availability: "in_stock",
    imageUrl: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=400&fit=crop",
    productUrl: "#",
    shippingInfo: "Prime eligible - Free 2-day shipping"
  },
  {
    id: "demo-9",
    title: "Whirlpool Dryer Thermal Fuse",
    partNumber: "3392519",
    supplier: "PartSelect",
    price: 12.99,
    currency: "USD",
    availability: "in_stock",
    imageUrl: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=400&fit=crop",
    productUrl: "#",
    shippingInfo: "Same day shipping if ordered by 4PM EST"
  },
  {
    id: "demo-10",
    title: "GE Oven Igniter WB13K10045",
    partNumber: "WB13K10045",
    supplier: "AppliancePartsPros",
    price: 34.50,
    currency: "USD",
    availability: "in_stock",
    imageUrl: "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=400&h=400&fit=crop",
    productUrl: "#"
  },
  {
    id: "demo-11",
    title: "Frigidaire Refrigerator Defrost Heater",
    partNumber: "5303918301",
    supplier: "Sears Parts",
    price: 28.95,
    currency: "USD",
    availability: "in_stock",
    imageUrl: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=400&fit=crop",
    productUrl: "#"
  },
  {
    id: "demo-12",
    title: "KitchenAid Dishwasher Rack Adjuster",
    partNumber: "WPW10546503",
    supplier: "ReliableParts.com",
    price: 16.75,
    currency: "USD",
    availability: "in_stock",
    imageUrl: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=400&fit=crop",
    productUrl: "#"
  },
  {
    id: "demo-13",
    title: "Electrolux Washer Drain Pump",
    partNumber: "137221600",
    supplier: "RepairClinic",
    price: 67.50,
    currency: "USD",
    availability: "in_stock",
    imageUrl: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&h=400&fit=crop",
    productUrl: "#",
    shippingInfo: "Free shipping"
  },
  {
    id: "demo-14",
    title: "Amana Dryer Idler Pulley",
    partNumber: "6-3700340",
    supplier: "Amazon",
    price: 21.99,
    currency: "USD",
    availability: "in_stock",
    imageUrl: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400&h=400&fit=crop",
    productUrl: "#",
    shippingInfo: "Prime eligible"
  },
  {
    id: "demo-15",
    title: "Robertshaw Hot Surface Igniter",
    partNumber: "41-408",
    supplier: "PartSelect",
    price: 42.00,
    currency: "USD",
    availability: "in_stock",
    imageUrl: "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=400&h=400&fit=crop",
    productUrl: "#",
    shippingInfo: "Ships within 24 hours"
  }
];

// Create demo search history with varied searches
export function createDemoSearchHistory(): SearchHistory[] {
  const now = Date.now();
  
  return [
    {
      id: "demo-search-1",
      query: "refrigerator door gasket",
      searchedAt: new Date(now - 5 * 60000), // 5 minutes ago
      parts: [demoParts[0], demoParts[1], demoParts[10]]
    },
    {
      id: "demo-search-2", 
      query: "dishwasher spray arm",
      searchedAt: new Date(now - 15 * 60000), // 15 minutes ago
      parts: [demoParts[2], demoParts[7], demoParts[11]]
    },
    {
      id: "demo-search-3",
      query: "dryer belt",
      searchedAt: new Date(now - 25 * 60000), // 25 minutes ago
      parts: [demoParts[3], demoParts[8], demoParts[13]]
    },
    {
      id: "demo-search-4",
      query: "ice maker assembly",
      searchedAt: new Date(now - 35 * 60000), // 35 minutes ago
      parts: [demoParts[5], demoParts[6]]
    },
    {
      id: "demo-search-5",
      query: "oven igniter",
      searchedAt: new Date(now - 45 * 60000), // 45 minutes ago
      parts: [demoParts[9], demoParts[14]]
    }
  ];
}
