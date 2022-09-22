const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");
const inviteLink = "https://discord.com/api/oauth2/authorize?client_id=1010196507359727617&permissions=8&scope=bot%20applications.commands";
const githubLink = "https://github.com/BeratBilgic/Discord-Bot";
const iconLink = "https://imgur.com/jHeZrtv.png";

module.exports = {
    category: "info",
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Show bot commands")
        .addStringOption(option => option.setName('command').setDescription('The user')),
    async execute(interaction) {
        let commandName = await interaction.options.getString('command');

        if (commandName != null) {
            const command = interaction.client.commands.get(commandName);
            if (!command) return await interaction.editReply("❌ | Command not found");

            const customCommand = interaction.client.customCommands.get(commandName);
            const aliases = customCommand.aliases.map((c) => '`' + c + '`').join(', ');

            let embedModal = new EmbedBuilder()
                .setAuthor({ name: `${command.data.name}`, iconURL: iconLink})
                .addFields({ name : 'Description', value: `${command.data.description}`})
                .addFields({ name : 'Aliases', value: `${aliases}`})
                .addFields({ name : 'Permission', value: command.category == 'music' ? '@DJ' : '@everyone'})

            return await interaction.editReply({ embeds: [embedModal] })
        }

        const infoCommands = interaction.client.commands.filter((c) => c.category == 'info').map((c) => '`' + c.data.name + '`').join(', ');
        const musicCommands = interaction.client.commands.filter((c) => c.category == 'music').map((c) => '`' + c.data.name + '`').join(', ');
        const otherCommands = interaction.client.commands.filter((c) => c.category == 'other').map((c) => '`' + c.data.name + '`').join(', ');

        let embedModal = new EmbedBuilder()
            .setAuthor({ name: 'Help Command', iconURL: iconLink})
            .setDescription("Usage: `-<command name>` or `/<command name>`\nType `/help <CommandName>` for details on a command\n**NOTE: You must have a role named DJ to use music commands.**\n")
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