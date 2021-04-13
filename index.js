const TelegramBot = require('node-telegram-bot-api');
const kb = require('./keyboard-buttons');
const keyboard = require('./keyboard');

const TOKEN = "1794002695:AAFys97IYl8EDDtuFX0bErL-_BEXGz56ndQ";

const bot = new TelegramBot(TOKEN, {polling: true});

require('https').createServer().listen(process.env.PORT || 5000).on('request', function(req, res){
    res.end('')
});

bot.on("polling_error", console.log);

bot.on('message', msg => {

    let result = '';

    function makeHttpObject() {
        let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        return new XMLHttpRequest();
    }

    let request = makeHttpObject();

    switch (msg.text){
        case kb.Roscha["96"]: request.open("GET", "https://kogda.by/routes/minsk/autobus/96/%D0%94%D0%A1%20%D0%9C%D0%B0%D0%BB%D0%B8%D0%BD%D0%BE%D0%B2%D0%BA%D0%B0-4%20-%20%D0%A4%D0%B8%D0%BB%D0%B8%D0%B0%D0%BB%20%D0%91%D0%93%D0%A3/%D0%90%D0%BA%D0%B0%D0%B4%D0%B5%D0%BC%D0%B8%D0%BA%D0%B0%20%D0%9A%D1%83%D1%80%D1%87%D0%B0%D1%82%D0%BE%D0%B2%D0%B0", true);
        break
        case kb.Roscha["132"]: request.open("GET", "https://kogda.by/routes/minsk/autobus/132/%D0%94%D0%A1%20%D0%9C%D0%B0%D0%BB%D0%B8%D0%BD%D0%BE%D0%B2%D0%BA%D0%B0-4%20-%20%D0%A9%D0%BE%D0%BC%D1%8B%D1%81%D0%BB%D0%B8%D1%86%D0%B0/%D0%90%D0%BA%D0%B0%D0%B4%D0%B5%D0%BC%D0%B8%D0%BA%D0%B0%20%D0%9A%D1%83%D1%80%D1%87%D0%B0%D1%82%D0%BE%D0%B2%D0%B0", true);
        break
        case kb.Roscha["47"]: request.open("GET", "https://kogda.by/routes/minsk/autobus/47-%D1%81/%D0%A4%D0%B8%D0%BB%D0%B8%D0%B0%D0%BB%20%D0%91%D0%93%D0%A3%20-%20%D0%92%D0%BE%D0%BA%D0%B7%D0%B0%D0%BB/%D0%90%D0%BA%D0%B0%D0%B4%D0%B5%D0%BC%D0%B8%D0%BA%D0%B0%20%D0%9A%D1%83%D1%80%D1%87%D0%B0%D1%82%D0%BE%D0%B2%D0%B0", true);
        break
        default: result = 'неизвестый автобус';
    }
    if (!!!result){
        request.send(null);
        request.onreadystatechange = function() {
            if (request.readyState === 4){
                let q = getTime(request.responseText, msg);
                console.log(q);
                result = q;
                bot.sendMessage(msg.chat.id, q ).catch(err => {
                    console.log(err.responseText)
                })
            }
        }
    }else {
        bot.sendMessage(msg.chat.id, "Неизвестный номер автобуса")
    }
})

bot.onText(/\/start/, msg => {
    bot.sendMessage(msg.chat.id,  'Hello ', {
        inline_markup:{
            keyboard: keyboard.Roscha
        }
    }).catch(err => {
        console.log(err.responseText)
    })
})

 function getTime(html, msg){
    let index = html.indexOf("future");
    let firstResult = html.substring(index+10, index+50).trim();
    let result ="Следующие "+ msg.text + " автобусы в " + firstResult + " и в ";
    index = html.indexOf("future", index+50);
    result += html.substring(index+10, index+50).trim();
    return result;
}