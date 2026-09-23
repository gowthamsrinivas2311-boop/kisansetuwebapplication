'use client';

import { useState, useEffect } from 'react';
import { BottomTabBar } from '@/components/ui/Navigation';
import { type LanguageCode } from '@/lib/mock-data';

export default function FarmerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('kisansetu-language') as LanguageCode | null;
    if (saved) {
      setLanguage(saved);
    }
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-background-light" />;
  }

  return (
    <div className="min-h-screen bg-background-light pb-20 md:pb-0 relative">
      <main className="pb-20 md:pb-0">{children}</main>
      <BottomTabBar language={language} />
    </div>
  );
}