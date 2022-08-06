const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Skip the current song."),
    async execute(interaction) {
        const queue = await interaction.client.player.getQueue(interaction.guildId);

        if (!queue) return await interaction.reply("There are no songs in the queue")

        const currentSong = queue.current
        
        queue.skip()

		let embedModal = new EmbedBuilder()
            .setDescription(`${currentSong.title} has been skipped!`)
            .setThumbnail(currentSong.thumbnail)

        await interaction.reply({ embeds: [embedModal] })
    }
}