const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Get ping of the bot'),
	async execute(interaction) {
		await interaction.reply("My ping is \`" + interaction.client.ws.ping + " ms\`");
	},
};