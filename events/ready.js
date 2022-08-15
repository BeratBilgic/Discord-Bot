const { registerCommands } = require('../utils/registerAppCommands');

module.exports = {
	name: "ready",
	once: true,
	execute(client) {
		console.log(`${client.user.username} is online on ${client.guilds.cache.size} servers!`);
        client.user.setPresence({ activities: [{ name: 'Online'}] });

		client.guilds.cache.forEach(async guild => {
            const commands = (await guild.commands.fetch().catch(() => { })) || client.commands.size

            if (commands.size <= client.commands.size) {
                registerCommands(client, guild);
            }
        });
	},
};