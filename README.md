# KisanSetu - Agri-Tech Marketplace

A mobile-first agri-tech marketplace with two apps in one codebase:
1. **Farmer App** - Sell crops directly to verified buyers, check mandi prices, forecast prices, and get real-time alerts
2. **Buyer Dashboard** - Desktop procurement workspace for mills/processors to source crops directly from farmers

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge

## Design System

The app includes a comprehensive design system with:
- **Colors**: Primary (forest green), Accent (gold/amber), Semantic (success/warning/error)
- **Typography**: Two scales - Farmer (large, readable) and Buyer (dense)
- **Components**: Buttons, Badges, Inputs, Cards, Navigation, Charts, Empty States
- **Spacing**: Consistent scale with touch-target minimums (48px)

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles & Tailwind imports
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Redirects to onboarding
│   ├── onboarding/          # Language selection screen
│   ├── farmer/              # Farmer app (mobile)
│   │   ├── layout.tsx       # Farmer layout with bottom tabs
│   │   ├── page.tsx         # Home screen
│   │   ├── calculator/      # Net profit calculator
│   │   ├── market/          # Marketplace (listings + buyers)
│   │   ├── forecast/        # Price forecast with charts
│   │   └── alerts/          # Mandi alerts feed
│   ├── buyer/               # Buyer dashboard (desktop)
│   │   ├── layout.tsx       # Buyer layout with sidebar
│   │   └── page.tsx         # Procurement dashboard
│   └── design-system/       # Component reference page
├── components/
│   └── ui/                  # Reusable UI components
│       ├── Button.tsx
│       ├── Badge.tsx
│       ├── Input.tsx
│       ├── Card.tsx
│       ├── EmptyState.tsx
│       ├── Charts.tsx
│       └── Navigation.tsx
├── lib/
│   ├── design-tokens.ts     # Design system tokens
│   ├── mock-data.ts         # Mock data & types
│   └── utils.ts             # Utility functions
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd kisansethu-prototype

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Routes

| Route | Description |
|-------|-------------|
| `/` | Redirects to onboarding |
| `/onboarding` | Language selection |
| `/farmer` | Farmer home screen |
| `/farmer/calculator` | Net profit calculator |
| `/farmer/market` | Marketplace (My Listings / Buyer Interest) |
| `/farmer/forecast` | Price forecast with charts |
| `/farmer/alerts` | Mandi alerts feed |
| `/buyer` | Buyer procurement dashboard |
| `/buyer/sourcing` | Search and connect with farmer offers |
| `/buyer/mandi-prices` | Compare nearby mandi prices |
| `/buyer/contracts` | Track active procurement contracts |
| `/buyer/logistics` | Track farm-to-hub shipments |
| `/buyer/analytics` | Review procurement performance |
| `/buyer/settings` | Manage buyer workspace preferences |
| `/design-system` | Component reference page |

## Key Features

### Farmer App (Mobile-First)
- **Onboarding**: Language selection (English, Hindi, Marathi)
- **Home**: Mandi prices, AI assistant, quick actions grid
- **Calculator**: Net profit calculator with real-time breakdown
- **Marketplace**: Tabbed interface (My Listings / Buyer Interest)
- **Forecast**: Interactive charts with 7/30 day toggle, expert insights
- **Alerts**: Chronological feed with dismiss/read actions
- **Bottom Tab Bar**: Persistent navigation

### Buyer Dashboard (Desktop)
- **Sidebar Navigation**: 6 sections with icons
- **Top Nav**: Search, notifications, messages, live badge, user menu
- **KPI Cards**: Key metrics with trend indicators
- **Direct Farm Offers**: Sortable/filterable table with farmer ratings
- **Mandi Comparison**: Horizontal bar chart
- **Profile Footer**: User info and live status

### Design System Reference
- Complete component showcase at `/design-system`
- All variants, states, and sizes documented
- Color palette, typography, spacing, shadows reference

## Mock Data

All data is mocked in `src/lib/mock-data.ts` with TypeScript interfaces for easy API integration:
- Crops, mandi prices, forecasts
- Farmer listings, verified buyers
- Alerts, buyer dashboard KPIs
- Direct farm offers, mandi comparisons
- Translations for EN/HI/MR

## Customization

### Adding New Routes
1. Create folder under `src/app/farmer/` or `src/app/buyer/`
2. Add `page.tsx` with the screen component
3. Navigation automatically works via layouts

### Extending Design Tokens
Edit `src/lib/design-tokens.ts` and `tailwind.config.ts` for:
- New colors
- Spacing values
- Typography scales
- Border radius, shadows

### Replacing Mock Data
Replace functions in `src/lib/mock-data.ts` with API calls:
```typescript
// Example: Replace getMandiPricesByCrop with API call
export async function getMandiPricesByCrop(cropId: string): Promise<MandiPrice[]> {
  const res = await fetch(`/api/mandi-prices?crop=${cropId}`);
  return res.json();
}
```

## Responsive Breakpoints

- **Mobile**: < 768px (Farmer app with bottom tabs)
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px (Buyer dashboard with sidebar)

## Accessibility

- Semantic HTML
- ARIA labels and roles
- Focus visible states
- Color contrast compliance
- Touch target minimums (48px)
- Screen reader support

## License

MIT