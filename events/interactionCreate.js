module.exports = {
	name: "interactionCreate",
	async execute(interaction) {
		if (!interaction.isCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) return;

		try {
			await command.execute(interaction);
		} catch (err) {
			await interaction.editReply({
				content: "🛠 | An error occurred while executing that command.",
				ephemeral: true,
			});

			if (err) console.error(err);
		}
	}
}