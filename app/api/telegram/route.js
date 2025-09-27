import { Bot } from 'grammy';

// Initialize your bot with the token
const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN || '');

// Set up your bot handlers
bot.command('start', (ctx) => {
  ctx.reply('Hello! Welcome to Sato the Dog bot! 🐕');
});

bot.on('message:text', (ctx) => {
  const message = ctx.message.text.toLowerCase();
  
  if (message.includes('sato') || message.includes('dog')) {
    ctx.reply('Woof! You mentioned Sato! 🐕 How can I help you today?');
  } else {
    ctx.reply('Hello! I\'m Sato the Dog bot. How can I assist you? 🐕');
  }
});

// Error handling
bot.catch((err) => {
  console.error('Bot error:', err);
});

// Manual webhook handler for Next.js App Router
export async function POST(request) {
  try {
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