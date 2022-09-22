const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");
const iconLink = "https://imgur.com/jHeZrtv.png";

module.exports = {
    category: "music",
    data: new SlashCommandBuilder()
        .setName("save")
        .setDescription("It sends and saves the current music to you via DM box"),
    async execute(interaction) {        
        const queue = await interaction.client.player.getQueue(interaction.guildId);

        if (!queue || !queue.playing) return await interaction.editReply({ content: '❌ | No music is being played' });

        if (!interaction.member.roles.cache.some(role => role.name === 'DJ' || role.name === 'Dj' || role.name === 'dj')){
            return await interaction.editReply({ content: "❌ | You must have the DJ role"});
        }

        if (!interaction.member.voice.channel) {
            return await interaction.editReply("❌ | You must be in a voice channel.")
        }

        if (interaction.guild.members.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) {
            return await interaction.editReply({ content: '❌ | You are not in the same voice channel as the bot' });
        }

        const track = queue.current;

        let embedModal = new EmbedBuilder()
            .setTitle(track.author)
            .setDescription(`**${track.title}**\n${track.url}`)
            .setThumbnail(track.thumbnail)
            .addFields({ name: 'Duration', value: `${track.duration}`, inline: true })
            .addFields({ name: 'Requested By', value: `${track.requestedBy.username}`, inline: true })
            .addFields({ name: "Server", value: `${interaction?.guild?.name}`, inline: true })
            .setTimestamp()
            .setFooter({ text: 'MadBot', iconURL: iconLink});

        const owner = await interaction.guild.fetchOwner()
        owner.send({ embeds: [embedModal] }).catch(() => { })

        await interaction.editReply({ content: '✅ | I have sent you current playing song in **DM**' });
    }
}