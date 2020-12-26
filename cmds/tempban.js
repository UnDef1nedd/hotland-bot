const Discord = require('discord.js');

module.exports.run = async (bot, message, args, database, member) => {
    message.channel.bulkDelete(1)

    if (database.getAccount(message.member).admin !== "true") return message.channel.send('`Недостаточно прав!`');
    let puser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.find(m => m.user.username == args[0] || m.id == args[0]))
    if (!puser) return message.channel.send('`Неверно указан пользователь!`')

    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('`Недостаточно прав!`')
    else if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('`У меня нету необходимых прав!`')

    if (puser.hasPermission("ADMINISTRATOR")) return message.channel.send('`Я не могу забанить этого пользователя!`')

    let mutetime = args[1];
    if (!mutetime) return message.channel.send('`Неверно указано время или оно отсутствует!`') 

    let reason = args.slice(3).join(' ') || 'Не указана'
    if (!reason) return message.channel.send('`Не указана причина бана!`');

    let period = args[2];
    if (period == "m") {
        let realtime = mutetime*60000;
    
        if (mutetime > 20160) return message.channel.send('`Нельзя указывать больше 14 дней для временного бана!`')
        puser.ban({ days: 7, reason: `${reason}`})

        const success = new Discord.MessageEmbed()
          .setColor('#ffa500')
          .setDescription(`**Пользователь** <@${puser.user.id}> **был забанен!**\nПо причине: ${reason}.`)
          .setFooter(`На время: ${mutetime} минут.`)
          .setTimestamp();
        message.channel.send(success);

        setTimeout(() => {
          message.guild.members.unban(puser)
          const unmuteEmbed = new Discord.MessageEmbed()
            .setDescription(`**Срок бана** <@${puser.user.id}> **истек!**`)
            .setColor('#ffa500')
            .setFooter('Также это сообщение отображается даже после ан-бана.')
          message.channel.send(unmuteEmbed);
      }, realtime)

}   else if (period == "h") {
        let realtime = mutetime*3600000;

        if (mutetime > 336) return message.channel.send('`Нельзя указывать больше 14 дней для временного бана!`')
        puser.ban({ days: 7, reason: `${reason}`})

        const success = new Discord.MessageEmbed()
          .setColor('#ffa500')
          .setDescription(`**Пользователь** <@${puser.user.id}> **был забанен!**\nПо причине: ${reason}.`)
          .setFooter(`На время: ${mutetime} часов.`)
          .setTimestamp()
        message.channel.send(success);
  
        setTimeout(() => {
          message.guild.members.unban(puser)
          const unmuteEmbed = new Discord.MessageEmbed()
            .setDescription(`**Срок бана** <@${puser.user.id}> **истек!**`)
            .setColor('#ffa500')
            .setFooter('Также это сообщение отображается даже после ан-бана.')
          message.channel.send(unmuteEmbed);
        }, realtime)
}     else if (period == "d") {
        let realtime = mutetime*86400000;

        if (mutetime > 14) return message.channel.send('`Нельзя указывать больше 14 дней для временного бана!`')
        puser.ban({ days: 7, reason: `${reason}`})

        const success = new Discord.MessageEmbed()
          .setColor('#ffa500')
          .setDescription(`**Пользователь** <@${puser.user.id}> **был забанен!**\nПо причине: ${reason}.`)
          .setFooter(`На время: ${mutetime} дней.`)
          .setTimestamp()
        message.channel.send(success);
  
        setTimeout(() => {
          message.guild.members.unban(puser)
          const unmuteEmbed = new Discord.MessageEmbed()
            .setDescription(`**Срок бана** <@${puser.user.id}> **истек!**`)
            .setColor('#ffa500')
            .setFooter('Также это сообщение отображается даже после ан-мьюта.')
          message.channel.send(unmuteEmbed);
        }, realtime)
}     else {
        return message.channel.send('`Ошибка в распознавании периода времени!`')
}
}  