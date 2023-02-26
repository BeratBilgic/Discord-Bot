const { EmbedBuilder } = require("discord.js");

// this feature is for MadBot Community Discord Server
module.exports = {
	name: "guildMemberAdd",
	async execute(member) {
		if (member.guild.id != 1009974932454772809) {
            return;
        }

        const role = member.guild.roles.cache.find(role => role.name === "DJ");

        if (!role) 
            return;
        
        member.roles.add(role).catch(async() => {
            console.error();
            let embedModal = new EmbedBuilder()
            .setDescription("I couldn't add the DJ role to the new member's roles");

            const owner = await member.guild.fetchOwner()
            owner.send({ embeds: [embedModal] }).catch(() => { })
        });  
	},
};