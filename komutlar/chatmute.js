
const { MessageEmbed } = require("discord.js");
const data = require("quick.db");
const jdb = new data.table("cezalar");
const kdb = new data.table("kullanici");
const ms = require('ms');
const moment = require('moment');
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
return message.channel.send(new MessageEmbed().setColor('0x800d0d').setDescription(`${message.author}, Yetkililer birbirlerini muteleyemez.`));
} else {
let zaman = args[1]   
.replace("sn", "saniye")
.replace("dk", "dakika")
.replace("sa", "saat")
.replace("gün", "gün");
if (!zaman) { message.channel.send(new MessageEmbed().setColor('0x800d0d').setDescription(`${message.author}, Bir zaman dilimi belirtin. \n1 Saniye = 1s \n 1 Dakika = 1m \n 1 Saat = 1h \n 1 Gün = 1d`));
} else {
let sebep = args[2]
if(!sebep) return message.channel.send(new MessageEmbed().setColor('0x800d0d').setDescription(`${message.author}, Bir sebep belirtmelisin.`))  
                
let zamandilimi = zaman
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
let muteler = jdb.get(`tempmute`) || [];
if (!muteler.some(j => j.id == member.id)) {
kdb.add(`kullanici.${message.author.id}.mute`, 1);
data.add('case', 1)
const numara = await data.fetch('case')
moment.locale("tr");
kdb.push(`kullanici.${member.id}.sicil`, {
Yetkili: message.author.id,
Sebep: sebep,
Ceza: "MUTE",
Süre: zamandilimi,
cezano: numara,
Tarih: (`${moment(Date.now()).add(10,"hours").format("HH:mm:ss DD MMMM YYYY")}`) 
});
};
                 
data.set(`muteli_${member.guild.id + member.id}`, 'muteli')
data.set(`süre_${member.id + member.guild.id}`, zamandilimi)
                 
message.react('920821525987328040')
                 
message.channel.send(new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('0x348f36').setTimestamp().setDescription(`Başarılı bir şekilde <@${member.id}> adlı kullanıcı, ${message.author} tarafından **${sebep}** sebebi ile **${zamandilimi}** süresi boyunca susturuldu. (Chat Mute)`));
mutelog.send(
new MessageEmbed()
.setAuthor(message.author.username, message.author.avatarURL ({ dynamic: true}))
.setColor('ffdb55')
.setDescription(`
**Metin Kanallarında Susturuldu !**
• Mutelenen Üye: <@${member.id}> (\`${member.id}\`)
• Muteleyen Yetkili: <@${message.author.id}> (\`${message.author.id}\`)
• Mute Süresi: \`${zamandilimi}\`
• Mute Sebebi: ${sebep}`))
mute.roles.add(muterol)
                 
message.react('920821525987328040')
                 
} 
setTimeout(async function() {
mute.roles.remove(muterol)
mutelog.send(
new MessageEmbed()
.setColor('#494459')
.setTimestamp()
.setDescription(`
**Metin Kanallarında Susturulması Bitti !**
• Mutesi Kaldırılan Üye: <@${member.id}> (\`${member.id}\`)
• Mute Tarihi: (\`${moment(Date.now()).format("DD")} ${aylar[moment(Date.now()).format("MM")]} ${moment(Date.now()).add(10,"hours").format("YYYY HH:mm:ss")}\`)
• Mute Süresi: \`${zamandilimi}\``)
);
}, ms(zaman));
        
}}}
 
  
};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["cmute","chat-mute"],
    permLevel: 0,
    name: "chatmute"
  }
  
  exports.help = {
    name: "chatmute"
  };
  
  