const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'dice4',
    async execute(interaction){        
        const number = 4;
        
        let randomNumber = 1 + Math.floor(Math.random() * number)

        let embedModal = new EmbedBuilder()
            .setAuthor({ name: interaction.user.username , iconURL: interaction.user.displayAvatarURL({ dynamic: true})})
            .setDescription('Result: **'+ randomNumber + '**' + '/' + number)

        await interaction.editReply({ embeds: [embedModal]});
    }
}