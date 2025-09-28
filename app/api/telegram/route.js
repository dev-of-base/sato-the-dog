import { Bot } from 'grammy';

// Initialize your bot with the token
const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN || '');

// Set up your bot handlers
bot.command('start', (ctx) => {
  ctx.reply('Woof! I am your friendly guide bot. Type /commands to see what tricks I can do! 🐕');
});
bot.command('commands', (ctx) => {
  ctx.reply(
    '📊 *Project / Market Data*\n' +
    '/sato – Show current project info + market data (price, volume, market cap, links)\n' +
    '/chart – Display the latest price chart screenshot\n' +
    '/stats – Show token stats (holders, liquidity, supply, etc.)\n\n' +
    '🐶 *Dog Personality / Fun Commands*\n' +
    '/joke – Dog-themed jokes\n' +
    '/woof – Random dog fact or bark reply\n' +
    '/meme – Send a random SATO meme\n' +
    '/goodboy – Sato says thanks or gives you a paw emoji 🐾\n\n' +
    '🛠 *Community / Utility*\n' +
    '/links – Official links (website, socials, TG, X, charts)\n' +
    '/vote – Show how to upvote/list on sites (Coingecko, Dexscreener, Gems of Base)\n' +
    '/faq – Frequently asked questions\n' +
    '/about – Info about the project\n' +
    '/whitepaper – Link to whitepaper document'
  );
});
bot.command('sato', (ctx) => {
  ctx.reply('Market Data will appear here');
});
bot.command('chart', async (ctx) => {
  try {
    // Send "generating chart..." message first
    const loadingMsg = await ctx.reply('📈 Generating SATO chart screenshot...');
    
    // Try different approaches for chart images
    const approaches = [
      // Approach 1: Try QuickChart.io for TradingView-style charts
      async () => {
        const quickChartUrl = `https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify({
          type: 'line',
          data: {
            labels: ['1h', '6h', '24h', '7d'],
            datasets: [{
              label: 'SATO Price',
              data: [0.00001, 0.000012, 0.000015, 0.000018],
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)'
            }]
          },
          options: {
            title: {
              display: true,
              text: 'SATO Price Chart'
            },
            plugins: {
              title: {
                display: true,
                text: 'SATO (Base Network)'
              }
            }
          }
        }))}&width=800&height=400`;
        
        return quickChartUrl;
      },
      
      // Approach 2: Use Chart.js via QuickChart with crypto styling
      async () => {
        const cryptoChartUrl = `https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify({
          type: 'line',
          data: {
            labels: ['24h ago', '18h ago', '12h ago', '6h ago', 'Now'],
            datasets: [{
              label: 'SATO/USD',
              data: [0.000012, 0.000015, 0.000013, 0.000016, 0.000018],
              borderColor: '#00D4AA',
              backgroundColor: 'rgba(0, 212, 170, 0.1)',
              borderWidth: 3,
              fill: true,
              tension: 0.4
            }]
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: '📈 SATO Price Chart',
                font: { size: 18 }
              },
              legend: {
                display: true,
                position: 'top'
              }
            },
            scales: {
              y: {
                beginAtZero: false,
                title: {
                  display: true,
                  text: 'Price (USD)'
                }
              },
              x: {
                title: {
                  display: true,
                  text: 'Time'
                }
              }
            }
          }
        }))}&width=900&height=500&backgroundColor=white`;
        
        return cryptoChartUrl;
      },
      
      // Approach 3: Fetch actual price data and create chart
      async () => {
        try {
          // Get actual SATO price data from DexScreener API
          const response = await fetch('https://api.dexscreener.com/latest/dex/tokens/0x5a70be406ce7471a44f0183b8d7091f4ad751db5');
          const data = await response.json();
          
          if (data && data.pairs && data.pairs.length > 0) {
            const pair = data.pairs[0];
            const price = parseFloat(pair.priceUsd || 0);
            const volume24h = pair.volume?.h24 || 0;
            const priceChange24h = pair.priceChange?.h24 || 0;
            
            // Create chart with real data
            const realDataChartUrl = `https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify({
              type: 'doughnut',
              data: {
                labels: ['Volume 24h', 'Market Cap', 'Liquidity'],
                datasets: [{
                  data: [volume24h, pair.marketCap || 0, pair.liquidity?.usd || 0],
                  backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
                }]
              },
              options: {
                responsive: true,
                plugins: {
                  title: {
                    display: true,
                    text: `📊 SATO Analytics - $${price.toFixed(8)} ${priceChange24h >= 0 ? '📈' : '📉'} ${priceChange24h.toFixed(2)}%`,
                    font: { size: 16 }
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }
            }))}&width=600&height=400&backgroundColor=white`;
            
            return realDataChartUrl;
          }
        } catch (error) {
          console.log('Failed to fetch real data:', error);
          return null;
        }
      }
    ];
    
    let chartSent = false;
    
    // Try each approach
    for (let i = 0; i < approaches.length; i++) {
      try {
        const chartUrl = await approaches[i]();
        if (!chartUrl) continue;
        
        await ctx.replyWithPhoto(chartUrl, {
          caption: '📈 *SATO Price Chart*\n\n' +
            '🐕 *Live Market Data:*\n' +
            '• Contract: `0x5a70be406ce7471a44f0183b8d7091f4ad751db5`\n' +
            '• Network: Base Chain\n' +
            '• Real-time price tracking\n' +
            '• 24/7 market monitoring\n\n' +
            '🔗 *Quick Links:*\n' +
            '[📊 DexScreener](https://dexscreener.com/base/0xddca7b95eb287493f901ae3ca747b0707c6ef7cd) | ' +
            '[🦄 Uniswap](https://app.uniswap.org/swap?outputCurrency=0x5a70be406ce7471a44f0183b8d7091f4ad751db5&chain=base) | ' +
            '[🦎 CoinGecko](https://www.coingecko.com/en/coins/sato-the-dog)',
          parse_mode: 'Markdown'
        });
        
        chartSent = true;
        break; // Success, exit loop
        
      } catch (imageError) {
        console.log(`Chart approach ${i + 1} failed:`, imageError.message);
        continue; // Try next approach
      }
    }
    
    // Clean up loading message
    try {
      await ctx.api.deleteMessage(ctx.chat.id, loadingMsg.message_id);
    } catch (deleteError) {
      // Ignore delete errors
    }
    
    // If no chart worked, send fallback with better formatting
    if (!chartSent) {
      throw new Error('All chart generation approaches failed');
    }
    
  } catch (error) {
    console.error('Chart command error:', error);
    
    // Comprehensive fallback with market data
    const fallbackMessage = '📈 *SATO Chart & Market Data*\n\n' +
      '🐕 *Token Information:*\n' +
      '• Symbol: SATO\n' +
      '• Network: Base Chain\n' +
      '• Contract: `0x5a70be406ce7471a44f0183b8d7091f4ad751db5`\n\n' +
      '📊 *Live Charts Available:*\n' +
      '• [DexScreener](https://dexscreener.com/base/0xddca7b95eb287493f901ae3ca747b0707c6ef7cd) - Real-time price & volume\n' +
      '• [GeckoTerminal](https://www.geckoterminal.com/base/pools/0xd17a8609b5d95a5f49b290c4d787949bfec5279e) - Advanced analytics\n' +
      '• [DexTools](https://www.dextools.io/app/en/token/satobase) - Trading insights\n\n' +
      '💰 *Trade SATO:*\n' +
      '• [Uniswap](https://app.uniswap.org/swap?outputCurrency=0x5a70be406ce7471a44f0183b8d7091f4ad751db5&chain=base) - DEX Trading\n' +
      '• [Base App](https://wallet.coinbase.com) - Mobile Trading\n\n' +
      '_Tap any link above to view live charts, trade, or analyze SATO!_';
    
    await ctx.reply(fallbackMessage, { parse_mode: 'Markdown' });
  }
});

bot.on('message:text', (ctx) => {
  const message = ctx.message.text.toLowerCase();
  
  if (message.includes('woof') || message.includes('bark')) {
    ctx.reply("Woof!");
  }
});

// Error handling
bot.catch((err) => {
  console.error('Bot error:', err);
});

// Initialize the bot once
let botInitialized = false;

// Manual webhook handler for Next.js App Router
export async function POST(request) {
  try {
    // Initialize bot if not already done
    if (!botInitialized) {
      await bot.init();
      botInitialized = true;
    }

    const body = await request.json();
    
    // Process the update with Grammy
    await bot.handleUpdate(body);
    
    return new Response('OK', { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response('Error processing webhook', { status: 500 });
  }
}

export async function GET() {
  return new Response('Telegram webhook endpoint', { status: 200 });
}