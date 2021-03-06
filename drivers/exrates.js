const request = require('../lib/request');
const Ticker = require('../models/ticker');
const { parseToFloat } = require('../lib/utils.js');

module.exports = async () => {
  const tickers = await request('https://api.exrates.me/openapi/v1/public/ticker');

  return tickers.map((ticker) => {
    const [base, quote] = ticker.name.split('_');

    return new Ticker({
      base,
      quote,
      quoteVolume: parseToFloat(ticker.quoteVolume),
      baseVolume: parseToFloat(ticker.baseVolume),
      close: parseToFloat(ticker.last),
      high: parseToFloat(ticker.high),
      low: parseToFloat(ticker.low),
    });
  });
};
