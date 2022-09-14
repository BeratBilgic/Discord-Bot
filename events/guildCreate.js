const { registerCommands } = require('../utils/registerAppCommands.js');
const { EmbedBuilder } = require("discord.js");
const iconLink = "https://imgur.com/jHeZrtv.png";
const inviteLink = "https://discord.com/api/oauth2/authorize?client_id=1010196507359727617&permissions=8&scope=bot%20applications.commands";

module.exports = {
	name: "guildCreate",
	async execute(guild) {
		console.log(`Bot joined guild: ${guild.name}`);
	
		client = guild.client;
        await registerCommands(client, guild);

		let embedModal = new EmbedBuilder()
            .setAuthor({ name: 'MadBot', iconURL: iconLink})
			.setDescription('Thank you for inviting MadBot!\n\nTo get started, join a voice channel and `/play` a song.'
						+ '\n To get a list of all commands type `/help`\n\nYou can also write me anything about MadBot - MadHero#7366\n')
            .setTimestamp()
            .setFooter({ text: 'MadBot', iconURL: iconLink});

		//channel.type = 0 = TextChannel
		//2048 = PermissionsBitField.Flags.SendMessages	
		//16384 = PermissionsBitField.Flags.EmbedLinks
		const channel = guild.channels.cache
            .find(channel => channel.type === 0 && channel.permissionsFor(guild.members.me).has(['2048','16384']))

		try {
			await channel.send({ embeds: [embedModal] });
		} catch (err) {
			console.error(err);

			if (err.code == 50013) {	
				let errEmbedModal = new EmbedBuilder()
                	.setDescription('If you want, kick the bot from the server and invite it with [this link](' + inviteLink + ')')
                	.setTimestamp()
                	.setFooter({ text: 'MadBot', iconURL: iconLink});

				const owner = await guild.fetchOwner()
				owner.send("I'm sending this message to you because I didn't send it to the server.").catch(() => { })
				owner.send({ embeds: [embedModal] }).catch(() => { })
				owner.send({ embeds: [errEmbedModal] }).catch(() => { })
			}
		}
	},
};