const Discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
let prefix = ayarlar.prefix

exports.run = async (client ,message, args) => {
    if (!message.member.hasPermission("ADMİNİSTRATOR")) {
    const wsymms = new Discord.MessageEmbed()
      .setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`)
    message.channel.send(wsymms);
    return;
  }
  
if(args[0] === 'aç') {
  
db.set(`${message.guild.id}.kufur`, true)
  
const kinda = new Discord.MessageEmbed()  
  
.setDescription(`Küfür Engel başarıyla açıldı!`)

return message.channel.send(kinda)
}
  
if (args[0] === 'kapat') {
  
db.delete(`${message.guild.id}.kufur`)
  
const kinda = new Discord.MessageEmbed() 
  
.setDescription(`Küfür Engel başarıyla kapatıldı!`)
  
return message.channel.send(kinda)
}
{
  
const kinda = new Discord.MessageEmbed() 
  
.setDescription(`**__aç__** veya **__kapat__** Yazmalısın!`)

return message.channel.send(kinda)
}
  
};

exports.conf = {
 enabled: true,
 guildOnly: false,
  aliases: ["küfürengel","küfür-engel"],
 permLevel: 0
};

exports.help = {
 name: 'küfürengel'
};