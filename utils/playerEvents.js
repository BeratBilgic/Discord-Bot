const { EmbedBuilder } = require("discord.js");
const iconLink = "https://imgur.com/jHeZrtv.png";

module.exports.registerPlayerEvents = (player) => {

    player.on("error", async (queue, error) => {
        console.log(`[${queue.guild.name}] Error emitted from the queue: ${error.message}`);
        await queue.destroy();
        await queue.metadata.send("❌ | Something went wrong!").catch(()=>{ });
    });

    player.on("connectionError", async (queue, error) => {
        console.log(`[${queue.guild.name}] Error emitted from the connection: ${error.message}`);
        await queue.destroy();
        if (error.code === 'ABORT_ERR') {
            await queue.metadata.send("❌ | Could not join your voice channel!").catch(()=>{ });
        }else{
            await queue.metadata.send("❌ | Something went wrong!").catch(()=>{ });
        }
    });

    player.on("trackStart", async (queue, track) => {
        let embedModal = new EmbedBuilder()
            .setTitle(track.author)
            .setDescription(`**[${track.title}](${track.url})**`)
            .setThumbnail(track.thumbnail)
            .addFields({ name: 'Duration', value: `${track.duration}`, inline: true })
            .addFields({ name: 'Requested By', value: `${track.requestedBy.username}`, inline: true })
            .setTimestamp()
            .setFooter({ text: 'MadBot', iconURL: iconLink});

        await queue.metadata.send({ embeds: [embedModal] }).catch(()=>{ });
    });

    player.on("trackAdd", async (queue, track) => {
        await queue.metadata.send(`🎶 | Track **${track.title}** queued!`).catch(()=>{ });
    });

    player.on("tracksAdd", async (queue, tracks) => {
        let hour = Math.floor(queue.totalTime / 1000 / 60 / 60)
        let minutes = Math.floor(queue.totalTime / 1000 / 60 % 60)
		let seconds = (queue.totalTime / 1000) % 60
        let totalTime = `${hour < 1 ? ' ' : ` ${hour} hr `}${minutes} min ${seconds < 10 ? '0' : ''}${seconds} sec`;
        
        await queue.metadata.send(`🎶 | Added **${tracks.length}** tracks to the queue. **${queue.tracks.length} songs,${totalTime}**`).catch(()=>{ });
    });

    player.on("botDisconnect", async (queue) => {
        await queue.metadata.send("leaving...").catch(()=>{ });
    });

    player.on("channelEmpty", async (queue) => {
        await queue.metadata.send("Nobody is in the voice channel, leaving...").catch(()=>{ });
    });

    player.on("queueEnd", async (queue) => {
        await queue.metadata.send("✅ | Queue finished!").catch(()=>{ });
        setTimeout(async () => {
            if (queue.connection && !queue.playing) {
                await queue.connection.disconnect();
            }
        }, 120000)
    });
};