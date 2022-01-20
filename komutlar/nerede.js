const Discord = require("discord.js")
const moment = require("moment")
module.exports.run = async (client, message, args) => {

  
if(!["905804863655514153"].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
return message.channel.send(new Discord.MessageEmbed().setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
  
    let üye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!üye) return message.channel.send(
new Discord.MessageEmbed().setDescription(`${message.author}, Bir kullanıcı etiketlemelisin.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp())
  
    let üyekanal = üye.voice.channel
    if(!üyekanal) return message.channel.send(
    new Discord.MessageEmbed().setDescription(`${message.author}, Belirttiğin kişi ses kanalında bulunmuyor.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp())
    let kanal = üye.voice.channel
    
     let mik = üye.voice.selfMute ? "Kapalı Durumda" : "Açık Durumda";
 let kulaklık = üye.voice.selfDeaf ? "Kapalı Durumda" : "Açık Durumda";
let stable;
if(üye.voice.channel === null || üye.voice.channel.id === undefined || üye.voice.channel === undefined) stable = `None!`
    
    message.channel.send(
    new Discord.MessageEmbed()
      .setColor("#fd8f8f")
    .setAuthor(message.author.tag,message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`${üye} üyesinin bulunduğu ses kanalı - <#${kanal.id}> \n Mikrofonu \`${mik}\` durumda.\n Kulaklığı \`${kulaklık}\` durumda.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp())
    
    }
  exports.conf = {
  aliases: ["nerede","n"]
};
exports.help = {
  name: 'nerede'
}; 
