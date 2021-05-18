const fs = require('fs');

require('dotenv').config();

const config = require('./config');
const twitter = require('./twitter');
const binance = require('./binance');

let tweetPurchases = require('./tweet_purchases.json');

async function main() {
    console.log('Bot starting...');

    setInterval(() => {
        refresh();
    }, config.twitter.pollInterval * 1000);

    twitter.getLatestTweet(async function(err, tweet) {
        if (err) {
            return console.error(err);
        }
        if (!tweet) {
            return console.error(`Couldn't fetch latest tweet. If you have includeReplies in config set to false, this is normal. Try enabling it to check if this message goes away. If includeReplies is set to true and you're still seeing this message, ensure you have filled in your Twitter API details correctly before running the bot.`);
        }

        let currentPrice = await binance.getCurrentPrice();

        if (!currentPrice) {
            return console.error(`Couldn't fetch price data. Ensure you have entered a valid trading pair.`);
        }

        console.log(`Everything seems to be working.\nCurrent ${config.binance.tradingPair} price: ${currentPrice}.\nLatest tweet: ${tweet.text}`);
    });
}
main();

function refresh() {
    twitter.getLatestTweet((err, tweet) => {
        if (err) {
            return console.error(err);
        }

        if (!tweet) {
            if (config.general.logMessages) {
                console.error(`Failed to load tweet.`);
            }
            return;
        }

        for (let i = 0; i < tweetPurchases.ids.length; i++) {
            let tweetIdForPurchase = tweetPurchases.ids[i];


            if (tweet.id == tweetIdForPurchase) {
                if (config.general.logMessages) {
                    console.log(`Already purchased for this tweet`);
                }
                return;
            }
        }
        let text = tweet.text;

        if (!text) {
            if (config.general.logMessages) {
                console.error(`Failed to load tweet text.`);
            }
            return;
        }

        if (config.general.logMessages) {
            console.log(`Successfully loaded tweet: ${tweet.id}: ${tweet.text}`);
        }

        let matchFound = false;

        for (let i = 0; i < config.twitter.phrases.length; i++) {
            let phrase = config.twitter.phrases[i];

            if (text.toUpperCase().includes(phrase.toUpperCase())) {
                matchFound = true;
                break;
            }
        }

        if (matchFound) {
            
            binance.purchase(config.binance.amounts, (err, res) => {
                if (err) {
                    return console.error(err);
                }

                console.log(`Successfully placed market order (${res.origQty} ${res.symbol}).`);

                tweetPurchases.ids.push(tweet.id);
                fs.writeFileSync('./tweet_purchases.json', JSON.stringify(tweetPurchases));
            });
        }
    });
}