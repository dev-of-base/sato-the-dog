import { Bot } from 'grammy';

// Initialize your bot with the token
const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN || '');

// Set up your bot handlers
bot.command('start', (ctx) => {
  ctx.reply('Woof! I am your friendly guide bot. Type /commands to see what tricks I can do! 🐕');
});
bot.command('commands', (ctx) => {
  ctx.reply('/sato - Get the latest $SATO data\n/chart - See the latest $SATO chart\n/joke - Tell a joke\n');
});
bot.command('sato', (ctx) => {
  ctx.reply('Market Data will appear here');
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