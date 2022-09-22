module.exports = {
    name: 'dice',
    category: "other",
    aliases: ['rolldice','roll'],
    async execute(client, message, args) {
        await message.channel.send("ℹ️ | Use the dice command as /dice");
    }
}