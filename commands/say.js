const { ApplicationCommandOptionType } = require('discord.js');
const db = require("../mongoDB");

module.exports = {
  name: "say",
  description: "Bot sẽ nói điều bạn muốn.",
  permissions: "0x0000000000000800",
  options: [{
    name: 'message',
    type: ApplicationCommandOptionType.STRING,
    description: 'Nội dung bạn muốn bot nói.',
    required: true,
  }],

  run: async (client, interaction) => {
    try {
      // Lấy nội dung từ tùy chọn 'message'
      const message = interaction.options.getString('message');
      
      // Trả lời với nội dung được chỉ định
      interaction.reply(message);
    } catch (e) {
      console.error(e); 
    }
  },
};
