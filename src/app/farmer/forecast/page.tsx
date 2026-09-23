'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { ForecastChart } from '@/components/ui/Charts';
import { EmptyForecast } from '@/components/ui/EmptyState';
import { formatCurrency } from '@/lib/utils';
import { crops, getForecastByCrop, type LanguageCode, getTranslation } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const cropTabs = ['wheat', 'soybean', 'gram', 'maize'];

export default function ForecastPage() {
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [mounted, setMounted] = useState(false);
  const [activeCrop, setActiveCrop] = useState<'wheat' | 'soybean' | 'gram' | 'maize'>('wheat');
  const [forecastDays, setForecastDays] = useState<7 | 30>(7);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('kisansetu-language') as LanguageCode | null;
    if (saved) setLanguage(saved);
  }, []);

  const t = (key: string) => getTranslation(language, key);

  const forecast = getForecastByCrop(activeCrop, forecastDays);
  const crop = crops.find((c) => c.id === activeCrop);

  const getCropLabel = (cropId: string) => {
    const c = crops.find((c) => c.id === cropId);
    if (!c) return cropId;
    if (language === 'hi') return c.nameHi;
    if (language === 'mr') return c.nameMr;
    return c.name;
  };

  if (!mounted) {
    return <div className="min-h-screen bg-background-light" />;
  }

  return (
    <div className="min-h-screen bg-background-light">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-20">
        <div className="p-4">
          <h1 className="text-xl font-bold text-neutral-900">{t('priceForecast')}</h1>
        </div>
        {/* Crop Tabs */}
        <div className="flex overflow-x-auto scrollbar-hide pb-3 px-4 -mx-4 border-t border-neutral-200">
          {cropTabs.map((cropId) => (
            <button
              key={cropId}
              onClick={() => setActiveCrop(cropId as typeof activeCrop)}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors',
                'flex-shrink-0',
                activeCrop === cropId
                  ? 'bg-primary-900 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              )}
            >
              {getCropLabel(cropId)}
            </button>
          ))}
        </div>
      </header>

      <main className="p-4 space-y-6 pb-24">
        {forecast && crop ? (
          <>
            {/* Price Range Header */}
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-primary-700">{t('priceForecast')} ({forecastDays} days)</p>
                  <p className="text-2xl font-bold text-primary-900 mt-1">
                    {formatCurrency(forecast.range.min)} - {formatCurrency(forecast.range.max)}
                  </p>
                  <p className="text-xs text-primary-600 mt-1">per quintal</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={forecastDays === 7 ? 'primary' : 'secondary'}
                    size="sm"
                    onClick={() => setForecastDays(7)}
                  >
                    7D
                  </Button>
                  <Button
                    variant={forecastDays === 30 ? 'primary' : 'secondary'}
                    size="sm"
                    onClick={() => setForecastDays(30)}
                  >
                    30D
                  </Button>
                </div>
              </div>
            </div>

            {/* Chart */}
            <Card variant="default" padding="lg">
              <ForecastChart
                data={forecast.dataPoints.map((d) => ({ name: `Day ${d.day}`, value: d.price }))}
                height={250}
                color="#1E4620"
              />
            </Card>

            {/* Mandi Expert Insight */}
            <Card variant="elevated" padding="lg" className="bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-900 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-primary-900">{t('mandiExpertInsight')}</h3>
                    <Badge variant="info" size="sm">
                      {t('confidence')} {forecast.confidence}%
                    </Badge>
                  </div>
                  <p className="text-primary-800 text-sm mb-3">{forecast.insight}</p>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={
                        forecast.recommendation === 'hold' ? 'warning' :
                        forecast.recommendation === 'sell' ? 'error' : 'success'
                      }
                      size="md"
                    >
                      {forecast.recommendation === 'hold' ? 'Hold' : forecast.recommendation === 'sell' ? 'Sell' : 'Buy'}
                    </Badge>
                    <span className="text-sm text-primary-700">
                      {forecast.recommendation === 'hold' ? 'Prices expected to rise' :
                       forecast.recommendation === 'sell' ? 'Consider selling at current prices' : 'Good buying opportunity'}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </>
        ) : (
          <EmptyForecast />
        )}
      </main>
    </div>
  );
}