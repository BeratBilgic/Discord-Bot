const { SlashCommandBuilder } = require('discord.js');
const { QueueRepeatMode } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Skip the current song"),
    async execute(interaction) {
        const queue = await interaction.client.player.getQueue(interaction.guildId);

        if (!queue || !queue.playing) return interaction.reply({ content: '❌ | No music is being played' });

        if (queue.repeatMode == QueueRepeatMode.TRACK) {
            queue.setRepeatMode(QueueRepeatMode.OFF);
        }

        const currentSong = queue.current

        const success = queue.skip();
        interaction.reply({ content: success ? `✅ | Skipped **${currentSong}**!` : '❌ | Something went wrong!'});
    }
}