# crypto-tweet-bot

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/almatrass/passport-opskins/blob/master/LICENSE)
***
 A Binance/Twitter bot which listens for text in a Tweet, and makes purchases on Binance in response. Made to be used on Elon Musk's Twitter for purchasing DOGEUSDT when the word 'doge' is mentioned, other trading pairs should also work but haven't been tested.

## Disclaimer
Use this bot entirely at your own risk - I am not responsible for any money you lose trading. I strongly discourage use of this bot unless you've read and understand the code entirely, and understand crypto markets. Any mistakes made while running the code are entirely your fault, this is just a personal project of mine and don't encourage anyone else to use it.

### What is the bot?
This is a simple bot which polls a user's Twitter page, fetching their latest tweet. If the tweet contains certain phrases specified by you, the bot will execute a market buy order on Binance for a specified trading pair. Once it makes a purchase due to a specific tweet, it will not make further purchases for the same tweet.

### Setup
You must have node.js and NPM installed (https://nodejs.org/en/download/). Then simply clone the repository, cd into the directory and run `npm i`, installing all the node modules. After filling in the config file, described below, you can run `node index.js` and the bot will start. You can also run `npm i -g pm2` and then `pm2 start index.js` to keep the process running in the background if you want to close your command line.

#### Config
Open the `config.js` file and input your Twitter developer keys and Binance API keys. The config file is well commented and self-explanatory. If you want to listen to Elon Musk's Twitter page for the word 'doge' and then purchase DOGEUSDT, you don't need to change anything apart from the purchase amount. I believe the minimum purchase is around $15.00, I got errors trying to purchase amounts below that. Settings in the config file are changed at your own risk.