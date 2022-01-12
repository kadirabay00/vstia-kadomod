const Discord = require("discord.js");

exports.run = async(client, message, args, ayar, emoji) => {
 if (!message.member.roles.cache.has("905804860031664188") && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor(0x00bfff).addField(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`)).then(m => m.delete({timeout: 7000}));
  
  let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if(!uye) return message.channel.send(new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor(0x00bfff).setDescription(`${message.author}, Bir kullanıcı etiketlemelisin.`)).then(x => x.delete({timeout: 5000}));
  uye.roles.remove("905804451238006854").catch();
  uye.roles.add("905213192563753042").catch();
  if(uye.voice.channel) uye.voice.kick().catch();
  message.channel.send(new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor(0x00bfff).setDescription(`${uye} kullanıcısının cezası ${message.author} tarafından bitirildi.`)).catch();
  client.channels.cache.get("905184856198221845").send(new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor(0x00bfff).setDescription(`**Cezası Bitirildi !**\n• Kaldıran Yetkili: ${message.author} (\`${message.author.id}\`)\n• Cezası Kaldırılan Üye: <@!${uye.id}> (\`${uye.id}\`)`)).catch();
  message.react('920821525987328040')
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    permLevel: 0,
    aliases: ["unjail"]
    }
    
    exports.help = {
  name: "unjail"
    } 