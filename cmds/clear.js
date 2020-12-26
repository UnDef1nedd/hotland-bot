const Discord = require('discord.js');

module.exports.run = async (bot, message, args, database, member) => {
    message.channel.bulkDelete(1)

    if (database.getAccount(message.member).admin !== "true") return message.channel.send('`Недостаточно прав!`');

    message.content.split(' ').slice(1); 
    const amount = args.join(' '); 

    if (!amount) return message.reply('`Не задано кол-во сообщений для удаления!`'); 
    if (isNaN(amount)) return message.reply('`Заданная переменная не является числом!`'); 

    if (amount > 50) return message.reply('`Невозможно удалять больше 50 сообщений!`'); 
    if (amount < 3) return message.reply('`Невозможно удалить меньше 2 сообщений!`'); 

    await message.channel.messages.fetch({ limit: amount}).then(messages => { 
        message.channel.bulkDelete(messages)})

    const finalEmb = new Discord.MessageEmbed()
        .setColor('#ffa500')
        .setDescription(`**Было очищено __${amount}__ сообщений!**`);

    message.channel.send(finalEmb)
};