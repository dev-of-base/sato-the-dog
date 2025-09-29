import { NextResponse } from 'next/server';

// In-memory cache for storing market data
let marketDataCache = {
  data: null,
  timestamp: null,
  ttl: 1 * 60 * 1000, // 1 minute TTL
};

// Request state tracking to prevent concurrent requests
let isFetching = false;
let pendingPromise = null;

// GeckoTerminal API endpoint for SATO token pool
const GECKOTERMINAL_API_URL = 'https://api.geckoterminal.com/api/v2/networks/base/pools/0xd17a8609b5d95a5f49b290c4d787949bfec5279e?include_volume_breakdown=true&include_composition=true';

// Configuration
const CONFIG = {
  FETCH_TIMEOUT: 10000, // 10 second timeout
  MAX_STALE_AGE: 5 * 60 * 1000, // 5 minutes - max age for stale data
  RETRY_ATTEMPTS: 2,
  RETRY_DELAY: 1000, // 1 second
};

// Utility function for delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Fetch data with retry logic and timeout
async function fetchMarketDataWithRetry() {
  for (let attempt = 1; attempt <= CONFIG.RETRY_ATTEMPTS; attempt++) {
    try {
      console.log(`Fetching market data (attempt ${attempt}/${CONFIG.RETRY_ATTEMPTS})`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), CONFIG.FETCH_TIMEOUT);
      
      const response = await fetch(GECKOTERMINAL_API_URL, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'sato-the-dog/1.0',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        // Handle specific HTTP status codes
        if (response.status === 429) {
          throw new Error('Rate limited by GeckoTerminal API');
        }
        if (response.status >= 500) {
          throw new Error(`GeckoTerminal server error: ${response.status}`);
        }
        throw new Error(`GeckoTerminal API error: ${response.status} ${response.statusText}`);
      }

      const marketData = await response.json();
      
      // Validate response structure
      if (!marketData?.data?.attributes) {
        throw new Error('Invalid response structure from GeckoTerminal API');
      }

      return marketData;

    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error.message);
      
      // Don't retry on certain errors
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      if (error.message.includes('Rate limited')) {
        throw error; // Don't retry rate limits
      }
      
      // If this was the last attempt, throw the error
      if (attempt === CONFIG.RETRY_ATTEMPTS) {
        throw error;
      }
      
      // Wait before retrying
      await delay(CONFIG.RETRY_DELAY * attempt);
    }
  }
}

export async function GET() {
  try {
    const now = Date.now();
    
    // Check if cached data exists and is still valid
    if (
      marketDataCache.data &&
      marketDataCache.timestamp &&
      (now - marketDataCache.timestamp) < marketDataCache.ttl
    ) {
      console.log('Returning cached market data');
      return NextResponse.json({
        data: marketDataCache.data,
        cached: true,
        cachedAt: new Date(marketDataCache.timestamp).toISOString(),
      });
    }

    // Check if we're already fetching data to prevent concurrent requests
    if (isFetching && pendingPromise) {
      console.log('Waiting for existing fetch to complete');
      try {
        const result = await pendingPromise;
        return NextResponse.json({
          data: result,
          cached: false,
          fetchedAt: new Date().toISOString(),
          note: 'Deduped request',
        });
      } catch (error) {
        // Fall through to stale data handling
        console.error('Pending request failed:', error);
      }
    }

    // Set fetching state and create promise
    isFetching = true;
    pendingPromise = fetchMarketDataWithRetry();

    try {
      console.log('Fetching fresh market data from GeckoTerminal API');
      const marketData = await pendingPromise;

      // Store in cache
      marketDataCache = {
        data: marketData,
        timestamp: now,
        ttl: marketDataCache.ttl,
      };

      console.log('Market data fetched and cached successfully');

      return NextResponse.json({
        data: marketData,
        cached: false,
        fetchedAt: new Date(now).toISOString(),
      });

    } finally {
      // Reset fetching state
      isFetching = false;
      pendingPromise = null;
    }

  } catch (error) {
    console.error('Error fetching market data:', error);

    // Reset fetching state on error
    isFetching = false;
    pendingPromise = null;

    const now = Date.now();
    
    // Check if we have cached data that isn't too old
    if (marketDataCache.data && marketDataCache.timestamp) {
      const age = now - marketDataCache.timestamp;
      
      if (age < CONFIG.MAX_STALE_AGE) {
        console.log('Returning stale cached data due to fetch failure');
        return NextResponse.json({
          data: marketDataCache.data,
          cached: true,
          stale: true,
          cachedAt: new Date(marketDataCache.timestamp).toISOString(),
          error: 'Fresh data unavailable, returning cached data',
          staleDuration: Math.round(age / 1000) + ' seconds',
        }, { status: 206 }); // 206 Partial Content
      } else {
        console.log('Cached data too old, not returning stale data');
      }
    }

    // Determine appropriate error response based on error type
    let statusCode = 500;
    let errorMessage = 'Failed to fetch market data';
    
    if (error.message.includes('timeout') || error.message.includes('Request timeout')) {
      statusCode = 504; // Gateway Timeout
      errorMessage = 'Market data service timeout';
    } else if (error.message.includes('Rate limited')) {
      statusCode = 429; // Too Many Requests
      errorMessage = 'Rate limited by market data provider';
    } else if (error.message.includes('server error')) {
      statusCode = 502; // Bad Gateway
      errorMessage = 'Market data service unavailable';
    }

    return NextResponse.json({
      error: errorMessage,
      message: error.message,
      timestamp: new Date(now).toISOString(),
    }, { status: statusCode });
  }
}

// Optional: Add a health check endpoint
export async function HEAD() {
  return new NextResponse(null, { status: 200 });
}