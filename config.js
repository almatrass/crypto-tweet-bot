module.exports = {
    twitter: {
        phrases: ['doge'],

        targetUsername: 'elonmusk', // Username of the person you want to monitor
        includeReplies: false, // Ignores Tweets which are replies to other people. With this set to false, the bot will still listen for a user's reply to his own tweet.
        pollInterval: 5, // Seconds between each time the user's timeline is checked. You will get rate-limited if this is too low.

        credentials: {
            apiKey: process.env.TWITTER_API_KEY,
            apiSecret: process.env.TWITTER_API_SECRET,
            accessToken: process.env.TWITTER_ACCESS_TOKEN,
            accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
        }
    },
    binance: {
        tradingPair: 'DOGEUSDT', // The trading pair as it is on Binance. Only use USDT pairs.

        amounts: { // The minimum amount I could get to work was around $15. If you get a MIN_NOTIONAL error, you may be trying to buy less than the minimum.
            usdAmount: 15, // You can specify how much USD you want to purchase (only works with USD pairs obviously). Approximate value - set this to less than your balance. Set to null if you're not using a USD pair and fill in the coinAmount instead.
            coinAmount: null // The amount of the target coin to purchase. Set to null if you have the usdAmount filled in.
        },

        credentials: {
            apiKey: process.env.BINANCE_API_KEY,
            apiSecret: process.env.BINANCE_SECRET_KEY
        },
        floatPrecision: 1 // Only use this if you know what you're doing. Max float precision values are different for different assets, for DOGE it is 1.
    },
    general: {
        logMessages: true // Keep this on to make sure everything is working
    }
};