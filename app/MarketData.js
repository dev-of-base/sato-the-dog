'use client';

import { useState, useEffect } from 'react';
import Tooltip from './Tooltip';
import { CurrencyDollarIcon, ChartBarIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/solid';

/**
 * Internal helper to format very small numbers with zero counting logic
 * @param {number} numPrice - The numeric price
 * @returns {Object} Object with display parts for rendering
 */
function formatSmallNumber(numPrice) {
  // Convert to fixed decimal notation instead of using toString()
  // Use enough decimal places to capture very small numbers
  const str = numPrice.toFixed(20);
  
  if (!str.includes('.')) return { display: str, subscript: '', digits: '' };

  const [intPart, decPartRaw] = str.split('.');
  
  if (intPart !== '0') {
    return { display: numPrice.toFixed(2), subscript: '', digits: '' };
  }
  
  // Count leading zeros after the decimal point
  let zeros = 0;
  for (let i = 0; i < decPartRaw.length; i++) {
    if (decPartRaw[i] === '0') zeros++;
    else break;
  }
  
  let display = `${intPart}.`;
  let subscript = '';
  let digits = '';

  if (zeros > 2) {
    display += '0';
    subscript = zeros.toString();
    digits = decPartRaw.slice(zeros, zeros + 4);
    if (digits.length < 4) {
      digits = digits.padEnd(4, '0');
    }
  } else if (zeros === 1 || zeros === 2) {
    display += '0'.repeat(zeros);
    digits = decPartRaw.slice(zeros, zeros + 4);
    if (digits.length < 4) {
      digits = digits.padEnd(4, '0');
    }
  } else {
    digits = decPartRaw.slice(0, 4);
    if (digits.length < 4) {
      digits = digits.padEnd(4, '0');
    }
  }

  return { display, subscript, digits };
}

/**
 * Shortens price USD for display with proper formatting for very small numbers
 * Returns a string representation (subscript notation as text)
 * @param {number|string} price - The price in USD (number or string)
 * @returns {string} Formatted price string
 */
function shortenPriceUsd(price) {
  if (price === undefined || price === null) return '--';
  
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  if (isNaN(numPrice)) return '--';
  
  // For numbers >= 1, show with appropriate decimal places
  if (numPrice >= 1) {
    if (numPrice >= 1000) {
      return numPrice.toLocaleString('en-US', { 
        minimumFractionDigits: 2,
        maximumFractionDigits: 2 
      });
    } else {
      return numPrice.toFixed(2);
    }
  }
  
  const { display, subscript, digits } = formatSmallNumber(numPrice);
  
  if (subscript) {
    return `${display}(${subscript})${digits}`;
  } else {
    return `${display}${digits}`;
  }
}

/**
 * Shortens price USD for display with proper JSX subscript rendering for very small numbers
 * @param {number|string} price - The price in USD (number or string)
 * @returns {React.ReactNode} Formatted price with proper subscript JSX
 */
function shortenPriceUsdJSX(price) {
  if (price === undefined || price === null) return '--';
  
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  if (isNaN(numPrice)) return '--';
  
  // For numbers >= 1, show with appropriate decimal places
  if (numPrice >= 1) {
    if (numPrice >= 1000) {
      return numPrice.toLocaleString('en-US', { 
        minimumFractionDigits: 2,
        maximumFractionDigits: 2 
      });
    } else {
      return numPrice.toFixed(2);
    }
  }
  
  const { display, subscript, digits } = formatSmallNumber(numPrice);

  return (
    <>
      {display}
      {subscript && (
        <sub style={{ fontSize: '0.7em', verticalAlign: 'middle' }}>{subscript}</sub>
      )}
      {digits}
    </>
  );
}

export default function MarketData() {
  const [marketData, setMarketData] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCached, setIsCached] = useState(false);
  const [cachedAt, setCachedAt] = useState(null);
  const [isStale, setIsStale] = useState(false);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        // Only show loading state for the very first fetch
        if (initialLoading) {
          // Don't set any loading state for subsequent fetches
        }
        
        const response = await fetch('/api/market-data');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        // Check if data is stale (over 5 minutes old)
        let dataAge = 0;
        if (result.stale && result.staleDuration) {
          // Extract seconds from staleDuration string like "180 seconds"
          dataAge = parseInt(result.staleDuration.split(' ')[0]) * 1000;
        } else if (result.cachedAt) {
          dataAge = Date.now() - new Date(result.cachedAt).getTime();
        }
        
        const isDataStale = dataAge > 5 * 60 * 1000; // 5 minutes in milliseconds
        
        // The API returns the actual market data in result.data
        setMarketData(result.data);
        setIsCached(result.cached);
        setCachedAt(result.cachedAt || result.fetchedAt);
        setIsStale(isDataStale);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching market data:', err);
      } finally {
        // Only clear initial loading state after first successful fetch
        if (initialLoading) {
          setInitialLoading(false);
        }
      }
    };

    fetchMarketData();
    
    // Optional: Set up polling to refresh data periodically
    const interval = setInterval(fetchMarketData, 2 * 60 * 1000); // Refresh every 2 minutes
    
    return () => clearInterval(interval);
  }, [initialLoading]);

  // Show loading message during initial load
  if (initialLoading) {
    return (
      <section className="w-full h-8 bg-white/50 flex items-center justify-center">
        <p className="text-xs text-gray-600">Loading market data...</p>
      </section>
    );
  }

  if (error || isStale || !marketData) {
    return null;
  }

  // Extract relevant data from the GeckoTerminal API response
  const poolData = marketData.data?.attributes;
  const price = poolData?.base_token_price_usd;
  const volume24h = poolData?.volume_usd?.h24;
  const priceChange24h = poolData?.price_change_percentage?.h24;

  return (
    <section className="font-baloo font-normal cursor-default w-full h-8 bg-white/70 border-b border-gray-200 flex items-center justify-center space-x-4 md:space-x-8 lg:space-x-12">
        <span className="hidden md:inline-block text-xs font-bold">
          $SATO
        </span>
      {price && (
        <Tooltip content="Token price">
          <span className="text-xs font-medium flex items-center space-x-0.5">
            <CurrencyDollarIcon className="w-4 h-4 text-amber-500" aria-hidden="true" />
            <span>${shortenPriceUsdJSX(price)}</span>
          </span>
        </Tooltip>
      )}
      {volume24h && (
        <Tooltip content="24h trading volume">
          <span className="text-xs flex items-center space-x-0.5">
            <ChartBarIcon className="w-4 h-4 text-blue-600" aria-hidden="true" />
            <span>${parseInt(volume24h).toLocaleString()}</span>
          </span>
        </Tooltip>
      )}
      {priceChange24h && (
        <Tooltip content="24h price change">
          <span className={`text-xs flex items-center space-x-0.5 ${parseFloat(priceChange24h) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {parseFloat(priceChange24h) >= 0 ? (
              <ArrowTrendingUpIcon className="w-4 h-4" aria-hidden="true" />
            ) : (
              <ArrowTrendingDownIcon className="w-4 h-4" aria-hidden="true" />
            )}
            <span>{parseFloat(priceChange24h).toFixed(2)}%</span>
          </span>
        </Tooltip>
      )}
    </section>
  );
}