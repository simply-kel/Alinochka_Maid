const tmi = require('tmi.js');

const client = new tmi.Client({
	options: { debug: true },
	identity: {
		username: '<name>',
		password: '<token>'
	},
	channels: [ '<my_channel>' ]
});

client.connect();

client.on('message', (channel, tags, message, self) => {
	// Ignore echoed messages.
	if(self) return;

	if(message.toLowerCase() === '!сервер' || message.toLowerCase() === '!rw') {
		// "@alca, heya!"
		client.say(channel, `@${tags.username}, Кел играет на сервере RevolutionWorlds, о сервере можешь узнать в нашем дс сервере https://www.reworlds.net!`);
	} else if(message.toLowerCase() === '!bot' || message.toLowerCase() === '!бот') {
        client.say(channel, `@${tags.username}, я самописный бот служанка, мои исходники можно найти на GitHub https://github.com/simply-kel/Alinochka_Maid`)
    } else if(message.toLowerCase() === '!donate' || message.toLowerCase() === '!донат' || message.toLowerCase() === '!донатик'){
        client.say(channel, `@${tags.username}, Кела можно поддержать на DonationAlerts! Вот ссылачка :> https://www.donationalerts.com/r/simplykel`)
    } else if(message.toLowerCase() === '!github'){
        client.say(channel, `@${tags.username}, вот GitHub Кела: https://github.com/simply-kel`)
    } else if(message.toLowerCase() === '!vtuber'){
        client.say(channel, `@${tags.username}, Кел использует программу veadotube mini. https://olmewe.itch.io/veadotube-mini`)
    }
});