const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Get ping of the bot'),
	async execute(interaction) {
		//await interaction.reply("My ping is \`" + interaction.client.ws.ping + " ms\`");

		try {
			const mesg = await interaction.reply({ content: "🏓 Pong!", fetchReply: true });
	  
			let embedModal = new EmbedBuilder()
            	.setDescription(`❗️ **Bot Latency** : \`${mesg.createdTimestamp - interaction.createdTimestamp}ms\`\n\n❗️ **Websocket Latency** : \`${interaction.client.ws.ping}ms\`\n`)
				.setTimestamp()
				.setFooter({ text: 'MadBot', iconURL: 'https://imgur.com/jHeZrtv.png'});
			await interaction.editReply({ embeds: [embedModal] });
		  } catch (err) {
			await interaction.editReply("❌ | Something Went Wrong");
			console.error(err);
		  }
	},
};