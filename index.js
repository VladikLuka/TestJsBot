const TelegramBot = require('node-telegram-bot-api');
// const $ = require( 'jquery' );

const TOKEN = "1794002695:AAFys97IYl8EDDtuFX0bErL-_BEXGz56ndQ";

const bot = new TelegramBot(TOKEN, {polling: true});

bot.on("polling_error", console.log);

bot.on('message', msg => {

    let result = "пусто";

    // $.ajax({ url: 'https://kogda.by/routes/minsk/autobus/96/%D0%94%D0%A1%20%D0%9C%D0%B0%D0%BB%D0%B8%D0%BD%D0%BE%D0%B2%D0%BA%D0%B0-4%20-%20%D0%A4%D0%B8%D0%BB%D0%B8%D0%B0%D0%BB%20%D0%91%D0%93%D0%A3/%D0%90%D0%BA%D0%B0%D0%B4%D0%B5%D0%BC%D0%B8%D0%BA%D0%B0%20%D0%9A%D1%83%D1%80%D1%87%D0%B0%D1%82%D0%BE%D0%B2%D0%B0', success: function(data) { result = data } });

    function makeHttpObject() {
        let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        return new XMLHttpRequest();
    }

    let request = makeHttpObject();
    request.open("GET", "https://kogda.by/routes/minsk/autobus/96/%D0%94%D0%A1%20%D0%9C%D0%B0%D0%BB%D0%B8%D0%BD%D0%BE%D0%B2%D0%BA%D0%B0-4%20-%20%D0%A4%D0%B8%D0%BB%D0%B8%D0%B0%D0%BB%20%D0%91%D0%93%D0%A3/%D0%90%D0%BA%D0%B0%D0%B4%D0%B5%D0%BC%D0%B8%D0%BA%D0%B0%20%D0%9A%D1%83%D1%80%D1%87%D0%B0%D1%82%D0%BE%D0%B2%D0%B0", true);
    request.send(null);
    request.onreadystatechange = function() {
        if (request.readyState === 4){
            let q = getTime(request.responseText);
            console.log(q);
            result = q;
        }
    };
    // switch(msg.text){
    //     case 96: fetch("https://kogda.by/routes/minsk/autobus/96/%D0%94%D0%A1%20%D0%9C%D0%B0%D0%BB%D0%B8%D0%BD%D0%BE%D0%B2%D0%BA%D0%B0-4%20-%20%D0%A4%D0%B8%D0%BB%D0%B8%D0%B0%D0%BB%20%D0%91%D0%93%D0%A3/%D0%90%D0%BA%D0%B0%D0%B4%D0%B5%D0%BC%D0%B8%D0%BA%D0%B0%20%D0%9A%D1%83%D1%80%D1%87%D0%B0%D1%82%D0%BE%D0%B2%D0%B0")
    //         .then(html => {
    //            result = getTime(html);
    //         })
    // }



    bot.sendMessage(msg.chat.id, result )
})

    function getTime(html){

    return html.slice(33384, 33388)

        html.index(33384)
        + html.index(33385)
        + html.index(33386)
        + html.index(33387)
        + html.index(33388);

    // let future = html.getElementsByClassName("future");
        // let result = "Слудеющий в ";
        // for(let i = 0; i < future[0].length;i++) {
        //     if(future[0][i] >= 48 && future[0][i] <= 57 || future[0][i] === 58){
        //         result += future[0][i];
        //     }
        // }
        //
        // result += "и в "
        //
        // for(let i = 0; i < future[1].length;i++) {
        //     if(future[1][i] >= 48 && future[1][i] <= 57 || future[1][i] === 58){
        //         result += future[1][i];
        //     }
        // }
    }