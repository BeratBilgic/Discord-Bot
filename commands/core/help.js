const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");
const inviteLink = "https://discord.com/api/oauth2/authorize?client_id=1002217154109780010&permissions=8&scope=bot%20applications.commands";
const githubLink = "https://github.com/BeratBilgic/Discord-Bot";
const iconLink = "https://imgur.com/jHeZrtv.png";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Show bot commands"),
    async execute(interaction) {
        const commandList = interaction.client.commands.map((command) => '`' + command.data.name + '`').join(', ');

        let embedModal = new EmbedBuilder()
            .setAuthor({ name: 'Help Command', iconURL: iconLink})
            .addFields({ name : 'Command List', value: commandList})
            .addFields({ name: 'MadBot', value: '[Source Code](' + githubLink + ')  |  [Invite MadBot](' + inviteLink + ')'})
            .setThumbnail(iconLink)
            .setTimestamp()
            .setFooter({ text: 'MadBot', iconURL: iconLink});

        interaction.reply({ embeds: [embedModal] })
    }
}