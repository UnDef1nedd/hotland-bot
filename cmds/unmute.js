const Discord = require('discord.js');

module.exports.run = async (bot, message, args, database, member) => {
    message.channel.bulkDelete(1)

    if (database.getAccount(message.member).admin !== "true") return message.channel.send('`Недостаточно прав!`');

    if (database.getGuildData(message.guild).mroleID == "") return message.channel.send('`Сначала укажите айди роли для мьюта!`')

    let suppcroleid = database.getGuildData(message.guild).mroleID;
    let muteRole = message.guild.roles.cache.get(suppcroleid)

    let puser = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!puser) return message.channel.send('`Неверно указан пользователь!`')

    if (!(puser.roles.cache.find(r => r.id === suppcroleid))) return message.channel.send('`Пользователь не находится в мьюте!`')

    puser.roles.remove(muteRole);

    const unmuteEmbed = new Discord.MessageEmbed()
      .setDescription(`**Мьют у** <@${puser.user.id}> **был снят!**`)
      .setColor('#ffa500')
    message.channel.send(unmuteEmbed);
}
