const { QueryType } = require("discord-player");

module.exports = {
    name: 'play-next',
    category: "music",
    aliases: ['pn'],
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

        const result = await message.client.player.search(args.join(' '), {
            requestedBy: message.author,
            searchEngine: QueryType.AUTO
        });

        if (!result || !result.tracks.length) {
            return await message.channel.send("❌ | No results")
        }

        if (result.playlist) {
            return await message.channel.send("❌ | This command does not support playlists")
        }

        await queue.insert(result.tracks[0])
        
        if (!queue.playing) await queue.play();
    }
}