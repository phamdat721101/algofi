import { BotContext } from '../types';

interface MarketData {
  symbol: string;
  price: number;
  volume: number;
  high24h: number;
  low24h: number;
}

interface AIAnalysis {
  symbol: string;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  confidence: number;
  recommendation: string;
  entryPoint: number;
  stopLoss: number;
  takeProfit: number;
  relatedAssets: string[];
}

interface TraderProfile {
  riskTolerance: 'low' | 'medium' | 'high';
  preferredAssets: string[];
  tradingStyle: 'day' | 'swing' | 'position';
  experience: 'beginner' | 'intermediate' | 'advanced';
}

function simulateMarketData(): MarketData[] {
  // In a real MVP, this would fetch actual market data
  return [
    { symbol: 'BTC', price: 50000, volume: 1000000, high24h: 51000, low24h: 49000 },
    { symbol: 'ETH', price: 3000, volume: 500000, high24h: 3100, low24h: 2900 },
    { symbol: 'ADA', price: 2, volume: 750000, high24h: 2.1, low24h: 1.9 },
    { symbol: 'DOT', price: 30, volume: 250000, high24h: 31, low24h: 29 },
    { symbol: 'SOL', price: 150, volume: 400000, high24h: 155, low24h: 145 },
  ];
}

function getSentimentEmoji(sentiment: string): string {
  switch (sentiment) {
    case 'bullish': return '📈';
    case 'bearish': return '📉';
    default: return '➖';
  }
}

function performAIAnalysis(data: MarketData): AIAnalysis {
  // Simulated AI analysis with more sophisticated (but still randomized) logic
  const priceVolatility = (data.high24h - data.low24h) / data.price;
  const volumeStrength = data.volume > 500000 ? 'high' : data.volume > 250000 ? 'medium' : 'low';
  
  // Sentiment analysis
  let sentiment: 'bullish' | 'bearish' | 'neutral';
  if (data.price > (data.high24h + data.low24h) / 2 && volumeStrength !== 'low') {
    sentiment = 'bullish';
  } else if (data.price < (data.high24h + data.low24h) / 2 && volumeStrength !== 'low') {
    sentiment = 'bearish';
  } else {
    sentiment = 'neutral';
  }

  const confidence = Math.min(priceVolatility * 5 + (volumeStrength === 'high' ? 0.3 : volumeStrength === 'medium' ? 0.15 : 0), 1);

  // Entry point, stop loss, and take profit calculations
  const entryPoint = data.price;
  const stopLoss = sentiment === 'bullish' ? data.price * 0.95 : data.price * 1.05;
  const takeProfit = sentiment === 'bullish' ? data.price * 1.1 : data.price * 0.9;

  // Recommendation logic
  let recommendation = '';
  if (sentiment === 'bullish' && confidence > 0.7) {
    recommendation = 'Strong Buy';
  } else if (sentiment === 'bullish' && confidence > 0.5) {
    recommendation = 'Buy';
  } else if (sentiment === 'bearish' && confidence > 0.7) {
    recommendation = 'Strong Sell';
  } else if (sentiment === 'bearish' && confidence > 0.5) {
    recommendation = 'Sell';
  } else {
    recommendation = 'Hold';
  }

  // Simulated related assets
  const allAssets = ['BTC', 'ETH', 'ADA', 'DOT', 'SOL', 'LINK', 'XRP', 'UNI', 'AAVE', 'SNX'];
  const relatedAssets = allAssets
    .filter(asset => asset !== data.symbol)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return {
    symbol: data.symbol,
    sentiment,
    confidence,
    recommendation,
    entryPoint,
    stopLoss,
    takeProfit,
    relatedAssets,
  };
}

export async function handleRecommendTraderProfile(ctx: BotContext) {
  const profiles: TraderProfile[] = [
    {
      riskTolerance: 'low',
      preferredAssets: ['BTC', 'ETH', 'USDC'],
      tradingStyle: 'position',
      experience: 'beginner'
    },
    {
      riskTolerance: 'medium',
      preferredAssets: ['ETH', 'SOL', 'ADA', 'DOT'],
      tradingStyle: 'swing',
      experience: 'intermediate'
    },
    {
      riskTolerance: 'high',
      preferredAssets: ['SOL', 'DOT', 'AVAX', 'LINK'],
      tradingStyle: 'day',
      experience: 'advanced'
    }
  ];

  const randomProfile = profiles[Math.floor(Math.random() * profiles.length)];

  let profileReport = '👤 Recommended Trader Profile (DEMO/SIMULATION)\n\n';
  profileReport += `Risk Tolerance: ${randomProfile.riskTolerance.toUpperCase()}\n`;
  profileReport += `Preferred Assets: ${randomProfile.preferredAssets.join(', ')}\n`;
  profileReport += `Trading Style: ${randomProfile.tradingStyle.charAt(0).toUpperCase() + randomProfile.tradingStyle.slice(1)} Trading\n`;
  profileReport += `Experience Level: ${randomProfile.experience.charAt(0).toUpperCase() + randomProfile.experience.slice(1)}\n\n`;

  ctx.session.messages.push({ type: 'bot', content: profileReport });
  await ctx.reply(profileReport, { parse_mode: 'Markdown' });
}

export async function handleRecommendToken(ctx: BotContext) {
  const marketData = simulateMarketData();
  const analyses = marketData.map(performAIAnalysis);

  // Simple AI recommendation based on highest confidence bullish sentiment
  const recommendedToken = analyses
    .filter(analysis => analysis.sentiment === 'bullish')
    .sort((a, b) => b.confidence - a.confidence)[0];

  if (!recommendedToken) {
    await ctx.reply('No bullish tokens found in the current market analysis.');
    return;
  }

  let recommendationReport = '🔮 AI Token Recommendation (DEMO/SIMULATION)\n\n';
  recommendationReport += `Recommended Token: ${recommendedToken.symbol}\n`;
  recommendationReport += `Current Price: $${recommendedToken.entryPoint.toFixed(2)}\n`;
  recommendationReport += `Sentiment: ${recommendedToken.sentiment.toUpperCase()} (${(recommendedToken.confidence * 100).toFixed(0)}%)\n`;
  recommendationReport += `Recommendation: ${recommendedToken.recommendation}\n`;
  recommendationReport += `Entry: $${recommendedToken.entryPoint.toFixed(2)} | SL: $${recommendedToken.stopLoss.toFixed(2)} | TP: $${recommendedToken.takeProfit.toFixed(2)}\n\n`;
  recommendationReport += `Related Assets: ${recommendedToken.relatedAssets.join(', ')}\n\n`;

  ctx.session.messages.push({ type: 'bot', content: recommendationReport });
  await ctx.reply(recommendationReport, { parse_mode: 'Markdown' });
}

function generateTraderProfile(analyses: AIAnalysis[]): TraderProfile {
  const bullishAssets = analyses.filter(a => a.sentiment === 'bullish').map(a => a.symbol);
  const bearishAssets = analyses.filter(a => a.sentiment === 'bearish').map(a => a.symbol);
  
  const riskTolerances: ('low' | 'medium' | 'high')[] = ['low', 'medium', 'high'];
  const tradingStyles: ('day' | 'swing' | 'position')[] = ['day', 'swing', 'position'];
  const experiences: ('beginner' | 'intermediate' | 'advanced')[] = ['beginner', 'intermediate', 'advanced'];

  return {
    riskTolerance: riskTolerances[Math.floor(Math.random() * riskTolerances.length)],
    preferredAssets: bullishAssets.length > 0 ? bullishAssets : bearishAssets,
    tradingStyle: tradingStyles[Math.floor(Math.random() * tradingStyles.length)],
    experience: experiences[Math.floor(Math.random() * experiences.length)]
  };
}

function recommendToken(analyses: AIAnalysis[]): AIAnalysis | null {
  return analyses
    .filter(analysis => analysis.sentiment === 'bullish')
    .sort((a, b) => b.confidence - a.confidence)[0] || null;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

function formatPercentage(value: number): string {
  return (value * 100).toFixed(2) + '%';
}

export async function handleMarketAnalysis(ctx: BotContext) {
  const marketData = simulateMarketData();
  const analyses = marketData.map(performAIAnalysis);

  let analysisReport = '🚀 *Crypto Market Pulse* 🚀\n\n';
  
  analyses.forEach(analysis => {
    const sentimentEmoji = getSentimentEmoji(analysis.sentiment);
    const trendEmoji = analysis.recommendation.includes('Buy') ? '📈' : (analysis.recommendation.includes('Sell') ? '📉' : '➖');
    
    analysisReport += `${sentimentEmoji} *${analysis.symbol}* ${trendEmoji}\n`;
    analysisReport += `💰 Price: ${formatCurrency(analysis.entryPoint)}\n`;
    analysisReport += `🔮 AI Sentiment: ${analysis.sentiment.toUpperCase()} (${formatPercentage(analysis.confidence)})\n`;
    analysisReport += `🎯 Recommendation: ${analysis.recommendation}\n`;
    analysisReport += `📊 Entry: ${formatCurrency(analysis.entryPoint)} | SL: ${formatCurrency(analysis.stopLoss)} | TP: ${formatCurrency(analysis.takeProfit)}\n`;
    analysisReport += `📈 24h High: ${formatCurrency(marketData.find(data => data.symbol === analysis.symbol)?.high24h || 0)}\n`;
    analysisReport += `📉 24h Low: ${formatCurrency(marketData.find(data => data.symbol === analysis.symbol)?.low24h || 0)}\n`;
    analysisReport += `🔗 Related: ${analysis.relatedAssets.join(', ')}\n\n`;
  });

  // Generate trader profile recommendation
  const recommendedProfile = generateTraderProfile(analyses);
  let profileReport = '👤 *Your Personalized Trader Profile* 👤\n\n';
  profileReport += `🎭 Risk Appetite: ${recommendedProfile.riskTolerance.toUpperCase()}\n`;
  profileReport += `💼 Suggested Assets: ${recommendedProfile.preferredAssets.join(', ')}\n`;
  profileReport += `⏱ Trading Style: ${recommendedProfile.tradingStyle.charAt(0).toUpperCase() + recommendedProfile.tradingStyle.slice(1)} Trading\n`;
  profileReport += `🏆 Trader Level: ${recommendedProfile.experience.charAt(0).toUpperCase() + recommendedProfile.experience.slice(1)}\n\n`;

  // Generate token recommendation
  const recommendedToken = recommendToken(analyses);
  let tokenReport = '🔮 *AI-Powered Token Spotlight* 🔮\n\n';
  if (recommendedToken) {
    tokenReport += `🏅 Top Pick: *${recommendedToken.symbol}*\n`;
    tokenReport += `💰 Current Price: ${formatCurrency(recommendedToken.entryPoint)}\n`;
    tokenReport += `🔮 AI Sentiment: ${recommendedToken.sentiment.toUpperCase()}\n`;
    tokenReport += `🎯 Confidence Level: ${formatPercentage(recommendedToken.confidence)}\n`;
    tokenReport += `💡 Strategy: ${recommendedToken.recommendation}\n`;
    tokenReport += `📊 Suggested Levels:\n`;
    tokenReport += `   Entry: ${formatCurrency(recommendedToken.entryPoint)}\n`;
    tokenReport += `   Stop Loss: ${formatCurrency(recommendedToken.stopLoss)}\n`;
    tokenReport += `   Take Profit: ${formatCurrency(recommendedToken.takeProfit)}\n`;
  } else {
    tokenReport += '🔍 No standout bullish tokens identified in the current market analysis.\n';
  }


  const fullReport = analysisReport + profileReport + tokenReport;

  // Split the message if it's too long for a single Telegram message
  const maxLength = 4096; // Maximum length of a Telegram message
  const messages = [];
  
  for (let i = 0; i < fullReport.length; i += maxLength) {
    messages.push(fullReport.slice(i, i + maxLength));
  }

  // Send each part of the message
  for (const message of messages) {
    await ctx.reply(message, { parse_mode: 'Markdown' });
  }
}

export async function handleInvestSimulation(ctx: BotContext, amount: number, symbol: string) {
  const marketData = simulateMarketData();
  const targetAsset = marketData.find(data => data.symbol === symbol);

  if (!targetAsset) {
    await ctx.reply(`Asset ${symbol} not found. Available assets: ${marketData.map(data => data.symbol).join(', ')}`);
    return;
  }

  const analysis = performAIAnalysis(targetAsset);
  const sentimentEmoji = getSentimentEmoji(analysis.sentiment);

  let simulationResult = '🎮 Investment Simulation Report (DEMO/SIMULATION)\n\n';
  simulationResult += `💰 Investment: $${amount} in ${analysis.symbol}\n\n`;
  simulationResult += `${sentimentEmoji} *AI Analysis*\n`;
  simulationResult += `Sentiment: ${analysis.sentiment.toUpperCase()} (${(analysis.confidence * 100).toFixed(0)}%)\n`;
  simulationResult += `Recommendation: ${analysis.recommendation}\n`;
  simulationResult += `Entry: $${analysis.entryPoint.toFixed(2)} | SL: $${analysis.stopLoss.toFixed(2)} | TP: $${analysis.takeProfit.toFixed(2)}\n\n`;

  // Simulate a basic outcome
  const outcomeMultiplier = analysis.sentiment === 'bullish' ? 1.1 : analysis.sentiment === 'bearish' ? 0.9 : 1.0;
  const simulatedOutcome = amount * outcomeMultiplier;
  const profit = simulatedOutcome - amount;

  simulationResult += `*Simulated Outcome*\n`;
  simulationResult += `Final Value: $${simulatedOutcome.toFixed(2)}\n`;
  simulationResult += `Profit/Loss: ${profit >= 0 ? '✅' : '❌'} $${profit.toFixed(2)}\n\n`;

  ctx.session.messages.push({ type: 'bot', content: simulationResult });
  await ctx.reply(simulationResult, { parse_mode: 'Markdown' });
}