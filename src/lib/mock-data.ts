// Mock Data for KisanSetu - Structured for easy API integration later

export interface Crop {
  id: string;
  name: string;
  nameHi: string;
  nameMr: string;
  icon: string;
  unit: string; // 'quintal' | 'kg' | 'tonne'
  category: 'cereal' | 'pulse' | 'oilseed' | 'vegetable' | 'fruit' | 'fiber';
}

export interface MandiPrice {
  cropId: string;
  mandiName: string;
  mandiNameHi: string;
  mandiNameMr: string;
  price: number; // per quintal
  timestamp: Date;
  trend: 'up' | 'down' | 'stable';
  trendValue: number; // absolute change
}

export interface PriceForecast {
  cropId: string;
  days: number; // 7 or 30
  dataPoints: { day: number; price: number }[];
  range: { min: number; max: number };
  insight: string;
  confidence: number; // 0-100
  recommendation: 'hold' | 'sell' | 'buy';
}

export interface FarmerListing {
  id: string;
  cropId: string;
  grade: 'A+' | 'A' | 'B+' | 'B' | 'C';
  status: 'active-bid' | 'under-review' | 'sold' | 'expired';
  quantity: number; // in quintals
  pricePerQuintal: number;
  imageUrl: string;
  createdAt: Date;
  bidsCount: number;
  highestBid?: number;
}

export interface Buyer {
  id: string;
  name: string;
  mandiHub: string;
  dealCount: number;
  verified: boolean;
  rating: number; // 0-5
  reviewCount: number;
  avatarUrl?: string;
}

export interface Alert {
  id: string;
  type: 'price' | 'buyer-interest' | 'weather' | 'payment' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

export interface CalculatorInputs {
  cropId: string;
  quantity: number; // quintals
  expectedPrice: number; // per quintal
  transportCost: number;
  packagingCost: number;
  otherExpenses: number;
}

export interface CalculatorResult {
  grossRevenue: number;
  totalDeductions: number;
  netProfit: number;
  profitMargin: number; // percentage
  badge: 'Excellent Profit' | 'Good Profit' | 'Moderate Profit' | 'Low Profit' | 'Loss';
  badgeColor: 'success' | 'warning' | 'error';
  breakdown: {
    label: string;
    value: number;
    type: 'revenue' | 'cost';
  }[];
}

export interface BuyerDashboardKPI {
  label: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  subtext?: string;
}

export interface DirectFarmOffer {
  id: string;
  farmerName: string;
  farmerRating: number;
  cropId: string;
  variety: string;
  verified: boolean;
  grade: string;
  quantity: number; // quintals
  pricePerQuintal: number;
  distance: number; // km
  location: string;
}

export interface MandiComparison {
  mandiName: string;
  mandiNameHi: string;
  price: number;
  change: number; // percentage
}

// ============================================
// MOCK DATA
// ============================================

export const crops: Crop[] = [
  { id: 'wheat', name: 'Wheat', nameHi: 'गेहूं', nameMr: 'गहू', icon: '🌾', unit: 'quintal', category: 'cereal' },
  { id: 'soybean', name: 'Soybean', nameHi: 'सोयाबीन', nameMr: 'सोयाबीन', icon: '🫘', unit: 'quintal', category: 'oilseed' },
  { id: 'gram', name: 'Gram (Chana)', nameHi: 'चना', nameMr: 'हरभरा', icon: '🌰', unit: 'quintal', category: 'pulse' },
  { id: 'maize', name: 'Maize', nameHi: 'मक्का', nameMr: 'मका', icon: '🌽', unit: 'quintal', category: 'cereal' },
  { id: 'rice', name: 'Rice', nameHi: 'चावल', nameMr: 'तांदूळ', icon: '🍚', unit: 'quintal', category: 'cereal' },
  { id: 'cotton', name: 'Cotton', nameHi: 'कपास', nameMr: 'कापूस', icon: '🌱', unit: 'quintal', category: 'fiber' },
];

export const mandiPrices: MandiPrice[] = [
  // Wheat prices
  { cropId: 'wheat', mandiName: 'Indore Mandi', mandiNameHi: 'इंदौर मंडी', mandiNameMr: 'इंदौर मंडी', price: 2450, timestamp: new Date('2024-01-15T09:00:00'), trend: 'up', trendValue: 80 },
  { cropId: 'wheat', mandiName: 'Bhopal Mandi', mandiNameHi: 'भोपाल मंडी', mandiNameMr: 'भोपाल मंडी', price: 2420, timestamp: new Date('2024-01-15T09:00:00'), trend: 'up', trendValue: 50 },
  { cropId: 'wheat', mandiName: 'Ujjain Mandi', mandiNameHi: 'उज्जैन मंडी', mandiNameMr: 'उज्जैन मंडी', price: 2480, timestamp: new Date('2024-01-15T09:00:00'), trend: 'stable', trendValue: 0 },
  // Soybean prices
  { cropId: 'soybean', mandiName: 'Indore Mandi', mandiNameHi: 'इंदौर मंडी', mandiNameMr: 'इंदौर मंडी', price: 4850, timestamp: new Date('2024-01-15T09:00:00'), trend: 'down', trendValue: -120 },
  { cropId: 'soybean', mandiName: 'Bhopal Mandi', mandiNameHi: 'भोपाल मंडी', mandiNameMr: 'भोपाल मंडी', price: 4820, timestamp: new Date('2024-01-15T09:00:00'), trend: 'down', trendValue: -90 },
  { cropId: 'soybean', mandiName: 'Ujjain Mandi', mandiNameHi: 'उज्जैन मंडी', mandiNameMr: 'उज्जैन मंडी', price: 4880, timestamp: new Date('2024-01-15T09:00:00'), trend: 'up', trendValue: 30 },
  // Gram prices
  { cropId: 'gram', mandiName: 'Indore Mandi', mandiNameHi: 'इंदौर मंडी', mandiNameMr: 'इंदौर मंडी', price: 5200, timestamp: new Date('2024-01-15T09:00:00'), trend: 'up', trendValue: 150 },
  { cropId: 'gram', mandiName: 'Bhopal Mandi', mandiNameHi: 'भोपाल मंडी', mandiNameMr: 'भोपाल मंडी', price: 5180, timestamp: new Date('2024-01-15T09:00:00'), trend: 'up', trendValue: 100 },
  { cropId: 'gram', mandiName: 'Ujjain Mandi', mandiNameHi: 'उज्जैन मंडी', mandiNameMr: 'उज्जैन मंडी', price: 5220, timestamp: new Date('2024-01-15T09:00:00'), trend: 'stable', trendValue: 0 },
  // Maize prices
  { cropId: 'maize', mandiName: 'Indore Mandi', mandiNameHi: 'इंदौर मंडी', mandiNameMr: 'इंदौर मंडी', price: 2100, timestamp: new Date('2024-01-15T09:00:00'), trend: 'down', trendValue: -40 },
  { cropId: 'maize', mandiName: 'Bhopal Mandi', mandiNameHi: 'भोपाल मंडी', mandiNameMr: 'भोपाल मंडी', price: 2080, timestamp: new Date('2024-01-15T09:00:00'), trend: 'down', trendValue: -60 },
];

export const priceForecasts: PriceForecast[] = [
  {
    cropId: 'wheat',
    days: 7,
    dataPoints: [
      { day: 0, price: 2450 },
      { day: 1, price: 2465 },
      { day: 2, price: 2480 },
      { day: 3, price: 2470 },
      { day: 4, price: 2490 },
      { day: 5, price: 2510 },
      { day: 6, price: 2520 },
      { day: 7, price: 2535 },
    ],
    range: { min: 2450, max: 2535 },
    insight: 'Wheat prices expected to rise steadily due to lower arrivals and strong procurement demand. Government procurement likely to support prices.',
    confidence: 78,
    recommendation: 'hold',
  },
  {
    cropId: 'soybean',
    days: 7,
    dataPoints: [
      { day: 0, price: 4850 },
      { day: 1, price: 4820 },
      { day: 2, price: 4790 },
      { day: 3, price: 4780 },
      { day: 4, price: 4760 },
      { day: 5, price: 4750 },
      { day: 6, price: 4740 },
      { day: 7, price: 4730 },
    ],
    range: { min: 4730, max: 4850 },
    insight: 'Soybean prices under pressure from higher arrivals and weak crush margins. Consider selling if prices hold above ₹4,750.',
    confidence: 72,
    recommendation: 'sell',
  },
  {
    cropId: 'gram',
    days: 7,
    dataPoints: [
      { day: 0, price: 5200 },
      { day: 1, price: 5220 },
      { day: 2, price: 5250 },
      { day: 3, price: 5280 },
      { day: 4, price: 5300 },
      { day: 5, price: 5320 },
      { day: 6, price: 5350 },
      { day: 7, price: 5380 },
    ],
    range: { min: 5200, max: 5380 },
    insight: 'Strong demand from millers and limited supply pushing gram prices higher. Good time to hold for better returns.',
    confidence: 82,
    recommendation: 'hold',
  },
  {
    cropId: 'maize',
    days: 7,
    dataPoints: [
      { day: 0, price: 2100 },
      { day: 1, price: 2090 },
      { day: 2, price: 2080 },
      { day: 3, price: 2070 },
      { day: 4, price: 2065 },
      { day: 5, price: 2060 },
      { day: 6, price: 2055 },
      { day: 7, price: 2050 },
    ],
    range: { min: 2050, max: 2100 },
    insight: 'Maize prices declining due to good harvest and lower poultry feed demand. Prices may stabilize around ₹2,050.',
    confidence: 68,
    recommendation: 'sell',
  },
];

export const farmerListings: FarmerListing[] = [
  {
    id: 'listing-1',
    cropId: 'wheat',
    grade: 'A+',
    status: 'active-bid',
    quantity: 50,
    pricePerQuintal: 2500,
    imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop',
    createdAt: new Date('2024-01-10'),
    bidsCount: 12,
    highestBid: 2550,
  },
  {
    id: 'listing-2',
    cropId: 'soybean',
    grade: 'A',
    status: 'active-bid',
    quantity: 30,
    pricePerQuintal: 4900,
    imageUrl: 'https://images.unsplash.com/photo-1611160881888-53d1a2b5e6b8?w=400&h=300&fit=crop',
    createdAt: new Date('2024-01-12'),
    bidsCount: 8,
    highestBid: 4950,
  },
  {
    id: 'listing-3',
    cropId: 'gram',
    grade: 'A+',
    status: 'under-review',
    quantity: 25,
    pricePerQuintal: 5300,
    imageUrl: 'https://images.unsplash.com/photo-1582687982501-9f3c73cf13eb?w=400&h=300&fit=crop',
    createdAt: new Date('2024-01-14'),
    bidsCount: 5,
  },
  {
    id: 'listing-4',
    cropId: 'maize',
    grade: 'B+',
    status: 'active-bid',
    quantity: 40,
    pricePerQuintal: 2150,
    imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&h=300&fit=crop',
    createdAt: new Date('2024-01-08'),
    bidsCount: 15,
    highestBid: 2180,
  },
];

export const verifiedBuyers: Buyer[] = [
  {
    id: 'buyer-1',
    name: 'Shree Ram Flour Mills',
    mandiHub: 'Indore Hub',
    dealCount: 142,
    verified: true,
    rating: 4.8,
    reviewCount: 89,
  },
  {
    id: 'buyer-2',
    name: 'Maharashtra Oil Industries',
    mandiHub: 'Nagpur Hub',
    dealCount: 98,
    verified: true,
    rating: 4.6,
    reviewCount: 67,
  },
  {
    id: 'buyer-3',
    name: 'Gujarat Agro Processing',
    mandiHub: 'Ahmedabad Hub',
    dealCount: 76,
    verified: true,
    rating: 4.7,
    reviewCount: 54,
  },
  {
    id: 'buyer-4',
    name: 'Punjab Grain Traders',
    mandiHub: 'Ludhiana Hub',
    dealCount: 156,
    verified: true,
    rating: 4.9,
    reviewCount: 112,
  },
  {
    id: 'buyer-5',
    name: 'Rajasthan Food Corp',
    mandiHub: 'Jaipur Hub',
    dealCount: 64,
    verified: true,
    rating: 4.5,
    reviewCount: 43,
  },
];

export const alerts: Alert[] = [
  {
    id: 'alert-1',
    type: 'price',
    title: 'Price Alert: Wheat',
    message: 'Wheat price in Indore Mandi increased by ₹80 to ₹2,450/quintal',
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    read: false,
    actionUrl: '/farmer/forecast',
  },
  {
    id: 'alert-2',
    type: 'buyer-interest',
    title: 'New Buyer Interest',
    message: 'Shree Ram Flour Mills placed a bid of ₹2,550/quintal on your Wheat listing',
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    read: false,
    actionUrl: '/farmer/market',
  },
  {
    id: 'alert-3',
    type: 'weather',
    title: 'Weather Advisory',
    message: 'Light rain expected in Indore district tomorrow. Protect stored grains.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: true,
  },
  {
    id: 'alert-4',
    type: 'payment',
    title: 'Payment Received',
    message: '₹1,25,000 received for Soybean sale to Maharashtra Oil Industries',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    read: true,
    actionUrl: '/farmer/market',
  },
  {
    id: 'alert-5',
    type: 'system',
    title: 'New Feature: Price Forecast',
    message: 'Check 30-day price forecasts for your crops in the Forecast tab',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    read: true,
  },
];

export const buyerDashboardKPIs: BuyerDashboardKPI[] = [
  {
    label: 'Active Sourcing Lots',
    value: '24',
    change: '+12%',
    changeType: 'positive',
    subtext: 'vs last month',
  },
  {
    label: 'Dewas Mandi Average',
    value: '₹2,450/qtl',
    change: 'Steady',
    changeType: 'neutral',
    subtext: 'Wheat price trend',
  },
  {
    label: 'Direct Sourced Spend',
    value: '₹2.4 Cr',
    change: '18% logistics saved',
    changeType: 'positive',
    subtext: 'vs mandi procurement',
  },
];

export const directFarmOffers: DirectFarmOffer[] = [
  {
    id: 'offer-1',
    farmerName: 'Ram Singh',
    farmerRating: 4.8,
    cropId: 'wheat',
    variety: 'Lokwan',
    verified: true,
    grade: 'A+',
    quantity: 50,
    pricePerQuintal: 2500,
    distance: 12,
    location: 'Indore, MP',
  },
  {
    id: 'offer-2',
    farmerName: 'Mohan Patel',
    farmerRating: 4.6,
    cropId: 'soybean',
    variety: 'JS-335',
    verified: true,
    grade: 'A',
    quantity: 30,
    pricePerQuintal: 4900,
    distance: 8,
    location: 'Dewas, MP',
  },
  {
    id: 'offer-3',
    farmerName: 'Suresh Kumar',
    farmerRating: 4.7,
    cropId: 'gram',
    variety: 'JG-14',
    verified: true,
    grade: 'A+',
    quantity: 25,
    pricePerQuintal: 5300,
    distance: 15,
    location: 'Ujjain, MP',
  },
  {
    id: 'offer-4',
    farmerName: 'Rajesh Yadav',
    farmerRating: 4.5,
    cropId: 'maize',
    variety: 'Hybrid-3396',
    verified: false,
    grade: 'B+',
    quantity: 40,
    pricePerQuintal: 2150,
    distance: 22,
    location: 'Bhopal, MP',
  },
  {
    id: 'offer-5',
    farmerName: 'Vikram Singh',
    farmerRating: 4.9,
    cropId: 'wheat',
    variety: 'HD-2967',
    verified: true,
    grade: 'A+',
    quantity: 60,
    pricePerQuintal: 2480,
    distance: 18,
    location: 'Indore, MP',
  },
  {
    id: 'offer-6',
    farmerName: 'Deepak Sharma',
    farmerRating: 4.4,
    cropId: 'soybean',
    variety: 'JS-9560',
    verified: true,
    grade: 'A',
    quantity: 35,
    pricePerQuintal: 4850,
    distance: 10,
    location: 'Dewas, MP',
  },
];

export const mandiComparisons: MandiComparison[] = [
  { mandiName: 'Dewas', mandiNameHi: 'देवास', price: 2450, change: 1.2 },
  { mandiName: 'Indore', mandiNameHi: 'इंदौर', price: 2480, change: 2.1 },
  { mandiName: 'Ujjain', mandiNameHi: 'उज्जैन', price: 2420, change: -0.8 },
  { mandiName: 'Bhopal', mandiNameHi: 'भोपाल', price: 2460, change: 0.5 },
  { mandiName: 'Ratlam', mandiNameHi: 'रतलाम', price: 2430, change: 0.2 },
  { mandiName: 'Shajapur', mandiNameHi: 'शाजापुर', price: 2410, change: -1.1 },
];

// Language options
export const languages = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇮🇳' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
] as const;

export type LanguageCode = typeof languages[number]['code'];

// Translations for key UI strings
export const translations: Record<LanguageCode, Record<string, string>> = {
  en: {
    appName: 'KisanSetu',
    tagline: 'Sell directly to premium buyers & get real-time price reports',
    continue: 'Continue',
    welcome: 'Welcome',
    mandiPrices: "Today's Mandi Prices",
    viewAll: 'View All',
    askAI: 'Ask KisanSetu AI',
    aiDescription: 'Tap & speak your question in Hindi, Marathi, or English',
    quickActions: 'Quick Actions',
    calculator: 'Calculator',
    marketplace: 'Marketplace',
    forecast: 'Forecast',
    alerts: 'Alerts',
    netProfitCalculator: 'Net Profit Calculator',
    crop: 'Crop',
    quantity: 'Quantity (Qtl)',
    expectedPrice: 'Expected Price (₹/Qtl)',
    transportCost: 'Transport Cost (₹)',
    packagingCost: 'Packaging Cost (₹)',
    otherExpenses: 'Other Expenses (₹)',
    estimatedNetProfit: 'Estimated Net Profit',
    grossRevenue: 'Gross Revenue',
    totalDeductions: 'Total Deductions',
    myListings: 'My Listings',
    buyerInterest: 'Buyer Interest',
    activeBid: 'Active Bid',
    underReview: 'Under Review',
    verifiedBuyers: 'Verified Mandi Buyers',
    addCrop: 'Add Crop',
    priceForecast: 'Price Forecast',
    mandiExpertInsight: 'Mandi Expert Insight',
    confidence: 'Confidence',
    recommendation: 'Recommendation',
    mandiAlerts: 'Mandi Alerts',
    clearAll: 'Clear All',
    // Buyer dashboard
    procurementDashboard: 'Procurement Dashboard',
    farmerSourcing: 'Farmer Sourcing',
    mandiPriceFeed: 'Mandi Price Feed',
    activeContracts: 'Active Contracts',
    logisticsTracker: 'Logistics Tracker',
    procurementAnalytics: 'Procurement Analytics',
    searchPlaceholder: 'Search farmers, crops or locations...',
    downloadList: 'Download Procurement List',
    directFarmOffers: 'Direct Farm Offers',
    connect: 'Connect',
    qualityFilter: 'Quality Filter',
    dewasVsNearby: 'Dewas vs Nearby Mandis',
    // Common
    verified: 'Verified',
    grade: 'Grade',

    price: 'Price',
    distance: 'Distance',
    rating: 'Rating',
    deals: 'Deals',
  },
  hi: {
    appName: 'किसानसेतु',
    tagline: 'प्रीमियम खरीदारों को सीधे बेचें और रीयल-टाइम मूल्य रिपोर्ट प्राप्त करें',
    continue: 'आगे बढ़ें',
    welcome: 'स्वागत है',
    mandiPrices: 'आज के मंडी भाव',
    viewAll: 'सभी देखें',
    askAI: 'किसानसेतु AI से पूछें',
    aiDescription: 'हिंदी, मराठी या अंग्रेजी में बोलकर अपना सवाल पूछें',
    quickActions: 'त्वरित कार्य',
    calculator: 'कैलकुलेटर',
    marketplace: 'बाज़ार',
    forecast: 'पूर्वानुमान',
    alerts: 'अलर्ट',
    netProfitCalculator: 'शुद्ध लाभ कैलकुलेटर',
    crop: 'फसल',
    quantity: 'मात्रा (क्विंटल)',
    expectedPrice: 'अपेक्षित मूल्य (₹/क्विंटल)',
    transportCost: 'परिवहन लागत (₹)',
    packagingCost: 'पैकेजिंग लागत (₹)',
    otherExpenses: 'अन्य खर्च (₹)',
    estimatedNetProfit: 'अनुमानित शुद्ध लाभ',
    grossRevenue: 'कुल राजस्व',
    totalDeductions: 'कुल कटौती',
    myListings: 'मेरी लिस्टिंग',
    buyerInterest: 'खरीदार रुचि',
    activeBid: 'सक्रिय बोली',
    underReview: 'समीक्षाधीन',
    verifiedBuyers: 'सत्यापित मंडी खरीदार',
    addCrop: 'फसल जोड़ें',
    priceForecast: 'मूल्य पूर्वानुमान',
    mandiExpertInsight: 'मंडी विशेषज्ञ अंतर्दृष्टि',
    confidence: 'विश्वास',
    recommendation: 'सिफारिश',
    mandiAlerts: 'मंडी अलर्ट',
    clearAll: 'सभी साफ़ करें',
    procurementDashboard: 'खरीद डैशबोर्ड',
    farmerSourcing: 'किसान सोर्सिंग',
    mandiPriceFeed: 'मंडी मूल्य फीड',
    activeContracts: 'सक्रिय अनुबंध',
    logisticsTracker: 'लॉजिस्टिक्स ट्रैकर',
    procurementAnalytics: 'खरीद विश्लेषण',
    searchPlaceholder: 'किसानों, फसलों या स्थानों को खोजें...',
    downloadList: 'खरीद सूची डाउनलोड करें',
    directFarmOffers: 'सीधे खेत के प्रस्ताव',
    connect: 'संपर्क करें',
    qualityFilter: 'गुणवत्ता फ़िल्टर',
    dewasVsNearby: 'देवास बनाम आसपास की मंडियां',
    verified: 'सत्यापित',
    grade: 'ग्रेड',

    price: 'मूल्य',
    distance: 'दूरी',
    rating: 'रेटिंग',
    deals: 'सौदे',
  },
  mr: {
    appName: 'किसानसेतु',
    tagline: 'प्रीमियम खरेदारांकडेची थेट विक्री आणि रिअल-टाइम भाव अहवाल',
    continue: 'पुढे जा',
    welcome: 'स्वागत आहे',
    mandiPrices: 'आजचे मंडी भाव',
    viewAll: 'सर्व पहा',
    askAI: 'किसानसेतु AI ला विचारा',
    aiDescription: 'हिंदी, मराठी किंवा इंग्रजीत बोलून तुमचे प्रश्न विचारा',
    quickActions: 'त्वरित कृती',
    calculator: 'कॅल्क्युलेटर',
    marketplace: 'बाजारपेठ',
    forecast: 'पूर्वानुमान',
    alerts: 'सूचना',
    netProfitCalculator: 'नेट नफा कॅल्क्युलेटर',
    crop: 'पीक',
    quantity: 'प्रमाण (क्विंटल)',
    expectedPrice: 'अपेक्षित दर (₹/क्विंटल)',
    transportCost: 'वाहतूक खर्च (₹)',
    packagingCost: 'पॅकेजिंग खर्च (₹)',
    otherExpenses: 'इतर खर्च (₹)',
    estimatedNetProfit: 'अंदाजे नफा',
    grossRevenue: 'एकूण उत्पन्न',
    totalDeductions: 'एकूण कापणी',
    myListings: 'माझी यादी',
    buyerInterest: 'खरेदाराची रुची',
    activeBid: 'सक्रिय बोली',
    underReview: 'पडताळणीत',
    verifiedBuyers: 'पडताळलेले मंडी खरेदार',
    addCrop: 'पीक जोडा',
    priceForecast: 'भाव पूर्वानुमान',
    mandiExpertInsight: 'मंडी तज्ञांची अंतर्दृष्टी',
    confidence: 'विश्वास',
    recommendation: 'शिफारस',
    mandiAlerts: 'मंडी सूचना',
    clearAll: 'सर्व काढा',
    procurementDashboard: 'खरेदी डॅशबोर्ड',
    farmerSourcing: 'शेतकरी सोर्सिंग',
    mandiPriceFeed: 'मंडी भाव फीड',
    activeContracts: 'सक्रिय करार',
    logisticsTracker: 'लॉजिस्टिक्स ट्रॅकर',
    procurementAnalytics: 'खरेदी विश्लेषण',
    searchPlaceholder: 'शेतकरी, पीके किंवा ठिकाण शोधा...',
    downloadList: 'खरेदी यादी डाउनलोड करा',
    directFarmOffers: 'थेट शेतातील ऑफर',
    connect: 'संपर्क करा',
    qualityFilter: 'गुणवत्ता फिल्टर',
    dewasVsNearby: 'देवास विरुद्ध जवळची मंडी',
    verified: 'पडताळलेले',
    grade: 'ग्रेड',

    price: 'भाव',
    distance: 'अंतर',
    rating: 'रेटिंग',
    deals: 'करार',
  },
};

// Helper functions for data access
export function getCropById(id: string): Crop | undefined {
  return crops.find((c) => c.id === id);
}

export function getMandiPricesByCrop(cropId: string): MandiPrice[] {
  return mandiPrices.filter((p) => p.cropId === cropId);
}

export function getForecastByCrop(cropId: string, days: 7 | 30 = 7): PriceForecast | undefined {
  const forecast = priceForecasts.find((f) => f.cropId === cropId && f.days === days);
  if (forecast || days === 7) return forecast;

  const base = priceForecasts.find((f) => f.cropId === cropId && f.days === 7);
  if (!base) return undefined;

  const start = base.dataPoints[0]?.price ?? base.range.min;
  const end = base.dataPoints[base.dataPoints.length - 1]?.price ?? base.range.max;
  const dailyChange = (end - start) / 7;
  const dataPoints = Array.from({ length: 31 }, (_, day) => ({
    day,
    price: Math.round(start + dailyChange * day),
  }));
  const prices = dataPoints.map((point) => point.price);

  return {
    ...base,
    days: 30,
    dataPoints,
    range: { min: Math.min(...prices), max: Math.max(...prices) },
    insight: `${base.insight} This 30-day view extends the current market direction for planning purposes.`,
    confidence: Math.max(55, base.confidence - 8),
  };
}

export function getTranslation(lang: LanguageCode, key: string): string {
  return translations[lang][key] || translations.en[key] || key;
}