/*

  ________.__                        _____.___.___________
 /  _____/|  | _____    ____  ____   \__  |   |\__    ___/
/   \  ___|  | \__  \ _/ ___\/ __ \   /   |   |  |    |   
\    \_\  \  |__/ __ \\  \__\  ___/   \____   |  |    |   
 \______  /____(____  /\___  >___  >  / ______|  |____|   
        \/          \/     \/    \/   \/                  

╔════════════════════════════════════════════════════════════════════════╗
║                                                                        ║
║  ## Created by GlaceYT!                                                ║
║  ## Feel free to utilize any portion of the code                       ║
║  ## DISCORD :  https://discord.com/invite/xQF9f9yUEM                   ║
║  ## YouTube : https://www.youtube.com/@GlaceYt                         ║
║                                                                        ║
╚════════════════════════════════════════════════════════════════════════╝


*/
const { ApplicationCommandOptionType } = require('discord.js');
const db = require("../mongoDB");

const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const { ButtonStyle } = require('discord.js');

module.exports = {
  name: "help",
  description: "Nhận thông tin về bot và các lệnh.",
  permissions: "0x0000000000000800",
  options: [],

  run: async (client, interaction) => {
    try {
      const musicCommandsEmbed = new EmbedBuilder()
        .setColor("#00FA9A")
        .setTitle('🎸 **Các Lệnh Âm Nhạc**')
        .addFields(
          { name: '🎹 Play', value: 'Phát một bài hát từ một liên kết hoặc văn bản từ các nguồn' },
          { name: '⏹️ Stop', value: 'Dừng bot phát nhạc và rời kênh thoại' },
          { name: '📊 Queue', value: 'Xem và quản lý hàng đợi bài hát của máy chủ này' },
          { name: '⏭️ Skip', value: 'Bỏ qua bài hát đang phát' },
          { name: '⏸️ Pause', value: 'Tạm dừng bài hát đang phát' },
          { name: '▶️ Resume', value: 'Tiếp tục phát bài hát tạm dừng' },
          { name: '🔁 Loop', value: 'Chuyển đổi chế độ lặp lại cho hàng đợi và bài hát hiện tại' },
          { name: '🔄 Autoplay', value: 'Bật hoặc tắt chế độ autoplay [phát nhạc ngẫu nhiên]' },
          { name: '⏩ Seek', value: 'Chuyển đến một thời điểm cụ thể trong bài hát hiện tại' },
          { name: '⏮️ Previous', value: 'Phát bài hát trước đó trong hàng đợi' },
          { name: '🔀 Shuffle', value: 'Xáo trộn các bài hát trong hàng đợi' },
          { name: '📃 Playlist', value: 'Quản lý danh sách phát' }
        )
        .setImage(`https://cdn.discordapp.com/attachments/1004341381784944703/1165201249331855380/RainbowLine.gif?ex=654f37ba&is=653cc2ba&hm=648a2e070fab36155f4171962e9c3bcef94857aca3987a181634837231500177&`); 

      const basicCommandsEmbed = new EmbedBuilder()
        .setColor("#00FA9A")
        .setTitle('✨ **Các Lệnh Cơ Bản**')
        .addFields(
          { name: '🏓 Ping', value: "Kiểm tra độ trễ của bot" },
          { name: '🗑️ Clear', value: 'Xóa hàng đợi bài hát của máy chủ này' },
          { name: '⏱️ Time', value: 'Hiển thị thời gian phát bài hát hiện tại' },
          { name: '🎧 Filter', value: 'Áp dụng bộ lọc để tăng cường âm thanh theo ý thích của bạn' },
          { name: '🎵 Now Playing', value: 'Hiển thị thông tin bài hát đang phát hiện tại' },
          { name: '🔊 Volume', value: 'Điều chỉnh âm lượng nhạc [nghe ở âm lượng cao là rủi ro]' },
        ) 
       .setImage('https://24.media.tumblr.com/tumblr_mbvun2tUgH1r996ixo1_500.gif')
      
      const button1 = new ButtonBuilder()
        .setLabel('YouTube')
        .setURL('https://www.youtube.com/channel/UCmafLXLjqiQShFwIO2DDdEg')
        .setStyle(ButtonStyle.Link);

      const button2 = new ButtonBuilder()
        .setLabel('Discord')
        .setURL('https://discord.gg/v8Pcmh9u')
        .setStyle(ButtonStyle.Link);

      const row = new ActionRowBuilder()
        .addComponents(button1, button2);

      interaction.reply({
        embeds: [musicCommandsEmbed, basicCommandsEmbed],
        components: [row]
      }).catch(e => {});
    } catch (e) {
      console.error(e);
    }
  },
};


/*

  ________.__                        _____.___.___________
 /  _____/|  | _____    ____  ____   \__  |   |\__    ___/
/   \  ___|  | \__  \ _/ ___\/ __ \   /   |   |  |    |   
\    \_\  \  |__/ __ \\  \__\  ___/   \____   |  |    |   
 \______  /____(____  /\___  >___  >  / ______|  |____|   
        \/          \/     \/    \/   \/                  

╔════════════════════════════════════════════════════════════════════════╗
║                                                                        ║
║  ## Created by GlaceYT!                                                ║
║  ## Feel free to utilize any portion of the code                       ║
║  ## DISCORD :  https://discord.com/invite/xQF9f9yUEM                   ║
║  ## YouTube : https://www.youtube.com/@GlaceYt                         ║
║                                                                        ║
╚════════════════════════════════════════════════════════════════════════╝


*/
