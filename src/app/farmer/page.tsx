'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mic, Calculator, Store, TrendingUp, Bell, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge, StarRating } from '@/components/ui/Badge';
import { Card, PriceCard } from '@/components/ui/Card';
import { EmptyListings } from '@/components/ui/EmptyState';
import { formatCurrency, formatRelativeTime } from '@/lib/utils';
import { crops, mandiPrices, verifiedBuyers, farmerListings, type LanguageCode, getTranslation } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function FarmerHomePage() {
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [mounted, setMounted] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('kisansetu-language') as LanguageCode | null;
    if (saved) setLanguage(saved);
  }, []);

  const t = (key: string) => getTranslation(language, key);

  // Get today's mandi prices for top 3 crops
  const topCrops = ['wheat', 'soybean', 'gram'];
  const todaysPrices = topCrops.map((cropId) => {
    const crop = crops.find((c) => c.id === cropId);
    const prices = mandiPrices.filter((p) => p.cropId === cropId);
    const primaryPrice = prices[0]; // Indore Mandi as primary
    return {
      crop,
      price: primaryPrice,
    };
  }).filter((p) => p.crop && p.price);

  const quickActions = [
    {
      id: 'calculator',
      label: t('calculator'),
      labelHi: t('calculator'),
      labelMr: t('calculator'),
      icon: Calculator,
      href: '/farmer/calculator',
      color: 'bg-primary-100 text-primary-900',
    },
    {
      id: 'marketplace',
      label: t('marketplace'),
      labelHi: t('marketplace'),
      labelMr: t('marketplace'),
      icon: Store,
      href: '/farmer/market',
      color: 'bg-accent-100 text-accent-900',
    },
    {
      id: 'forecast',
      label: t('forecast'),
      labelHi: t('forecast'),
      labelMr: t('forecast'),
      icon: TrendingUp,
      href: '/farmer/forecast',
      color: 'bg-success-light/10 text-success-dark',
    },
    {
      id: 'alerts',
      label: t('alerts'),
      labelHi: t('alerts'),
      labelMr: t('alerts'),
      icon: Bell,
      href: '/farmer/alerts',
      color: 'bg-warning-light/10 text-warning-dark',
      badge: 3,
    },
  ];

  const getActionLabel = (action: typeof quickActions[0]) => {
    if (language === 'hi') return action.labelHi;
    if (language === 'mr') return action.labelMr;
    return action.label;
  };

  if (!mounted) {
    return <div className="min-h-screen bg-background-light" />;
  }

  return (
    <div className="min-h-screen bg-background-light">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-20">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-500">
                {language === 'hi' ? 'इंदौर मंडी' : language === 'mr' ? 'इंदौर मंडी' : 'Indore Mandi'} · Ram Singh
              </p>
              <h1 className="text-xl font-bold text-neutral-900">
                {language === 'hi' ? 'स्वागत है' : language === 'mr' ? 'स्वागत आहे' : 'Welcome'}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="text" size="sm" onClick={() => { setLanguage('en'); localStorage.setItem('kisansetu-language', 'en'); }}>
                EN
              </Button>
              <Button variant="text" size="sm" onClick={() => { setLanguage('hi'); localStorage.setItem('kisansetu-language', 'hi'); }}>
                HI
              </Button>
              <Button variant="text" size="sm" onClick={() => { setLanguage('mr'); localStorage.setItem('kisansetu-language', 'mr'); }}>
                MR
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="p-4 space-y-6">
        {/* Today's Mandi Prices */}
        <section aria-labelledby="mandi-prices-heading">
          <div className="flex items-center justify-between mb-4">
            <h2 id="mandi-prices-heading" className="text-lg font-semibold text-neutral-900">
              {t('mandiPrices')}
            </h2>
            <Link
              href="/farmer/forecast"
              className="text-sm font-medium text-primary-900 flex items-center gap-1"
            >
              {t('viewAll')}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4">
            {todaysPrices.map(({ crop, price }) => (
              <PriceCard
                key={crop?.id}
                cropName={crop?.name || ''}
                cropNameHi={crop?.nameHi}
                cropNameMr={crop?.nameMr}
                price={price?.price || 0}
                timestamp={price?.timestamp}
                trend={price?.trend}
                trendValue={price?.trendValue}
                language={language}
              />
            ))}
          </div>
        </section>

        {/* Ask KisanSetu AI */}
        <section aria-labelledby="ai-heading">
          <Button
            variant="secondary"
            size="full"
            className="bg-primary-50 border-primary-200 hover:bg-primary-100"
            leftIcon={<Mic className="w-5 h-5" />}
            onClick={() => setAssistantOpen((open) => !open)}
            aria-expanded={assistantOpen}
            aria-controls="assistant-panel"
          >
            <div className="text-left w-full">
              <p className="font-medium text-primary-900">{t('askAI')}</p>
              <p className="text-sm text-primary-700">{t('aiDescription')}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-primary-900" />
          </Button>
          {assistantOpen && (
            <Card id="assistant-panel" variant="outlined" padding="md" className="mt-3 border-primary-200 bg-white">
              <p className="font-medium text-primary-900">Voice assistant ready</p>
              <p className="text-sm text-neutral-600 mt-1">Try asking: “What is today’s wheat price?” or “Should I sell now?”</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <Button variant="outline" size="sm" onClick={() => setAssistantOpen(false)}>Check wheat price</Button>
                <Button variant="outline" size="sm" onClick={() => setAssistantOpen(false)}>Profit advice</Button>
              </div>
            </Card>
          )}
        </section>

        {/* Quick Actions */}
        <section aria-labelledby="quick-actions-heading">
          <h2 id="quick-actions-heading" className="text-lg font-semibold text-neutral-900 mb-4">
            {t('quickActions')}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.id} href={action.href}>
                  <Button
                    variant="outline"
                    size="xl"
                    className={cn(
                      'flex flex-col items-center gap-3 p-6',
                      'hover:shadow-card-hover transition-shadow'
                    )}
                  >
                    <div className={cn('w-14 h-14 rounded-xl flex items-center justify-center', action.color)}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="font-medium text-neutral-900 text-center">
                      {getActionLabel(action)}
                    </span>
                    {action.badge && (
                      <Badge variant="error" size="sm">
                        {action.badge}
                      </Badge>
                    )}
                  </Button>
                </Link>
              );
            })}
          </div>
        </section>

        {/* My Listings Preview */}
        <section aria-labelledby="my-listings-heading">
          <div className="flex items-center justify-between mb-4">
            <h2 id="my-listings-heading" className="text-lg font-semibold text-neutral-900">
              {t('myListings')}
            </h2>
            <Link href="/farmer/market" className="text-sm font-medium text-primary-900">
              {t('viewAll')}
            </Link>
          </div>
          {farmerListings.length > 0 ? (
            <div className="space-y-3">
              {farmerListings.slice(0, 2).map((listing) => {
                const crop = crops.find((c) => c.id === listing.cropId);
                return (
                  <Card variant="default" padding="md" key={listing.id} className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg bg-neutral-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                      <Image
                        src={listing.imageUrl}
                        alt={crop?.name || 'Crop'}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-neutral-900">{crop?.name}</span>
                        <Badge variant="success" size="sm">
                          {t('grade')} {listing.grade}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-neutral-500">
                        <span>{formatCurrency(listing.pricePerQuintal)}/qtl</span>
                        <span>{listing.quantity} qtl</span>
                        <Badge
                          variant={listing.status === 'active-bid' ? 'success' : 'warning'}
                          size="sm"
                        >
                          {listing.status === 'active-bid' ? t('activeBid') : t('underReview')}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="text" size="sm" className="text-error-DEFAULT">
                      Archive
                    </Button>
                  </Card>
                );
              })}
            </div>
          ) : (
            <EmptyListings onAddCrop={() => {}} />
          )}
        </section>

        {/* Verified Buyers */}
        <section aria-labelledby="verified-buyers-heading">
          <h2 id="verified-buyers-heading" className="text-lg font-semibold text-neutral-900 mb-4">
            {t('verifiedBuyers')}
          </h2>
          <div className="space-y-3">
            {verifiedBuyers.slice(0, 3).map((buyer) => (
              <Card variant="default" padding="md" key={buyer.id} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-900 font-bold text-lg">
                    {buyer.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-neutral-900 truncate">{buyer.name}</p>
                    <Badge variant="verified" size="sm">
                      {t('verified')}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-neutral-500">
                    <span>{buyer.mandiHub} · {buyer.dealCount} {t('deals')}</span>
                    <StarRating rating={buyer.rating} size="sm" />
                  </div>
                </div>
                <Button variant="text" size="sm">View</Button>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}