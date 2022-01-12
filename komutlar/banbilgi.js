const { MessageEmbed, Discord } = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db')
exports.run = async (client, message, args) => {
//-------------------------------------------------------------------------------\\
  
if(!["905804857989025822"].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
return message.channel.send(new MessageEmbed().setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL()({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));

//-------------------------------------------------------------------------------\\

  
  if(!args[0]) return message.channel.send(new MessageEmbed().setDescription(`${message.author} Bir ID belirtmelisin.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
  try {
    message.guild.fetchBan(args.slice(0).join(' '))
    .then(({ user, reason }) => message.channel.send(new MessageEmbed().setAuthor(user.tag, user.avatarURL()).setColor('0x348f36').setDescription(`Yasaklanan Kullanıcı: **${user.tag}** \`(${user.id})\`\nYasaklanma Sebebi: \`${reason}\` `)))
  } catch(err) { message.channel.send(new MessageEmbed().setTimestamp().setColor('0x800d0d').setDescription('Belirtilen İD\'ye ait bir ban geçmişi bulunamadı')) 
                               }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ban-bilgi', 'banbilgi'],
  permLevel: 0
};

exports.help = {
  name: 'baninfo'
};