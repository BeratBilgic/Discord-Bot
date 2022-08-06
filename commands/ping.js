const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Get ping of the bot'),
	async execute(interaction) {
		//await interaction.reply("My ping is \`" + interaction.client.ws.ping + " ms\`");
		let embedModal = new EmbedBuilder()
            .setTitle("My ping is \`" + interaction.client.ws.ping + " ms\`")
			.setFooter({ text: `${new Date().toISOString().replace(/T/, '       ').replace(/\..+/, '') }` })

        await interaction.reply({ embeds: [embedModal] })
	},
};