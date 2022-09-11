module.exports = {
    name: 'info',
    category: "info",
    aliases: ['server','user','info-user','info-server'],
    async execute(client, message, args) {	
        await message.channel.send("ℹ️ | Use the info command as /info");
    }
}