const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {

//-------------------------------------------------------------------------------\\

if(!["905147097316204595"].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
return message.channel.send(new Discord.MessageEmbed().setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));

//-------------------------------------------------------------------------------\\
  
  
  let ramo = "**Sesli kanalda olan yetkililer:**\n";
  let ramo2 = "**Sesli kanalda olmayan yetkililer:**\n";
  
  message.guild.roles.cache.get("905804863655514153").members.map(r => {
    ramo += r.voice.channel ? ">  <@" + r.user.id + ">\n" : "";
    ramo2 += !r.voice.channel ? ">  <@" + r.user.id + ">\n" : "";
  });

  const ramoembed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTimestamp()
    .setDescription("" + ramo + "" + ramo2 + "")
  message.channel.send(ramoembed).then(s => s.s);
};
module.exports.conf = {
  aliases: ["yetkilises","yetkili-ses"]
};

module.exports.help = {
  name: "yetkilises"
};