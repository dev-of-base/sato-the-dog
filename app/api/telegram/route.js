import { Bot } from 'grammy';
import { formatLargeNumber,shortenPriceUsd,formatTimestamp } from '../../crypto-functions.js';

// Initialize your bot with the token
const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);

if (!process.env.TELEGRAM_BOT_TOKEN) {
  throw new Error('TELEGRAM_BOT_TOKEN environment variable is required');
}

// Add rate limiting
const rateLimitMap = new Map();

bot.use(async (ctx, next) => {
  const userId = ctx.from?.id;
  if (!userId) return next();

  const now = Date.now();
  const userLimit = rateLimitMap.get(userId) || { count: 0, resetTime: now + 60000 };

  if (now > userLimit.resetTime) {
    userLimit.count = 0;
    userLimit.resetTime = now + 60000;
  }

  if (userLimit.count >= 10) { // 10 commands per minute
    return ctx.reply('⚠️ Too many requests. Please wait a moment.');
  }

  userLimit.count++;
  rateLimitMap.set(userId, userLimit);
  
  return next();
});

const fetchMarketData = async () => {
  try {
    const apiUrl = process.env.MARKET_DATA_API || 'https://satocto.com/api/market-data';
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const response = await fetch(
      apiUrl,
      { 
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'SatoBot/1.0'
        },
        signal: controller.signal
      }
    );
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('API request timeout');
      return { error: 'Request timeout' };
    }
    console.error('unable to fetch market data', error);
    return { error: 'Failed to fetch market data' };
  }
}

// Bot handlers
bot.command('start', (ctx) => {
  console.log(`/start command from ${ctx.from?.username || ctx.from?.first_name}`);
  ctx.reply('Woof! I am your friendly guide bot. Type /commands to see what tricks I can do! 🐕');
});
bot.command('commands', (ctx) => {
  console.log(`/commands command from ${ctx.from?.username || ctx.from?.first_name}`);
  ctx.reply(
    '📊 *Market Data & Stats*\n' +
    '/sato – Current price, market cap, volume & 24h changes\n' +
    '/about – Learn about SATO\n' +
    '/stats – Detailed market statistics and trading data\n\n' +
    '🔗 *Quick Access*\n' +
    '/links – All official links (website, socials, charts, exchanges)\n' +
    '/nft – Info about our 100 Limited NFT Collection\n' +
    '/faq – Frequently asked questions\n' +
    '/whitepaper – Download our official whitepaper\n\n' +
    '🐾 *Fun Commands*\n' +
    '/joke – Dog-themed jokes to brighten your day\n' +
    '/image – Random SATO artwork from our gallery\n' +
    '/goodboy – Give SATO some love!',
    { parse_mode: 'Markdown' }
  );
});

bot.command('sato', async (ctx) => {
  console.log(`/sato command from ${ctx.from?.username || ctx.from?.first_name}`);

  try {
    await ctx.replyWithChatAction('typing');

    const data = await fetchMarketData();

    // Handle API error - return early
    if (data.error) {
      console.error('Data not fetched:', data.error);
      return ctx.reply('⚠️ Unable to fetch market data at the moment. Please try again later.');
    }

    // Validate data structure - return early
    if (!data?.data?.data?.attributes) {
      console.error('Invalid data structure received:', data);
      return ctx.reply('⚠️ Received invalid market data. Please try again later.');
    }

    const projectData = data.data.data.attributes;

    // Safe property access with fallbacks
    const priceChange24h = projectData.price_change_percentage?.h24;
    const priceChangeDisplay = priceChange24h !== undefined && priceChange24h !== null 
      ? `${priceChange24h >= 0 ? '+' : ''}${priceChange24h}%`
      : '--';

    const caption = `*Sato The Dog* ($SATO)\n
SATO is a decentralized community-led meme coin born on Base\n
\`0x5a70be406ce7471a44f0183b8d7091f4ad751db5\`
  \n📊 *Stats*
├ USD   *$${projectData.base_token_price_usd ? shortenPriceUsd(projectData.base_token_price_usd) : '--'}*
├ MC     *${projectData.market_cap_usd ? formatLargeNumber(projectData.market_cap_usd) : '--'}*
├ Vol     *${projectData.volume_usd?.h24 ? formatLargeNumber(projectData.volume_usd.h24) : '--'}*
└ 24h    *${priceChangeDisplay}*
  \n🌐 [Website](https://satocto.com)
  \n👥 *Socials*
└ ${[
  `[𝕏](https://x.com/SatoCtoBase)`,
  `[TG](https://t.me/satothedogcto)`
].join(' • ')}
  \n📈 *Chart*
└ [DT](https://www.dextools.io/app/en/base/pair-explorer/0xd17a8609b5d95a5f49b290c4d787949bfec5279e) | [DS](https://dexscreener.com/base/0xd17a8609b5d95a5f49b290c4d787949bfec5279e) | [GT](https://www.geckoterminal.com/base/pools/0xd17a8609b5d95a5f49b290c4d787949bfec5279e)
----------------\n${data.fetchedAt ? formatTimestamp(data.fetchedAt) : data.cachedAt ? formatTimestamp(data.cachedAt) : '--'}`;

    try {
      await ctx.replyWithPhoto('https://satocto.com/telegram/sato-the-dog-card.png', {
        caption: caption,
        parse_mode: 'Markdown'
      });
    } catch (imageError) {
      console.error('Failed to send image:', imageError);
      await ctx.reply(caption, { parse_mode: 'Markdown' });
    }
    
  } catch (error) {
    console.error('Error in /sato command:', error);
    ctx.reply('🐕 Woof! Something went wrong. Please try again later.');
  }
});
bot.command('about', async (ctx) => {
  console.log(`/about command from ${ctx.from?.username || ctx.from?.first_name}`);

  const caption = `*About SATO*\n
SATO is a decentralized meme coin born on the Base network and originally launched with minimal utility beyond its meme value. After a period of abandonment by the original developers, the project was revived by a passionate community of holders who refused to let SATO fade into obscurity.\n
Today, SATO is in the hands of its community. No central authority, no hidden agenda - just a shared vision and commitment to giving this meme coin a new life through creativity, transparency, and decentralized coordination.\n
Find out more - visit our [Website](https://satocto.com)`

  try {
    await ctx.replyWithPhoto('https://satocto.com/telegram/about-sato-the-dog.jpg',{
    caption: caption,
    parse_mode: 'Markdown'
  }) } catch (imageError) {
    console.error('Failed to send image:', imageError);
    await ctx.reply(caption, {
      parse_mode: 'Markdown'
    })
  }
});
bot.command('stats', async (ctx) => {
  console.log(`/stats command from ${ctx.from?.username || ctx.from?.first_name}`);

  try {
    await ctx.replyWithChatAction('typing');

    const data = await fetchMarketData();

    // Handle API error - return early
    if (data.error) {
      console.error('Data not fetched:', data.error);
      return ctx.reply('⚠️ Unable to fetch market data at the moment. Please try again later.');
    }

    // Validate data structure - return early
    if (!data?.data?.data?.attributes) {
      console.error('Invalid data structure received:', data);
      return ctx.reply('⚠️ Received invalid market data. Please try again later.');
    }

    const projectData = data.data.data.attributes;

    // Safe property access with fallbacks for price changes
    const priceChange24h = projectData.price_change_percentage?.h24;
    const priceChange1h = projectData.price_change_percentage?.h1;
    const priceChange6h = projectData.price_change_percentage?.h6;
    
    const formatPriceChange = (change) => {
      if (change === undefined || change === null) return '--';
      return `${change >= 0 ? '+' : ''}${change}%`;
    };

    // Transaction data for 24h
    const transactions24h = projectData.transactions?.h24;
    const txBuys = transactions24h?.buys || 0;
    const txSells = transactions24h?.sells || 0;
    const buyers = transactions24h?.buyers || 0;
    const sellers = transactions24h?.sellers || 0;

    // Volume breakdown
    const buyVolume24h = projectData.buy_volume_usd?.h24;
    const sellVolume24h = projectData.sell_volume_usd?.h24;

    const caption = `*$SATO Market Stats*\n
\`0x5a70be406ce7471a44f0183b8d7091f4ad751db5\`

💰 *Price & Market*
├ Price   *$${projectData.base_token_price_usd ? shortenPriceUsd(projectData.base_token_price_usd) : '--'}*
├ MC       *${projectData.market_cap_usd ? formatLargeNumber(projectData.market_cap_usd) : '--'}*
└ Liq        *${projectData.reserve_in_usd ? formatLargeNumber(projectData.reserve_in_usd) : '--'}*

📈 *Price Changes*
├ 1h       *${formatPriceChange(priceChange1h)}*
├ 6h       *${formatPriceChange(priceChange6h)}*
└ 24h     *${formatPriceChange(priceChange24h)}*

📊 *Volume (24h)*
├ Total    *${projectData.volume_usd?.h24 ? formatLargeNumber(projectData.volume_usd.h24) : '--'}*
├ Buy      *${buyVolume24h ? formatLargeNumber(buyVolume24h) : '--'}*
└ Sell       *${sellVolume24h ? formatLargeNumber(sellVolume24h) : '--'}*

🔄 *Transactions (24h)*
├ Buys     *${txBuys}* (${buyers} buyers)
└ Sells      *${txSells}* (${sellers} sellers)

📈 *Chart*
└ [DT](https://www.dextools.io/app/en/base/pair-explorer/0xd17a8609b5d95a5f49b290c4d787949bfec5279e) | [DS](https://dexscreener.com/base/0xd17a8609b5d95a5f49b290c4d787949bfec5279e) | [GT](https://www.geckoterminal.com/base/pools/0xd17a8609b5d95a5f49b290c4d787949bfec5279e)
----------------\n${data.fetchedAt ? formatTimestamp(data.fetchedAt) : data.cachedAt ? formatTimestamp(data.cachedAt) : '--'}`;

    try {
      await ctx.replyWithPhoto('https://satocto.com/telegram/sato_chart_button.jpg', {
        caption: caption,
        parse_mode: 'Markdown'
      });
    } catch (imageError) {
      console.error('Failed to send image:', imageError);
      await ctx.reply(caption, { parse_mode: 'Markdown' });
    }
    
  } catch (error) {
    console.error('Error in /sato command:', error);
    ctx.reply('🐕 Woof! Something went wrong. Please try again later.');
  }
});
bot.command('links', async (ctx) => {
  console.log(`/links command from ${ctx.from?.username || ctx.from?.first_name}`);
  
  const caption = `*🔗 Official Links*\n
🌐 *Website*
└ [satocto.com](https://satocto.com)\n
👥 *Socials*
├ [𝕏 (Twitter)](https://x.com/SatoCtoBase)
├ [Telegram](https://t.me/Satothedogcto)
├ [TikTok](https://www.tiktok.com/@satothedogbase)
└ [Facebook](https://www.facebook.com/share/1Hcja2isfz/)\n
📈 *Charts & Trading*
├ [DexTools](https://www.dextools.io/app/en/base/pair-explorer/0xd17a8609b5d95a5f49b290c4d787949bfec5279e)
├ [DexScreener](https://dexscreener.com/base/0xd17a8609b5d95a5f49b290c4d787949bfec5279e)
├ [GeckoTerminal](https://www.geckoterminal.com/base/pools/0xd17a8609b5d95a5f49b290c4d787949bfec5279e)
├ [Uniswap](https://app.uniswap.org/swap?outputCurrency=0x5a70be406ce7471a44f0183b8d7091f4ad751db5&chain=base)
└ [GMGN](https://gmgn.ai/base/token/7WKDcuxn_0x5a70be406ce7471a44f0183b8d7091f4ad751db5)\n
🏦 *Centralized Exchanges*
└ [GroveX](https://www.grovex.io/en_US/trade/SATO_USDT)\n
🖼️ *NFT Collection*
└ [OpenSea](https://opensea.io/collection/sato-100-limited-collection/explore)\n
📊 *Listings & Data*
├ [CoinMarketCap](https://coinmarketcap.com/currencies/sato-the-dog/)
├ [CoinGecko](https://www.coingecko.com/en/coins/sato-the-dog)
└ [Gems of Base](https://gemsofbase.com/projects/sato-the-dog)`;

  try {
    await ctx.replyWithPhoto('https://satocto.com/telegram/sato-links.jpg', {
      caption: caption,
      parse_mode: 'Markdown'
    });
  } catch (imageError) {
    console.error('Failed to send image:', imageError);
    await ctx.reply(caption, { parse_mode: 'Markdown' });
  }
});
bot.command('nft', async (ctx) => {
  console.log(`/nft command from ${ctx.from?.username || ctx.from?.first_name}`);
  
  const caption = `*SATO 100 Limited Collection*\n
Originally, around 5,000 NFTs were launched by the old team. After everything that happened, we decided to create a new 100-piece limited collection — dedicated to the loyal holders who stood by SATO and are helping rebuild the project.\n
These special NFTs are now available on OpenSea. Find your favorite & join the club 🐾\n
🔗 https://opensea.io/collection/sato-100-limited-collection/explore`;

  try {
    await ctx.replyWithVideo('https://satocto.com/assets/SATO_nft_showcase.mp4', {
      caption: caption,
      parse_mode: 'Markdown'
    });
  } catch (videoError) {
    console.error('Failed to send video:', videoError);
    await ctx.reply(caption, { parse_mode: 'Markdown' });
  }
});
bot.command('faq', (ctx) => {
  console.log(`/faq command from ${ctx.from?.username || ctx.from?.first_name}`);
  
  const faqs = [
    {
      id: 1,
      question: "Where can I trade SATO?",
      answer: "Right now, SATO can be traded on Uniswap (Base) or GroveX centralized exchange. You can also access it directly through the Base app (previously Coinbase Wallet)."
    },
    {
      id: 2,
      question: "What is the official Contract Address of SATO?",
      answer: "The official contract address for $SATO on the base network is 0x5a70be406ce7471a44f0183b8d7091f4ad751db5. Always verify the contract address through our official channels to avoid scams."
    },
    {
      id: 3,
      question: "What are the SATO NFTs?",
      answer: "Originally, around 5,000 NFTs were launched by the old team. After everything that happened, we decided to create a new 100-piece limited collection — dedicated to the loyal holders who stood by SATO and are helping rebuild the project. These special NFTs are now available on OpenSea."
    },
    {
      id: 4,
      question: "What is the Woof DAO?",
      answer: "The Woof DAO is SATO's community-driven governance system. While it's not fully official yet, the treasury is managed through a multi-signature wallet, decisions are made transparently, and holders can take part through polls and proposals."
    }
  ];

  let caption = `*❓ Frequently Asked Questions*\n\n`;
  
  faqs.forEach((faq, index) => {
    caption += `*${faq.id}. ${faq.question}*\n${faq.answer}\n`;
    if (index < faqs.length - 1) {
      caption += `\n`;
    }
  });

  ctx.reply(caption, { parse_mode: 'Markdown' });
});
bot.command('whitepaper', (ctx) => {
  console.log(`/whitepaper command from ${ctx.from?.username || ctx.from?.first_name}`);
  
  const caption = `*📄 Sato Whitepaper*\n
Learn about SATO's community takeover story, tokenomics, roadmap, and vision for the future.\n
📖 [Download Official Whitepaper](https://www.satocto.com/SATO_WhitePaper_CommunityTakeover.pdf)\n
`;

  ctx.reply(caption, { parse_mode: 'Markdown' });
});
bot.command('joke', (ctx) => {
  console.log(`/joke command from ${ctx.from?.username || ctx.from?.first_name}`);
  
  const dogJokes = [
    "Why don't dogs make good DJs?\nBecause they have such ruff beats!",
    "What happens when it rains cats and dogs?\nYou might step in a poodle!",
    "Why did the dog go to the bank?\nTo make a de-paws-it!",
    "What do you call a sleeping bull dog?\nA bull-dozer!",
    "What did the dog say when it sat on sandpaper?\nRuff!",
    "Why do dogs run in circles?\nBecause they're round hounds!",
    "What do you get when you cross a dog and a calculator?\nA friend you can count on!",
    "What do you call a dog that can do magic?\nA labra-cadabra-dor!",
    "Why don't dogs make good comedians?\nTheir jokes are too ruff around the edges!",
    "What's a dog's favorite type of pizza?\nPupperoni!",
    "Why don't dogs ever get lost?\nThey always nose their way home!",
    "What did the dog say to the tree?\nBark!",
    "Why are dogs such good storytellers?\nBecause they have such great tails!"
  ];

  // Get a random joke
  const randomIndex = Math.floor(Math.random() * dogJokes.length);
  const randomJoke = dogJokes[randomIndex];
  
  const caption = `*${randomJoke}*`;

  ctx.reply(caption, { parse_mode: 'Markdown' });
});
bot.command('image', async (ctx) => {
  console.log(`/image command from ${ctx.from?.username || ctx.from?.first_name}`);
  
  const satoImages = [
    { src: "/gallery/sato_vs_bear.png", alt: "Sato vs bear" },
    { src: "/gallery/campfire_scene.webp", alt: "Sato Campfire Scene" },
    { src: "/gallery/moon_scene.webp", alt: "Sato Moon Scene" },
    { src: "/gallery/sato_cliff_sunset.webp", alt: "Sato Cliff Sunset" },
    { src: "/gallery/sato_campfire.webp", alt: "Sato by the Campfire" },
    { src: "/gallery/sato_cloak.webp", alt: "Sato in Cloak" },
    { src: "/gallery/sato_dragon.webp", alt: "Sato Dragon" },
    { src: "/gallery/sato_greenbeam.webp", alt: "Sato Green Beam" },
    { src: "/gallery/sato_hug.webp", alt: "Sato Hug" },
    { src: "/gallery/sato_king_web.webp", alt: "Sato King" },
    { src: "/gallery/sato_wolf.webp", alt: "Sato Wolf" },
    { src: "/gallery/sato_powerup.webp", alt: "Sato Power Up" },
    { src: "/gallery/sato_punch.webp", alt: "Sato Punch" },
    { src: "/gallery/sato_rocky_web.webp", alt: "Sato Rocky" },
    { src: "/gallery/sato_sunset.webp", alt: "Sato Sunset" },
    { src: "/gallery/sato_underwater.webp", alt: "Sato Underwater" },
    { src: "/gallery/sato_village.webp", alt: "Sato Village" },
    { src: "/gallery/sato_whale_web.webp", alt: "Sato Whale" },
    { src: "/gallery/sato_crappy_bird.jpg", alt: "Sato and Crappy Bird" },
    { src: "/gallery/sato_goalkeeper.jpg", alt: "Sato Goalkeeper" }
  ];

  // Get a random image
  const randomIndex = Math.floor(Math.random() * satoImages.length);
  const randomImage = satoImages[randomIndex];
  const imageUrl = `https://satocto.com${randomImage.src}`;
  
  const caption = `🖼️ *${randomImage.alt}*\n\nCheck out our full gallery at https://satocto.com/#gallery 🎨`;

  try {
    await ctx.replyWithPhoto(imageUrl, {
      caption: caption,
      parse_mode: 'Markdown'
    });
  } catch (error) {
    console.error('Failed to send random image:', error);
    await ctx.reply(`🖼️ *${randomImage.alt}*\n\n[View Image](${imageUrl})\n\nCheck out our full gallery at https://satocto.com/#gallery 🎨`, { parse_mode: 'Markdown' });
  }
});
bot.command('goodboy', (ctx) => {
  console.log(`/goodboy command from ${ctx.from?.username || ctx.from?.first_name}`);
  
  const thankYouResponses = [
    "*Woof woof!* 🐕",
    "*Wags tail* 🐕",
    "*Happy barks* 🐕",
    "*Ruff ruff!* *Rolls over* 🐕"
  ];

  // Get a random thank you response
  const randomIndex = Math.floor(Math.random() * thankYouResponses.length);
  const randomResponse = thankYouResponses[randomIndex];
  
  const caption = `*${randomResponse}*`;

  ctx.reply(caption, { parse_mode: 'Markdown' });
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
    // Verify the request is from Telegram
    const secretToken = process.env.TELEGRAM_WEBHOOK_SECRET;
    if (secretToken) {
      const receivedToken = request.headers.get('X-Telegram-Bot-Api-Secret-Token');
      if (receivedToken !== secretToken) {
        return new Response('Unauthorized', { status: 401 });
      }
    }

    // Initialize bot if not already done
    if (!botInitialized) {
      await bot.init();
      botInitialized = true;
    }

    const body = await request.json();

    // Validate Telegram update structure
    if (!body || typeof body !== 'object' || !body.update_id) {
      return new Response('Invalid update format', { status: 400 });
    }
    
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