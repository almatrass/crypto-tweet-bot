const config = require('./config');
const Binance = require('node-binance-api');

const binance = new Binance().options({
    APIKEY: config.binance.credentials.apiKey,
    APISECRET: config.binance.credentials.apiSecret
});

module.exports.getCurrentPrice = async function() {
    let ticker = await binance.prices();

    return ticker[config.binance.tradingPair];
};

module.exports.purchase = async function(amountsObj, cb) {
    let finalCoinAmount = amountsObj.coinAmount;

    if (amountsObj.usdAmount) {
        let ticker = await binance.prices();

        finalCoinAmount = parseFloat((amountsObj.usdAmount / ticker[config.binance.tradingPair]).toFixed(config.binance.floatPrecision));
    }
    
    binance.marketBuy(config.binance.tradingPair, finalCoinAmount, (err, res) => { // The second parameter is the amount of the coin being purchased, not USD
        if (err) {
            return cb(new Error(`Failed to make purchase: ${err.body}`));
        }
    
        return cb(null, res);
    });
}