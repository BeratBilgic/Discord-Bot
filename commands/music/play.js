const { SlashCommandBuilder } = require('discord.js');
const { QueryType } = require("discord-player");
const playdl = require("play-dl");

module.exports = {
    category: "music",
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song')
        .addStringOption(option => option.setName("song").setDescription("The song you want to play").setRequired(true)),
    async execute(interaction) {
        await interaction.deferReply();

        if (!interaction.member.roles.cache.some(role => role.name === 'DJ' || role.name === 'Dj' || role.name === 'dj')){
            return await interaction.editReply({ content: "❌ | You must have the DJ role"});
        }

        if (!interaction.member.voice.channel) {
            return await interaction.editReply("❌ | You must be in a voice channel.")
        }

        if (interaction.guild.members.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) {
            return await interaction.editReply({ content: '❌ | You are not in the same voice channel as the bot' });
        }

        let song = interaction.options.getString("song")
        const result = await interaction.client.player.search(song, {
            requestedBy: interaction.user,
            searchEngine: QueryType.AUTO
        });

        if (!result || !result.tracks.length) {
            return await interaction.editReply("❌ | No results")
        }

        const queue = await interaction.client.player.createQueue(interaction.guild, {
            metadata: interaction.channel,
            guild: interaction.guildId,

            //leaveOnEmpty: false,
            leaveOnEmptyCooldown : 120000,
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
            if (!queue.connection) await queue.connect(interaction.member.voice.channel);
        } catch (err){
            console.error(err);
            await queue.destroy();
            return await interaction.editReply("❌ | Could not join your voice channel!");
        }

        result.playlist ? queue.addTracks(result.tracks) : queue.addTrack(result.tracks[0]);
        
        await interaction.editReply({ content: `⏱ | Loading your ${result.playlist ? 'playlist' : 'song'}...` });

        if (!queue.playing) await queue.play();
    }
}