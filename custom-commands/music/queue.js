const { EmbedBuilder } = require("discord.js");
const iconLink = "https://imgur.com/jHeZrtv.png";

module.exports = {
    name: 'queue',
    category: "music",
    aliases: ['q'],
    async execute(client, message, args) {
        const queue = await client.player.getQueue(message.guildId);

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

        if (queue.tracks.length < 1) return await message.channel.send('❌ | No more songs');
        
        let page = args;
        let pageMax = Math.ceil(queue.tracks.length / 20)
        if (!page || page < 1 || page > pageMax)
            page = 1
        let pageStart = 20 * (page - 1);
        let pageEnd = pageStart + 20;

        let tracks = queue.tracks.slice(pageStart, pageEnd).map((track, i) => {
            return `**${pageStart + i + 1}.** \`[${track.duration}]\` **[${track.title}](${track.url})** -- ${track.requestedBy.username}`
        }).join("\n")

        let hour = Math.floor(queue.totalTime / 1000 / 60 / 60)
        let minutes = Math.floor(queue.totalTime / 1000 / 60 % 60)
		let seconds = (queue.totalTime / 1000) % 60
        let totalTime = `${hour < 1 ? ' ' : ` ${hour} hr`}${minutes < 1 ? ' ' : ` ${minutes} min`}${seconds < 10 ? ' ' : ` ${seconds} sec`}`;

        let currentSong = queue.current

        let previousSong = queue.previousTracks[queue.previousTracks.length-2];
        
        let embedModal = new EmbedBuilder()
            .setDescription(`**Previous Song**\n`+
            (previousSong ? `\`[${previousSong.duration}]\` **[${previousSong.title}](${previousSong.url})** -- ${previousSong.requestedBy.username}` : "None")
            +`\n\n**Currently Playing**\n` + 
            (currentSong ? `\`[${currentSong.duration}]\` **[${currentSong.title}](${currentSong.url})** -- ${currentSong.requestedBy.username}` : "None") +
            `\n\n**Queue**\n${tracks}\n\n${queue.tracks.length} songs,${totalTime}` 
            )
            .setFooter({ text: `Page ${page} of ${pageMax}`, iconURL: iconLink});
            
        await message.channel.send({ embeds: [embedModal] })
    }
}