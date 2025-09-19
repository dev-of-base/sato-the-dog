import { NextResponse } from 'next/server';

// In-memory cache for storing market data
let marketDataCache = {
  data: null,
  timestamp: null,
  ttl: 5 * 60 * 1000, // 5 minutes TTL
};

// GeckoTerminal API endpoint for SATO token pool
const GECKOTERMINAL_API_URL = 'https://api.geckoterminal.com/api/v2/networks/base/pools/0xd17a8609b5d95a5f49b290c4d787949bfec5279e?include_volume_breakdown=true&include_composition=true';

export async function GET() {
  try {
    // Check if cached data exists and is still valid
    const now = Date.now();
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

    console.log('Fetching fresh market data from GeckoTerminal API');
    
    // Fetch fresh data from GeckoTerminal API
    const response = await fetch(GECKOTERMINAL_API_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'sato-the-dog/1.0',
      },
    });

    if (!response.ok) {
      throw new Error(`GeckoTerminal API error: ${response.status} ${response.statusText}`);
    }

    const marketData = await response.json();

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

  } catch (error) {
    console.error('Error fetching market data:', error);

    // If we have cached data (even if expired), return it with error flag
    if (marketDataCache.data) {
      return NextResponse.json({
        data: marketDataCache.data,
        cached: true,
        stale: true,
        cachedAt: new Date(marketDataCache.timestamp).toISOString(),
        error: 'Fresh data unavailable, returning cached data',
      }, { status: 206 }); // 206 Partial Content
    }

    return NextResponse.json({
      error: 'Failed to fetch market data',
      message: error.message,
    }, { status: 500 });
  }
}

// Optional: Add a health check endpoint
export async function HEAD() {
  return new NextResponse(null, { status: 200 });
}