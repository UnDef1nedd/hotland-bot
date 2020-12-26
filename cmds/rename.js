const Discord = require('discord.js');

module.exports.run = async (bot, message, args, database, member) => { 

    if (database.getAccount(message.member).admin !== "true") return message.channel.send('`Недостаточно прав!`')
    let puser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.find(m => m.user.username == args[0] || m.id == args[0]))

    let newnick = args.slice(1).join(' ') || `${puser.user.nickname}`

    if (!args[1]) {
        message.react('❌');
        return message.channel.send('`Не указан новый никнейм!`');
    }
    if (!puser) {
        message.react('❌');
        return message.channel.send('`Неверно указан пользователь или его не существует!`');
    }
    if (database.getAccount(puser).admin == 1) {
        message.react('❌');
        return message.channel.send('`Невозможно изменить никнейм этому пользователю!`');
    }
    message.guild.member(puser).setNickname(`${newnick}`);
    message.react('✅');
}