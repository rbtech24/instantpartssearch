import type { PartResult } from "@shared/schema";
import type { SearchAllSuppliersResult } from "./scraper";

export interface IStorage {
  // Cache management
  getCachedSearch(query: string): Promise<SearchAllSuppliersResult | undefined>;
  setCachedSearch(query: string, results: SearchAllSuppliersResult): Promise<void>;
}

export class MemStorage implements IStorage {
  private searchCache: Map<string, { results: SearchAllSuppliersResult; timestamp: number }>;
  private readonly CACHE_TTL = 3600000; // 1 hour in milliseconds

  constructor() {
    this.searchCache = new Map();
  }

  async getCachedSearch(query: string): Promise<SearchAllSuppliersResult | undefined> {
    const cached = this.searchCache.get(query.toLowerCase());
    if (!cached) return undefined;

    // Check if cache is still valid
    if (Date.now() - cached.timestamp > this.CACHE_TTL) {
      this.searchCache.delete(query.toLowerCase());
      return undefined;
    }

    return cached.results;
  }

  async setCachedSearch(query: string, results: SearchAllSuppliersResult): Promise<void> {
    this.searchCache.set(query.toLowerCase(), {
      results,
      timestamp: Date.now(),
    });
  }
}

export const storage = new MemStorage();
