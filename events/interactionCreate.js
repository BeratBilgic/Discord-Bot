module.exports = {
	name: "interactionCreate",
	async execute(interaction) {
		await interaction.deferReply();

		if(interaction.isButton()){
			const button = interaction.client.buttons.get(interaction.customId);

			try {
				await button.execute(interaction);
			} catch (err) {
				await interaction.editReply({
					content: "🛠 | An error occurred while executing that button.",
					ephemeral: true,
				});
	
				if (err) console.error(err);
			}
		}

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