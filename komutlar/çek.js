const Discord = require("discord.js");

exports.run = async (client, message, args) => {

if (!message.member.voice.channel) {
return message.reply(`${message.author}, Bir kullanıcıyı odanıza çekmek için ilk önce kendiniz ses kanalına girmelisiniz.`);
}
const filter = (reaction, user) => {
return ['✅', '❌'].includes(reaction.emoji.name) && user.id === kullanıcı.id;
};
  
let kullanıcı = message.mentions.members.first()
if (!kullanıcı) return message.channel.send(`${message.author}, Bir Kullanıcı Belirtmelisin!`);

let member = message.guild.member(kullanıcı);

if (!member.voice.channel) return message.channel.send(`${message.author}, Odanıza çekmek istediğiniz kullanıcı ses kanallarında bulunmuyor`).then(m => m.delete,{timeout: 5000});

const voiceChannel = message.member.voice.channel.id;
if (!voiceChannel) return;
  
let log = new Discord.MessageEmbed()
.setColor("#7289D")
.setDescription(`${message.author}, adlı kullanıcı sizi sesli kanalına çekmek istiyor kabul ediyor musunuz?`)
  
let mesaj = await message.channel.send(log)
await mesaj.react("✅")
await mesaj.react("❌")
mesaj.awaitReactions(filter, {
max: 1,
time: 60000,
errors: ['time']
}).then(collected => {
const reaction = collected.first();
if (reaction.emoji.name === '✅') {
let kabul = new Discord.MessageEmbed()
.setColor("0x348f36")
message.react('Mesaj Tepki ID');
message.channel.send(kabul)
kullanıcı.voice.setChannel(message.member.voice.channel.id)
} else {
let striga = new Discord.MessageEmbed()
.setColor("0x800d0d")
.setDescription(`${kullanıcı} Sesli kanalına çekmek istediğiniz üye teklifinizi geri çevirdi`)
message.channel.send(striga)
}
})
}


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["çek"],
  permLevel: 0,
}

exports.help = {
  name: 'çek'
  
}