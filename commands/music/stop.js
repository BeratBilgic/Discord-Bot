const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    category: "music",
    data: new SlashCommandBuilder()
        .setName("stop")
        .setDescription("Stops the current song and clears the queue"),
    async execute(interaction) {        
        const queue = await interaction.client.player.getQueue(interaction.guildId);

        if (!queue || !queue.playing) return await interaction.editReply({ content: '❌ | No music is being played' });

        if (!interaction.member.voice.channel) {
            return await interaction.editReply("❌ | You must be in a voice channel.")
        }

        if (interaction.guild.members.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) {
            return await interaction.editReply({ content: '❌ | You are not in the same voice channel as the bot' });
        }

        if (!interaction.member.voice.channel || interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) {
            return await interaction.editReply({ content: '❌ | You are not in the same voice channel as the bot' });
        }

        await queue.destroy();

        await interaction.editReply({ content: '🛑 | Stopped the music' });
    }
}