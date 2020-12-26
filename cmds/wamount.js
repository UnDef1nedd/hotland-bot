const Discord = require('discord.js');

module.exports.run = async (bot, message, args, database, member) => { 
    message.channel.bulkDelete(1);

    if (database.getAccount(message.member).admin !== "true") return message.channel.send('`Недостаточно прав!`')
    let puser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.find(m => m.user.username == args[0] || m.id == args[0]))
    if (!puser) return message.channel.send('`Укажите существующего пользователя!`')

    if (args[1] == 'clear') {
        const clearemb = new Discord.MessageEmbed()
            .setColor('#ffa500')
            .setTitle('')
            .setDescription(`**Предупреждения у пользователя ${puser} были очищены.**`)
        database.getAccount(puser).warns = 0;
        message.channel.send(clearemb);
}   else {
    const warns = new Discord.MessageEmbed()
        .setColor('#ffa500')
        .setTitle('')
        .setDescription(`**Пользователь** ${puser} **имеет __${database.getAccount(puser).warns}__ предупреждений.**`)
    message.channel.send(warns);
}
}