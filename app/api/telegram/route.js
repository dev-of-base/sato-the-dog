import { Bot, webhookCallback } from 'grammy';

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

// Create webhook handler for Next.js
const handleWebhook = webhookCallback(bot, 'next-js');

// Export handlers for Next.js App Router
export const POST = handleWebhook;
export const GET = async () => {
  return new Response('Telegram webhook endpoint', { status: 200 });
};