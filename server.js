var info;
var lastEUR;
var lastBRL;
var valueEUR;
var result;
var request = require('request');

const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '142952712:AAELSde5_kmxUjPhx1KTvbK-d2IUtADPN6U';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: false });

getDollar();

function getDollar(){
    console.log("Requesting EUR value");
    request({ url: 'https://www.bitstamp.net/api/v2/ticker/btceur', json: true }, function (err, res, json) {
        if (err) {
            throw err;
        }
        console.log(json.last);
        lastEUR = json.last;
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
        getEUR();
    });
}

function getEUR() {
    console.log("Requesting BRL value");
    request({ url: 'http://api.promasters.net.br/cotacao/v1/valores?moedas=EUR&alt=json', json: true }, function (err, res, json) {
        if (err) {
            throw err;
        }
        console.log(json.valores.EUR.valor);
        valueEUR = json.valores.EUR.valor;
        calculate();
    });
}

function calculate(){
    result = lastBRL / lastEUR;
    console.log(result);

    bot.sendMessage(-125807515, 'Cotacao do EURO: ' + valueEUR + ', resultado: ' + result.toFixed(3));
    setTimeout(getDollar, 600000);
}

