import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { searchRequestSchema } from "@shared/schema";
import { searchAllSuppliers } from "./scraper";

// Simple in-memory rate limiter
const rateLimiter = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10; // 10 requests per minute per IP

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimiter.get(ip);

  if (!record || now > record.resetTime) {
    rateLimiter.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  record.count++;
  return true;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Search parts across all suppliers
  app.post("/api/search", async (req, res) => {
    try {
      // Rate limiting
      const ip = req.ip || 'unknown';
      if (!checkRateLimit(ip)) {
        return res.status(429).json({
          error: "Too many requests",
          message: "Please wait before making another search"
        });
      }

      // Validate request
      const validation = searchRequestSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid request", 
          details: validation.error.errors 
        });
      }

      const { query, filters } = validation.data;

      // Check cache first
      const cached = await storage.getCachedSearch(query);
      if (cached) {
        console.log(`Cache hit for query: ${query}`);
        
        // Apply filters to cached results
        let results = cached.parts;
        if (filters) {
          results = applyFilters(results, filters);
        }
        
        return res.json({ 
          results, 
          cached: true,
          errors: cached.errors || [],
          searchedAt: new Date().toISOString()
        });
      }

      // Perform fresh search
      console.log(`Searching for: ${query}`);
      const searchResult = await searchAllSuppliers(query);

      // Only cache if we got at least one successful result
      if (searchResult.successCount > 0) {
        await storage.setCachedSearch(query, searchResult);
      }

      // Apply filters
      let filteredResults = searchResult.parts;
      if (filters) {
        filteredResults = applyFilters(searchResult.parts, filters);
      }

      // Save to search history (asynchronously, don't block response)
      storage.addSearchHistory(query, searchResult.parts.length).catch(err => {
        console.error("Failed to save search history:", err);
      });

      // Return results with error information
      res.json({ 
        results: filteredResults, 
        cached: false,
        errors: searchResult.errors,
        successCount: searchResult.successCount,
        totalCount: searchResult.totalCount,
        searchedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error("Search error:", error);
      res.status(500).json({ 
        error: "Search failed", 
        message: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });

  // Get recent searches across all users
  app.get("/api/recent-searches", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 20;
      const recentSearches = await storage.getRecentSearches(limit);
      res.json({ searches: recentSearches });
    } catch (error) {
      console.error("Failed to get recent searches:", error);
      res.status(500).json({ 
        error: "Failed to get recent searches", 
        message: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });

  // Get search suggestions (for autocomplete - future feature)
  app.get("/api/suggestions", async (req, res) => {
    const { q } = req.query;
    
    // For now, return empty array - can add common part numbers later
    res.json({ suggestions: [] });
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Helper function to apply filters to results
function applyFilters(
  results: any[],
  filters: {
    minPrice?: number;
    maxPrice?: number;
    availability?: string[];
    suppliers?: string[];
  }
) {
  return results.filter((part) => {
    // Price filters
    if (filters.minPrice !== undefined && part.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice !== undefined && part.price > filters.maxPrice) {
      return false;
    }

    // Availability filter
    if (filters.availability && filters.availability.length > 0) {
      if (!filters.availability.includes(part.availability)) {
        return false;
      }
    }

    // Supplier filter
    if (filters.suppliers && filters.suppliers.length > 0) {
      if (!filters.suppliers.includes(part.supplier)) {
        return false;
      }
    }

    return true;
  });
}
