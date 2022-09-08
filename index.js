const { token } = require('./config.json');
const fs = require("fs");
const { Player } = require("discord-player");
const { registerPlayerEvents } = require('./utils/playerEvents');
const { Client, GatewayIntentBits, Collection } = require("discord.js");

const client = new Client({ 
	intents: [		
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildIntegrations,
		GatewayIntentBits.MessageContent,
	],
});

client.customCommands = new Collection();

client.commands = new Collection();

client.player = new Player(client, {
	ytdlOptions: {
		quality: "highestaudio",
		highWaterMark: 1 << 25
	}
})

registerPlayerEvents(client.player);

fs.readdirSync('./commands/').forEach(folder => {
    const commands = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));

    for (const file of commands) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.data.name, command);
		console.log(`-> Loaded command ${file}`);
    };
});

const customCommandsFiles = fs.readdirSync("./custom-commands").filter(file => file.endsWith(".js"));
for (const file of customCommandsFiles) {
	const command = require(`./custom-commands/${file}`);
	client.customCommands.set(command.name, command);
	console.log(`=> Loaded command ${file} (custom command)`);
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