const { EmbedBuilder } = require("discord.js");
const iconLink = "https://imgur.com/jHeZrtv.png";

module.exports.registerPlayerEvents = (player) => {

    player.on("error", (queue, error) => {
        console.log(`[${queue.guild.name}] Error emitted from the queue: ${error.message}`);
        queue.destroy();
        queue.metadata.send("❌ | Something went wrong!").catch(()=>{ });
    });

    player.on("connectionError", (queue, error) => {
        console.log(`[${queue.guild.name}] Error emitted from the connection: ${error.message}`);
        queue.destroy();
        if (error.code === 'ABORT_ERR') {
            queue.metadata.send("❌ | Could not join your voice channel!").catch(()=>{ });
        }else{
            queue.metadata.send("❌ | Something went wrong!").catch(()=>{ });
        }
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
        let hour = Math.floor(queue.totalTime / 1000 / 60 / 60)
        let minutes = Math.floor(queue.totalTime / 1000 / 60 % 60)
		let seconds = (queue.totalTime / 1000) % 60
        let totalTime = `${hour < 1 ? ' ' : ` ${hour} hr `}${minutes} min ${seconds < 10 ? '0' : ''}${seconds} sec`;
        
        queue.metadata.send(`🎶 | Added **${tracks.length}** tracks to the queue. **${queue.tracks.length} songs,${totalTime}**`).catch(()=>{ });
    });

    player.on("botDisconnect", (queue) => {
        queue.metadata.send("❌ | I was left from the voice channel, clearing queue!").catch(()=>{ });
    });

    player.on("channelEmpty", (queue) => {
        queue.metadata.send("❌ | Nobody is in the voice channel, leaving...").catch(()=>{ });
    });

    player.on("queueEnd", (queue) => {
        queue.metadata.send("✅ | Queue finished!").catch(()=>{ });
        setTimeout(() => {
            if (queue.connection && !queue.playing) {
                queue.connection.disconnect();
            }
          }, 120000)
    });
};