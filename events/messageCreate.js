module.exports = {
	name: "messageCreate",
	async execute(message) {
        const client = message.client;
        const prefix = "-";

		if (message.author.bot || !message.guild) return;

	    if (!message.content.startsWith(prefix)) return;

	    const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();

        const command = client.customCommands.get(cmd) || client.customCommands.find(command => command.aliases && command.aliases.includes(cmd));

	    if (!command) return;

        try {
            await command.execute(client, message, args);
        }
        catch (err) {
            await message.channel.send("🛠 | An error occurred while executing that command.");

            if (err) console.error(err);
        }
	}
}