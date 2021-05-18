const config = require('./config');
const Twitter = require('twitter');

const client = new Twitter({
    consumer_key: config.twitter.credentials.apiKey,
    consumer_secret: config.twitter.credentials.apiSecret,
    access_token_key: config.twitter.credentials.accessToken,
    access_token_secret: config.twitter.credentials.accessTokenSecret
});

module.exports.getLatestTweet = function(cb) {
    client.get('statuses/user_timeline', {screen_name: config.twitter.targetUsername, count: 1}, function(err, tweets, response) {
        if (err) {
            return cb(err);
        }
        
        let tweet = null;
        if (tweets && tweets.length && tweets[0] && tweets[0].text) {
            tweet = tweets[0];
        } else {
            return cb(null, null);
        }

        if (!config.twitter.includeReplies && tweet.in_reply_to_screen_name && tweet.in_reply_to_screen_name != config.twitter.targetUsername) {
            return cb(null, null);
        }

        return cb(null, {
            text: tweet.text,
            id: tweet.id_str
        });
    });
}