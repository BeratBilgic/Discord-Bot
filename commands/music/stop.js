const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("stop")
        .setDescription("Stops the current song and clears the queue"),
    async execute(interaction) {
        const queue = await interaction.client.player.getQueue(interaction.guildId);

        if (!queue || !queue.playing) return await interaction.reply({ content: '❌ | No music is being played' });

        if (!interaction.member.roles.cache.some(role => role.name === 'DJ' || role.name === 'Dj' || role.name === 'dj')){
            return await interaction.reply({ content: "❌ | You must have the DJ role"});
        }

        if (!interaction.member.roles.cache.some(role => role.name === 'DJ' || role.name === 'Dj' || role.name === 'dj')){
            return interaction.reply({ content: "❌ | You must have the DJ role"});
        }

        if (!interaction.member.voice.channel || interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) {
            return await interaction.reply({ content: '❌ | You are not in the same voice channel as the bot' });
        }

        await queue.destroy();

        await interaction.reply({ content: '🛑 | Stopped the music' });
    }
}