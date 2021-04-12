const TelegramBot = require('node-telegram-bot-api');

const TOKEN = "1794002695:AAFys97IYl8EDDtuFX0bErL-_BEXGz56ndQ";

const bot = new TelegramBot(TOKEN, {polling: true});

bot.on('message', msg => {
    bot.sendMessage(msg.chat.id, 'Hello From Heroku: ' + msg.text + " From: " + msg.from.first_name )
})