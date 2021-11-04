// importando a biblioteca 'Telegraf'
const Telegraf = require('telegraf')
// criando o objeto 'bot'
const bot = new Telegraf.Telegraf('2083042281:AAFubNeKxL63rxjllgTx9xU5MpAyeI0wAXw')

// criando o comando para iniciar o bot
bot.command('start', ctx => {
    console.log(ctx.from)
    bot.telegram.sendMessage(
        ctx.chat.id,
        'Hello World! Bem vindo ao meu bot do Telegram',
        {}
    )
})

// utilizando o teclado 'inline'
bot.hears('animals', ctx => {
    console.log(ctx.from)
    let animalMessage = `A seguir algumas imagens de animais!`;
    ctx.deleteMessage();
    bot.telegram.sendMessage(
        ctx.chat.id, 
        animalMessage, {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "dog",
                            callback_data: 'dog'
                        },
                        {
                            text: "cat",
                            callback_data: 'cat'
                        }
                    ],
                ]
            }
        })
})

// implementando os métodos de retorno para o hears 'animals'
bot.action('dog', ctx => {
    bot.telegram.sendPhoto(
        ctx.chat.id,
        {
            source: "res/pincher.jpg"
        }
    )
})

bot.action('cat', ctx => {
    bot.telegram.sendPhoto(
        ctx.chat.id,
        {
            source: "res/gato.jpg"
        }
    )
})

// requisitando ao usuário o seu número de telefone
bot.hears('phone', ctx => {
    console.log(ctx.from.first_name)
    bot.telegram.sendMessage(
        ctx.chat.id,
        'Podemos acessar o seu número de telefone?',
        requestPhoneKeyboard
    )
})

// requisitando ao usuário o acesso à sua localização
bot.hears('location', ctx => {
    console.log(ctx.from.first_name),
    bot.telegram.sendMessage(
        ctx.chat.id,
        'Podemos acessar a sua localização?',
        requestLocationKeyboard
    )
})

// constructor para fornecer o número de telefone ao bot
const requestPhoneKeyboard = {
    "reply_markup" : {
        "one_time_keyboard": true,
        "keyboard" : [
            [
                {
                    text: "Meu número de telefone",
                    request_contact: true,
                    one_time_keyboard: true
                }
            ],
            ["Cancel"]
        ]
    }
}

// constructor para fornecer a localização ao bot
const requestLocationKeyboard = {
    "reply_markup": {
        "one_time_keyboard": true,
        "keyboard": [
            [
                {
                    text: "Minha Localização",
                    request_location: true,
                    one_time_keyboard: true
                }
            ],
            ["Cancel"]
        ]
    }
}

// executando o bot
bot.launch()