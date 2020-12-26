const Discord = require('discord.js');

module.exports.run = async (bot, message, args, database, member) => {
    message.channel.bulkDelete(1)
    
    if (database.getAccount(message.member).admin !== "true") return message.channel.send('`Недостаточно прав!`');

    if (!args[0]) return message.channel.send('`Не указано айди новой роли!`')

    let muterole = args[0];

    const changeEmb = new Discord.MessageEmbed()
        .setColor('#ffa500')
        .setDescription(`**Роль для мьюта была изменена. Айди новой роли -** ${muterole}**!**`)
    message.channel.send(changeEmb);

    database.getGuildData(message.guild).mroleID = muterole;
}