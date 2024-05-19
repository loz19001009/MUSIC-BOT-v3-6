const { ApplicationCommandOptionType } = require('discord.js');
const db = require("../mongoDB");

module.exports = {
  name: "hi",
  description: "Chào Legend_august.",
  permissions: "0x0000000000000800",
  options: [],

  run: async (client, interaction) => {
    try {
      interaction.reply('Chào Legend_august!');
    } catch (e) {
      console.error(e); 
    }
  },
};
