const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const db = require("../mongoDB");
module.exports = {
  name: "playsong",
  description: "Phát một bài hát.",
  permissions: "0x0000000000000800",
  options: [
    {
      name: "normal",
      description: "Mở nhạc từ các nền tảng khác.",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "name",
          description: "Viết tên bài hát của bạn.",
          type: ApplicationCommandOptionType.String,
          required: true
        }
      ]
    },
    {
      name: "playlist",
      description: "Viết tên danh sách phát của bạn.",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "name",
          description: "Viết tên danh sách phát bạn muốn tạo.",
          type: ApplicationCommandOptionType.String,
          required: true
        }
      ]
    },
  ],
  voiceChannel: true,
  run: async (client, interaction) => {
    try {
      let stp = interaction.options.getSubcommand()

      if (stp === "playlist") {
        let playlistw = interaction.options.getString('name')
        let playlist = await db?.playlist?.find().catch(e => { })
        if (!playlist?.length > 0) return interaction.reply({ content: `Không có danh sách phát nào. ❌`, ephemeral: true }).catch(e => { })

        let arr = 0
        for (let i = 0; i < playlist.length; i++) {
          if (playlist[i]?.playlist?.filter(p => p.name === playlistw)?.length > 0) {

            let playlist_owner_filter = playlist[i].playlist.filter(p => p.name === playlistw)[0].author
            let playlist_public_filter = playlist[i].playlist.filter(p => p.name === playlistw)[0].public

            if (playlist_owner_filter !== interaction.member.id) {
              if (playlist_public_filter === false) {
                return interaction.reply({ content: `Bạn không có quyền phát danh sách phát này. ❌`, ephemeral: true }).catch(e => { })
              }
            }

            const music_filter = playlist[i]?.musics?.filter(m => m.playlist_name === playlistw)
            if (!music_filter?.length > 0) return interaction.reply({ content: `Không có nhạc với tên này`, ephemeral: true }).catch(e => { })
                const listembed = new EmbedBuilder()
                .setTitle('Đang tải album của bạn')
                .setColor('#007FFF')
                .setDescription('**🎸 Sẵn sàng cho một cuộc hành trình âm nhạc!**');
            interaction.reply({ content: '', embeds: [listembed] }).catch(e => { })

            let songs = []
            music_filter.map(m => songs.push(m.music_url))

            setTimeout(async () => {
              const playl = await client?.player?.createCustomPlaylist(songs, {
                member: interaction.member,
                properties: { name: playlistw, source: "custom" },
                parallel: true
              });
              const qembed = new EmbedBuilder()
                .setAuthor({
                  name: 'Đã thêm bài hát vào hàng đợi',
                  iconURL: 'https://cdn.discordapp.com/attachments/1156866389819281418/1157218651179597884/1213-verified.gif', 
                  url: 'https://discord.gg/FUEHs7RCqz'
                })
                .setColor('#14bdff')
                .setFooter({ text: 'Sử dụng /queue để biết thêm thông tin' });
           
              await interaction.editReply({ content: '', embeds: [qembed] }).catch(e => {
                  console.error('Lỗi khi phản hồi:', e);
                });

              try {
                await client.player.play(interaction.member.voice.channel, playl, {
                  member: interaction.member,
                  textChannel: interaction.channel,
                  interaction
                })
              } catch (e) {
                await interaction.editReply({ content: `❌ Không tìm thấy kết quả nào!!`, ephemeral: true }).catch(e => { })
              }

              playlist[i]?.playlist?.filter(p => p.name === playlistw).map(async p => {
                await db.playlist.updateOne({ userID: p.author }, {
                  $pull: {
                    playlist: {
                      name: playlistw
                    }
                  }
                }, { upsert: true }).catch(e => { })

                await db.playlist.updateOne({ userID: p.author }, {
                  $push: {
                    playlist: {
                      name: p.name,
                      author: p.author,
                      authorTag: p.authorTag,
                      public: p.public,
                      plays: Number(p.plays) + 1,
                      createdTime: p.createdTime
                    }
                  }
                }, { upsert: true }).catch(e => { })
              })
            }, 3000)
          } else {
            arr++
            if (arr === playlist.length) {
              return interaction.reply({ content: `Không có album ❌`, ephemeral: true }).catch(e => { })
            }
          }
        }
      }

      if (stp === "normal") {
        const name = interaction.options.getString('name');
        if (!name) {
          return interaction.reply({ content: '▶️ Vui lòng cung cấp văn bản hoặc liên kết', ephemeral: true }).catch(e => {});
        }

        const embed = new EmbedBuilder()
          .setColor('#FF0000')
          .setDescription('**🎸 Sẵn sàng cho một cuộc hành trình âm nhạc!**');

        await interaction.reply({ embeds: [embed] }).catch(e => {});

        try {
          await client.player.play(interaction.member.voice.channel, name, {
            member: interaction.member,
            textChannel: interaction.channel,
            interaction
          });
        } catch (e) {
          const errorEmbed = new EmbedBuilder()
            .setColor('#FF0000')
            .setDescription('❌ Không tìm thấy kết quả nào!!');

          await interaction.editReply({ embeds: [errorEmbed], ephemeral: true }).catch(e => {});
        }
      }
    } catch (e) {
      console.error(e); 
    }
  },
};
