const { EmbedBuilder } = require('discord.js');
const db = require("../mongoDB");
module.exports = {
  name: "nowplaying",
  description: "Xem thông tin bài hát hiện tại.",
  permissions: "0x0000000000000800",
  options: [],
  run: async (client, interaction) => {
    try {

      const queue = client.player.getQueue(interaction.guild.id);
      if (!queue || !queue.playing) return interaction.reply({ content: `⚠️ Không có bài hát nào đang phát!!`, ephemeral: true }).catch(e => { })

      const track = queue.songs[0];
      if (!track) return interaction.reply({ content: `⚠️ Không có bài hát nào đang phát!!`, ephemeral: true }).catch(e => { })

      const embed = new EmbedBuilder();
      embed.setColor(client.config.embedColor);
      embed.setThumbnail(track.thumbnail);
      embed.setTitle(track.name)
      embed.setDescription(`> **Âm thanh** \`%${queue.volume}\`
> **Thời lượng :** \`${track.formattedDuration}\`
> **URL :** **${track.url}**
> **Chế độ lặp :** \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'Toàn bộ hàng đợi' : 'Bài hát này') : 'Tắt'}\`
> **Bộ lọc**: \`${queue.filters.names.join(', ') || 'Tắt'}\`
> **Bởi :** <@${track.user.id}>`);


      interaction.reply({ embeds: [embed] }).catch(e => { })

    }  catch (e) {
    console.error(e); 
  }
  },
};

