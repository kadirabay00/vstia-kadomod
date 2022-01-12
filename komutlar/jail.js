const Discord = require("discord.js");
const ms = require("ms");
const ayarlar = require('../ayarlar.json');
const db = require("quick.db");
const jdb = new db.table("cezalar");
const kdb = new db.table("kullanici");
const moment = require('moment')

const prefix = ayarlar.prefix;

exports.run = async(client, message, args, ayar, emoji) => {
 if (!message.member.roles.cache.has("905804860031664188") && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor(0x00bfff).addField(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`)).then(m => m.delete({timeout: 7000}));

  let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  let reason = args.splice(1).join(" ");
  if(!uye || !reason) return message.channel.send(new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor(0x00bfff).setDescription(`${message.author}, Geçerli bir üye ve sebep belirtmelisin!`)).then(x => x.delete({timeout: 5000}));
  if (message.member.roles.highest.position <= uye.roles.highest.position) return message.channel.send(new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor(0x00bfff).setDescription(`${message.author}, Yetkililer birbirlerini jaile atamazlar.`)).then(x => x.delete({timeout: 5000}));
  await uye.roles.set(uye.roles.cache.has("926779050683424809") ? ["905804451238006854", "926779050683424809"] : ["905804451238006854"]).catch();
  if(uye.voice.channel) uye.voice.kick().catch();
   let muteler = jdb.get(`tempmute`) || [];
                if (!muteler.some(j => j.id == uye.id)) {
                  kdb.add(`uye.${message.author.id}.mute`, 1);
                    db.add('case', 1)
                    const numara = await db.fetch('case')
                    moment.locale("tr");
                  kdb.push(`kullanici.${uye.id}.sicil`, {
                    Yetkili: message.author.id,
                    Sebep: reason,
                    Ceza: "JAIL",
                    cezano: numara,
                    Tarih: (`${moment(Date.now()).add(10,"hours").format("HH:mm:ss DD MMMM YYYY")}`) 
                  });
                }; 
  message.channel.send(new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor(0x00bfff).setDescription(`Başarılı bir şekilde ${uye} adlı kullanıcı, ${message.author} tarafından **${reason}** sebebi ile jaile atıldı.`)).catch();
  client.channels.cache.get("905184856198221845").send(new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor(0x00bfff).setDescription(`**Cezalandırıldı !**\nCezalayan Yetkili: ${message.author} (\`${message.author.id}\`)\nCezalanan Üye: <@!${uye.id}> (\`${uye.id}\`)\nCeza Sebebi: \`${reason}\``)).catch();
  message.react('920821525987328040')
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    permLevel: 0,
    aliases: ["jail","ceza","cezalı"]
    }
    
    exports.help = {
    name: "jail"
    }