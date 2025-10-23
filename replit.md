# Instant Parts Search

**Domain:** instantpartssearch.com

A web application that searches multiple supplier websites simultaneously to find and compare appliance repair parts.

## Overview

Instant Parts Search allows users to search for appliance parts across multiple suppliers (Amazon, ReliableParts.com, RepairClinic, AppliancePartsPros, PartSelect, Sears Parts) and compare prices, availability, and shipping options in one place.

## Current Features

- **Real-time multi-supplier search**: Searches multiple suppliers in parallel
- **Smart caching**: Caches successful search results for 1 hour to reduce repeated scraping
- **Error handling**: Displays which suppliers succeeded/failed and why
- **Rate limiting**: 10 searches per minute per IP to prevent abuse
- **Advanced filtering**: Filter by price range, availability, and specific suppliers
- **Sorting options**: Sort by price (low/high) or availability
- **Comparison mode**: Select multiple parts to compare side-by-side
- **Responsive design**: Works on desktop, tablet, and mobile
- **Dark mode**: Full dark mode support

## Technical Implementation

### Frontend
- React with TypeScript
- TanStack Query for API state management
- Shadcn UI components
- Tailwind CSS for styling
- Wouter for routing

### Backend
- Express.js server
- Web scraping using Cheerio
- In-memory result caching
- Rate limiting for API protection

## Important Notes About Web Scraping

### Current Limitations

The application implements web scraping for supplier websites, but there are important limitations to be aware of:

1. **Anti-Bot Protections**: Many e-commerce sites (especially Amazon) have sophisticated anti-bot measures including:
   - CAPTCHAs
   - IP blocking
   - Request rate limiting
   - HTML obfuscation
   - Fingerprinting

2. **Scraping Reliability**: The scrapers may fail frequently due to:
   - Changes in website HTML structure
   - Detection as automated traffic
   - Geographic restrictions
   - Time-based blocking

3. **Legal Considerations**: Web scraping may violate some websites' Terms of Service

### Recommended Improvements for Production

For a production-ready application, consider these alternatives:

1. **Official APIs**: Use official supplier APIs where available (many part suppliers offer affiliate/partner APIs)

2. **Headless Browsers with Proxies**: Use tools like Puppeteer/Playwright with residential proxy rotation for more reliable scraping

3. **Third-Party Data Services**: Partner with data aggregation services that maintain supplier relationships

4. **Supplier Partnerships**: Establish direct partnerships with suppliers for data feeds

5. **Hybrid Approach**: Combine API integrations for cooperative suppliers with careful scraping for others

## Monetization Strategy

The application is designed to support multiple monetization models:

1. **Affiliate Commissions** (Recommended): Earn 3-10% commission on purchases through affiliate links
2. **Featured Listings**: Suppliers pay for premium placement
3. **Premium Subscriptions**: Advanced features for paying users
4. **Advertising**: Display ads from Google AdSense or similar
5. **Lead Generation**: Sell qualified leads to suppliers

## Project Structure

```
/client
  /src
    /components      - Reusable UI components
    /pages          - Page components
    /lib            - Utilities and API client
/server
  routes.ts         - API endpoints
  scraper.ts        - Web scraping logic
  storage.ts        - In-memory caching
/shared
  schema.ts         - Shared TypeScript types and validation
```

## API Endpoints

### POST /api/search
Search for parts across all suppliers

**Request:**
```json
{
  "query": "WPW10321304",
  "filters": {
    "minPrice": 0,
    "maxPrice": 100,
    "availability": ["in_stock", "low_stock"],
    "suppliers": ["Amazon", "RepairClinic"]
  }
}
```

**Response:**
```json
{
  "results": [...],
  "cached": false,
  "errors": [
    { "supplier": "Amazon", "error": "HTTP 503" }
  ],
  "successCount": 1,
  "totalCount": 2,
  "searchedAt": "2024-01-01T00:00:00.000Z"
}
```

## Development

The application is already set up and running. The workflow "Start application" runs `npm run dev` which starts both the Express backend and Vite frontend on port 5000.

## Future Enhancements

- [ ] Implement proper supplier API integrations
- [ ] Add user authentication for search history
- [ ] Price tracking and alerts
- [ ] Product reviews and ratings
- [ ] Detailed comparison table view
- [ ] Export comparison results
- [ ] Email notifications for price drops
- [ ] Mobile app (React Native)
- [ ] Expand to other categories (HVAC, automotive, electronics)
