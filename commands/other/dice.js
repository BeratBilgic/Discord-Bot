const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    category: "other",
    data: new SlashCommandBuilder()
        .setName("dice")
        .setDescription("Roll the dice"),
    async execute(interaction) {
        let embedModal = new EmbedBuilder()
            .setDescription('Click a button to roll the dice')

        const row1 = new ActionRowBuilder()
		    .addComponents(
                new ButtonBuilder()
	                .setCustomId('dice4')
                	.setLabel('4')
	                .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
	                .setCustomId('dice6')
                	.setLabel('6')
	                .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
	                .setCustomId('dice8')
                	.setLabel('8')
                    .setStyle(ButtonStyle.Primary),
            );
        const row2 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
	                .setCustomId('dice10')
                	.setLabel('10')
	                .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
	                .setCustomId('dice12')
                	.setLabel('12')
	                .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
	                .setCustomId('dice20')
                	.setLabel('20')
	                .setStyle(ButtonStyle.Primary),
		    );

        await interaction.editReply({ embeds: [embedModal], components: [row1, row2] });

        setTimeout(async () => {
            row1.components.map(c => c.setDisabled(true))  
            row2.components.map(c => c.setDisabled(true))
            interaction.editReply({ embeds: [embedModal], components: [row1, row2] });
        }, 60000) 
    }
}