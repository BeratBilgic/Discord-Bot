const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("back")
        .setDescription("Play the previous song"),
    async execute(interaction) {
        const queue = await interaction.client.player.getQueue(interaction.guildId);

        if (!queue || !queue.playing) return interaction.reply({ content: '❌ | No music is being played' });

        if (!interaction.member.roles.cache.some(role => role.name === 'DJ' || role.name === 'Dj' || role.name === 'dj')){
            return interaction.reply({ content: "❌ | You must have the DJ role"});
        }

        if (!interaction.member.voice.channel || interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) {
            return interaction.reply({ content: '❌ | You are not in the same voice channel as the bot' });
        }

        if (!queue.previousTracks[1]) return interaction.reply({ content: '❌ | There is no previous music available' });
        
        await queue.back();

        interaction.reply({ content: '✅ | Playing the previous song!' });
    }
}