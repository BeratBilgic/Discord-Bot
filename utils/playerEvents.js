const { EmbedBuilder } = require("discord.js");
const iconLink = "https://imgur.com/jHeZrtv.png";

module.exports.registerPlayerEvents = (player) => {

    player.on("error", (queue, error) => {
        console.log(`[${queue.guild.name}] Error emitted from the queue: ${error.message}`);
    });
    player.on("connectionError", (queue, error) => {
        console.log(`[${queue.guild.name}] Error emitted from the connection: ${error.message}`);
    });

    player.on("trackStart", (queue, track) => {
        let embedModal = new EmbedBuilder()
            .setTitle(track.author)
            .setDescription(`**[${track.title}](${track.url})**`)
            .setThumbnail(track.thumbnail)
            .addFields({ name: 'Duration', value: `${track.duration}`, inline: true })
            .addFields({ name: 'Requested By', value: `${track.requestedBy.username}`, inline: true })
            .setTimestamp()
            .setFooter({ text: 'MadBot', iconURL: iconLink});

        queue.metadata.send({ embeds: [embedModal] }).catch(()=>{ });
    });

    player.on("trackAdd", (queue, track) => {
        queue.metadata.send(`🎶 | Track **${track.title}** queued!`).catch(()=>{ });
    });

    player.on("tracksAdd", (queue, tracks) => {
        tracks.forEach(track => {
            queue.metadata.send(`🎶 | Track **${track.title}** queued!`).catch(()=>{ });
        });
    });

    player.on("botDisconnect", (queue) => {
        queue.metadata.send("❌ | I was manually disconnected from the voice channel, clearing queue!").catch(()=>{ });
    });

    player.on("channelEmpty", (queue) => {
        queue.metadata.send("❌ | Nobody is in the voice channel, leaving...").catch(()=>{ });
    });

    player.on("queueEnd", (queue) => {
        queue.metadata.send("✅ | Queue finished!").catch(()=>{ });
    });
};