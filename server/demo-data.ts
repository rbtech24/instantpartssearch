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
  },
  {
    id: "demo-16",
    title: "Whirlpool Refrigerator Water Inlet Valve",
    partNumber: "W10408179",
    supplier: "Encompass",
    price: 38.99,
    currency: "USD",
    availability: "in_stock",
    imageUrl: "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400&h=400&fit=crop",
    productUrl: "#",
    shippingInfo: "Free shipping on orders over $75"
  },
  {
    id: "demo-17",
    title: "GE Dishwasher Door Latch Assembly",
    partNumber: "WD13X10003",
    supplier: "Encompass",
    price: 56.25,
    currency: "USD",
    availability: "in_stock",
    imageUrl: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=400&fit=crop",
    productUrl: "#"
  },
  {
    id: "demo-18",
    title: "LG Dryer Door Switch",
    partNumber: "6600ED3001A",
    supplier: "Encompass",
    price: 19.95,
    currency: "USD",
    availability: "in_stock",
    imageUrl: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&h=400&fit=crop",
    productUrl: "#",
    shippingInfo: "Ships same day"
  },
  {
    id: "demo-19",
    title: "Frigidaire Refrigerator Control Board",
    partNumber: "5304518654",
    supplier: "Marcone",
    price: 142.50,
    currency: "USD",
    availability: "in_stock",
    imageUrl: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=400&fit=crop",
    productUrl: "#",
    shippingInfo: "Next-day delivery available"
  },
  {
    id: "demo-20",
    title: "Maytag Washer Suspension Rod Kit",
    partNumber: "W10780048",
    supplier: "Marcone",
    price: 84.99,
    currency: "USD",
    availability: "in_stock",
    imageUrl: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&h=400&fit=crop",
    productUrl: "#",
    shippingInfo: "Next-day delivery available"
  },
  {
    id: "demo-21",
    title: "Samsung Refrigerator Ice Maker",
    partNumber: "DA97-05422A",
    supplier: "Marcone",
    price: 98.00,
    currency: "USD",
    availability: "low_stock",
    imageUrl: "https://images.unsplash.com/photo-1564053489984-317bbd824340?w=400&h=400&fit=crop",
    productUrl: "#",
    shippingInfo: "Limited availability - Order now"
  },
  {
    id: "demo-22",
    title: "Electrolux Dishwasher Heating Element",
    partNumber: "154827501",
    supplier: "Sundberg",
    price: 48.75,
    currency: "USD",
    availability: "in_stock",
    imageUrl: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=400&fit=crop",
    productUrl: "#",
    shippingInfo: "2-day shipping"
  },
  {
    id: "demo-23",
    title: "Whirlpool Range Control Knob",
    partNumber: "WPW10594481",
    supplier: "Sundberg",
    price: 14.50,
    currency: "USD",
    availability: "in_stock",
    imageUrl: "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=400&h=400&fit=crop",
    productUrl: "#",
    shippingInfo: "2-day shipping"
  },
  {
    id: "demo-24",
    title: "GE Dryer High Limit Thermostat",
    partNumber: "WE4M305",
    supplier: "Sundberg",
    price: 22.95,
    currency: "USD",
    availability: "in_stock",
    imageUrl: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400&h=400&fit=crop",
    productUrl: "#",
    shippingInfo: "2-day shipping"
  }
];

// Create demo search history with varied searches
export function createDemoSearchHistory(): SearchHistory[] {
  const now = Date.now();
  
  return [
    {
      id: "demo-search-1",
      query: "refrigerator water inlet valve",
      searchedAt: new Date(now - 5 * 60000), // 5 minutes ago
      parts: [demoParts[15], demoParts[18], demoParts[1]] // Encompass, Marcone, Amazon
    },
    {
      id: "demo-search-2", 
      query: "dishwasher door latch",
      searchedAt: new Date(now - 15 * 60000), // 15 minutes ago
      parts: [demoParts[16], demoParts[21], demoParts[2]] // Encompass, Sundberg, PartSelect
    },
    {
      id: "demo-search-3",
      query: "dryer door switch",
      searchedAt: new Date(now - 25 * 60000), // 25 minutes ago
      parts: [demoParts[17], demoParts[23], demoParts[8]] // Encompass, Sundberg, PartSelect
    },
    {
      id: "demo-search-4",
      query: "refrigerator control board",
      searchedAt: new Date(now - 35 * 60000), // 35 minutes ago
      parts: [demoParts[18], demoParts[19]] // Marcone (2 parts)
    },
    {
      id: "demo-search-5",
      query: "washer suspension rod",
      searchedAt: new Date(now - 45 * 60000), // 45 minutes ago
      parts: [demoParts[19], demoParts[4]] // Marcone, Sears Parts
    },
    {
      id: "demo-search-6",
      query: "range control knob",
      searchedAt: new Date(now - 55 * 60000), // 55 minutes ago
      parts: [demoParts[22], demoParts[6]] // Sundberg, ReliableParts
    }
  ];
}
