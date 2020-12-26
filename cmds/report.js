const Discord = require('discord.js');
const fs = require('fs');

module.exports.run = async (bot, message, args, database, member) => {
    
    let puser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.find(m => m.user.username == args[0] || m.id == args[0]));

    if (!puser) return message.channel.send('`Неверно указан пользователь!`');

    if (database.getAccount(puser).admin == "true") return message.channel.send('`Невозможно подать жалобу на Администратора!`')

    if (!args[0]) return message.channel.send('`Не указан ни игрок, ни причина жалобы!`');

    let reportTXT = args.slice(1).join(' ') || `~no-args~`

    if (!args[1]) return message.channel.send('`Не указана причина жалобы!`')

    fs.readFile('./data/channel_report.txt', (err, data) => {
        if (err) {
            return console.error(`Ошибка прочтения channel_report.txt: ${err}`);
        }
        let mainch = data.toString();
        let channel1 = bot.channels.cache.get(`${mainch}`);
        const reportEmb = new Discord.MessageEmbed()
            .setColor('#ffa500')
            .setAuthor('⛔ ЖАЛОБА\u200B')
            .addFields(
		        { name: '\u200B', value: `**От:** <@${message.author.id}> **(${message.author.tag});**\n**На игрока:** <@${puser.user.id}> **(${puser.user.tag});**`},
                { name: `Причина: ${reportTXT}.`, value: '\u200B' },
            )
            .setTimestamp()
        channel1.send(reportEmb);
    });
    message.react('✅');
    await message.react('🕛');
}