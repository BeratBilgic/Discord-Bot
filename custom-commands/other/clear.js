module.exports = {
    name: 'clear',
    category: "other",
    aliases: ['purge'],
    async execute(client, message, args) {	
        if (!message.inGuild()) return;

		//8192 = PermissionsBitField.Flags.ManageMessages
		if(!message.member.permissions.has('8192') && message.member.id != message.guild.ownerId)
		{
			return await message.channel.send({ content: '❌ | You don\'t have permission to run this command.', ephemeral: true });
		}

		const permissions = message.channel.permissionsFor(message.client.user);
		if (!permissions.has('8192')) {
			return await message.channel.send({ content: '❌ | I do not have the `MANAGE_MESSAGES` permission.', ephemeral: true });
		}

        let amount;
		if(!args.length) { 
            amount = 100;
        }else{
            amount = args.join(' ');
            amount++;
            console.log(amount)
            console.log(args)
        } 

        if (amount > 100) return await message.channel.send({ content: '❌ | I am unable to delete more than 100 messages at once!', ephemeral: true });
		if (amount < 1) return  await message.channel.send({ content: '❌ | I am unable to delete less than 1 message!', ephemeral: true });

        await message.channel.bulkDelete(amount, true).then(async messages => {
            await message.channel.send(`Succesfully deleted ${messages.size} messages from the ${message.channel}.`).catch(async (err) => { 
                if (err.code == 10008) {
                    await message.channel.send(`Succesfully deleted ${messages.size} messages from the ${message.channel}.`);
                }
            });
        });
    }
}