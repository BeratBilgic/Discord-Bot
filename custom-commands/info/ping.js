const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'ping',
    category: "info",
    aliases: ['latency','ms'],
    async execute(client, message, args) {
        try {
			const mesg = await message.channel.send({ content: "š Pong!", fetchReply: true });
	  
			let embedModal = new EmbedBuilder()
            	.setDescription(`āļø **Bot Latency** : \`${mesg.createdTimestamp - message.createdTimestamp}ms\`\n\nāļø **Websocket Latency** : \`${message.client.ws.ping}ms\`\n`)
				.setTimestamp()
				.setFooter({ text: 'MadBot', iconURL: 'https://imgur.com/jHeZrtv.png'});
			await message.channel.send({ embeds: [embedModal] });
		} catch (err) {
			await message.channel.send("ā | Something Went Wrong");
			console.error(err);
		}
    }
}