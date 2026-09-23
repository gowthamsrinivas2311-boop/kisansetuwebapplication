'use client';

import { type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
} from 'lucide-react';

export interface TabItem {
  href: string;
  label: string;
  labelHi: string;
  labelMr: string;
  icon: ReactNode;
  badge?: number;
}

export const farmerTabs: TabItem[] = [
  {
    href: '/farmer',
    label: 'Home',
    labelHi: 'होम',
    labelMr: 'होम',
    icon: <Home className="w-6 h-6" />,
  },
  {
    href: '/farmer/market',
    label: 'Market',
    labelHi: 'बाज़ार',
    labelMr: 'बाजारपेठ',
    icon: <Store className="w-6 h-6" />,
  },
  {
    href: '/farmer/forecast',
    label: 'Forecast',
    labelHi: 'पूर्वानुमान',
    labelMr: 'पूर्वानुमान',
    icon: <TrendingUp className="w-6 h-6" />,
  },
  {
    href: '/farmer/alerts',
    label: 'Alerts',
    labelHi: 'अलर्ट',
    labelMr: 'सूचना',
    icon: <Bell className="w-6 h-6" />,
    badge: 3,
  },
];

export const buyerSidebarItems = [
  {
    href: '/buyer',
    label: 'Dashboard',
    labelHi: 'डैशबोर्ड',
    labelMr: 'डॅशबोर्ड',
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    href: '/buyer/sourcing',
    label: 'Farmer Sourcing',
    labelHi: 'किसान सोर्सिंग',
    labelMr: 'शेतकरी सोर्सिंग',
    icon: <Users className="w-5 h-5" />,
  },
  {
    href: '/buyer/mandi-prices',
    label: 'Mandi Price Feed',
    labelHi: 'मंडी मूल्य फीड',
    labelMr: 'मंडी भाव फीड',
    icon: <DollarSign className="w-5 h-5" />,
  },
  {
    href: '/buyer/contracts',
    label: 'Active Contracts',
    labelHi: 'सक्रिय अनुबंध',
    labelMr: 'सक्रिय करार',
    icon: <Truck className="w-5 h-5" />,
  },
  {
    href: '/buyer/logistics',
    label: 'Logistics Tracker',
    labelHi: 'लॉजिस्टिक्स ट्रैकर',
    labelMr: 'लॉजिस्टिक्स ट्रॅकर',
    icon: <Truck className="w-5 h-5" />,
  },
  {
    href: '/buyer/analytics',
    label: 'Procurement Analytics',
    labelHi: 'खरीद विश्लेषण',
    labelMr: 'खरेदी विश्लेषण',
    icon: <BarChart3 className="w-5 h-5" />,
  },
  {
    href: '/buyer/settings',
    label: 'Settings',
    labelHi: 'सेटिंग्स',
    labelMr: 'सेटिंग्ज',
    icon: <Settings className="w-5 h-5" />,
  },
];

interface BottomTabBarProps {
  tabs?: TabItem[];
  language?: 'en' | 'hi' | 'mr';
  className?: string;
}

export function BottomTabBar({ tabs = farmerTabs, language = 'en', className }: BottomTabBarProps) {
  const pathname = usePathname();

  const getLabel = (tab: TabItem) => {
    if (language === 'hi') return tab.labelHi;
    if (language === 'mr') return tab.labelMr;
    return tab.label;
  };

  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 safe-bottom z-50',
        'md:hidden',
        className
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="grid grid-cols-4">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href || pathname.startsWith(tab.href + '/');
          const label = getLabel(tab);

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 py-3 px-2 touch-target-lg',
                'transition-colors duration-200',
                isActive
                  ? 'text-primary-900 bg-primary-50'
                  : 'text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="relative">{tab.icon}</span>
              <span className="text-xs font-medium">{label}</span>
              {tab.badge && tab.badge > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-error-DEFAULT text-white text-xs rounded-full flex items-center justify-center">
                  {tab.badge > 9 ? '9+' : tab.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

interface SidebarProps {
  items?: typeof buyerSidebarItems;
  language?: 'en' | 'hi' | 'mr';
  className?: string;
  onClose?: () => void;
  open?: boolean;
}

export function Sidebar({ items = buyerSidebarItems, language = 'en', className, onClose, open = false }: SidebarProps) {
  const pathname = usePathname();

  const getLabel = (item: typeof buyerSidebarItems[0]) => {
    if (language === 'hi') return item.labelHi;
    if (language === 'mr') return item.labelMr;
    return item.label;
  };

  return (
    <aside
      id="buyer-sidebar"
      className={cn(
        'fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-neutral-200',
        'hidden lg:flex lg:flex-col',
        open && '!flex flex-col',
        className
      )}
      role="navigation"
      aria-label="Buyer dashboard navigation"
    >
      <div className="flex flex-col h-full">
        {/* Logo/Header */}
        <div className="p-4 border-b border-neutral-200">
          <Link href="/buyer" className="flex items-center gap-3" aria-label="KisanSetu Buyer Dashboard">
            <div className="w-10 h-10 rounded-lg bg-primary-900 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <span className="font-bold text-lg text-neutral-900">KisanSetu</span>
              <span className="text-xs text-neutral-500 block">Buyer Dashboard</span>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto" aria-label="Main menu">
          {items.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            const label = getLabel(item);

            return (
                <Link
                key={item.href}
                href={item.href}
                  onClick={onClose}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium',
                  'transition-colors duration-200',
                  isActive
                    ? 'bg-primary-50 text-primary-900'
                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className={cn('flex-shrink-0', isActive ? 'text-primary-900' : 'text-neutral-400')}>
                  {item.icon}
                </span>
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-neutral-200">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center">
              <span className="text-primary-900 font-medium text-sm">PM</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-neutral-900 truncate">Priya Mehta</p>
              <p className="text-xs text-neutral-500 truncate">Procurement Manager</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

interface TopNavProps {
  language?: 'en' | 'hi' | 'mr';
  className?: string;
  onMenuClick?: () => void;
  menuOpen?: boolean;
}

export function TopNav({ language = 'en', className, onMenuClick, menuOpen = false }: TopNavProps) {
  const notifications = 5;
  const messages = 2;

  return (
    <header
      className={cn(
        'sticky top-0 z-30 bg-white border-b border-neutral-200',
        'lg:pl-64',
        className
      )}
      role="banner"
    >
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 touch-target"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="buyer-sidebar"
          >
            <svg className="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="relative flex-1 max-w-md hidden sm:block">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="search"
              placeholder="Search farmers, crops or locations..."
              className="w-full pl-10 pr-4 py-2 bg-neutral-100 border-none rounded-lg text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white"
              aria-label="Search"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button className="relative p-2 rounded-lg hover:bg-neutral-100 touch-target" aria-label="Notifications">
              <svg className="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-error-DEFAULT text-white text-xs rounded-full flex items-center justify-center">
                  {notifications > 9 ? '9+' : notifications}
                </span>
              )}
            </button>
          </div>

          <div className="relative">
            <button className="relative p-2 rounded-lg hover:bg-neutral-100 touch-target" aria-label="Messages">
              <svg className="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h4M8 12l2-2m0 0l2 2m-2-2v8M8 12l-2 2m2-2v8M20 12h-4m4 0l-2 2m2-2v8m-2-2l2 2m-2-2v8" />
              </svg>
              {messages > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-500 text-primary-950 text-xs rounded-full flex items-center justify-center">
                  {messages}
                </span>
              )}
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-primary-50 rounded-lg border border-primary-100">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary-900 text-white text-xs font-medium rounded-badge">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse" aria-hidden="true"></span>
              Live
            </span>
          </div>

          <button className="p-2 rounded-lg hover:bg-neutral-100 touch-target" aria-label="User menu">
            <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center">
              <span className="text-primary-900 font-medium text-sm">PM</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}