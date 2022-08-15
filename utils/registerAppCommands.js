const { token } = require('../config.json');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');

module.exports.registerCommands = (client, guild) => {
    const rest = new REST({ version: '10' }).setToken(token);
    const body = client.commands.map(command => command.data.toJSON());

    try {
        rest.put(Routes.applicationGuildCommands(client.user.id, guild.id), { body: body })
        .then(() => console.log('Successfully registered application commands.'));
    } catch (error) {
        console.log(error);
    }
};