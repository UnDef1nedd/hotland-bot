const Discord = require('discord.js');

module.exports.run = async (bot, message, args, database, member) => {
    message.channel.bulkDelete(1);
    
    if (database.getAccount(message.member).admin !== "true") return message.channel.send('`Недостаточно прав!`')
    
    if (!args[0]) {
        message.channel.bulkDelete(1)
        return message.channel.send('`Не указана ссылка на изображение!`')
}   if (args[0] == 'clear') {
       database.getAccount(message.member).newspic = "" ;
       message.channel.bulkDelete(1)
       await message.channel.send('`Изображения очищены!`')
}   else {
      let picurl = `${args[0]}`;
      database.getAccount(message.member).newspic = `${picurl}`;
      message.channel.bulkDelete(1)
      await message.channel.send('`Изображение успешно установлено!`')
    }
}