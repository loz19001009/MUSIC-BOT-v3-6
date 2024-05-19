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
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const db = require("../mongoDB");

module.exports = {
  name: "skip",
  description: "Chuyển bài hát đang phát.",
  permissions: "0x0000000000000800",
  options: [{
    name: "số_lượng",
    description: "Chọn số lượng bài hát bạn muốn bỏ qua",
    type: ApplicationCommandOptionType.Number,
    required: false
  }],
  voiceChannel: true,
  run: async (client, interaction) => {
    try {

      const queue = client.player.getQueue(interaction.guild.id);
      if (!queue || !queue.playing) return interaction.reply({ content: '⚠️ Không có nhạc đang phát!!', ephemeral: true }).catch(e => { })

      let number = interaction.options.getNumber('số_lượng');
      if (number) {
        if (!queue.songs.length > number) return interaction.reply({ content: '⚠️ Số lượng bài hát vượt quá số hiện tại', ephemeral: true }).catch(e => { })
        if (isNaN(number)) return interaction.reply({ content: '⚠️ Số không hợp lệ', ephemeral: true }).catch(e => { })
        if (1 > number) return interaction.reply({ content: '⚠️ Số không hợp lệ', ephemeral: true }).catch(e => { })

        try {
          let old = queue.songs[0];
          await client.player.jump(interaction, number).then(song => {
            return interaction.reply({ content: `⏯️ Đã bỏ qua : **${old.name}**` }).catch(e => { })
          })
        } catch(e) {
          return interaction.reply({ content: '❌ Hàng đợi đang trống!!', ephemeral: true }).catch(e => { })
        }
      } else {
        try {
          const queue = client.player.getQueue(interaction.guild.id);
          if (!queue || !queue.playing) {
            return interaction.reply({ content: '⚠️ Không có nhạc đang phát!!', ephemeral: true });
          }

          let old = queue.songs[0];
          const success = await queue.skip();

          const embed = new EmbedBuilder()
            .setColor('#3498db')
            .setAuthor({
              name: 'Bài Hát Đã Bị Bỏ Qua',
              iconURL: 'https://cdn.discordapp.com/attachments/1156866389819281418/1157269773118357604/giphy.gif?ex=6517fef6&is=6516ad76&hm=f106480f7d017a07f75d543cf545bbea01e9cf53ebd42020bd3b90a14004398e&',
              url: 'https://discord.gg/FUEHs7RCqz'
            })
            .setDescription(success ? ` **BỎ QUA** : **${old.name}**` : '❌ Hàng đợi đang trống!')
            .setTimestamp();

          return interaction.reply({ embeds: [embed] });
        } catch (e) {
          return interaction.reply({ content: '❌ Hàng đợi đang trống!!', ephemeral: true }).catch(e => { })
        }
      }

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
