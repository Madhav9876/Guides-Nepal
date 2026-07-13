// Currency converter utility with live exchange rates

interface ExchangeRates {
  [key: string]: number;
}

// Default exchange rates (USD base) - will be updated with live data
let exchangeRates: ExchangeRates = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.73,
  CAD: 1.25,
  AUD: 1.35,
  JPY: 110,
  CHF: 0.92,
  CNY: 6.45,
  INR: 74.5,
  NPR: 120.5,
  // Add more currencies as needed
};

let lastUpdateTime: Date | null = null;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

/**
 * Fetch live exchange rates from a free API
 * Falls back to default rates if API fails
 */
export async function fetchLiveExchangeRates(): Promise<ExchangeRates> {
  try {
    // Using a free exchange rate API
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    
    if (!response.ok) {
      throw new Error('Failed to fetch exchange rates');
    }
    
    const data = await response.json();
    
    if (data && data.rates) {
      exchangeRates = data.rates;
      lastUpdateTime = new Date();
      
      // Store in localStorage for offline use
      localStorage.setItem('exchangeRates', JSON.stringify(exchangeRates));
      localStorage.setItem('lastUpdateTime', lastUpdateTime.toISOString());
      
      console.log('Exchange rates updated successfully');
    }
  } catch (error) {
    console.warn('Failed to fetch live exchange rates:', error);
    
    // Try to load from localStorage
    const storedRates = localStorage.getItem('exchangeRates');
    const storedTime = localStorage.getItem('lastUpdateTime');
    
    if (storedRates && storedTime) {
      const storedDate = new Date(storedTime);
      const now = new Date();
      
      // Use stored data if it's less than 24 hours old
      if (now.getTime() - storedDate.getTime() < CACHE_DURATION) {
        exchangeRates = JSON.parse(storedRates);
        lastUpdateTime = storedDate;
        console.log('Using cached exchange rates');
      }
    }
  }
  
  return exchangeRates;
}

/**
 * Convert amount from one currency to another
 */
export function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string
): number {
  // If same currency, return original amount
  if (fromCurrency === toCurrency) {
    return amount;
  }
  
  // Convert to USD first (base currency)
  const amountInUSD = fromCurrency === 'USD' 
    ? amount 
    : amount / exchangeRates[fromCurrency];
  
  // Convert from USD to target currency
  const amountInTarget = toCurrency === 'USD'
    ? amountInUSD
    : amountInUSD * exchangeRates[toCurrency];
  
  return Math.round(amountInTarget * 100) / 100; // Round to 2 decimal places
}

/**
 * Format currency with proper symbol and formatting
 */
export function formatCurrency(
  amount: number,
  currency: string,
  locale: string = 'en-US'
): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    // Fallback for unsupported currencies
    const symbols: { [key: string]: string } = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      CAD: 'C$',
      AUD: 'A$',
      JPY: '¥',
      CHF: 'CHF',
      CNY: '¥',
      INR: '₹',
      NPR: '₨',
    };
    
    const symbol = symbols[currency] || currency;
    return `${symbol}${amount.toFixed(2)}`;
  }
}

/**
 * Get all available currencies
 */
export function getAvailableCurrencies(): string[] {
  return Object.keys(exchangeRates);
}

/**
 * Get currency symbol
 */
export function getCurrencySymbol(currency: string): string {
  const symbols: { [key: string]: string } = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    CAD: 'C$',
    AUD: 'A$',
    JPY: '¥',
    CHF: 'CHF',
    CNY: '¥',
    INR: '₹',
    NPR: '₨',
  };
  
  return symbols[currency] || currency;
}

/**
 * Check if rates need updating
 */
export function shouldUpdateRates(): boolean {
  if (!lastUpdateTime) return true;
  
  const now = new Date();
  const timeDiff = now.getTime() - lastUpdateTime.getTime();
  
  return timeDiff > CACHE_DURATION;
}

/**
 * Initialize the currency converter
 * Call this when the app starts
 */
export async function initializeCurrencyConverter(): Promise<void> {
  if (shouldUpdateRates()) {
    await fetchLiveExchangeRates();
  }
}

/**
 * Get current exchange rates
 */
export function getCurrentRates(): ExchangeRates {
  return { ...exchangeRates };
}

/**
 * Get last update time
 */
export function getLastUpdateTime(): Date | null {
  return lastUpdateTime;
}

// Auto-update rates every 24 hours
if (typeof window !== 'undefined') {
  setInterval(() => {
    fetchLiveExchangeRates();
  }, 24 * 60 * 60 * 1000); // 24 hours
}