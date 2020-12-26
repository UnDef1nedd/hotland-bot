const Discord = require('discord.js');

module.exports.run = async (bot, message, args, database, member) => { 
    message.channel.bulkDelete(1);

    if (database.getAccount(message.member).admin !== "true") return message.channel.send('`Недостаточно прав!`')
    
    let text = args.slice(0).join(' ') || '~corps is empty~'

        if (database.getAccount(message.member).newspic == "") {
            const newsemb = new Discord.MessageEmbed()
                .setColor('#ffa500')
                .setDescription(`${text}`)
                .setFooter('С уважением, Администрация HOTLAND', 'https://media.discordapp.net/attachments/707672274869813249/791734841846267924/logo-t.png?width=468&height=468');
            message.channel.send(newsemb); 
}       else {
           const newsemb = new Discord.MessageEmbed()
               .setColor('#ffa500')
               .setDescription(`${text}`)
               .setImage(`${database.getAccount(message.member).newspic}`)
               .setFooter('С уважением, Администрация HOTLAND', 'https://media.discordapp.net/attachments/707672274869813249/791734841846267924/logo-t.png?width=468&height=468');
           message.channel.send(newsemb);
}
}
