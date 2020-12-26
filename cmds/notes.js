const Discord = require('discord.js');

module.exports.run = async (bot, message, args, database, member) => {
    message.channel.bulkDelete(1)

    if (database.getAccount(message.member).admin !== "true") return message.channel.send('`Недостаточно прав!`')
    let puser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.find(m => m.user.username == args[0] || m.id == args[0]))
    if (!puser) return message.channel.send('`Укажите существующего пользователя!`')

    let newnote = args.slice(1).join(' ') || ''

    if (!args[1]) return message.channel.send('`Не указано примечание!`')
    if (args[1] == 'clear') {
        message.channel.send('`Примечания у игрока были очищены!`')
        database.getAccount(puser).notes = "";
}   else {
       message.channel.send('`Примечание было добавлено к игроку!`')
       database.getAccount(puser).notes = `${newnote}`;
}
}