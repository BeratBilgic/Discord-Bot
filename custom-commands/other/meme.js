const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args)); // since require is not supported, we will use this 

module.exports = {
    name: 'meme',
    category: "other",
    aliases: ['Meme'],
    async execute(client, message, args) {
        await fetch('https://www.reddit.com/r/memes/random/.json').then(async res => {
            let meme = await res.json();

            const data = meme[0].data.children[0].data;

            const embedModal = new EmbedBuilder()
                .setTitle(data.title)
                .setURL(`https://reddit.com${data.permalink}`)
                .setImage(data.url)
                .setColor("Random")
                .setTimestamp()
                .setFooter({ text: data.author});

            await message.channel.send({ embeds: [embedModal] });
        });
    }
}