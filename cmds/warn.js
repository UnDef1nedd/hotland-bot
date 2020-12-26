const Discord = require('discord.js');

module.exports.run = async (bot, message, args, database, member) => {
    message.channel.bulkDelete(1)

    if (database.getAccount(message.member).admin !== "true") return message.channel.send('`Недостаточно прав!`')
    let puser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.find(m => m.user.username == args[0] || m.id == args[0]))
    if (database.getAccount(puser).admin == "true") return message.channel.send('`Вы не можете выдать пред. Администратору!`')
    if (!puser) return message.channel.send('`Укажите существующего пользователя!`')
    let reason = args.slice(1).join(' ') || 'Не указана'

    let finalc = database.getAccount(puser).warns+1;
    database.getAccount(puser).warns = finalc;
    
    const warnEmb1 = new Discord.MessageEmbed()
        .setColor('#ffa500')
        .setTimestamp()
        .setDescription(`**Пользователь <@${puser.user.id}> получил предупреждение.**\nПричина: ${reason}`)
        .setFooter(`Случай: #${finalc}`);
    message.channel.send(warnEmb1); 
}