const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder, ChannelType } = require("discord.js");
const iconLink = "https://imgur.com/jHeZrtv.png";

module.exports = {
        data: new SlashCommandBuilder()
        .setName('info')
	    .setDescription('Get info about a user or a server!')
        .addSubcommand(subcommand =>
            subcommand
                .setName('user')
                .setDescription('Info about a user')
                .addUserOption(option => option.setName('target').setDescription('The user')))
        .addSubcommand(subcommand =>
            subcommand
                .setName('server')
                .setDescription('Info about the server')),
    async execute(interaction) {
        await interaction.deferReply();

        const embedModal = new EmbedBuilder()
    
        if (interaction.options.getSubcommand() === 'user') {
			let member = await interaction.options.getMember('target');

			if (!member) member = interaction.member;

            embedModal
                .setAuthor({ name: member.user.username, iconURL: member.user.displayAvatarURL({ dynamic: true})})
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true}))
                .addFields(
                    {name: "Nickname", value: member.nickname ? member.nickname : "-", inline: true},
                    {name: "Tag", value: member.user.tag, inline: true},
                    {name: '\u200B', value: '\u200B', inline: true},
                    {name: "Bot", value: (member.user.bot ? "Yes" : "No"), inline: true},
                    {name: "User ID", value: String(member.user.id), inline: true},
                    {name: '\u200B', value: '\u200B', inline: true},
                )
                .addFields({ name: 'Roles', value: `${member.roles.cache.map((role) => role.toString()).join(', ')}`})
                .addFields(
                    //{name: "User created timestamp", value: `<t:${Math.floor(member.user.createdTimestamp / 1000)}:F>`, inline: true},
                    {name: "Account created", value: `<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>`, inline: true},
                    {name: '\u200B', value: '\u200B', inline: true},
                    //{name: "User joined timestamp", value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:F>`, inline: true},
                    {name: "Joined the server", value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`, inline: true},
                )
                .setTimestamp()
                .setFooter({ text: 'MadBot', iconURL: iconLink});

		} else if (interaction.options.getSubcommand() === 'server') {
            let guild = interaction.guild;
            const owner = await guild.fetchOwner();
            const afktime = String(interaction.guild.afkTimeout / 60)

			const categories = await guild.channels.cache.filter((ch) => ch.type === ChannelType.GuildCategory).size
			const publicthreads = await guild.channels.cache.filter((ch) => ch.type === ChannelType.GuildPublicThread).size
            const textchannels = await guild.channels.cache.filter((ch) => ch.type === ChannelType.GuildText).size
            const voicechannels = await guild.channels.cache.filter((ch) => ch.type === ChannelType.GuildVoice).size

            embedModal
                .setAuthor({ name: guild.name, iconURL: guild.iconURL({dynamic: true })})
                .addFields(
                    {name: "Owner", value: String(owner) , inline: true},
                    {name: "Server ID", value: "`" + guild.id + "`", inline: true},
                    {name: "Server Created", value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`, inline:true },
                    {name: 'Region', value: String(interaction.guild.preferredLocale), inline: true},
                    {name: "Members", value: `${guild.memberCount} total` , inline: true},
                    {name: "System Channel", value: `${guild.systemChannel}`, inline:true },
                    {name: 'Afk Timeout', value: (guild.afkChannel ? `${afktime} min` : "-"), inline: true},
                    {name: 'Afk Channel', value: (guild.afkChannel ? `${guild.afkChannel}` : "-"), inline: true},
                    {name: '\u200B', value: '\u200B', inline: true},
                )
                .addFields(
                    {name: 'Roles', value: `${guild.roles.cache.map((role) => role.toString()).join(', ')}\n————————\n${guild.roles.cache.size} total roles`, inline: true},
                    {name: "Channels", value: `${textchannels + voicechannels} total in ${categories} Categories:\n${textchannels} text channels\n${voicechannels} voice channels\n————————\n${publicthreads} public threads`, inline: true},
                )
                .setThumbnail(guild.iconURL({dynamic: true }))
                .setTimestamp()
                .setFooter({ text: 'MadBot', iconURL: iconLink});
		}

        await interaction.editReply({ embeds: [embedModal] })
    }
}