const { SlashCommandBuilder } = require('discord.js');
const { QueryType } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song')
        .addStringOption(option => option.setName("song").setDescription("The song you want to play").setRequired(true)),
    async execute(interaction) {
        await interaction.deferReply();

        if (!interaction.member.roles.cache.some(role => role.name === 'DJ' || role.name === 'Dj')){
            return interaction.editReply({ content: "❌ | You must have the DJ role"});
        }

        if (!interaction.member.voice.channel) {
            return interaction.editReply("❌ | You must be in a voice channel.")
        }

        if (interaction.guild.members.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) {
            return interaction.editReply({ content: '❌ | You are not in the same voice channel as the bot' });
        }

        const queue = await interaction.client.player.createQueue(interaction.guild, {
            metadata: interaction.channel
        });

        let song = interaction.options.getString("song")
        const result = await interaction.client.player.search(song, {
            requestedBy: interaction.user,
            searchEngine: QueryType.AUTO
        })

        if (!result || !result.tracks.length) {
            return interaction.editReply("❌ | No results")
        }

        try {
            if (!queue.connection) await queue.connect(interaction.member.voice.channel);
        } catch (err){
            console.error(err);
            await queue.destroy();
            return interaction.editReply("❌ | Could not join your voice channel!");
        }

        result.playlist ? queue.addTracks(result.tracks) : queue.addTrack(result.tracks[0]);
        
        await interaction.editReply({ content: `⏱ | Loading your ${result.playlist ? 'playlist' : 'song'}...` });

        if (!queue.playing) await queue.play();
    }
}