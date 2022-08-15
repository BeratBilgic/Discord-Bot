const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("Pause the current song"),
    async execute(interaction) {
        const queue = await interaction.client.player.getQueue(interaction.guildId);

        if (!queue || !queue.playing) return interaction.reply({ content: '❌ | No music is being played' });

        const paused = queue.setPaused(false);
        return interaction.reply({ content: paused ? '▶ | Resumed!' : '❌ | Something went wrong!' });
    }
}