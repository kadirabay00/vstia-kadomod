const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');

process.env.prefix;

module.exports = client => {
  console.log(`Botun destekçileri ve komutları başarıyla yüklendi, işlemler tamamlandı !`);
  console.log(`(${client.user.username})
  ‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒‒`);
  client.user.setStatus("online");
  client.user.setActivity("Vestia ❤️ ⚚ Kado#0001", { type: "PLAYING"});
  console.log(`Hazır!`);

};
