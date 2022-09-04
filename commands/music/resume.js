const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("Pause the current song"),
    async execute(interaction) {
        await interaction.deferReply();

        const queue = await interaction.client.player.getQueue(interaction.guildId);

        if (!queue || !queue.playing) return await interaction.editReply({ content: '❌ | No music is being played' });

        if (!interaction.member.roles.cache.some(role => role.name === 'DJ' || role.name === 'Dj' || role.name === 'dj')){
            return await interaction.editReply({ content: "❌ | You must have the DJ role"});
        }

        if (!interaction.member.voice.channel || interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) {
            return await interaction.editReply({ content: '❌ | You are not in the same voice channel as the bot' });
        }

        const paused = queue.setPaused(false);
        return await interaction.editReply({ content: paused ? '▶ | Resumed' : '❌ | Something went wrong!' });
    }
}