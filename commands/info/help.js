const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder, Collection } = require("discord.js");
const inviteLink = "https://discord.com/api/oauth2/authorize?client_id=1010196507359727617&permissions=8&scope=bot%20applications.commands";
const githubLink = "https://github.com/BeratBilgic/Discord-Bot";
const iconLink = "https://imgur.com/jHeZrtv.png";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Show bot commands"),
    async execute(interaction) {
        await interaction.deferReply();

        const commands = interaction.client.commands.map((command) => '`' + command.data.name + '`').join(', ');

        const customCommands = interaction.client.customCommands.map((command) => '`' + command.name + '`').join(', ');

        let embedModal = new EmbedBuilder()
            .setAuthor({ name: 'Help Command', iconURL: iconLink})
            .addFields({ name : 'Slash Commands(/)', value: `${commands}\n\nYou must have a role named DJ to use music commands.\n`})
            .addFields({ name : 'Custom Commands(,)', value: `${customCommands}\n\nUsage: ,<command name>\n`})
            .addFields({ name: 'MadBot', value: '[Source Code](' + githubLink + ')  |  [Invite MadBot](' + inviteLink + ')'})
            .setThumbnail(iconLink)
            .setTimestamp()
            .setFooter({ text: 'MadBot', iconURL: iconLink});

        await interaction.editReply({ embeds: [embedModal] })
    }
}