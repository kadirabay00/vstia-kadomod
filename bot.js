const Discord = require('discord.js');//
const client = new Discord.Client();//
const ayarlar = require('./ayarlar.json');//
const chalk = require('chalk');//
const moment = require('moment');//
var Jimp = require('jimp');//
const { Client, Util } = require('discord.js');//
const fs = require('fs');//
const db = require('quick.db');//
const express = require('express');//
require('./util/eventLoader.js')(client);//
const path = require('path');//
const snekfetch = require('snekfetch');//
const ms = require('ms');//
const tags = require('common-tags')
//

var prefix = ayarlar.prefix;//
//
const log = message => {//
    console.log(`${message}`);//
};

client.commands = new Discord.Collection();//
client.aliases = new Discord.Collection();//
fs.readdir('./komutlar/', (err, files) => {//
    if (err) console.error(err);//
    log(`‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒
    ${files.length} komut yüklenecek.
‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒`);//
    files.forEach(f => {//
        let props = require(`./komutlar/${f}`);//
        log(`[KOMUT] | ${props.help.name} Eklendi.`);//
        client.commands.set(props.help.name, props);//
        props.conf.aliases.forEach(alias => {//
            client.aliases.set(alias, props.help.name);//
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(process.env.token);

//------------------------------------------------------------------------------------------------------------\\

client.on("ready", () => {
  const gir = ayarlar.botses;
  client.channels.cache.get(gir).join();
  });

client.on('messageDelete', message => {
  const data = require("quick.db")
  data.set(`snipe.mesaj.${message.guild.id}`, message.content)
  data.set(`snipe.id.${message.guild.id}`, message.author.id)

})


const iltifatlar = [
    "Beni deli ediyorsun. Yani; senin için deliriyorum ",
    "sütüm yarım yağlı mutluluğum sana bağlı",
    "meleksin ama canımı alıyorsun yoksa Azrailim misin?",
    "Senle Deniz Kenarında Gökyüzünü İzlemek İsterdim Ah Be Şimdiki Duruma Bak",
    "Duygularım Darmadağın.",
    "Senin Gülüşün Benim En Sevdiğim Mevsim.",
    "İlk öpücüğümüz destansı olacak, değil mi?",
    "konum atta belamızı bulalım bebeğim",
    "Üşüdüysen canımı yakabilirsin",
    "Ölmene gerek yok, yanıma gel mekanın cennet olsun",
    "Teknoloji çok ilerledi, güneşi bu kadar yakından görebildiğimize göre",
    "Dünyanın en güzel manzarasına sırtımı döner gülüşünü izlerim"
];

var iltifatSayi = 0;
client.on("message", async message => {
    if (message.channel.id !== ayarlar.chat || message.author.bot) return;
    iltifatSayi++
    if (iltifatSayi >= 25) { // 50 yazan yer, 50 mesajda bir iltifat edeceğini gösterir.
        iltifatSayi = 0;
        const random = Math.floor(Math.random() * ((iltifatlar).length - 1) + 1);
        message.reply(`${(iltifatlar)[random]}`);
    };
});

//------------------------------------------------------------------------------------------------------------\\


client.on('voiceStateUpdate', async (oldState, newState) => {
    if (!oldState.channelID && newState.channelID) return newState.guild.channels.cache.get(ayarlar.voicelog).send(`${newState.guild.members.cache.get(newState.id).displayName} üyesi \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanala girdi!`);
    if (oldState.channelID && !newState.channelID) return newState.guild.channels.cache.get(ayarlar.voicelog).send(`${newState.guild.members.cache.get(newState.id).displayName} üyesi \`${newState.guild.channels.cache.get(oldState.channelID).name}\` adlı sesli kanaldan ayrıldı!`);
    if (oldState.channelID && newState.channelID && oldState.channelID != newState.channelID) return newState.guild.channels.cache.get(ayarlar.voicelog).send(`${newState.guild.members.cache.get(newState.id).displayName} üyesi ses kanalını değiştirdi! (\`${newState.guild.channels.cache.get(oldState.channelID).name}\` - \`${newState.guild.channels.cache.get(newState.channelID).name}\`)`);
    if (oldState.channelID && oldState.selfMute && !newState.selfMute) return newState.guild.channels.cache.get(ayarlar.voicelog).send(`${newState.guild.members.cache.get(newState.id).displayName} üyesi \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanalda kendi susturmasını kaldırdı!`);
    if (oldState.channelID && !oldState.selfMute && newState.selfMute) return newState.guild.channels.cache.get(ayarlar.voicelog).send(`${newState.guild.members.cache.get(newState.id).displayName} üyesi \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanalda kendini susturdu!`);
    if (oldState.channelID && oldState.selfDeaf && !newState.selfDeaf) return newState.guild.channels.cache.get(ayarlar.voicelog).send(`${newState.guild.members.cache.get(newState.id).displayName} üyesi \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanalda kendi sağırlaştırmasını kaldırdı!`);
    if (oldState.channelID && !oldState.selfDeaf && newState.selfDeaf) return newState.guild.channels.cache.get(ayarlar.voicelog).send(`${newState.guild.members.cache.get(newState.id).displayName} üyesi \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanalda kendini sağırlaştırdı!`);
});


//------------------------------------------------------------------------------------------------------------\\

client.on("message" , async msg => {
  
  if(!msg.guild) return;
  if(msg.content.startsWith(ayarlar.prefix+"afk")) return; 
  
  let afk = msg.mentions.users.first()
  
  const kisi = db.fetch(`afkid_${msg.author.id}_${msg.guild.id}`)
  
  const isim = db.fetch(`afkAd_${msg.author.id}_${msg.guild.id}`)
 if(afk){
   const sebep = db.fetch(`afkSebep_${afk.id}_${msg.guild.id}`)
   const kisi3 = db.fetch(`afkid_${afk.id}_${msg.guild.id}`)
   if(msg.content.includes(kisi3)){

       msg.channel.send(new Discord.MessageEmbed().setColor('BLACK').setDescription(`<@` + msg.author.id + `> Etiketlediğiniz Kullanıcı AFK moduna geçti.\nSebep : **${sebep}**`))
   }
 }
  if(msg.author.id === kisi){

       msg.channel.send(new Discord.MessageEmbed().setColor('BLACK').setDescription(`<@${kisi}> AFK modundan başarıyla çıkış yaptın`))
   db.delete(`afkSebep_${msg.author.id}_${msg.guild.id}`)
   db.delete(`afkid_${msg.author.id}_${msg.guild.id}`)
   db.delete(`afkAd_${msg.author.id}_${msg.guild.id}`)
    msg.member.setNickname(isim)
    
  }
  
});

//------------------------------------------------------------------------------------------------------------\\





//--------------------------------------------------------------------------------------\\

client.on("message", async msg => {
  const i = await db.fetch(`${msg.guild.id}.kufur`);
  if (i) {
    const kufur = [
      "oç",
      "döl",
      "amk",
      "mk",
      "mq",
      "aq",
      "piç",
      "amsk",
      "sikem",
      "sikim",
      "sikeyim",
      "sikerim",
      "orospu çocuğu",
      "orosbu",
      "kahpe",
      "sik",
      "yarra",
      "yarrak",
      "yarram",
      "amcık",
      "amık",
      "sikimi ye",
      "ananı",
      "ananıskm",
      "ananı skm",
      "amguard",
      "amcik",
      "o.ç",
      "a.m.k",
      "skrm",
      "sikerem",
      "taşşak",
      "daşşak",
      "sikik",
      "sikiyim",
      "sikim",
      "amcıq",
      "amına",
      "amına koyarım",
      "anneni sikerim",
      "ananı sikerim",
      "orosbu çocuğu"
      
    ];
    if (kufur.some(word => msg.content.includes(word))) {
      try {
        if (!msg.member.hasPermission("BAN_MEMBERS")) {
          msg.delete();


            return msg.channel.send(new Discord.MessageEmbed().setDescription(`${msg.author} **__Küfür etmemelisin!__**`).setColor('ff0000')).then(x => x.delete({timeout: 5000}));

        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});

client.on("messageUpdate", msg => {
  const i = db.fetch(`${msg.guild.id}.kufur`);
  if (i) {
    const kufur = [
      "döl",
      "amk",
      "mk",
      "mq",
      "aq",
      "piç",
      "amsk",
      "sikem",
      "sikim",
      "sikeyim",
      "sikerim",
      "orospu çocuğu",
      "orosbu",
      "kahpe",
      "sik",
      "yarra",
      "yarrak",
      "yarram",
      "amcık",
      "amık",
      "sikimi ye",
      "ananı",
      "ananıskm",
      "ananı skm",
      "amguard",
      "amcik",
      "o.ç",
      "a.m.k",
      "skrm",
      "sikerem",
      "taşşak",
      "daşşak",
      "sikik",
      "sikiyim",
      "sikim",
      "amcıq",
      "amına",
      "amına koyarım",
      "anneni sikerim",
      "ananı sikerim",
      "kahbe",
      "orosbu çocuğu"
    ];
    if (kufur.some(word => msg.content.includes(word))) {
      try {
        if (!msg.member.hasPermission("BAN_MEMBERS")) {
          msg.delete();


         return msg.channel.send(new Discord.MessageEmbed().setDescription(`${msg.author} **__Küfür etmemelisin!__**`).setColor('ff0000')).then(x => x.delete({timeout: 5000}));

        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});

//--------------------------------------------------------------------------------------\\





//--------------------------------------------------------------------------------------\\

client.on("message", async message => {
  
  const lus = await db.fetch(`reklam_${message.guild.id}`)
  if (lus) {
    const reklamengel = ["discord.app", "discord.gg", "discord.invite"];
    if (reklamengel.some(word => message.content.toLowerCase().includes(word))) {
      try {
        if (!message.member.permissions.has('KICK_MEMBERS')) {
          message.delete();
          
          
          return message.channel.send(new Discord.MessageEmbed().setDescription(`${message.author} **__Reklam Yapmamalısın!__**`).setColor('ff0000')).then(x => x.delete({timeout: 5000}));
          
          
        }
      } catch(err) {
        console.log(err);
    }
  }
}
if (!lus) return;
});
client.on("messageUpdate", async message => {
  
  const lus = await db.fetch(`reklam_${message.guild.id}`)
  if (lus) {
    const reklamengel = ["discord.app", "discord.gg", "discord.invite"];
    if (reklamengel.some(word => message.content.toLowerCase().includes(word))) {
      try {
        if (!message.member.permissions.has('KICK_MEMBERS')) {
          message.delete();
          
          
          return message.channel.send(new Discord.MessageEmbed().setDescription(`${message.author} **__Reklam Yapmamalısın!__**`).setColor('ff0000')).then(x => x.delete({timeout: 5000}));
          
          
        }
      } catch(err) {
        console.log(err);
    }
  }
}
if (!lus) return;
});

//--------------------------------------------------------------------------------------\\
