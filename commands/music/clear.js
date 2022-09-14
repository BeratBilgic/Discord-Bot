const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    category: "music",
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Clear the current queue"),
    async execute(interaction) {
        await interaction.deferReply();
        
        const queue = await interaction.client.player.getQueue(interaction.guildId);

        if (!queue) return await interaction.editReply({ content: '❌ | No music is being played' });

        if (!interaction.member.roles.cache.some(role => role.name === 'DJ' || role.name === 'Dj' || role.name === 'dj')){
            return await interaction.editReply({ content: "❌ | You must have the DJ role"});
        }

        if (!interaction.member.voice.channel) {
            return await interaction.editReply("❌ | You must be in a voice channel.")
        }

        if (interaction.guild.members.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) {
            return await interaction.editReply({ content: '❌ | You are not in the same voice channel as the bot' });
        }

        await queue.clear();

        await interaction.editReply({ content: '✅ | Queue cleared.' });
    }
}