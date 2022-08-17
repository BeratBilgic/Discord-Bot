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
			.setTimestamp()
			.setFooter({ text: 'MadBot', iconURL: 'https://imgur.com/jHeZrtv.png'});

        await interaction.reply({ embeds: [embedModal] })
	},
};