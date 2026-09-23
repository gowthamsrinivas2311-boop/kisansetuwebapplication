'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency, getTranslation } from '@/lib/utils';
import { crops, type LanguageCode, CalculatorInputs, CalculatorResult } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const defaultInputs: CalculatorInputs = {
  cropId: 'wheat',
  quantity: 10,
  expectedPrice: 2500,
  transportCost: 500,
  packagingCost: 300,
  otherExpenses: 200,
};

function calculateResult(inputs: CalculatorInputs): CalculatorResult {
  const grossRevenue = inputs.quantity * inputs.expectedPrice;
  const totalDeductions = inputs.transportCost + inputs.packagingCost + inputs.otherExpenses;
  const netProfit = grossRevenue - totalDeductions;
  const profitMargin = grossRevenue > 0 ? (netProfit / grossRevenue) * 100 : 0;

  let badge: CalculatorResult['badge'] = 'Loss';
  let badgeColor: CalculatorResult['badgeColor'] = 'error';

  if (profitMargin >= 30) {
    badge = 'Excellent Profit';
    badgeColor = 'success';
  } else if (profitMargin >= 20) {
    badge = 'Good Profit';
    badgeColor = 'success';
  } else if (profitMargin >= 10) {
    badge = 'Moderate Profit';
    badgeColor = 'warning';
  } else if (profitMargin >= 0) {
    badge = 'Low Profit';
    badgeColor = 'warning';
  }

  return {
    grossRevenue,
    totalDeductions,
    netProfit,
    profitMargin,
    badge,
    badgeColor,
    breakdown: [
      { label: 'Total Sale (Quantity × Price)', value: grossRevenue, type: 'revenue' },
      { label: 'Transport Cost', value: inputs.transportCost, type: 'cost' },
      { label: 'Packaging Cost', value: inputs.packagingCost, type: 'cost' },
      { label: 'Other Expenses (Mandi fee, etc.)', value: inputs.otherExpenses, type: 'cost' },
    ],
  };
}

export default function CalculatorPage() {
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [mounted, setMounted] = useState(false);
  const [inputs, setInputs] = useState<CalculatorInputs>(defaultInputs);
  const [result, setResult] = useState<CalculatorResult>(calculateResult(defaultInputs));

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('kisansetu-language') as LanguageCode | null;
    if (saved) setLanguage(saved);
  }, []);

  useEffect(() => {
    setResult(calculateResult(inputs));
  }, [inputs]);

  useEffect(() => {
    const saved = localStorage.getItem('kisansetu-calculation');
    if (!saved) return;
    try {
      const savedInputs = JSON.parse(saved) as CalculatorInputs;
      setInputs(savedInputs);
    } catch {
      localStorage.removeItem('kisansetu-calculation');
    }
  }, []);

  const t = (key: string) => getTranslation(language, key);

  const handleInputChange = (field: keyof CalculatorInputs, value: string | number) => {
    setInputs((prev) => ({ ...prev, [field]: typeof value === 'string' ? value : Number(value) }));
  };

  const cropOptions = crops.map((c) => ({
    value: c.id,
    label: language === 'hi' ? c.nameHi : language === 'mr' ? c.nameMr : c.name,
  }));

  if (!mounted) {
    return <div className="min-h-screen bg-background-light" />;
  }

  return (
    <div className="min-h-screen bg-background-light">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-20">
        <div className="p-4">
          <h1 className="text-xl font-bold text-neutral-900">{t('netProfitCalculator')}</h1>
        </div>
      </header>

      <main className="p-4 space-y-6 pb-24">
        {/* Inputs Card */}
        <Card variant="default" padding="lg">
          <div className="space-y-4">
            {/* Crop Selector */}
            <Select
              label={t('crop')}
              value={inputs.cropId}
              onChange={(e) => handleInputChange('cropId', e.target.value)}
              options={cropOptions}
              placeholder={t('crop')}
            />

            {/* Quantity */}
            <Input
              label={t('quantity')}
              type="number"
              value={inputs.quantity}
              onChange={(e) => handleInputChange('quantity', e.target.value)}
              placeholder="10"
              min={0.1}
              step={0.1}
              helperText="Quantity in quintals"
            />

            {/* Expected Price */}
            <Input
              label={t('expectedPrice')}
              type="number"
              value={inputs.expectedPrice}
              onChange={(e) => handleInputChange('expectedPrice', e.target.value)}
              placeholder="2500"
              min={0}
              step={10}
              helperText="Expected price per quintal"
            />

            {/* Transport Cost */}
            <Input
              label={t('transportCost')}
              type="number"
              value={inputs.transportCost}
              onChange={(e) => handleInputChange('transportCost', e.target.value)}
              placeholder="500"
              min={0}
              step={50}
            />

            {/* Packaging Cost */}
            <Input
              label={t('packagingCost')}
              type="number"
              value={inputs.packagingCost}
              onChange={(e) => handleInputChange('packagingCost', e.target.value)}
              placeholder="300"
              min={0}
              step={50}
            />

            {/* Other Expenses */}
            <Input
              label={t('otherExpenses')}
              type="number"
              value={inputs.otherExpenses}
              onChange={(e) => handleInputChange('otherExpenses', e.target.value)}
              placeholder="200"
              min={0}
              step={50}
              helperText="Mandi fee, loading/unloading, etc."
            />
          </div>
        </Card>

        {/* Result Card */}
        <Card variant="elevated" padding="lg" className="bg-gradient-to-br from-accent-50 to-accent-100 border-accent-200">
          <div className="text-center mb-6">
            <p className="text-sm font-medium text-accent-900 mb-1">{t('estimatedNetProfit')}</p>
            <p className="text-4xl font-bold text-primary-900">
              {formatCurrency(result.netProfit)}
            </p>
            <Badge variant={result.badgeColor} size="lg" className="mt-3">
              {result.badge}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4">
              <p className="text-xs text-neutral-500 mb-1">{t('grossRevenue')}</p>
              <p className="text-2xl font-bold text-success-dark">
                {formatCurrency(result.grossRevenue)}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-xs text-neutral-500 mb-1">{t('totalDeductions')}</p>
              <p className="text-2xl font-bold text-error-DEFAULT">
                {formatCurrency(result.totalDeductions)}
              </p>
            </div>
          </div>

          {/* Breakdown */}
          <div className="border-t border-accent-200 pt-4">
            <h3 className="text-sm font-medium text-neutral-700 mb-3">Breakdown</h3>
            <div className="space-y-2">
              {result.breakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className={cn(item.type === 'cost' ? 'text-neutral-600' : 'text-success-dark')}>
                    {item.label}
                  </span>
                  <span className={cn(
                    'font-medium',
                    item.type === 'cost' ? 'text-error-DEFAULT' : 'text-success-dark'
                  )}>
                    {item.type === 'cost' ? '-' : '+'}{formatCurrency(item.value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="primary"
            size="full"
            className="flex-1"
            onClick={() => localStorage.setItem('kisansetu-calculation', JSON.stringify(inputs))}
          >
            Save Calculation
          </Button>
          <Button
            variant="secondary"
            size="full"
            className="flex-1"
            onClick={() => {
              const text = `KisanSetu estimate: ${formatCurrency(result.netProfit)} net profit from ${inputs.quantity} qtl.`;
              if (navigator.share) {
                navigator.share({ title: 'KisanSetu Profit Estimate', text }).catch(() => undefined);
              } else {
                navigator.clipboard?.writeText(text);
              }
            }}
          >
            Share
          </Button>
        </div>
      </main>
    </div>
  );
}