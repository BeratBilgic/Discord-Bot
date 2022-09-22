module.exports = {
    name: 'info',
    category: "info",
    aliases: ['server','user','infouser','infoserver'],
    async execute(client, message, args) {	
        await message.channel.send("ℹ️ | Use the info command as /info");
    }
}