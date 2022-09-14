const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");
const inviteLink = "https://discord.com/api/oauth2/authorize?client_id=1010196507359727617&permissions=8&scope=bot%20applications.commands";
const githubLink = "https://github.com/BeratBilgic/Discord-Bot";
const iconLink = "https://imgur.com/jHeZrtv.png";

module.exports = {
    category: "info",
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Show bot commands"),
    async execute(interaction) {
        await interaction.deferReply();

        const infoCommands = interaction.client.commands.filter((c) => c.category == 'info').map((c) => '`' + c.data.name + '`').join(', ');
        const musicCommands = interaction.client.commands.filter((c) => c.category == 'music').map((c) => '`' + c.data.name + '`').join(', ');
        const otherCommands = interaction.client.commands.filter((c) => c.category == 'other').map((c) => '`' + c.data.name + '`').join(', ');

        let embedModal = new EmbedBuilder()
            .setAuthor({ name: 'Help Command', iconURL: iconLink})
            .setDescription('Usage: `-<command name>` or `/<command name>`\n**NOTE: You must have a role named DJ to use music commands.**\n')
            .addFields({ name : 'Info Commands', value: `${infoCommands}`})
            .addFields({ name : 'Music Commands', value: `${musicCommands}`})
            .addFields({ name : 'Other Commands', value: `${otherCommands}`})
            .addFields({ name: 'MadBot', value: '[Source Code](' + githubLink + ')  |  [Invite MadBot](' + inviteLink + ')'})
            .setThumbnail(iconLink)
            .setTimestamp()
            .setFooter({ text: 'MadBot', iconURL: iconLink});

        await interaction.editReply({ embeds: [embedModal] })
    }
}