const Discord = require('discord.js');

module.exports.run = async (bot, message, args, database, member) => {
    message.channel.bulkDelete(1)

    if (database.getAccount(message.member).admin !== "true") return message.channel.send('`Недостаточно прав!`');

    if (database.getGuildData(message.guild).mroleID == "") return message.channel.send('`Сначала укажите айди роли для мьюта!`')
      let suppcroleid = database.getGuildData(message.guild).mroleID;
      let muteRole = message.guild.roles.cache.get(suppcroleid)

      let puser = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if (!puser) return message.channel.send('`Неверно указан пользователь!`')

      let mutetime = args[1];
      if (!mutetime) return ('`Неверно указано время или оно отсутствует!`') 

      let reason = args.slice(3).join(' ') || 'Не указана'
      if (!reason) return ('`Не указана причина мьюта!`');

      let period = args[2];
      if (period == "s") {
        let realtime = mutetime*1000;

        puser.roles.add(muteRole);

        const success = new Discord.MessageEmbed()
          .setColor('#ffa500')
          .setDescription(`**Пользователь** <@${puser.user.id}> **был замьючен!**\nПо причине: ${reason}.`)
          .setFooter(`На время: ${mutetime} секунд.`)
          .setTimestamp()
        message.channel.send(success);
  
        setTimeout(() => {
          puser.roles.remove(muteRole);
          const unmuteEmbed = new Discord.MessageEmbed()
            .setDescription(`**Срок мьюта** <@${puser.user.id}> **истек!**`)
            .setColor('#ffa500')
            .setFooter('Также это сообщение отображается даже после ан-мьюта.')
          message.channel.send(unmuteEmbed);
        }, realtime)
}     else if (period == "m") {
        let realtime = mutetime*60000;

        puser.roles.add(muteRole);

        const success = new Discord.MessageEmbed()
          .setColor('#ffa500')
          .setDescription(`**Пользователь** <@${puser.user.id}> **был замьючен!**\nПо причине: ${reason}.`)
          .setFooter(`На время: ${mutetime} минут.`)
          .setTimestamp()
        message.channel.send(success);
  
        setTimeout(() => {
          puser.roles.remove(muteRole);
          const unmuteEmbed = new Discord.MessageEmbed()
            .setDescription(`**Срок мьюта** <@${puser.user.id}> **истек!**`)
            .setColor('#ffa500')
            .setFooter('Также это сообщение отображается даже после ан-мьюта.')
          message.channel.send(unmuteEmbed);
        }, realtime)
}     else if (period == "h") {
        let realtime = mutetime*3600000;

        puser.roles.add(muteRole);

        const success = new Discord.MessageEmbed()
          .setColor('#ffa500')
          .setDescription(`**Пользователь** <@${puser.user.id}> **был замьючен!**\nПо причине: ${reason}.`)
          .setFooter(`На время: ${mutetime} часов.`)
          .setTimestamp()
        message.channel.send(success);
  
        setTimeout(() => {
          puser.roles.remove(muteRole);
          const unmuteEmbed = new Discord.MessageEmbed()
            .setDescription(`**Срок мьюта** <@${puser.user.id}> **истек!**`)
            .setColor('#ffa500')
            .setFooter('Также это сообщение отображается даже после ан-мьюта.')
          message.channel.send(unmuteEmbed);
        }, realtime)
}     else {
        return message.channel.send('`Ошибка в распознавании периода времени!`')
}
}
