const Discord = require('discord.js');

module.exports.run = async (bot, message, args, database, member) => {
    message.channel.bulkDelete(1)

    if (database.getAccount(message.member).admin !== "true") return message.channel.send('`Недостаточно прав!`');
    let puser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.find(m => m.user.username == args[0] || m.id == args[0]))
    if (!puser) return message.channel.send('`Неверно указан пользователь!`')

    if (!message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send('`У меня нету необходимых прав!`')

    if (puser.hasPermission("ADMINISTRATOR")) return message.channel.send('`Я не могу забанить этого пользователя!`')

    let reason = args.slice(3).join(' ') || 'Не указана'
    if (!reason) return message.channel.send('`Не указана причина бана!`');

    await puser.ban({ days: 7, reason: `${reason}`})

    const success = new Discord.MessageEmbed()
      .setColor('#ffa500')
      .setDescription(`**Пользователь** <@${puser.user.id}> **был забанен!**\nПо причине: ${reason}.`)
      .setFooter(`На время: Навсегда.`)
      .setTimestamp()
    message.channel.send(success);
}