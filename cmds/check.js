const Discord = require('discord.js');

module.exports.run = async (bot, message, args, database, member) => {
    message.channel.bulkDelete(1)

    if (database.getAccount(message.member).admin !== "true") return message.channel.send('`Недостаточно прав!`')
    let puser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.find(m => m.user.username == args[0] || m.id == args[0]))
    if (!puser) return message.channel.send('`Укажите существующего пользователя!`')

    let date = puser.user.createdAt
    
        if (database.getAccount(puser).notes == "") {
            const infoEmb1 = new Discord.MessageEmbed()
                .setColor('#ffa500')
                .setThumbnail(`${puser.user.displayAvatarURL()}`)
                .setTimestamp(``)
                .setDescription(`**Пользователь:** ${puser.user.tag}\n**Айди:** ${puser.user.id}\n**Аккаунт создан:** ${date}\n**Кол-во редупреждений:** ${database.getAccount(puser).warns}\n**Примечания:** ~пусто~`)
                .setFooter(``);
            message.author.send(infoEmb1);
}       else {
            const infoEmb2 = new Discord.MessageEmbed()
                .setColor('#ffa500')
                .setThumbnail(`${puser.user.displayAvatarURL()}`)
                .setTimestamp(``)
                .setDescription(`**Пользователь:** ${puser.user.tag}\n**Айди:** ${puser.user.id}\n**Аккаунт создан:** ${date}\n**Кол-во редупреждений:** ${database.getAccount(puser).warns}\n**Примечания:** ${database.getAccount(puser).notes}.`)
                .setFooter(``);
            message.author.send(infoEmb2)
}
}

