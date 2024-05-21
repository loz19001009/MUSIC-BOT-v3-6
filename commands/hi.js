const { ApplicationCommandOptionType } = require('discord.js');
const db = require("../mongoDB");

module.exports = {
  name: "hi",
  description: "Chào người dùng.",
  permissions: "0x0000000000000800",
  options: [],

  run: async (client, interaction) => {
    try {
      const user = interaction.user; // Lấy thông tin người dùng từ interaction
      const username = user.username; // Lấy tên người dùng
      interaction.reply(`Chào ${username}!`); // Trả lời bằng tên người dùng
    } catch (e) {
      console.error(e); 
    }
  },
};
