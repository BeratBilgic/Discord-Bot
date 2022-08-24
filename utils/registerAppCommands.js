const { token } = require('../config.json');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const { EmbedBuilder } = require("discord.js");
const inviteLink = "https://discord.com/api/oauth2/authorize?client_id=1010196507359727617&permissions=8&scope=bot%20applications.commands";
const iconLink = "https://imgur.com/jHeZrtv.png";

module.exports.registerCommands = async (client, guild) => {
    const rest = new REST({ version: '10' }).setToken(token);
    const body = client.commands.map(command => command.data.toJSON());

    try {
        await rest.put(Routes.applicationGuildCommands(client.user.id, guild.id), { body: body })
        .then(() => console.log('Successfully registered application commands.'));
    } catch (error) {
        console.log(error);

        if (err.code == 50001) {	
            let embedModal = new EmbedBuilder()
                .setDescription('Commands were not recorded successfully. Please kick the bot from the server and invite it with [this link](' + inviteLink + ')')
                .setTimestamp()
                .setFooter({ text: 'MadBot', iconURL: iconLink});

            const owner = await guild.fetchOwner()
            owner.send({ embeds: [embedModal] }).catch(() => { })
        }
    }
};