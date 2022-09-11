const { EmbedBuilder } = require("discord.js");
const inviteLink = "https://discord.com/api/oauth2/authorize?client_id=1010196507359727617&permissions=8&scope=bot%20applications.commands";
const githubLink = "https://github.com/BeratBilgic/Discord-Bot";
const iconLink = "https://imgur.com/jHeZrtv.png";

module.exports = {
    name: 'help',
    category: "info",
    aliases: ['h'],
    async execute(client, message, args) {
        const infoCommands = message.client.customCommands.filter((c) => c.category == 'info').map((c) => '`' + c.name + '`').join(', ');
        const musicCommands = message.client.customCommands.filter((c) => c.category == 'music').map((c) => '`' + c.name + '`').join(', ');
        const otherCommands = message.client.customCommands.filter((c) => c.category == 'other').map((c) => '`' + c.name + '`').join(', ');

        let embedModal = new EmbedBuilder()
            .setAuthor({ name: 'Help Command', iconURL: iconLink})
            .setDescription('**NOTE: You must have a role named DJ to use music commands.**\n\n')
            .addFields({ name : 'Info Commands', value: `${infoCommands}`})
            .addFields({ name : 'Music Commands', value: `${musicCommands}`})
            .addFields({ name : 'Other Commands', value: `${otherCommands}`})
            .addFields({ name: 'MadBot', value: '[Source Code](' + githubLink + ')  |  [Invite MadBot](' + inviteLink + ')'})
            .setThumbnail(iconLink)
            .setTimestamp()
            .setFooter({ text: 'MadBot', iconURL: iconLink});

        await message.channel.send({ embeds: [embedModal] })
    }
}