const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Clear all the music in the queue"),
    async execute(interaction) {
        const queue = await interaction.client.player.getQueue(interaction.guildId);

        if (!queue || !queue.playing) return interaction.reply({ content: '❌ | No music is being played' });

        if (!queue.tracks[0]) return interaction.reply({ content: '❌ | There are no songs in the queue after currently playing song' });

        queue.clear();

        interaction.reply({ content: '✅ | Queue cleared.' });
    }
}