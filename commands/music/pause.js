const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("Resume the current song"),
    async execute(interaction) {
        const queue = await interaction.client.player.getQueue(interaction.guildId);

        if (!queue || !queue.playing) return interaction.reply({ content: '❌ | No music is being played' });

        const paused = queue.setPaused(true);
        return interaction.reply({ content: paused ? '⏸ | Paused!' : '❌ | Something went wrong!' });
    }
}