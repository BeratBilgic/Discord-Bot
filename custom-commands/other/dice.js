module.exports = {
    name: 'dice',
    category: "other",
    aliases: ['roll-dice','roll'],
    async execute(client, message, args) {
        await message.channel.send("ℹ️ | Use the dice command as /dice");
    }
}