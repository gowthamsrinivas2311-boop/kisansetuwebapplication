'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { ComparisonBarChart } from '@/components/ui/Charts';
import { formatCurrency, getTranslation } from '@/lib/utils';
import {
  buyerDashboardKPIs,
  directFarmOffers,
  mandiComparisons,
  crops,
  type LanguageCode,
  type DirectFarmOffer,
} from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import {
  Download,
  Filter,
  ChevronRight,
  Star,
  MapPin,
  CheckCircle2,
} from 'lucide-react';

export default function BuyerDashboardPage() {
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [mounted, setMounted] = useState(false);
  const [qualityFilter, setQualityFilter] = useState<'all' | 'verified' | 'grade-a'>('all');

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('kisansetu-language') as LanguageCode | null;
    if (saved) setLanguage(saved);
  }, []);

  const t = (key: string) => getTranslation(language, key);

  const getCropName = (cropId: string) => {
    const crop = crops.find((c) => c.id === cropId);
    if (!crop) return cropId;
    if (language === 'hi') return crop.nameHi;
    if (language === 'mr') return crop.nameMr;
    return crop.name;
  };

  const filteredOffers = directFarmOffers.filter((offer) => {
    if (qualityFilter === 'verified') return offer.verified;
    if (qualityFilter === 'grade-a') return offer.grade === 'A+' || offer.grade === 'A';
    return true;
  });

  if (!mounted) {
    return <div className="min-h-screen bg-background-light" />;
  }

  return (
    <div className="min-h-screen bg-background-light">
      {/* KPI Cards */}
      <section aria-labelledby="kpi-heading" className="mb-8">
        <h2 id="kpi-heading" className="sr-only">Key Performance Indicators</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {buyerDashboardKPIs.map((kpi, index) => (
            <Card key={index} variant="default" padding="lg" className="relative">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-neutral-500 mb-1">{kpi.label}</p>
                  <p className="text-2xl font-bold text-neutral-900">{kpi.value}</p>
                  {kpi.subtext && (
                    <p className="text-xs text-neutral-500 mt-1">{kpi.subtext}</p>
                  )}
                </div>
                <div
                  className={cn(
                    'px-2 py-1 rounded-full text-xs font-medium',
                    kpi.changeType === 'positive'
                      ? 'bg-success-light/10 text-success-dark'
                      : kpi.changeType === 'negative'
                      ? 'bg-error-light/10 text-error-dark'
                      : 'bg-neutral-100 text-neutral-600'
                  )}
                >
                  {kpi.change}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Direct Farm Offers */}
      <section aria-labelledby="offers-heading" className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 id="offers-heading" className="text-xl font-bold text-neutral-900">
            {t('directFarmOffers')}
          </h2>
          <div className="flex items-center gap-3">
            <select
              value={qualityFilter}
              onChange={(e) => setQualityFilter(e.target.value as typeof qualityFilter)}
              className="px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label={t('qualityFilter')}
            >
              <option value="all">All Quality</option>
              <option value="verified">Verified Only</option>
              <option value="grade-a">Grade A+ / A</option>
            </select>
            <Button variant="secondary" leftIcon={<Download className="w-4 h-4" />}>
              {t('downloadList')}
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm" role="table">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="text-left py-3 px-4 font-medium text-neutral-500">Farmer</th>
                <th className="text-left py-3 px-4 font-medium text-neutral-500">Crop</th>
                <th className="text-left py-3 px-4 font-medium text-neutral-500">Qty (Qtl)</th>
                <th className="text-left py-3 px-4 font-medium text-neutral-500">Price/Qtl</th>
                <th className="text-left py-3 px-4 font-medium text-neutral-500">Distance</th>
                <th className="text-left py-3 px-4 font-medium text-neutral-500">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOffers.map((offer) => (
                <tr key={offer.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-primary-900 font-bold text-sm">
                          {offer.farmerName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-neutral-900">{offer.farmerName}</p>
                        <div className="flex items-center gap-1">
                          <StarRating rating={offer.farmerRating} size="sm" showValue={false} />
                          <span className="text-xs text-neutral-500">{offer.farmerRating}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-neutral-900">{getCropName(offer.cropId)}</span>
                      <span className="text-xs text-neutral-500">({offer.variety})</span>
                      {offer.verified && (
                        <Badge variant="verified" size="sm">
                          <CheckCircle2 className="w-3 h-3" />
                          {t('verified')}
                        </Badge>
                      )}
                      <Badge variant="success" size="sm">
                        {t('grade')} {offer.grade}
                      </Badge>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-neutral-700">{offer.quantity}</td>
                  <td className="py-4 px-4 font-medium text-neutral-900">
                    {formatCurrency(offer.pricePerQuintal)}
                  </td>
                  <td className="py-4 px-4 text-neutral-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{offer.distance} km · {offer.location}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <Button variant="primary" size="sm">
                      {t('connect')}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Mandi Comparison Chart */}
      <section aria-labelledby="comparison-heading" className="mb-8">
        <h2 id="comparison-heading" className="text-xl font-bold text-neutral-900 mb-4">
          {t('dewasVsNearby')}
        </h2>
        <Card variant="default" padding="lg">
          <ComparisonBarChart
            data={mandiComparisons.map((m) => ({
              name: language === 'hi' ? m.mandiNameHi : m.mandiName,
              value: m.price,
              change: m.change,
            }))}
            height={300}
            color="#1E4620"
            dataKey="value"
            nameKey="name"
          />
        </Card>
      </section>

      {/* Footer Profile Strip */}
      <footer className="border-t border-neutral-200 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
              <span className="text-primary-900 font-bold text-lg">PM</span>
            </div>
            <div>
              <p className="font-medium text-neutral-900">Priya Mehta</p>
              <p className="text-sm text-neutral-500">Procurement Manager</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="success" size="md">
              <span className="w-2 h-2 rounded-full bg-success-dark mr-1.5" />
              Live
            </Badge>
            <Button variant="text" size="sm">Settings</Button>
          </div>
        </div>
      </footer>
    </div>
  );
}