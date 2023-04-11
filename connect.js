
const { joinVoiceChannel } = require('@discordjs/voice');
const { Client, Intents } = require('discord.js');
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES
  ]
});


client.on('ready', () => {
  console.log(`Bot ${client.user.tag} jest gotowy do działania!`);
});

async function connection(message) { // usuń drugi argument "client"

  if (!message || !message.client || !message.client.user) {
    console.error('Nieprawidłowe parametry wejściowe!');
    return;
  }

  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel) {
    return message.reply('Musisz być połączony z kanałem głosowym, aby użyć tej komendy!');
  }

  if (message.guild.members.cache.get(message.client.user.id).voice.channel) {
    return message.reply('Bot jest już połączony z kanałem głosowym!');
  }

  try {
    const connection = await joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    });
    console.log(`Bot dołączył do kanału głosowego: ${voiceChannel.name}`);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {connection}