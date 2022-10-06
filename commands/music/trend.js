const { SlashCommandBuilder } = require('discord.js');
const { getTrends } = require("../../database/mongoose.js");
const { EmbedBuilder } = require("discord.js");
const iconLink = "https://imgur.com/jHeZrtv.png";

module.exports = {
    category: "music",
    data: new SlashCommandBuilder()
        .setName("trend")
        .setDescription("Shows the most listened songs"),
    async execute(interaction) { 
        const tracksDB = await getTrends(); 
        let trendTracks = tracksDB.map((track, i) => {
            return `**${i + 1}.**  **[${track.title}](${track.url})** -- ${track.views}`
        }).join("\n")

        let embedModal = new EmbedBuilder()
            .setDescription(
            `**Top 10 Songs**\n\n${trendTracks}` 
            )
            .setTimestamp()
            .setFooter({ text: "MadBot", iconURL: iconLink});
        
        await interaction.editReply({ embeds: [embedModal] });
            
        }
}