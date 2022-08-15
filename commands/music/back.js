const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("back")
        .setDescription("Play the previous song"),
    async execute(interaction) {
        const queue = await interaction.client.player.getQueue(interaction.guildId);

        if (!queue || !queue.playing) return interaction.reply({ content: '❌ | No music is being played' });

        if (!queue.previousTracks[1]) return interaction.reply({ content: '❌ | There is no previous music available' });
        
        await queue.back();

        interaction.reply({ content: '✅ | Playing the previous song!' });
    }
}