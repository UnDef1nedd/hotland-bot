const Discord = require('discord.js');

module.exports.run = async (bot, message, args, database, member) => {

    if (database.getAccount(message.member).admin !== "true") return message.channel.send('`Недостаточно прав!`')

    let puser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.find(m => m.user.username == args[0] || m.id == args[0]));
    if (!puser) return message.channel.send('`Неверно указан пользователь или его не существует!`')

    if (puser.user.tag == message.author.tag) return message.channel.send('`Вы не можете удалить себя как Адмиистратора!`')

    if (database.getAccount(puser).admin == "false") {
        message.react('❌')
        return message.channel.send('`Этот пользователь не является Администратором!`');
}   else {
        database.getAccount(puser).admin = "false" ;
        message.channel.send('`Пользователь был удален как Администратор!`');
        message.react('✅')
}
}