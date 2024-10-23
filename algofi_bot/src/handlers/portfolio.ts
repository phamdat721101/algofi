import { BotContext, SessionData } from '../types';
import { generatePortfolioChart } from '../services/chartService';
import { getProfile, createProfile } from '../services/moveService';
import { Markup } from 'telegraf';

export async function handlePortfolio(ctx: BotContext) {
  if (!ctx.session) {
    ctx.session = { messages: [], portfolio: [], awaitingPortfolioInput: false } as SessionData;
  }
  // Market data
  const markets = [
    {
      title: "🌟 Bitcoin Above $100k by Dec 2024",
      liquidity: "456.8K ALGO",
      timeLeft: "2d 14h",
      yesOdds: "2.5x",
      noOdds: "1.8x",
      volume: "456.8K",
      participants: 1243
    },
    {
      title: "🚀 ETH 2.0 Merge Success",
      liquidity: "892.1K ALGO",
      timeLeft: "5d 8h",
      yesOdds: "1.9x",
      noOdds: "2.2x",
      volume: "892.1K",
      participants: 2156
    },
    {
      title: "🗳️ US Election Winner 2024",
      liquidity: "1.2M ALGO",
      timeLeft: "98d 6h",
      yesOdds: "2.1x",
      noOdds: "1.95x",
      volume: "1.2M",
      participants: 5689
    }
  ];

  // Header message
  const headerMessage = `
  🎯 <b>Popular Prediction Markets</b>
  Choose a market to place your bet! 🎲
  `;

    // Create formatted market listings
    const marketListings = markets.map((market, index) => `
  ${index + 1}. <b>${market.title}</b>
  📊 <b>Market Stats:</b>
    • Liquidity: ${market.liquidity}
    • Time Left: ${market.timeLeft}
    • Participants: ${market.participants}

  💫 <b>Current Odds:</b>
    ✅ YES: ${market.yesOdds}
    ❌ NO: ${market.noOdds}

  💎 Total Volume: ${market.volume}
  ─────────────────`).join('\n');

    // Top traders section
    const topTraders = `
  🏆 <b>Top Traders This Week</b>

  1. 👑 DeFi Master
    Profit: +45.8% | Volume: 125.3K ALGO
    
  2. 🥈 Crypto Sarah
    Profit: +32.4% | Volume: 98.7K ALGO
    
  3. 🥉 AlgoTrader
    Profit: +28.9% | Volume: 87.2K ALGO
  `;

    // Instructions footer
    const footer = `
  📱 <b>How to Participate:</b>
  1. Select market number
  2. Choose YES/NO
  3. Enter ALGO amount

  ⚡️ <b>Quick Links:</b>
  • /markets - View all markets
  • /portfolio - Your positions
  • /help - Trading guide
  `;

    // Combine all sections
    const fullMessage = `${headerMessage}${marketListings}\n${topTraders}\n${footer}`;

    // Send the formatted message
    await ctx.replyWithHTML(fullMessage, {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "📊 View All Markets", callback_data: "view_markets" },
            { text: "👤 My Portfolio", callback_data: "view_portfolio" }
          ],
          [
            { text: "❓ Help Guide", callback_data: "help" }
          ]
        ]
      }
  });

  // Function to handle market selection
  const handleMarketSelection = async (marketIndex : any) => {
    const market = markets[marketIndex];
    const betOptions = `
  🎯 <b>${market.title}</b>

  Current Odds:
  ✅ YES: ${market.yesOdds}
  ❌ NO: ${market.noOdds}

  Enter your prediction:
  `;

  await ctx.replyWithHTML(betOptions, {
    reply_markup: {
      inline_keyboard: [
          [
            { text: "Bet YES", callback_data: `bet_yes_${marketIndex}` },
            { text: "Bet NO", callback_data: `bet_no_${marketIndex}` }
          ]
        ]
      }
    });
  };
}

export function setupPortfolioHandlers(bot: any) {
  bot.action('add_portfolio', async (ctx: BotContext) => {
    await ctx.answerCbQuery();
    const message = 'Great! Let\'s add to your portfolio. Please enter the details of your investment in the following format:\n\nAsset,Amount,BuyPrice\n\nFor example: BTC,0.5,30000';
    ctx.session.messages.push({ type: 'bot', content: message });
    await ctx.reply(message);
    // You'll need to handle the user's response in another function
  });

  bot.action('market_analysis', async (ctx: BotContext) => {
    await ctx.answerCbQuery();
    // Implement market analysis logic here
  });

  bot.action('manage_investments', async (ctx: BotContext) => {
    await ctx.answerCbQuery();
    // Implement investment management logic here
  });
}

export async function addToPortfolio(ctx: BotContext, asset: string, amount: number, buyPrice: number): Promise<string> {
  // Add the new item to the portfolio
  ctx.session.portfolio.push({ asset, amount, buyPrice });
  
  // Calculate the total value of this investment
  const totalValue = amount * buyPrice;
  
  // Create a response message
  const responseMessage = `Added to portfolio:\nAsset: ${asset}\nAmount: ${amount}\nBuy Price: $${buyPrice}\nTotal Value: $${totalValue.toFixed(2)}`;
  
  // Add the response to the session messages
  ctx.session.messages.push({ type: 'bot', content: responseMessage });
  
  return responseMessage;
}

export async function viewPortfolio(ctx: BotContext): Promise<string> {
  if (ctx.session.portfolio.length === 0) {
    return "Your portfolio is empty. Use 'Add to Portfolio' to add investments.";
  }

  let portfolioMessage = "Your Portfolio:\n\n";
  let totalPortfolioValue = 0;

  for (const item of ctx.session.portfolio) {
    const itemValue = item.amount * item.buyPrice;
    totalPortfolioValue += itemValue;
    portfolioMessage += `Asset: ${item.asset}\nAmount: ${item.amount}\nBuy Price: $${item.buyPrice}\nValue: $${itemValue.toFixed(2)}\n\n`;
  }

  portfolioMessage += `Total Portfolio Value: $${totalPortfolioValue.toFixed(2)}`;
  return portfolioMessage;
}
