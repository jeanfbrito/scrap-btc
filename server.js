var info;
var lastDollar;
var lastBRL;
var result;
var request = require('request');

const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '142952712:AAELSde5_kmxUjPhx1KTvbK-d2IUtADPN6U';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: false });

getDollar();
function getDollar(){
    console.log("Requesting USD value");
    request({ url: 'https://www.bitstamp.net/api/ticker/', json: true }, function (err, res, json) {
        if (err) {
            throw err;
        }
        console.log(json.last);
        lastDollar = json.last;
        getBRL();
    });
}

function getBRL(){
    console.log("Requesting BRL value");
    request({ url: 'https://broker.negociecoins.com.br/api/v3/btcbrl/ticker', json: true }, function (err, res, json) {
        if (err) {
            throw err;
        }
        console.log(json.last);
        lastBRL = json.last;
        calculate();
    });
}

function calculate(){
    result = lastBRL / lastDollar;
    console.log(result);

    bot.sendMessage(-125807515, 'Resultado: ' + result.toFixed(3));
}

