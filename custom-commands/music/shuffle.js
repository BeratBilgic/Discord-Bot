module.exports = {
    name: 'shuffle',
    category: "music",
    aliases: ['shuffle'],
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

        await queue.shuffle();
        await message.channel.send({ content: '🔀 | Queue has been shuffled!' });
    }
}