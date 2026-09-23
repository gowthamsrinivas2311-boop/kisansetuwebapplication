'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { languages, type LanguageCode } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function OnboardingPage() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>('en');

  const handleContinue = () => {
    // Store language preference
    localStorage.setItem('kisansetu-language', selectedLanguage);
    router.push('/farmer');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-background-light flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
        {/* Farmer Illustration */}
        <div className="mb-8">
          <div className="w-48 h-48 mx-auto rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
            <svg className="w-24 h-24 text-primary-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        {/* App Name & Tagline */}
        <h1 className="text-3xl font-bold text-primary-900 mb-3">KisanSetu</h1>
        <p className="text-lg text-neutral-600 max-w-xs mx-auto mb-10">
          Sell directly to premium buyers & get real-time price reports
        </p>

        {/* Language Selector */}
        <div className="w-full max-w-md">
          <label className="block text-sm font-medium text-neutral-700 mb-4 text-left">
            Select Language / भाषा चुनें / भाषा निवडा
          </label>
          <div className="grid grid-cols-3 gap-3" role="radiogroup" aria-label="Select language">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelectedLanguage(lang.code)}
                className={cn(
                  'relative p-4 rounded-xl border-2 transition-all duration-200 touch-target',
                  'flex flex-col items-center gap-2',
                  selectedLanguage === lang.code
                    ? 'border-primary-900 bg-primary-50'
                    : 'border-neutral-200 hover:border-neutral-300'
                )}
                role="radio"
                aria-checked={selectedLanguage === lang.code}
              >
                <span className="text-3xl">{lang.flag}</span>
                <span className="font-medium text-neutral-900">{lang.name}</span>
                <span className="text-sm text-neutral-500">{lang.nativeName}</span>
                {selectedLanguage === lang.code && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary-900 text-white rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="p-6 safe-bottom">
        <Button size="full" onClick={handleContinue} className="w-full">
          {selectedLanguage === 'hi' ? 'आगे बढ़ें' : selectedLanguage === 'mr' ? 'पुढे जा' : 'Continue'}
        </Button>
      </div>
    </div>
  );
}