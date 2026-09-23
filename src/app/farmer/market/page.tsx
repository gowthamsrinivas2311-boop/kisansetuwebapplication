'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Plus, Archive, Eye, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge, StarRating } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { EmptyListings, EmptyBuyerInterest } from '@/components/ui/EmptyState';
import { formatCurrency } from '@/lib/utils';
import { crops, farmerListings, verifiedBuyers, type LanguageCode, getTranslation } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function MarketPage() {
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'listings' | 'buyers'>('listings');
  const [archivedIds, setArchivedIds] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('kisansetu-language') as LanguageCode | null;
    if (saved) setLanguage(saved);
  }, []);

  const t = (key: string) => getTranslation(language, key);

  if (!mounted) {
    return <div className="min-h-screen bg-background-light" />;
  }

  return (
    <div className="min-h-screen bg-background-light">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-20">
        <div className="p-4">
          <h1 className="text-xl font-bold text-neutral-900">{t('marketplace')}</h1>
        </div>
        {/* Tabs */}
        <div className="flex border-t border-neutral-200 px-4">
          <button
            onClick={() => setActiveTab('listings')}
            className={cn(
              'flex-1 py-3 text-center text-sm font-medium border-b-2 transition-colors',
              activeTab === 'listings'
                ? 'border-primary-900 text-primary-900'
                : 'border-transparent text-neutral-500 hover:text-neutral-700'
            )}
          >
            {t('myListings')}
          </button>
          <button
            onClick={() => setActiveTab('buyers')}
            className={cn(
              'flex-1 py-3 text-center text-sm font-medium border-b-2 transition-colors relative',
              activeTab === 'buyers'
                ? 'border-primary-900 text-primary-900'
                : 'border-transparent text-neutral-500 hover:text-neutral-700'
            )}
          >
            {t('buyerInterest')}
            <span className="absolute -top-1 right-2 w-5 h-5 bg-accent-500 text-primary-950 text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>
        </div>
      </header>

      <main className="p-4 pb-24">
        {activeTab === 'listings' ? (
          <>
            {/* Active Listings */}
            <section aria-labelledby="active-listings-heading" className="mb-6">
              <h2 id="active-listings-heading" className="text-lg font-semibold text-neutral-900 mb-4">
                Active Listings
              </h2>
              {farmerListings.filter((listing) => !archivedIds.includes(listing.id)).length > 0 ? (
                <div className="space-y-3">
                  {farmerListings.filter((listing) => !archivedIds.includes(listing.id)).map((listing) => {
                    const crop = crops.find((c) => c.id === listing.cropId);
                    return (
                      <Card variant="default" padding="md" key={listing.id} className="flex flex-col gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-20 h-20 rounded-lg bg-neutral-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                            <Image
                              src={listing.imageUrl}
                              alt={crop?.name || 'Crop'}
                              width={80}
                              height={80}
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
                            <div className="flex items-center gap-3 text-sm text-neutral-500 mb-2">
                              <span>{formatCurrency(listing.pricePerQuintal)}/qtl</span>
                              <span>{listing.quantity} qtl</span>
                              <Badge
                                variant={listing.status === 'active-bid' ? 'success' : 'warning'}
                                size="sm"
                              >
                                {listing.status === 'active-bid' ? t('activeBid') : t('underReview')}
                              </Badge>
                            </div>
                            {listing.highestBid && (
                              <div className="flex items-center gap-2 text-sm">
                                <span className="text-neutral-500">Highest Bid:</span>
                                <span className="font-medium text-success-dark">
                                  {formatCurrency(listing.highestBid)}/qtl
                                </span>
                                <Badge variant="info" size="sm">
                                  {listing.bidsCount} bids
                                </Badge>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-200">
                          <Button variant="text" size="sm" leftIcon={<Eye className="w-4 h-4" />}>
                            View
                          </Button>
                          <Button variant="text" size="sm" leftIcon={<TrendingUp className="w-4 h-4" />}>
                            Bids
                          </Button>
                          <Button variant="text" size="sm" leftIcon={<Archive className="w-4 h-4" />} className="text-error-DEFAULT" onClick={() => setArchivedIds((ids) => [...ids, listing.id])}>
                            Archive
                          </Button>
                        </div>
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
              <div className="flex items-center justify-between mb-4">
                <h2 id="verified-buyers-heading" className="text-lg font-semibold text-neutral-900">
                  {t('verifiedBuyers')}
                </h2>
                <Button variant="text" size="sm">View All</Button>
              </div>
              <div className="space-y-3">
                {verifiedBuyers.map((buyer) => (
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
                    <Button variant="primary" size="sm">
                      Connect
                    </Button>
                  </Card>
                ))}
              </div>
            </section>
          </>
        ) : (
          // Buyer Interest Tab
          <section aria-labelledby="buyer-interest-heading">
            <h2 id="buyer-interest-heading" className="text-lg font-semibold text-neutral-900 mb-4">
              {t('buyerInterest')}
            </h2>
            <EmptyBuyerInterest onGoToMarket={() => setActiveTab('listings')} />
          </section>
        )}

        {/* Floating Add Crop Button */}
        <Button
          variant="accent"
          size="lg"
          className="fixed bottom-24 right-4 lg:bottom-8 lg:right-8 shadow-lg touch-target-lg"
          leftIcon={<Plus className="w-5 h-5" />}
        >
          {t('addCrop')}
        </Button>
      </main>
    </div>
  );
}