const Discord = require('discord.js');
const data = require('quick.db');
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {

//-------------------------------------------------------------------------------\\  
  
if(!["926779050683424809"].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
return message.channel.send(new Discord.MessageEmbed().setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));

//-------------------------------------------------------------------------------\\  

let target = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
if (target.id !== message.author.id) return message.channel.send('Yalnızca kendi adını değiştirebilirsin')
if (!args[0]) return message.channel.send('Lütfen bir kullanıcı adı giriniz')

const member = message.guild.members.cache.get(target.id)
args.shift()
const nickname = args.join(' ')

if (!nickname) return message.channel.send('Lütfen bir kullanıcı adı giriniz')

message.react('920821525987328040')
  
member.setNickname(`${ayarlar.tag} ${nickname}`)
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["booster"],
  permLevel: 0
}

exports.help = {
  name: 'booster'
};
