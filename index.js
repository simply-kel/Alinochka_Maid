const tmi = require('tmi.js');
var config = {};
const fs = require("fs");
const { exit } = require('process');

if (fs.existsSync("./config.json")) {
	config = JSON.parse(fs.readFileSync("./config.json"));
	console.log("Config loaded!")
} else {
	config = {
		"token": "youre auth token",
		"username": "bot username",
		"channels": ["your", "channels"]
	}
	fs.writeFileSync("./config.json", JSON.stringify(config))
	console.log("Please complete the configuration in the config.json file")
	exit(0);
}

const client = new tmi.Client({
	options: { debug: true },
	identity: {
		username: config.username,
		password: config.token
	},
	channels: config.channels
});
const messages = require(`./messages.json`);
const chat = {
	count: 0,
	messages: []
};
client.connect();

client.on('message', (channel, tags, message, self) => {
	// Ignore echoed messages.
	chat.messages.push({
		id: chat.count,
		author: tags['display-name'],
		username: tags.username,
		message: message
	})
	chat.count++;
	// console.log(chat.messages)
	if (self) return;
	const command = message.toLowerCase().replace("!", "");
	if(messages[command]){
		client.say(channel, messages[command].replace("$sender", `@${tags.username}`))
	}
});

// WEB
const exp = require("express");
const port = 34290;
const web = exp();
web.use('/', exp.static('web'))
web.all('/chat', async(req, res)=>{
	res.json(chat);
})
web.all('/bot', async(req, res)=>{
	res.json({
		username: `${client.getUsername()}`,
		display: `${config.username}`,
		channels: client.getChannels()
	})
})
// web.all('/stat', async(req, res)=>{
// 	res.json({count: client.listenerCount(), ping: client.ping()})
// })
web.use(async function (req, res, next) {
	res.status(404);
	res.json({
	  error: {
		code: 404,
		codename: "Not found",
		message: "Method not found"
	  }
	})
	return;
  });
const http = require('http'); // Используется HTTP протокол
const server = http.createServer({}, web);
server.listen(port, async () => {
  console.log(`API Был успешно запущен!`);
})