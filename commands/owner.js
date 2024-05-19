const { ApplicationCommandOptionType } = require('discord.js');
const db = require("../mongoDB");

module.exports = {
  name: "owner",
  description: "Nhận thông tin về chủ sở hữu của bot.",
  permissions: "0x0000000000000800",
  options: [],

  run: async (client, interaction) => {
    try {
      const youtubeLink = 'https://discord.gg/xQF9f9yUEM';
      const InstagramLink = 'https://www.instagram.com/rtxxgg/';
      const { EmbedBuilder } = require('discord.js')
        const embed = new EmbedBuilder()
            .setColor('#da2a41')
            .setAuthor({
          name: 'Owner',
          iconURL: 'https://cdn.discordapp.com/attachments/1156866389819281418/1157310253520662638/2443-iconperson.png?ex=651824aa&is=6516d32a&hm=0becc4a0fda01e5a02a63cf098db30c287e60a474f8d2da4ddeae7f47d98a5a3&',
          url: 'https://discord.gg/zYKjkMTt'
        })
            .setDescription(`__**About me**__:\n\n ▶️ Tôi là Dương, còn được biết đến với biệt danh Legend_august. Tôi là một nhà phát triển bot Discord và nhà phát triển web. Tôi thích chơi game, xem anime và xây dựng các ứng dụng máy chủ web khác nhau. Bạn sẽ nhận được các phản hồi nhanh hơn trên discord so với các mạng xã hội khác. Hãy liên hệ với tôi thoải mái!\n YouTube : ❤️ [Legend_august](https://www.youtube.com/channel/UCmafLXLjqiQShFwIO2DDdEg)\n Facebook : 💙 [Bùi Xuân Dương](https://www.facebook.com/k2605)`)
            .setTimestamp();
      interaction.reply({ embeds: [embed] }).catch(e => {});

    } catch (e) {
    console.error(e); 
  }
  },
};

