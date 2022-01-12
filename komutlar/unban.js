const { MessageEmbed } = require('discord.js')
const datab = require('quick.db')
const moment = require('moment')
exports.run = async (client, message, args) => {

//-------------------------------------------------------------------------------\\  
  
if(!["905804857989025822"].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
return message.channel.send(new MessageEmbed().setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));

const banlog = message.guild.channels.cache.find(c => c.id === '905184832231968769')

//-------------------------------------------------------------------------------\\


  
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
  
let kisi = await client.users.fetch(args[0]);
if(!kisi) return message.channel.send(new MessageEmbed().setDescription(`${message.author} Bir ID belirtmelisin.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));

message.guild.members.unban(kisi.id)
message.channel.send(new MessageEmbed().setDescription(`${kisi} adlı kullanıcının yasağı ${message.author} tarafından kaldırıldı.`).setColor('0x348f36').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic:true }))).then(x => x.delete({ timeout: 5000}))
  
message.react('920821525987328040')
  
banlog.send(new MessageEmbed().setColor('0x348f36').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp().setDescription(`**Sunucudan Yasağı Kaldırıldı !**\n• Kaldıran Yetkili: ${message.author} (\`${message.author.id}\`) \n• Yasağı Kaldırılan Üye: ${kisi} (\`${kisi.id}\`) `));

}
  exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["unban"],
  permLvl: 0,
}

  exports.help = {
  name: 'unban'
}

