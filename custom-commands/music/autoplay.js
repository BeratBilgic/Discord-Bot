const { QueueRepeatMode } = require('discord-player');

module.exports = {
    name: 'autoplay',
    category: "music",
    aliases: ['auto'],
    async execute(client, message, args) {
        const queue = await client.player.getQueue(message.guildId);

        if (!queue || !queue.playing) return await message.channel.send({ content: '❌ | No music is being played' });

        if (!message.member.roles.cache.some(role => role.name === 'DJ' || role.name === 'Dj' || role.name === 'dj')){
            return await message.channel.send({ content: "❌ | You must have the DJ role"});
        }

        if (!message.member.voice.channel) {
            return await message.channel.send("❌ | You must be in a voice channel.")
        }

        if (message.guild.members.me.voice.channelId && message.member.voice.channelId !== message.guild.members.me.voice.channelId) {
            return await message.channel.send({ content: '❌ | You are not in the same voice channel as the bot' });
        }

        if (queue.repeatMode == QueueRepeatMode.AUTOPLAY) {
            const success = queue.setRepeatMode(QueueRepeatMode.OFF);
            return await message.channel.send({ content: success ? `✅ | Auto play mode disabled` : '❌ | Could not update loop mode' });
        }

        const success = queue.setRepeatMode(QueueRepeatMode.AUTOPLAY);

        await message.channel.send({ content: success ? `✅ | Auto play mode enabled` : '❌ | Could not update loop mode' });
    }
}