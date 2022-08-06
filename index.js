const { token } = require('./config.json');
const fs = require("fs");
const { Player } = require("discord-player");
const { registerPlayerEvents } = require('./events/playerEvents');

const { Client, GatewayIntentBits, Collection } = require("discord.js");
const client = new Client({ 
	intents: [		
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildMessages,
	],
});

client.commands = new Collection();

client.player = new Player(client, {
	ytdlOptions: {
		quality: "highestaudio",
		highWaterMark: 1 << 25
	}
})

registerPlayerEvents(client.player);

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
    console.log(`${file} loaded`);
	client.commands.set(command.data.name, command);
}

const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(token);