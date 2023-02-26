const { registerCommands } = require('../utils/registerAppCommands.js');

module.exports = {
	name: "ready",
	once: true,
	execute(client) {
		console.log(`${client.user.username} is online on ${client.guilds.cache.size} servers!`);
        client.user.setPresence({ activities: [{ name: '-help'}] });

		client.guilds.cache.forEach(async guild => {
            const commands = (await guild.commands.fetch().catch(() => { })) || client.commands.size

            await registerCommands(client, guild);
            if (commands.size != client.commands.size) {
                await registerCommands(client, guild);
            }
        });
	},
};