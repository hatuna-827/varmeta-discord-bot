const { Client, GatewayIntentBits, EmbedBuilder, ChannelType } = require("discord.js");
const fs = require("fs");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

client.on("clientReady", async () => {
  console.log(`\nLogged in as ${client.user.tag}`);

  console.log("\n===== Bot が参加しているサーバー一覧 =====\n");
  client.guilds.cache.forEach((guild) => {
    console.log(`${guild.name} : ${guild.id}`);
    categories = guild.channels.cache
      .filter(ch => ch.type === ChannelType.GuildCategory)
      .sort((a, b) => a.position - b.position).forEach((categorie) => {
        console.log(`  ${categorie.name} : ${categorie.id}`);
        categorie.children.cache
          .sort((a, b) => a.position - b.position)
          .forEach((channel) => {
            // if (channel) {
              console.log(`    ${channel.position}${channel.name} : ${channel.id}`);
            // }
          });
      });
  });

  console.log("\n==========================================\n")
});

client.on("messageCreate", (message) => {
  if (message.author.bot) { return; }

  if (message.content === "こんにちは") {
    // const embed = new EmbedBuilder()
    //   .setColor(0x3498db)
    //   .setTitle("📢 お知らせ")
    //   .setDescription("これはサンプルの埋め込みメッセージです。")
    //   .addFields(
    //     { name: "項目1", value: "値1", inline: true },
    //     { name: "項目2", value: "値2", inline: true },
    //     { name: "詳細情報", value: "これは長文の詳細説明です。" }
    //   )
    //   .setThumbnail("https://example.com/icon.png")
    //   .setImage("https://example.com/banner.png")
    //   .setFooter({ text: "フッターテキスト", iconURL: "https://example.com/footer.png" })
    //   .setTimestamp();
    // message.channel.send({ embeds: [embed] });

    // const embed = new EmbedBuilder()
    //   .setTitle("こんにちは")
    //   .setDescription("saluton")
    //   .setColor(0x00ffcc);
    // message.channel.send({ embeds: [embed] });

    message.channel.send("こんにちは！");
  }
});

const token = fs.readFileSync("token.txt", "utf8").trim();
console.log("Token :", token);
client.login(token);