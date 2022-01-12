const { MessageEmbed } = require('discord.js');
const data = require('quick.db');
const ms = require('ms');
const moment = require('moment')

module.exports.run = async (client, message, args) => {
  
//-------------------------------------------------------------------------------\\
  
if(!["905804863655514153"].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
return message.channel.send(new MessageEmbed().setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
 
const mutelog = message.guild.channels.cache.find(c => c.id === '905184875626246284')
const muterol = message.guild.roles.cache.find(r => r.id === '905804407730503710')

//-------------------------------------------------------------------------------\\


let member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
if (!member) return message.channel.send(new MessageEmbed().setColor('0x800d0d').setDescription(`${message.author}, Bir kullanıcı etiketlemelisin.`))
  
let mute = message.mentions.members.first() || message.guild.members.cache.find(r => r.id === args[0]);
if (!mute) { new MessageEmbed().setColor('0x800d0d').setDescription(`${message.author}, Bir kullanıcı etiketlemelisin.`);
} else {
if (mute.roles.highest.position >= message.member.roles.highest.position) 
{
} else {
let sebep = args[1] 
  
let zaman1 = args[1]
.replace("sn", "saniye")
.replace("dk", "dakika")
.replace("sa", "saat")
.replace("gün", "gün");
//
var vakit = zaman1
.replace("m", " dakika")
.replace("s", " saniye")
.replace("h", " saat")
.replace("d", " d");  
  
let tumaylar = {
"01": "Ocak",  
"02": "Şubat", 
"03": "Mart",  
"04": "Nisan",  
"05": "Mayıs", 
"06": "Haziran", 
"07": "Temmuz",
"08": "Ağustos", 
"09": "Eylül", 
"10": "Ekim", 
"11": "Kasım", 
"12": "Aralık", 
}
let aylar = tumaylar; 
       {
message.react('920821525987328040')
         
message.channel.send(new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('0x348f36').setTimestamp().setDescription(`<@${member.id}> adlı kullanıcı ${message.author} tarafından susturulması kaldırıldı. (Chat Mute)`));
mutelog.send(
new MessageEmbed()
.setAuthor(message.author.username, message.author.avatarURL ({ dynamic: true}))
.setColor('009caf')
.setDescription(`
**Metin Kanallarında Susturulması Kalktı !**
• Mutesi Kaldırılan Üye: <@${member.id}> (\`${member.id}\`)
• Kaldıran Yetkili: <@${message.author.id}> (\`${message.author.id}\`)
• Sebep: \`${sebep}\`

`))
mute.roles.remove(muterol)
         
message.react('920821525987328040')
} 


      }}}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["uncmute","unchatmute"],
  permLevel: 0
}

exports.help = {
  name: "unchat-mute"
};

