'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { EmptyAlerts } from '@/components/ui/EmptyState';
import { formatRelativeTime } from '@/lib/utils';
import { alerts, type LanguageCode, type Alert, getTranslation } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import {
  TrendingUp,
  Users,
  CloudSun,
  CreditCard,
  Info,
  Trash2,
} from 'lucide-react';

const alertIcons: Record<Alert['type'], React.ReactNode> = {
  price: <TrendingUp className="w-5 h-5 text-primary-900" />,
  'buyer-interest': <Users className="w-5 h-5 text-accent-500" />,
  weather: <CloudSun className="w-5 h-5 text-warning-DEFAULT" />,
  payment: <CreditCard className="w-5 h-5 text-success-dark" />,
  system: <Info className="w-5 h-5 text-neutral-500" />,
};

const alertColors: Record<Alert['type'], string> = {
  price: 'bg-primary-100 border-primary-200',
  'buyer-interest': 'bg-accent-100 border-accent-200',
  weather: 'bg-warning-light/10 border-warning-light/20',
  payment: 'bg-success-light/10 border-success-light/20',
  system: 'bg-neutral-100 border-neutral-200',
};

export default function AlertsPage() {
  const router = useRouter();
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [mounted, setMounted] = useState(false);
  const [alertList, setAlertList] = useState<Alert[]>(alerts);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('kisansetu-language') as LanguageCode | null;
    if (saved) setLanguage(saved);
  }, []);

  const t = (key: string) => getTranslation(language, key);

  const handleClearAll = () => {
    setAlertList([]);
  };

  const handleDismiss = (id: string) => {
    setAlertList((prev) => prev.filter((a) => a.id !== id));
  };

  const handleMarkRead = (id: string) => {
    setAlertList((prev) =>
      prev.map((a) => (a.id === id ? { ...a, read: true } : a))
    );
  };

  if (!mounted) {
    return <div className="min-h-screen bg-background-light" />;
  }

  return (
    <div className="min-h-screen bg-background-light">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-20">
        <div className="p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-neutral-900">{t('mandiAlerts')}</h1>
          {alertList.length > 0 && (
            <Button variant="text" size="sm" onClick={handleClearAll} leftIcon={<Trash2 className="w-4 h-4" />}>
              {t('clearAll')}
            </Button>
          )}
        </div>
      </header>

      <main className="p-4 pb-24">
        {alertList.length > 0 ? (
          <div className="space-y-3" role="list" aria-label="Alerts">
            {alertList.map((alert) => (
              <Card
                key={alert.id}
                variant="default"
                padding="md"
                className={cn(
                  'flex items-start gap-4',
                  alertColors[alert.type],
                  !alert.read && 'bg-white ring-2 ring-primary-200'
                )}
                role="listitem"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                  {alertIcons[alert.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium text-neutral-900">{alert.title}</p>
                      <p className="text-sm text-neutral-600 mt-0.5">{alert.message}</p>
                    </div>
                    <span className="text-xs text-neutral-400 whitespace-nowrap flex-shrink-0">
                      {formatRelativeTime(alert.timestamp)}
                    </span>
                  </div>
                  {alert.actionUrl && (
                    <Button
                      variant="text"
                      size="sm"
                      className="mt-2"
                      onClick={() => router.push(alert.actionUrl!)}
                    >
                      View Details
                    </Button>
                  )}
                </div>
                {!alert.read && (
                  <button
                    onClick={() => handleMarkRead(alert.id)}
                    className="w-6 h-6 rounded-full bg-primary-900 flex items-center justify-center flex-shrink-0"
                    aria-label="Mark as read"
                  >
                    <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <EmptyAlerts />
        )}
      </main>
    </div>
  );
}