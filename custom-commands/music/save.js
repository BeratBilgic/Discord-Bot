const { EmbedBuilder } = require("discord.js");
const iconLink = "https://imgur.com/jHeZrtv.png";

module.exports = {
    name: 'save',
    category: "music",
    aliases: ['record'],
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

        const track = queue.current;

        let embedModal = new EmbedBuilder()
            .setTitle(track.author)
            .setDescription(`**${track.title}**\n${track.url}`)
            .setThumbnail(track.thumbnail)
            .addFields({ name: 'Duration', value: `${track.duration}`, inline: true })
            .addFields({ name: 'Requested By', value: `${track.requestedBy.username}`, inline: true })
            .addFields({ name: "Server", value: `${message?.guild?.name}`, inline: true })
            .setTimestamp()
            .setFooter({ text: 'MadBot', iconURL: iconLink});

        const owner = await message.guild.fetchOwner()
        owner.send({ embeds: [embedModal] }).catch(() => { })

        await message.channel.send({ content: '✅ | I have sent you current playing song in **DM**' });
    }
}