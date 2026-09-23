'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { crops, directFarmOffers, mandiComparisons } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';
import { CheckCircle2, Download, Search, Truck } from 'lucide-react';

type Section = 'sourcing' | 'mandi-prices' | 'contracts' | 'logistics' | 'analytics' | 'settings';

const sectionCopy: Record<Section, { title: string; description: string }> = {
  sourcing: { title: 'Farmer Sourcing', description: 'Find verified farmers and connect directly with the best lots near your procurement hubs.' },
  'mandi-prices': { title: 'Mandi Price Feed', description: 'Compare today’s benchmark prices across nearby mandis before you place an offer.' },
  contracts: { title: 'Active Contracts', description: 'Track confirmed procurement commitments, delivery schedules, and payment status.' },
  logistics: { title: 'Logistics Tracker', description: 'Monitor pickups and deliveries from farm gate to your processing hub.' },
  analytics: { title: 'Procurement Analytics', description: 'Understand price movement, sourcing mix, and the savings created by direct procurement.' },
  settings: { title: 'Settings', description: 'Manage your buyer workspace preferences and notification settings.' },
};

export function BuyerSectionPage({ section }: { section: Section }) {
  const copy = sectionCopy[section];
  const [query, setQuery] = useState('');
  const offers = directFarmOffers.filter((offer) => {
    const crop = crops.find((item) => item.id === offer.cropId);
    return `${offer.farmerName} ${crop?.name ?? ''} ${offer.location}`.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm font-medium text-primary-700 mb-1">Buyer workspace</p>
        <h1 className="text-2xl font-bold text-neutral-900">{copy.title}</h1>
        <p className="text-neutral-600 mt-1 max-w-2xl">{copy.description}</p>
      </header>

      {section === 'sourcing' && (
        <>
          <Card padding="md">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search farmers, crops or locations..." className="w-full pl-9 pr-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
              <Button variant="secondary" leftIcon={<Download className="w-4 h-4" />}>Export offers</Button>
            </div>
          </Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {offers.map((offer) => {
              const crop = crops.find((item) => item.id === offer.cropId);
              return <Card key={offer.id} padding="md"><div className="flex justify-between gap-3"><div><h2 className="font-semibold text-neutral-900">{offer.farmerName}</h2><p className="text-sm text-neutral-500">{crop?.icon} {crop?.name} · {offer.variety}</p></div>{offer.verified && <Badge variant="verified" size="sm"><CheckCircle2 className="w-3 h-3" /> Verified</Badge>}</div><div className="grid grid-cols-3 gap-3 mt-5 text-sm"><div><p className="text-neutral-500">Quantity</p><p className="font-semibold">{offer.quantity} qtl</p></div><div><p className="text-neutral-500">Price</p><p className="font-semibold">{formatCurrency(offer.pricePerQuintal)}</p></div><div><p className="text-neutral-500">Distance</p><p className="font-semibold">{offer.distance} km</p></div></div><Button className="w-full mt-5" size="sm">Connect with farmer</Button></Card>;
            })}
          </div>
        </>
      )}

      {section === 'mandi-prices' && <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">{mandiComparisons.map((mandi) => <Card key={mandi.mandiName} padding="md"><p className="text-sm text-neutral-500">{mandi.mandiName}</p><p className="text-2xl font-bold mt-1">{formatCurrency(mandi.price)}<span className="text-sm font-normal text-neutral-500"> / qtl</span></p><Badge variant={mandi.change >= 0 ? 'trend-up' : 'trend-down'} size="sm" className="mt-3">{mandi.change >= 0 ? '+' : ''}{mandi.change}% today</Badge></Card>)}</div>}

      {section === 'contracts' && <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{[{ label: 'Awaiting pickup', value: '8', color: 'warning' as const }, { label: 'In transit', value: '5', color: 'info' as const }, { label: 'Completed this month', value: '32', color: 'success' as const }].map((item) => <Card key={item.label} padding="lg"><Truck className="w-5 h-5 text-primary-700" /><p className="text-sm text-neutral-500 mt-4">{item.label}</p><p className="text-3xl font-bold mt-1">{item.value}</p><Badge variant={item.color} size="sm" className="mt-3">On track</Badge></Card>)}</div>}

      {section === 'logistics' && <Card padding="none" className="overflow-hidden"><div className="overflow-x-auto"><table className="w-full text-sm"><thead className="bg-neutral-50"><tr><th className="text-left p-4 font-medium text-neutral-500">Shipment</th><th className="text-left p-4 font-medium text-neutral-500">Route</th><th className="text-left p-4 font-medium text-neutral-500">Expected</th><th className="text-left p-4 font-medium text-neutral-500">Status</th></tr></thead><tbody>{[{ id: 'KST-1042', route: 'Dewas → Indore Hub', date: 'Today, 4:30 PM', status: 'In transit', variant: 'info' as const }, { id: 'KST-1041', route: 'Ujjain → Indore Hub', date: 'Tomorrow, 10:00 AM', status: 'Pickup scheduled', variant: 'warning' as const }, { id: 'KST-1038', route: 'Bhopal → Indore Hub', date: 'Delivered yesterday', status: 'Delivered', variant: 'success' as const }].map((shipment) => <tr key={shipment.id} className="border-t border-neutral-100"><td className="p-4 font-medium">{shipment.id}</td><td className="p-4 text-neutral-600">{shipment.route}</td><td className="p-4 text-neutral-600">{shipment.date}</td><td className="p-4"><Badge variant={shipment.variant} size="sm">{shipment.status}</Badge></td></tr>)}</tbody></table></div></Card>}

      {section === 'analytics' && <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{[{ label: 'Direct sourcing savings', value: '₹18.6L', note: 'this quarter' }, { label: 'Average lot quality', value: 'A+', note: 'across 86 lots' }, { label: 'Repeat farmer rate', value: '74%', note: '+8% vs last quarter' }].map((item) => <Card key={item.label} padding="lg"><p className="text-sm text-neutral-500">{item.label}</p><p className="text-3xl font-bold mt-2 text-primary-900">{item.value}</p><p className="text-sm text-success-dark mt-2">{item.note}</p></Card>)}</div>}

      {section === 'settings' && <Card padding="lg" className="max-w-2xl"><h2 className="font-semibold text-lg">Workspace preferences</h2><div className="space-y-4 mt-6">{['Price movement alerts', 'New farmer offers', 'Delivery updates'].map((label) => <label key={label} className="flex items-center justify-between gap-4 border-b border-neutral-100 pb-4"><span className="text-neutral-700">{label}</span><input type="checkbox" defaultChecked className="h-5 w-5 accent-primary-900" /></label>)}</div><Button className="mt-6">Save preferences</Button></Card>}
    </div>
  );
}
