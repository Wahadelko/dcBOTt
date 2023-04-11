const { getVoiceConnection } = require('@discordjs/voice');

async function disconnect(message) {
  if (!message || !message.client || !message.client.user) {
    console.error('Nieprawidłowe parametry wejściowe!');
    return;
  }

  const voiceConnection = getVoiceConnection(message.guild.id);
  if (!voiceConnection) {
    return message.reply('Bot nie jest połączony z żadnym kanałem głosowym!');
  }

  try {
    voiceConnection.destroy();
    console.log(`Bot rozłączył się z kanałem głosowym: ${voiceConnection.joinConfig.channel.name}`);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  disconnect
};