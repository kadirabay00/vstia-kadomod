const Discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
let prefix = ayarlar.prefix
 
exports.run = async(client, message, args) => {
    if (!message.member.hasPermission("ADMİNİSTRATOR")) {
    const wsymm = new Discord.MessageEmbed()
      .setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`)
    message.channel.send(wsymm);
    return;
  }
let prefix = ayarlar.prefix
  
  if (!args[0]) {
    const anan = new Discord.MessageEmbed()
    .setDescription(`**__aç__** veya **__kapat__** Yazmalısın!`)
    return message.channel.send(anan)
  }
  if (args[0] === 'aç') {
    
    db.set(`reklam_${message.guild.id}`, "Aktif")
       const karı = new Discord.MessageEmbed()
    .setDescription(`Reklam Engel başarıyla açıldı!`)
    return message.channel.send(karı)
  }
   if (args[0] === 'kapat') {
    
    db.delete(`reklam_${message.guild.id}`)
       const osbir = new Discord.MessageEmbed()
    .setDescription(`Reklam Engel başarıyla kapatıldı!`)
    return message.channel.send(osbir)
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["reklamengel","reklam-engel"],
  permLevel: 0
};

exports.help = {
  name: "reklamengel"
};