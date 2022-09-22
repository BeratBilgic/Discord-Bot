const { SlashCommandBuilder } = require('discord.js');
const { QueryType } = require("discord-player");

module.exports = {
    category: "music",
    data: new SlashCommandBuilder()
        .setName('play-next')
        .setDescription('Add a song to the top of the queue')
        .addStringOption(option => option.setName("song").setDescription("The song you want to play").setRequired(true)),
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

        let song = interaction.options.getString("song")
        const result = await interaction.client.player.search(song, {
            requestedBy: interaction.user,
            searchEngine: QueryType.AUTO
        });

        if (!result || !result.tracks.length) {
            return await interaction.editReply("❌ | No results")
        }

        if (result.playlist) {
            return await interaction.editReply("❌ | This command does not support playlists")
        }

        await queue.insert(result.tracks[0])
        
        await interaction.editReply({ content: `⏱ | Loading your song...` });

        if (!queue.playing) await queue.play();
    }
}