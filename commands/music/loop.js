const { SlashCommandBuilder } = require('discord.js');
const { QueueRepeatMode } = require('discord-player');

module.exports = {
    category: "music",
    data: new SlashCommandBuilder()
        .setName("loop")
        .setDescription("Toggles the loop mode"),
    async execute(interaction) {
        const queue = await interaction.client.player.getQueue(interaction.guildId);

        if (!queue || !queue.playing) return await interaction.editReply({ content: '❌ | No music is being played' });

        if (!interaction.member.roles.cache.some(role => role.name === 'DJ' || role.name === 'Dj' || role.name === 'dj')){
            return await interaction.editReply({ content: "❌ | You must have the DJ role"});
        }

        if (!interaction.member.voice.channel) {
            return await interaction.editReply("❌ | You must be in a voice channel.")
        }

        if (interaction.guild.members.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) {
            return await interaction.editReply({ content: '❌ | You are not in the same voice channel as the bot' });
        }

        if (queue.repeatMode == QueueRepeatMode.TRACK) {
            const success = queue.setRepeatMode(QueueRepeatMode.OFF);
            return await interaction.editReply({ content: success ? `🔁 | Loop mode disabled` : '❌ | Could not update loop mode' });
        }

        const success = queue.setRepeatMode(QueueRepeatMode.TRACK);

        await interaction.editReply({ content: success ? `🔁 | Loop mode enabled` : '❌ | Could not update loop mode' });
    }
}