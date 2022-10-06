const { token, database } = require('./config.json');
const fs = require("fs");
const mongoose = require('mongoose');
const { Player } = require("discord-player");
const { registerPlayerEvents } = require('./utils/playerEvents.js');
const { Client, GatewayIntentBits, Collection } = require("discord.js");

const client = new Client({ 
	intents: [		
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildIntegrations,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessageTyping,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.DirectMessageTyping,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildWebhooks,
	],
});

client.buttons = new Collection();
client.customCommands = new Collection();
client.commands = new Collection();

client.player = new Player(client, {
	ytdlOptions: {
		quality: "highestaudio",
		highWaterMark: 1 << 25
	}
})

registerPlayerEvents(client.player);

fs.readdirSync('./buttons/').forEach(folder => {
    const buttons = fs.readdirSync(`./buttons/${folder}`).filter(file => file.endsWith('.js'));

    for (const file of buttons) {
        const button = require(`./buttons/${folder}/${file}`);
        client.buttons.set(button.name, button);
		//console.log(`-> Loaded button ${file}`);
    };
});

fs.readdirSync('./commands/').forEach(folder => {
    const commands = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));

    for (const file of commands) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.data.name, command);
		//console.log(`-> Loaded command ${file}`);
    };
});

fs.readdirSync('./custom-commands/').forEach(folder => {
    const customCommandsFiles = fs.readdirSync(`./custom-commands/${folder}`).filter(file => file.endsWith('.js'));

    for (const file of customCommandsFiles) {
        const command = require(`./custom-commands/${folder}/${file}`);
        client.customCommands.set(command.name, command);
		//console.log(`=> Loaded custom command ${file}`);
    };
});

const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

mongoose.connect(database
).then(() => {
	console.log('Connected to MongoDB')
}).catch((err) => {
	console.log(err)
})

client.login(token);