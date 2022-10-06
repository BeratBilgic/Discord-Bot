const { QueryType } = require('discord-player');
const playdl = require("play-dl");

module.exports = {
    name: 'play',
    category: "music",
    aliases: ['p'],
    async execute(client, message, args) {
        if (!message.member.roles.cache.some(role => role.name === 'DJ' || role.name === 'Dj' || role.name === 'dj')){
            return await message.channel.send({ content: "❌ | You must have the DJ role"});
        }

        if (!message.member.voice.channel) {
            return await message.channel.send("❌ | You must be in a voice channel.")
        }

        if (message.guild.members.me.voice.channelId && message.member.voice.channelId !== message.guild.members.me.voice.channelId) {
            return await message.channel.send({ content: '❌ | You are not in the same voice channel as the bot' });
        }

        const result = await client.player.search(args.join(' '), {
            requestedBy: message.author,
            searchEngine: QueryType.AUTO
        });

        if (!result || !result.tracks.length) {
            return await message.channel.send("❌ | No results")
        }

        const queue = await client.player.createQueue(message.guild, {
            metadata: message.channel,
            guild: message.guildId,

            //leaveOnEmpty: false,
            leaveOnEmptyCooldown : 300000,
            leaveOnEnd: false,
            leaveOnStop: true,

            async onBeforeCreateStream(track, source, _queue) {
                if (track.url.includes("youtube.com")) {
                    return (await playdl.stream(track.url, { discordPlayerCompatibility : true })).stream;
                }else if (track.url.includes("spotify.com")){
                    return (await playdl.stream(await playdl.search(`${track.author} ${track.title} lyric`, { limit: 1, source: { youtube: "video" } }).then(x => x[0].url), { discordPlayerCompatibility: true })).stream;
                }
            }
        });

        try {
            if (!queue.connection) await queue.connect(message.member.voice.channel);
        } catch (err){
            console.error(err);
            await queue.destroy();
            return await message.channel.send("❌ | Could not join your voice channel!");
        }

        result.playlist ? queue.addTracks(result.tracks) : queue.addTrack(result.tracks[0]);
        
        if (!queue.playing) await queue.play();
    },
};