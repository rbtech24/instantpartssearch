import type { PartResult, SearchHistory } from "@shared/schema";
import type { SearchAllSuppliersResult } from "./scraper";

export interface IStorage {
  // Cache management
  getCachedSearch(query: string): Promise<SearchAllSuppliersResult | undefined>;
  setCachedSearch(query: string, results: SearchAllSuppliersResult): Promise<void>;
  
  // Search history management
  addSearchHistory(query: string, parts: PartResult[]): Promise<void>;
  getRecentSearches(limit?: number): Promise<SearchHistory[]>;
}

export class MemStorage implements IStorage {
  private searchCache: Map<string, { results: SearchAllSuppliersResult; timestamp: number }>;
  private searchHistory: SearchHistory[];
  private readonly CACHE_TTL = 3600000; // 1 hour in milliseconds
  private readonly MAX_HISTORY = 50; // Keep last 50 searches

  constructor() {
    this.searchCache = new Map();
    this.searchHistory = [];
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

  async addSearchHistory(query: string, parts: PartResult[]): Promise<void> {
    // Only save if we have parts to show
    if (parts.length === 0) {
      return;
    }

    // Save top 5 parts max to keep data manageable
    const topParts = parts.slice(0, 5);

    const searchEntry: SearchHistory = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      query,
      searchedAt: new Date(),
      parts: topParts,
    };

    // Add to beginning of array
    this.searchHistory.unshift(searchEntry);

    // Keep only the most recent entries
    if (this.searchHistory.length > this.MAX_HISTORY) {
      this.searchHistory = this.searchHistory.slice(0, this.MAX_HISTORY);
    }
  }

  async getRecentSearches(limit: number = 20): Promise<SearchHistory[]> {
    return this.searchHistory.slice(0, limit);
  }
}

export const storage = new MemStorage();
