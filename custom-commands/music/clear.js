module.exports = {
    name: 'clear',
    category: "music",
    aliases: ['c','clearqueue'],
    async execute(client, message, args) {
        const queue = await message.client.player.getQueue(message.guildId);

        if (!queue) return await message.channel.send({ content: '❌ | No music is being played' });

        if (!message.member.roles.cache.some(role => role.name === 'DJ' || role.name === 'Dj' || role.name === 'dj')){
            return await message.channel.send({ content: "❌ | You must have the DJ role"});
        }

        if (!message.member.voice.channel) {
            return await message.channel.send("❌ | You must be in a voice channel.")
        }

        if (message.guild.members.me.voice.channelId && message.member.voice.channelId !== message.guild.members.me.voice.channelId) {
            return await message.channel.send({ content: '❌ | You are not in the same voice channel as the bot' });
        }

        await queue.clear();

        await message.channel.send({ content: '✅ | Queue cleared.' });
    }
}