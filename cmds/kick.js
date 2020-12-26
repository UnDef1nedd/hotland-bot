const Discord = require('discord.js');

module.exports.run = async (bot, message, args, database, member) => {
    message.channel.bulkDelete(1)

    if (database.getAccount(message.member).admin !== "true") return message.channel.send('`Недостаточно прав!`')

    if (!message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send('`У меня нету необходимых прав!`')

    let puser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.find(m => m.user.username == args[0] || m.id == args[0]));
    if (!puser) return message.channel.send('`Неверно указан пользователь или его не существует!`')

    if (database.getAccount(puser).admin == "true") return message.channel.send('`Этот пользователь является Администратором!`');

    if (puser.hasPermission("ADMINISTRATOR")) return message.channel.send('`Я не могу забанить этого пользователя!`')

    let reason = args.slice(1).join(' ') || 'Не указана'

    await puser.kick(reason)

    const kickEmbed = new Discord.MessageEmbed()
    .setColor('#ffa500')
    .setDescription(`**Пользователь** <@${puser.user.id}> **был кикнут!**\nПо причине: ${reason}.`)
    await message.channel.send(kickEmbed)
}