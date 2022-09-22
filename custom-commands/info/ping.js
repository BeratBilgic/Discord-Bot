const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'ping',
    category: "info",
    aliases: ['latency','ms'],
    async execute(client, message, args) {
        try {
			const mesg = await message.channel.send({ content: "🏓 Pong!", fetchReply: true });
	  
			let embedModal = new EmbedBuilder()
            	.setDescription(`❗️ **Bot Latency** : \`${mesg.createdTimestamp - message.createdTimestamp}ms\`\n\n❗️ **Websocket Latency** : \`${message.client.ws.ping}ms\`\n`)
				.setTimestamp()
				.setFooter({ text: 'MadBot', iconURL: 'https://imgur.com/jHeZrtv.png'});
			await message.channel.send({ embeds: [embedModal] });
		} catch (err) {
			await message.channel.send("❌ | Something Went Wrong");
			console.error(err);
		}
    }
}