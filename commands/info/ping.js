const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Get ping of the bot'),
	async execute(interaction) {
		try {
			const mesg = await interaction.editReply({ content: "š Pong!", fetchReply: true });
	  
			let embedModal = new EmbedBuilder()
            	.setDescription(`āļø **Bot Latency** : \`${mesg.createdTimestamp - interaction.createdTimestamp}ms\`\n\nāļø **Websocket Latency** : \`${interaction.client.ws.ping}ms\`\n`)
				.setTimestamp()
				.setFooter({ text: 'MadBot', iconURL: 'https://imgur.com/jHeZrtv.png'});
			await interaction.editReply({ embeds: [embedModal] });
		} catch (err) {
			await interaction.editReply("ā | Something Went Wrong");
			console.error(err);
		}
	},
};