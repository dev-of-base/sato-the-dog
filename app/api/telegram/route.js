import { Bot } from 'grammy';
import { formatLargeNumber,shortenPriceUsd,formatTimestamp } from '../../crypto-functions.js';

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
bot.command('sato', async (ctx) => {
  const fetchMarketData = async () => {
    try {
      const response = await fetch('https://sato-the-dog-git-development-gemsofbases-projects.vercel.app/api/market-data');
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('unable to fetch market data', error);
      return { error: 'Failed to fetch market data' }
    }
  }

  const data = await fetchMarketData();
  const projectData = data.data.data.attributes;

  const caption = `*Sato The Dog* ($SATO)\n
SATO is a decentralized community-led meme coin born on Base\n
\`0x5a70be406ce7471a44f0183b8d7091f4ad751db5\`
  \n📊 *Stats*
├ USD   *$${shortenPriceUsd(projectData.base_token_price_usd)}*
├ MC     *${formatLargeNumber(projectData.market_cap_usd)}*
├ Vol     *${formatLargeNumber(projectData.volume_usd.h24)}*
└ 24h    *${projectData.price_change_percentage.h24}%*
  \n🌐 [Website](https://satocto.com)
  \n👥 *Socials*
└ ${[
  `[𝕏](https://x.com/Satothedog)`,
  `[TG](https://t.me/satothedogcto)`
].join(' • ')}
  \n📈 *Chart*
└ [DT](https://www.dextools.io/app/en/base/pair-explorer/0xd17a8609b5d95a5f49b290c4d787949bfec5279e) | [DS](https://dexscreener.com/base/0xd17a8609b5d95a5f49b290c4d787949bfec5279e) | [GT](https://www.geckoterminal.com/base/pools/0xd17a8609b5d95a5f49b290c4d787949bfec5279e)
----------------\n${formatTimestamp(data.fetchedAt)}`;

  ctx.replyWithPhoto('https://satocto.com/assets/sato-logo.jpg', {
    caption: caption,
    parse_mode: 'Markdown'
  });

});
bot.command('chart', async (ctx) => {
  try {
    // Send "generating chart..." message first
    await ctx.reply('📈 Generating SATO chart...');
    
    // Try multiple chart image sources
    const chartSources = [
      'https://dexscreener.com/base/0xddca7b95eb287493f901ae3ca747b0707c6ef7cd.png',
      'https://charts.dexscreener.com/base/0xddca7b95eb287493f901ae3ca747b0707c6ef7cd.png',
      // Backup: GeckoTerminal chart image (if available)
      'https://www.geckoterminal.com/base/pools/0xd17a8609b5d95a5f49b290c4d787949bfec5279e/chart.png'
    ];
    
    let chartSent = false;
    
    // Try each chart source
    for (const chartUrl of chartSources) {
      try {
        await ctx.replyWithPhoto(chartUrl, {
          caption: '📈 *SATO Price Chart*\n\n' +
            '🐕 *Live Chart Features:*\n' +
            '• Real-time price updates\n' +
            '• Trading volume & liquidity\n' +
            '• Market cap tracking\n' +
            '• Transaction history\n\n' +
            '[📊 Interactive Chart](https://dexscreener.com/base/0xddca7b95eb287493f901ae3ca747b0707c6ef7cd) | ' +
            '[🦄 Trade Now](https://app.uniswap.org/swap?outputCurrency=0x5a70be406ce7471a44f0183b8d7091f4ad751db5&chain=base)',
          parse_mode: 'Markdown'
        });
        chartSent = true;
        break; // Success, exit loop
      } catch (imageError) {
        console.log(`Failed to load chart from ${chartUrl}:`, imageError.message);
        continue; // Try next source
      }
    }
    
    // If no image worked, send fallback message
    if (!chartSent) {
      throw new Error('All chart sources failed');
    }
    
  } catch (error) {
    console.error('Chart command error:', error);
    // Fallback to text message with links
    const fallbackMessage = '📈 *SATO Chart*\n\n' +
      '🐕 *Current Chart Links:*\n' +
      '• [DexScreener Chart](https://dexscreener.com/base/0xddca7b95eb287493f901ae3ca747b0707c6ef7cd)\n' +
      '• [GeckoTerminal Chart](https://www.geckoterminal.com/base/pools/0xd17a8609b5d95a5f49b290c4d787949bfec5279e)\n' +
      '• [Trade on Uniswap](https://app.uniswap.org/swap?outputCurrency=0x5a70be406ce7471a44f0183b8d7091f4ad751db5&chain=base)\n\n' +
      '_Tap any link above to view live charts and market data!_';
    
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