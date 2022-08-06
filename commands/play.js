const { SlashCommandBuilder } = require('discord.js');
const { QueryType } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Give me some hints about this music')
        .addStringOption(option => option.setName("input").setDescription("Hint of music.").setRequired(true)),
    async execute(interaction) {
        if (!interaction.member.permissions.has(["SPEAK", "CONNECT"])) {
            return interaction.reply({ content: "Not have enough permission.", ephemeral: true });
        }

        if (!interaction.member.voice.channel) {
            return interaction.reply("You must be in a voice channel.")
        }

        const queue = await interaction.client.player.createQueue(interaction.guild, {
            metadata: interaction.channel
        });

        let url = interaction.options.getString("input")
        const result = await interaction.client.player.search(url, {
            requestedBy: interaction.user,
            searchEngine: QueryType.AUTO
        })

        if (result.tracks.length === 0 || !result) {
            return interaction.reply("No results")
        }

        result.playlist ? queue.addTracks(result.tracks) : queue.addTrack(result.tracks[0]);
        
        //const song = result.tracks[0]
        //await queue.addTrack(song)

        if (!queue.connection) await queue.connect(interaction.member.voice.channel)
        try {
            if (!queue.connection) await queue.connect(interaction.member.voice.channel);
        } catch {
            queue.destroy();
            return await interaction.reply("Could not join your voice channel!");
        }
        
        await interaction.reply("added to queue")

        if (!queue.playing) await queue.play()
    }
}