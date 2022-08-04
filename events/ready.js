const { token } = require('../config.json');
const { REST } = require('@discordjs/rest');
const { Routes, Collection } = require('discord.js');

module.exports = {
	name: "ready",
	once: true,
	execute(client, commands) {

		console.log(`${client.user.username} is online on ${client.guilds.cache.size} servers!`);
        client.user.setPresence({ activities: [{ name: 'Online'}] });

		client.guilds.cache.forEach(async guild => {
            const commands = (await guild.commands.fetch().catch(() => { })) || client.commands.size

            if (commands.size != client.commands.size) {
                const rest = new REST({ version: '10' }).setToken(token);
                const body = client.commands.map(command => command.data.toJSON());

                try {
                    await rest.put(Routes.applicationGuildCommands(client.user.id, guild.id), { body: body })
	                .then(() => console.log('Successfully registered application commands.'));
                } catch (error) {
                    console.log(error);
                }
            }
        });
	},
};