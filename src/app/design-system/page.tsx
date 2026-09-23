'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge, StarRating } from '@/components/ui/Badge';
import { Input, Select, Textarea } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, PriceCard } from '@/components/ui/Card';
import { EmptyListings, EmptyBuyerInterest, EmptyAlerts, EmptyForecast } from '@/components/ui/EmptyState';
import { BottomTabBar, Sidebar, TopNav } from '@/components/ui/Navigation';
import { formatCurrency } from '@/lib/utils';
import { crops, mandiPrices, farmerListings, verifiedBuyers, alerts, type LanguageCode } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import {
  Home,
  Store,
  TrendingUp,
  Bell,
  LayoutDashboard,
  Users,
  DollarSign,
  Truck,
  BarChart3,
  Settings,
  CheckCircle2,
  AlertCircle,
  Info,
  TrendingUp as TrendingUpIcon,
  TrendingDown,
} from 'lucide-react';

export default function DesignSystemPage() {
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('kisansetu-language') as LanguageCode | null;
    if (saved) setLanguage(saved);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-background-light" />;
  }

  const priceCardData = [
    { crop: crops[0], price: mandiPrices[0] },
    { crop: crops[1], price: mandiPrices[3] },
    { crop: crops[2], price: mandiPrices[6] },
    { crop: crops[3], price: mandiPrices[9] },
  ];

  return (
    <div className="min-h-screen bg-background-light py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">KisanSetu Design System</h1>
          <p className="text-neutral-600">Component library reference for developer handoff</p>
        </header>

        {/* Color Palette */}
        <section>
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Color Palette</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-neutral-900 mb-3">Primary (Forest Green)</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { shade: 50, label: '50' },
                  { shade: 100, label: '100' },
                  { shade: 200, label: '200' },
                  { shade: 300, label: '300' },
                  { shade: 400, label: '400' },
                  { shade: 500, label: '500' },
                  { shade: 600, label: '600' },
                  { shade: 700, label: '700' },
                  { shade: 800, label: '800' },
                  { shade: 900, label: '900 (Primary)' },
                  { shade: 950, label: '950' },
                ].map(({ shade, label }) => (
                  <div
                    key={shade}
                    className="w-20 h-20 rounded-lg flex flex-col items-center justify-end p-2 text-xs font-mono"
                    style={{ backgroundColor: `var(--color-primary-${shade})` }}
                  >
                    <span className={shade >= 600 ? 'text-white' : 'text-neutral-900'}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-neutral-900 mb-3">Accent (Gold/Amber)</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { shade: 50, label: '50' },
                  { shade: 100, label: '100' },
                  { shade: 200, label: '200' },
                  { shade: 300, label: '300' },
                  { shade: 400, label: '400' },
                  { shade: 500, label: '500 (Accent)' },
                  { shade: 600, label: '600' },
                  { shade: 700, label: '700' },
                  { shade: 800, label: '800' },
                  { shade: 900, label: '900' },
                ].map(({ shade, label }) => (
                  <div
                    key={shade}
                    className="w-20 h-20 rounded-lg flex flex-col items-center justify-end p-2 text-xs font-mono"
                    style={{ backgroundColor: `var(--color-accent-${shade})` }}
                  >
                    <span className={shade >= 600 ? 'text-primary-950' : 'text-neutral-900'}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-neutral-900 mb-3">Semantic Colors</h3>
              <div className="flex flex-wrap gap-4">
                {[
                  { name: 'Success', light: 'var(--color-success-light)', main: 'var(--color-success)', dark: 'var(--color-success-dark)' },
                  { name: 'Warning', light: 'var(--color-warning-light)', main: 'var(--color-warning)', dark: 'var(--color-warning-dark)' },
                  { name: 'Error', light: 'var(--color-error-light)', main: 'var(--color-error)', dark: 'var(--color-error-dark)' },
                ].map(({ name, light, main, dark }) => (
                  <div key={name} className="flex flex-col items-center gap-2">
                    <div className="flex gap-2">
                      <div className="w-16 h-16 rounded-lg" style={{ backgroundColor: light }} />
                      <div className="w-16 h-16 rounded-lg" style={{ backgroundColor: main }} />
                      <div className="w-16 h-16 rounded-lg" style={{ backgroundColor: dark }} />
                    </div>
                    <span className="text-sm font-medium">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section>
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Typography</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-neutral-900 mb-3">Farmer App (Large, Readable)</h3>
              <div className="space-y-3">
                {[
                  { label: '3xl - 1.875rem', class: 'text-farmer-3xl' },
                  { label: '2xl - 1.5rem', class: 'text-farmer-2xl' },
                  { label: 'xl - 1.25rem', class: 'text-farmer-xl' },
                  { label: 'lg - 1.125rem', class: 'text-farmer-lg' },
                  { label: 'base - 1rem', class: 'text-farmer-base' },
                  { label: 'sm - 0.875rem', class: 'text-farmer-sm' },
                  { label: 'xs - 0.75rem', class: 'text-farmer-xs' },
                ].map(({ label, class: cls }) => (
                  <p key={label} className={cn(cls, 'font-medium text-neutral-900')}>
                    {label} - The quick brown fox jumps over the lazy dog
                  </p>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-neutral-900 mb-3">Buyer Dashboard (Dense)</h3>
              <div className="space-y-3">
                {[
                  { label: '2xl - 1.25rem', class: 'text-buyer-2xl' },
                  { label: 'xl - 1.125rem', class: 'text-buyer-xl' },
                  { label: 'lg - 1rem', class: 'text-buyer-lg' },
                  { label: 'base - 0.875rem', class: 'text-buyer-base' },
                  { label: 'sm - 0.8125rem', class: 'text-buyer-sm' },
                  { label: 'xs - 0.6875rem', class: 'text-buyer-xs' },
                ].map(({ label, class: cls }) => (
                  <p key={label} className={cn(cls, 'font-medium text-neutral-900')}>
                    {label} - The quick brown fox jumps over the lazy dog
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section>
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Buttons</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-neutral-900 mb-3">Variants</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <Button variant="primary">Primary</Button>
                <Button variant="accent">Accent</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="text">Text</Button>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-neutral-900 mb-3">Sizes</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button size="xl">Extra Large</Button>
                <Button size="full" className="w-48">Full Width</Button>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-neutral-900 mb-3">States</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <Button variant="primary">Default</Button>
                <Button variant="primary" className="hover:bg-primary-950">Hover</Button>
                <Button variant="primary" disabled>Disabled</Button>
                <Button variant="primary" loading>Loading</Button>
                <Button variant="primary" leftIcon={<Home className="w-4 h-4" />}>With Icon</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Badges */}
        <section>
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Badges & Chips</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-neutral-900 mb-3">Status Badges</h3>
              <div className="flex flex-wrap gap-3">
                <Badge variant="default">Default</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="info">Info</Badge>
                <Badge variant="verified">Verified</Badge>
                <Badge variant="trend-up">+₹80</Badge>
                <Badge variant="trend-down">-₹50</Badge>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-neutral-900 mb-3">Sizes</h3>
              <div className="flex flex-wrap gap-3 items-center">
                <Badge size="sm" variant="success">Small</Badge>
                <Badge size="md" variant="success">Medium</Badge>
                <Badge size="lg" variant="success">Large</Badge>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-neutral-900 mb-3">Star Ratings</h3>
              <div className="flex flex-wrap gap-6 items-center">
                <StarRating rating={4.8} size="md" />
                <StarRating rating={4.2} size="md" />
                <StarRating rating={3.5} size="md" />
                <StarRating rating={4.9} size="lg" />
              </div>
            </div>
          </div>
        </section>

        {/* Inputs */}
        <section>
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Form Inputs</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-neutral-900 mb-3">Input States</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl">
                <Input label="Default" placeholder="Enter text" />
                <Input label="Filled" defaultValue="Filled value" />
                <Input label="Error" placeholder="Invalid" error="Invalid mobile number" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-neutral-900 mb-3">With Icons</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl">
                <Input
                  label="Search"
                  placeholder="Search..."
                  leftIcon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
                />
                <Input
                  label="Amount"
                  placeholder="0.00"
                  rightIcon={<span className="text-neutral-500">₹</span>}
                />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-neutral-900 mb-3">Select / Dropdown</h3>
              <Select
                label="Crop"
                placeholder="Select crop"
                options={crops.map((c) => ({ value: c.id, label: c.name }))}
              />
            </div>
            <div>
              <h3 className="text-lg font-medium text-neutral-900 mb-3">Textarea</h3>
              <Textarea label="Description" placeholder="Enter description..." rows={3} />
            </div>
          </div>
        </section>

        {/* Cards */}
        <section>
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Cards</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-neutral-900 mb-3">Variants</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card variant="default" padding="md">
                  <p className="font-medium">Default</p>
                  <p className="text-sm text-neutral-500 mt-1">White background, subtle border, shadow</p>
                </Card>
                <Card variant="elevated" padding="md">
                  <p className="font-medium">Elevated</p>
                  <p className="text-sm text-neutral-500 mt-1">No border, stronger shadow</p>
                </Card>
                <Card variant="outlined" padding="md">
                  <p className="font-medium">Outlined</p>
                  <p className="text-sm text-neutral-500 mt-1">Thicker border, no shadow</p>
                </Card>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-neutral-900 mb-3">Price Card (Reusable)</h3>
              <div className="flex flex-wrap gap-4">
                {priceCardData.map(({ crop, price }) => (
                  <PriceCard
                    key={crop.id}
                    cropName={crop.name}
                    cropNameHi={crop.nameHi}
                    cropNameMr={crop.nameMr}
                    price={price.price}
                    timestamp={price.timestamp}
                    trend={price.trend}
                    trendValue={price.trendValue}
                    language={language}
                  />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-neutral-900 mb-3">Card Composition</h3>
              <Card variant="default" padding="lg">
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                  <CardDescription>Card description goes here</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-700">Card content area with some text content.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="primary" size="sm">Action</Button>
                  <Button variant="secondary" size="sm">Cancel</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Empty States */}
        <section>
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Empty States</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="outlined" padding="lg">
              <h3 className="font-medium mb-4">No Listings</h3>
              <EmptyListings onAddCrop={() => {}} />
            </Card>
            <Card variant="outlined" padding="lg">
              <h3 className="font-medium mb-4">No Buyer Interest</h3>
              <EmptyBuyerInterest onGoToMarket={() => {}} />
            </Card>
            <Card variant="outlined" padding="lg">
              <h3 className="font-medium mb-4">No Alerts</h3>
              <EmptyAlerts />
            </Card>
            <Card variant="outlined" padding="lg">
              <h3 className="font-medium mb-4">No Forecast</h3>
              <EmptyForecast />
            </Card>
          </div>
        </section>

        {/* Navigation Patterns */}
        <section>
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Navigation Patterns</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-neutral-900 mb-3">Mobile Bottom Tab Bar (Farmer App)</h3>
              <div className="max-w-md mx-auto">
                <BottomTabBar />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-neutral-900 mb-3">Desktop Sidebar + Top Nav (Buyer Dashboard)</h3>
              <div className="h-96 bg-neutral-50 rounded-lg border border-neutral-200 flex overflow-hidden">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                  <TopNav />
                  <div className="flex-1 p-6">
                    <p className="text-neutral-500 text-center">Dashboard content area</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Spacing & Shadows */}
        <section>
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Spacing & Shadows</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-neutral-900 mb-3">Spacing Scale</h3>
              <div className="flex flex-wrap gap-4">
                {[
                  { name: 'xs (4px)', value: '4px' },
                  { name: 'sm (8px)', value: '8px' },
                  { name: 'md (16px)', value: '16px' },
                  { name: 'lg (24px)', value: '24px' },
                  { name: 'xl (32px)', value: '32px' },
                  { name: '2xl (48px)', value: '48px' },
                  { name: 'touch (48px)', value: '48px' },
                  { name: 'touch-lg (56px)', value: '56px' },
                ].map(({ name, value }) => (
                  <div key={name} className="flex flex-col items-center gap-1 p-4 bg-neutral-50 rounded-lg min-w-[80px]">
                    <div className="w-full h-2 bg-primary-900 rounded" style={{ height: value }} />
                    <span className="text-xs font-mono text-neutral-600">{name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-neutral-900 mb-3">Shadows</h3>
              <div className="flex flex-wrap gap-6">
                {[
                  { name: 'Card', class: 'shadow-card' },
                  { name: 'Card Hover', class: 'shadow-card-hover' },
                  { name: 'Button', class: 'shadow-button' },
                  { name: 'Button Hover', class: 'shadow-button-hover' },
                ].map(({ name, class: cls }) => (
                  <div key={name} className="flex flex-col items-center gap-2">
                    <div className={cn('w-32 h-20 rounded-lg bg-white', cls)} />
                    <span className="text-sm font-medium text-neutral-700">{name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-neutral-900 mb-3">Border Radius</h3>
              <div className="flex flex-wrap gap-6">
                {[
                  { name: 'Card (12px)', value: '12px' },
                  { name: 'Button (8px)', value: '8px' },
                  { name: 'Badge (full)', value: '9999px' },
                  { name: 'Input (8px)', value: '8px' },
                ].map(({ name, value }) => (
                  <div key={name} className="flex flex-col items-center gap-2">
                    <div className="w-24 h-24 bg-primary-100 flex items-center justify-center" style={{ borderRadius: value }} />
                    <span className="text-sm font-medium text-neutral-700">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}