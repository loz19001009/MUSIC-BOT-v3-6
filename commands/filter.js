const db = require("../mongoDB");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  name: "filter",
  description: "Thêm bộ lọc âm thanh vào nhạc đang phát.",
  permissions: "0x0000000000000800",
  options: [],
  voiceChannel: true,
  run: async (client, interaction) => {
    try {
      const queue = client?.player?.getQueue(interaction?.guild?.id);
      if (!queue || !queue?.playing) return interaction?.reply({ content: '⚠️ Không có nhạc đang phát!!', ephemeral: true }).catch(e => { })

      let buttons = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
        .setLabel("3D")
        .setCustomId('3d')
        .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
        .setLabel("Bassboost")
        .setCustomId('bassboost')
        .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
        .setLabel("Echo")
        .setCustomId('echo')
        .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
        .setLabel("Nightcore")
        .setCustomId('nightcore')
        .setStyle(ButtonStyle.Secondary)
      )

      let buttons2 = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel("Vaporwave")
          .setCustomId('vaporwave')
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
        .setLabel("Surround")
        .setCustomId('surround')
        .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
        .setLabel("Earwax")
        .setCustomId('earwax')
        .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
        .setLabel("Karaoke")
        .setCustomId('karaoke')
        .setStyle(ButtonStyle.Secondary)
      )
      
      let embed = new EmbedBuilder()
        .setColor('#01fe66')
        .setAuthor({
          name: 'Bộ Lọc Âm Thanh',
          iconURL: 'https://cdn.discordapp.com/attachments/1156866389819281418/1157534645311766558/2353-arrowrightglow.gif?ex=6518f5a5&is=6517a425&hm=ce55696f7ed85e2f7a97a3505eb39016fa9cd0c50be043efdf0cce06d7126b4c&',
          url: 'https://discord.gg/FUEHs7RCqz'
        })
        .setDescription('**Khám phá Beat, Chọn Magic Sound dưới đây!**')
  
      interaction.reply({ embeds: [embed], components: [buttons, buttons2] }).then(async Message => {

        const filter = i => i.user.id === interaction?.user?.id
        let col = await Message?.createMessageComponentCollector({ filter, time: 60000 });

        col.on('collect', async (button) => {
          if (button?.user?.id !== interaction?.user?.id) return
          await button?.deferUpdate().catch(e => { })
          let filters = ["3d", "bassboost", "echo", "karaoke", "nightcore", "vaporwave", "surround", "earwax"]
          if(!filters?.includes(button?.customId)) return

          let filter = button.customId.toLowerCase();
          if (!filter) return interaction?.editReply({ content: '❌ Tên không hợp lệ', ephemeral: true }).catch(e => { })

          if (filters?.includes(filter)) {
            if (queue?.filters?.has(filter)) {
              queue?.filters?.remove(filter);
              embed?.setDescription(`Magic : **${filter}**, Trạng thái áp dụng: **❌**`);
              return interaction?.editReply({ embeds: [embed] }).catch(e => { })
            } else {
              queue?.filters?.add(filter);
              embed?.setDescription(`Magic : **${filter}**, Trạng thái áp dụng: **✅**`);
              return interaction?.editReply({ embeds: [embed] }).catch(e => { })
            }
          } else {
            const validFilter = filters?.find((x) => x?.toLowerCase() === filter);
            embed?.setDescription(`❌ Không tìm thấy bộ lọc!!`.replace("{filters}", filters?.map(mr => `\`${mr}\``).join(", ")));
            if (!validFilter) return interaction?.editReply({ embeds: [embed] }).catch(e => { })
          }
        })

        col.on('end', async (button, reason) => {
          if (reason === 'time') {
            embed = new EmbedBuilder()
              .setColor(client?.config?.embedColor)
              .setTitle("Hết thời gian.")

            await interaction?.editReply({ embeds: [embed], components: [] }).catch(e => { })
          }
        })
      })

    } catch (e) {
      console.error(e); 
    }
  },
};
