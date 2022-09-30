const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: 'dice',
    category: "other",
    aliases: ['rolldice','roll'],
    async execute(client, message, args) {
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

        message.channel.send({ embeds: [embedModal], components: [row1, row2] })
        .then((msg)=> {
            setTimeout(function(){
                row1.components.map(c => c.setDisabled(true))  
                row2.components.map(c => c.setDisabled(true))
                msg.edit({ embeds: [embedModal], components: [row1, row2] });
            }, 120000)
        }); 
    }
}