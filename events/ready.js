module.exports = {
  name: 'ready',
  once: true,
  execute(bot) {
      console.log(`${bot.user.username} is online on ${bot.guilds.cache.size} servers!`);

      bot.user.setPresence({ activities: [{ name: 'Online'}] });
  }
}