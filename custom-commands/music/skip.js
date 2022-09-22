const { QueueRepeatMode } = require('discord-player');

module.exports = {
    name: 'skip',
    category: "music",
    aliases: ['s','next'],
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

        if (queue.repeatMode == QueueRepeatMode.TRACK) {
            const success = queue.setRepeatMode(QueueRepeatMode.OFF);
            if (!success) {
                await message.channel.send({ content: '❌ | Could not update loop mode to skip current song'});
            }
        }

        const currentSong = queue.current;

        const success = await queue.skip();

        await message.channel.send({ content: success ? `⏩ | Skipped **${currentSong}**!` : '❌ | Something went wrong!'});
    }
}