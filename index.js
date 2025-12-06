const { Client, GatewayIntentBits, ChannelType, EmbedBuilder } = require("discord.js");
const readline = require("readline");
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

client.on("clientReady", async () => {
  console.log(`\nLogged in as ${client.user.tag}`);

  console.log("\n===== Bot が参加しているサーバー一覧 =====\n");
  client.guilds.cache.forEach(async (guild) => {
    console.log(`${guild.name} : ${guild.id}`);
    categories = guild.channels.cache
      .filter(ch => ch.type === ChannelType.GuildCategory)
      .sort((a, b) => a.position - b.position).forEach((categorie) => {
        console.log(`  [${categorie.position}]${categorie.name} : ${categorie.id}`);
        categorie.children.cache
          .sort((a, b) => a.position - b.position)
          .forEach((channel) => {
            console.log(`    ${channel.position}${channel.name} : ${channel.id}`);
          });
      });
  });
  console.log("\n==========================================\n")

  const user = await client.users.fetch(process.env.HATUNA_ID);
  user.send("Varmeta-discord-botが起動しました。");

  rl.on("line", async (text) => {
    const channelId = process.env.VARMETA_CHANNEL_ID;
    const channel = await client.channels.fetch(channelId);
    if (!channel) {
      console.log("チャンネルが見つかりません");
      return;
    }
    channel.send(text)
      .catch(console.error);
  });
});

client.on("messageCreate", (message) => {
  if (message.author.bot) { return; }
  if (message.channel.id == process.env.VARMETA_CHANNEL_ID) {
    console.log(`[${message.author.globalName}] ${message.content}`);
  }

  if (message.content === "ぬるぽ") {
    // const embed = new EmbedBuilder()
    //   .setTitle("こんにちは")
    //   .setDescription("saluton")
    //   .setColor(0x00ffcc);
    // message.channel.send({ embeds: [embed] });

    message.channel.send("ｶﾞｯ!");
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }
  if (interaction.commandName === 'ping') {
    await interaction.reply({ content: 'Pong!', ephemeral: true });
  }
});

const token = process.env.DISCORD_TOKEN;
console.log("Token :", token);
client.login(token);
