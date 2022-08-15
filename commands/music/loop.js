const { SlashCommandBuilder } = require('discord.js');
const { QueueRepeatMode } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("loop")
        .setDescription("Toggles the loop mode"),
    async execute(interaction) {
        const queue = await interaction.client.player.getQueue(interaction.guildId);

        if (!queue || !queue.playing) return interaction.reply({ content: '❌ | No music is being played' });

        if (queue.repeatMode == QueueRepeatMode.TRACK) {
            const success = queue.setRepeatMode(QueueRepeatMode.OFF);
            return interaction.reply({ content: success ? `✅ | Loop mode disabled` : '❌ | Could not update loop mode' });
        }

        const success = queue.setRepeatMode(QueueRepeatMode.TRACK);

        return interaction.reply({ content: success ? `✅ | Loop mode enabled` : '❌ | Could not update loop mode' });
    }
}