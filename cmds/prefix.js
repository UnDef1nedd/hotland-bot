const Discord = require('discord.js');

module.exports.run = (bot, message, args, database, member) => {

    if (database.getAccount(message.member).admin !== "true") return message.channel.send('`Недостаточно прав!`')

    if (!args[0]) return message.channel.send('**Не указан новый префикс!**')
    
    const exEmbed = new Discord.MessageEmbed()
       .setColor('#ff1493')
       .setTitle(`${args[0]}`)
       .setAuthor('Префикс для этого сервера изменен на:')
    database.getGuildData(message.guild).prefix = args[0];
    message.react('✅')
}