const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("dice")
        .setDescription("Roll dice")
        .addIntegerOption(option => option.setName("number").setDescription("The amount of dice to roll")),
    async execute(interaction) {
        let number = interaction.options.getInteger("number")
        if (number == null) number = 6;
        
        let randomNumber = 1 + Math.floor(Math.random() * number)

        let embedModal = new EmbedBuilder()
            .setTitle('Dice rolled between 1 and ' + number)
            .setDescription('Number : ' + randomNumber)
            .setTimestamp()
            .setFooter({ text: 'MadBot', iconURL: 'https://imgur.com/jHeZrtv.png'});

        interaction.reply({ embeds: [embedModal] })
        
    }
}