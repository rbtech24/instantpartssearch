import { z } from "zod";

export const partResultSchema = z.object({
  id: z.string(),
  title: z.string(),
  partNumber: z.string(),
  supplier: z.string(),
  supplierLogo: z.string().optional(),
  price: z.number(),
  currency: z.string().default("USD"),
  availability: z.enum(["in_stock", "low_stock", "out_of_stock"]),
  imageUrl: z.string().optional(),
  productUrl: z.string(),
  shippingInfo: z.string().optional(),
  specifications: z.record(z.string()).optional(),
});

export type PartResult = z.infer<typeof partResultSchema>;

export const searchRequestSchema = z.object({
  query: z.string().min(1),
  filters: z.object({
    minPrice: z.number().optional(),
    maxPrice: z.number().optional(),
    availability: z.array(z.enum(["in_stock", "low_stock", "out_of_stock"])).optional(),
    suppliers: z.array(z.string()).optional(),
  }).optional(),
});

export type SearchRequest = z.infer<typeof searchRequestSchema>;

export const searchHistorySchema = z.object({
  id: z.string(),
  query: z.string(),
  searchedAt: z.date(),
  parts: z.array(partResultSchema).optional(),
});

export type SearchHistory = z.infer<typeof searchHistorySchema>;
