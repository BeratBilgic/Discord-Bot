const { SlashCommandBuilder } = require('discord.js');
const { QueryType } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Give me some hints about this music')
        .addStringOption(option => option.setName("song").setDescription("Hint of music.").setRequired(true)),
    async execute(interaction) {
        await interaction.deferReply();

        if (!interaction.member.permissions.has(["VIEW_CHANNEL"])) {
            return interaction.editReply({ content: "Not have enough permission.", ephemeral: true });
        }

        if (!interaction.member.voice.channel) {
            return interaction.editReply("You must be in a voice channel.")
        }

        const queue = await interaction.client.player.createQueue(interaction.guild, {
            metadata: interaction.channel
        });

        let url = interaction.options.getString("song")
        const result = await interaction.client.player.search(url, {
            requestedBy: interaction.user,
            searchEngine: QueryType.AUTO
        })

        if (result.tracks.length === 0 || !result) {
            return interaction.editReply("No results")
        }

        result.playlist ? queue.addTracks(result.tracks) : queue.addTrack(result.tracks[0]);

        if (!queue.connection) await queue.connect(interaction.member.voice.channel)
        try {
            if (!queue.connection) await queue.connect(interaction.member.voice.channel);
        } catch {
            queue.destroy();
            return await interaction.editReply("Could not join your voice channel!");
        }
        
        await interaction.editReply({ content: `⏱ | Loading your ${result.playlist ? 'playlist' : 'track'}...` });

        if (!queue.playing) await queue.play()
    }
}