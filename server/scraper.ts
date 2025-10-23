import type { PartResult } from "@shared/schema";
import * as cheerio from "cheerio";

export interface ScraperResult {
  supplier: string;
  parts: PartResult[];
  error?: string;
}

// Base scraper class that all supplier scrapers extend
abstract class SupplierScraper {
  abstract supplierName: string;
  abstract searchUrl(query: string): string;

  async search(query: string): Promise<ScraperResult> {
    try {
      const url = this.searchUrl(query);
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const html = await response.text();
      const parts = await this.parseResults(html, query);

      return {
        supplier: this.supplierName,
        parts,
      };
    } catch (error) {
      console.error(`Error scraping ${this.supplierName}:`, error);
      return {
        supplier: this.supplierName,
        parts: [],
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  abstract parseResults(html: string, query: string): Promise<PartResult[]>;

  protected generateId(supplier: string, partNumber: string): string {
    return `${supplier}-${partNumber}`.toLowerCase().replace(/[^a-z0-9-]/g, '-');
  }
}

// Amazon scraper (simplified - real implementation would need to handle Amazon's anti-bot measures)
class AmazonScraper extends SupplierScraper {
  supplierName = "Amazon";

  searchUrl(query: string): string {
    return `https://www.amazon.com/s?k=${encodeURIComponent(query + ' appliance part')}`;
  }

  async parseResults(html: string, query: string): Promise<PartResult[]> {
    const $ = cheerio.load(html);
    const parts: PartResult[] = [];

    // Amazon's structure: div[data-component-type="s-search-result"]
    $('div[data-component-type="s-search-result"]').each((_, element) => {
      try {
        const $item = $(element);
        
        const title = $item.find('h2 a span').first().text().trim();
        const priceWhole = $item.find('.a-price-whole').first().text().trim();
        const priceFraction = $item.find('.a-price-fraction').first().text().trim();
        const link = $item.find('h2 a').first().attr('href');
        const image = $item.find('img').first().attr('src');
        
        if (title && priceWhole && link) {
          const price = parseFloat(priceWhole.replace(',', '') + '.' + (priceFraction || '00'));
          
          // Extract part number from title if possible
          const partNumberMatch = title.match(/\b[A-Z0-9]{6,}\b/);
          const partNumber = partNumberMatch ? partNumberMatch[0] : query.toUpperCase();

          parts.push({
            id: this.generateId(this.supplierName, partNumber),
            title: title.substring(0, 100), // Limit title length
            partNumber,
            supplier: this.supplierName,
            price,
            currency: "USD",
            availability: "in_stock", // Amazon doesn't always show stock status
            productUrl: link.startsWith('http') ? link : `https://www.amazon.com${link}`,
            imageUrl: image,
            shippingInfo: "Prime eligible", // Simplified
          });
        }
      } catch (error) {
        console.error('Error parsing Amazon item:', error);
      }
    });

    return parts.slice(0, 10); // Limit to 10 results per supplier
  }
}

// RepairClinic scraper
class RepairClinicScraper extends SupplierScraper {
  supplierName = "RepairClinic";

  searchUrl(query: string): string {
    return `https://www.repairclinic.com/Search?q=${encodeURIComponent(query)}`;
  }

  async parseResults(html: string, query: string): Promise<PartResult[]> {
    const $ = cheerio.load(html);
    const parts: PartResult[] = [];

    // RepairClinic's structure
    $('.product-pod').each((_, element) => {
      try {
        const $item = $(element);
        
        const title = $item.find('.product-pod__title').text().trim();
        const partNumber = $item.find('.product-pod__part-number').text().trim();
        const priceText = $item.find('.product-pod__price').text().trim();
        const link = $item.find('a').first().attr('href');
        const image = $item.find('img').first().attr('src');
        
        if (title && priceText && link) {
          const priceMatch = priceText.match(/[\d,.]+/);
          const price = priceMatch ? parseFloat(priceMatch[0].replace(',', '')) : 0;
          
          // Check availability
          const availabilityText = $item.find('.product-pod__availability').text().toLowerCase();
          let availability: "in_stock" | "low_stock" | "out_of_stock" = "in_stock";
          if (availabilityText.includes('out of stock')) {
            availability = "out_of_stock";
          } else if (availabilityText.includes('limited')) {
            availability = "low_stock";
          }

          parts.push({
            id: this.generateId(this.supplierName, partNumber || query),
            title,
            partNumber: partNumber || query.toUpperCase(),
            supplier: this.supplierName,
            price,
            currency: "USD",
            availability,
            productUrl: link.startsWith('http') ? link : `https://www.repairclinic.com${link}`,
            imageUrl: image,
            shippingInfo: price > 50 ? "Free shipping" : "$5.99 shipping",
          });
        }
      } catch (error) {
        console.error('Error parsing RepairClinic item:', error);
      }
    });

    return parts.slice(0, 10);
  }
}

// Factory to get all scrapers
export function getAllScrapers(): SupplierScraper[] {
  return [
    new AmazonScraper(),
    new RepairClinicScraper(),
  ];
}

export interface SearchAllSuppliersResult {
  parts: PartResult[];
  errors: Array<{ supplier: string; error: string }>;
  successCount: number;
  totalCount: number;
}

// Main search function that coordinates all scrapers
export async function searchAllSuppliers(
  query: string,
  onProgress?: (supplier: string, status: 'searching' | 'complete' | 'error') => void
): Promise<SearchAllSuppliersResult> {
  const scrapers = getAllScrapers();
  const allResults: PartResult[] = [];
  const errors: Array<{ supplier: string; error: string }> = [];

  // Run all scrapers in parallel
  const results = await Promise.all(
    scrapers.map(async (scraper) => {
      if (onProgress) {
        onProgress(scraper.supplierName, 'searching');
      }

      const result = await scraper.search(query);
      
      if (onProgress) {
        onProgress(scraper.supplierName, result.error ? 'error' : 'complete');
      }

      return result;
    })
  );

  // Separate successful results from errors
  for (const result of results) {
    if (result.error) {
      errors.push({ supplier: result.supplier, error: result.error });
    } else {
      allResults.push(...result.parts);
    }
  }

  return {
    parts: allResults,
    errors,
    successCount: results.filter(r => !r.error).length,
    totalCount: results.length,
  };
}
