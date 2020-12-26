const Discord = require('discord.js');

module.exports.run = async (bot, message, args, database, member) => {

    if (database.getAccount(message.member).admin !== "true") return message.channel.send('`Недостаточно прав!`')

    let puser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.find(m => m.user.username == args[0] || m.id == args[0]));
    if (!puser) return message.channel.send('`Неверно указан пользователь или его не существует!`')

    if (database.getAccount(puser).admin == "true") {
        message.react('❌')
        return message.channel.send('`Этот пользователь уже Администратор!`');
}   else {
        database.getAccount(puser).admin = "true" ;
        message.channel.send('`Пользователь был добавлен как Администратор!`');
        message.react('✅')
}
}