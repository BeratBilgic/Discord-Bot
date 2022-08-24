const { SlashCommandBuilder } = require('discord.js');
const { QueueRepeatMode } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Skip the current song"),
    async execute(interaction) {
        const queue = await interaction.client.player.getQueue(interaction.guildId);

        if (!queue || !queue.playing) return interaction.reply({ content: '❌ | No music is being played' });

        if (!interaction.member.roles.cache.some(role => role.name === 'DJ' || role.name === 'Dj' || role.name === 'dj')){
            return interaction.reply({ content: "❌ | You must have the DJ role"});
        }

        if (!interaction.member.voice.channel || interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) {
            return interaction.reply({ content: '❌ | You are not in the same voice channel as the bot' });
        }

        if (queue.repeatMode == QueueRepeatMode.TRACK) {
            queue.setRepeatMode(QueueRepeatMode.OFF);
        }

        const currentSong = queue.current;

        const success = await queue.skip();
        interaction.reply({ content: success ? `✅ | Skipped **${currentSong}**!` : '❌ | Something went wrong!'});
    }
}