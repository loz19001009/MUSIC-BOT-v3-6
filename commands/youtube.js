const { ApplicationCommandOptionType } = require('discord.js');
const db = require("../mongoDB");

module.exports = {
  name: "youtube",
  description: "Kênh youtube của Legend_august.",
  permissions: "0x0000000000000800",
  options: [],

  run: async (client, interaction) => {
    try {
      interaction.reply('[Legend_august](https://www.youtube.com/channel/UCmafLXLjqiQShFwIO2DDdEg)');
    } catch (e) {
      console.error(e); 
    }
  },
};
