# Design Guidelines: Instant Appliance Parts Search

## Design Approach

**Selected System:** Material Design with custom adaptations for e-commerce comparison
**Justification:** This is a utility-focused, information-dense application requiring efficient search, clear data presentation, and quick decision-making. Material Design provides excellent patterns for search interfaces, data tables, and loading states.

**Key Design Principles:**
- Speed over aesthetics: Prioritize fast scanning and comparison
- Information hierarchy: Price, availability, and supplier prominence
- Trust through clarity: Transparent sourcing and real-time updates
- Progressive disclosure: Show essentials first, details on demand

## Core Design Elements

### A. Color Palette

**Dark Mode (Primary):**
- Background: 220 15% 12%
- Surface: 220 15% 18%
- Primary (Search/CTA): 210 100% 60%
- Success (Available): 142 76% 45%
- Warning (Low Stock): 38 92% 50%
- Error (Out of Stock): 0 84% 60%
- Text Primary: 0 0% 95%
- Text Secondary: 220 10% 70%

**Light Mode:**
- Background: 0 0% 98%
- Surface: 0 0% 100%
- Primary: 210 100% 50%
- Text adjustments with same hue logic

### B. Typography

**Font Stack:**
- Primary: Inter (via Google Fonts) - clean, excellent readability for dense information
- Monospace: JetBrains Mono - for part numbers and technical specifications

**Hierarchy:**
- H1 (Page Title): text-3xl font-bold
- H2 (Section Headers): text-xl font-semibold
- H3 (Card Titles): text-lg font-medium
- Body: text-base
- Small (Meta Info): text-sm text-secondary
- Part Numbers: font-mono text-sm

### C. Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, and 8 (p-2, m-4, gap-6, py-8)
**Container:** max-w-7xl mx-auto px-4
**Responsive Breakpoints:** Mobile-first with md: and lg: for tablet/desktop

### D. Component Library

**Search Interface:**
- Large, prominent search bar at top (sticky on scroll)
- Auto-suggest dropdown for common parts
- Advanced filters panel (collapsible): Brand, Price Range, Availability, Supplier
- Search button with loading spinner integration
- Recent searches chip display below input

**Results Display:**
- Grid layout: 1 column (mobile), 2 columns (tablet), 3-4 columns (desktop)
- Each result card contains: Part image, Title, Part number (mono), Supplier logo, Price (prominent), Availability badge, Shipping info, "View Details" button
- Sticky comparison bar at bottom when items selected
- Sort dropdown: Price (Low to High), Availability, Supplier Rating

**Data Presentation:**
- Price: Large, bold with currency symbol
- Availability: Color-coded badges (green/yellow/red)
- Part specifications: Collapsible accordion within cards
- Supplier info: Small logo + name + rating stars

**Loading States:**
- Skeleton cards matching result card dimensions
- Progress indicator showing which suppliers are being searched
- "Searching [Supplier Name]..." live updates
- Estimated time remaining

**Comparison View:**
- Side-by-side table when 2-4 items selected
- Highlight differences in specifications
- Quick add to cart for each option
- Clear button to reset comparison

**Navigation:**
- Minimal top bar: Logo, Search (always accessible), Settings (dark mode toggle)
- Breadcrumb navigation for category browsing (if implemented later)

### E. Animations

**Minimal, Purposeful Only:**
- Search button pulse on hover (subtle)
- Fade-in for result cards (stagger: 50ms delay)
- Smooth collapse/expand for filters and details
- Loading spinner rotation
- No scroll-triggered animations
- No parallax effects

## Images

**No Large Hero Image** - This is a utility tool, not a marketing page. Start immediately with the search interface.

**Product Images:**
- Thumbnail in result cards: 200x200px, object-cover, rounded corners
- Expanded view: 400x400px modal on click
- Supplier logos: 60x30px, grayscale filter on dark mode
- Placeholder: Gray background with part icon if image unavailable

## Page Structure

**Primary View (Search Page):**
1. Sticky header with logo + search bar + settings (h-16)
2. Filters panel (collapsible sidebar on desktop, drawer on mobile)
3. Results grid with sort controls
4. Sticky comparison bar (bottom, appears when items selected)
5. Minimal footer with attribution and contact

**Key UX Patterns:**
- Instant search results as user types (debounced)
- Empty state: Helpful suggestions for common part searches
- Error states: Clear messaging when suppliers timeout or fail
- Mobile: Bottom sheet for filters, swipeable cards for comparison