const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    category: "other",
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription('Clears messages (You can only bulk delete messages that are under 14 days old.)')
		.addIntegerOption(option =>
			option.setName('amount')
			.setDescription('Amount of messages to clear.')
			.setRequired(false)
			)
		.addUserOption(option =>
			option.setName('user')
			.setDescription('Select a user to clear their messages.')
			.setRequired(false)
			),
    async execute(interaction) {
        if (!interaction.inGuild()) return;

		//8192 = PermissionsBitField.Flags.ManageMessages
		if(!interaction.member.permissions.has('8192') && interaction.member.id != interaction.guild.ownerId)
		{
			return await interaction.editReply({ content: '❌ | You don\'t have permission to run this command.', ephemeral: true });
		}

		const permissions = interaction.channel.permissionsFor(interaction.client.user);
		if (!permissions.has('8192')) {
			return await interaction.editReply({ content: '❌ | I do not have the `MANAGE_MESSAGES` permission.', ephemeral: true });
		}

		const user = interaction.options.getUser("user");
		let amount = interaction.options.getInteger('amount');

		if(amount == null) { 
            amount = 100; 
        }else{
            amount++;
        }

        if (amount > 100) return await interaction.editReply({ content: '❌ | I am unable to delete more than 100 messages at once!', ephemeral: true });
		if (amount < 1) return  await interaction.editReply({ content: '❌ | I am unable to delete less than 1 message!', ephemeral: true });

		const messages = await interaction.channel.messages.fetch({amount});

        if(user) {
            let i = 0;
            const filtered = [];

            (await messages).filter((msg) =>{
                if(msg.author.id === user.id && amount > i) {
                    filtered.push(msg);
                    i++;
                }
            });

            await interaction.channel.bulkDelete(filtered, true).then(async messages => {
                await interaction.editReply(`Succesfully deleted ${messages.size} messages from **${user.username}**.`).catch(async (err) => { 
                    if (err.code == 10008) {
                        await interaction.channel.send(`Succesfully deleted ${messages.size} messages from **${user.username}**.`);
                    }
                });
            });
        } else {
            await interaction.channel.bulkDelete(amount, true).then(async messages => {
                await interaction.editReply(`Succesfully deleted ${messages.size} messages from the ${interaction.channel}.`).catch(async (err) => { 
                    if (err.code == 10008) {
                        await interaction.channel.send(`Succesfully deleted ${messages.size} messages from the ${interaction.channel}.`);
                    }
                });
            });
        }
    }
}