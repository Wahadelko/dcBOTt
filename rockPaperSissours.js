const Discord = require('discord.js');
async function rockPaperScissors(message) {
  const options = [
    { name: '👊', value: 'rock' },
    { name: '🧻', value: 'paper' },
    { name: '✂️', value: 'scissors' },
  ];
  
  const randomOption = options[Math.floor(Math.random() * options.length)].value;

  const embed = new Discord.MessageEmbed()
    .setTitle('Rock Paper Scissors')
    .setColor('#0099ff')
    .setDescription(
      'React with the emoji corresponding to your choice:\n👊 - rock\n🧻 - paper\n✂️ - scissors'
    );

  const reply = await message.reply({ embeds: [embed] });
  for (const option of options) {
    await reply.react(option.name);
  }

  const filter = (reaction, user) => {
    return (
      options.some((option) => option.name === reaction.emoji.name) &&
      user.id === message.author.id
    );
  };

  try {
    console.log('Waiting for reactions...');
    const collected = await reply.awaitReactions(filter, { max: 1, time: 3000, errors: ['time'] });
    console.log('Reactions collected:', collected);

    const reaction = collected.first();

    if (!reaction) {
      message.reply('No reaction was detected within the allowed time. The game has been cancelled.');
      return;
    }

    const userOption = options.find(option => option.name === reaction.emoji.name);
    if (!userOption) {
      console.error(`Unexpected emoji name: ${reaction.emoji.name}`);
      return;
    }
    const userChoice = userOption.value;

    let resultMessage;
    switch (userChoice) {
      case 'rock':
        switch (randomOption) {
          case 'rock':
            resultMessage = 'Draw.';
            break;
          case 'paper':
            resultMessage = 'I won.';
            break;
          case 'scissors':
            resultMessage = 'You won!';
            break;
          default:
            throw new Error(`Unexpected random option: ${randomOption}`);
        }
        break;
      case 'paper':
        switch (randomOption) {
          case 'rock':
            resultMessage = 'You won!';
            break;
          case 'paper':
            resultMessage = 'Draw.';
            break;
          case 'scissors':
            resultMessage = 'I won.';
            break;
          default:
            throw new Error(`Unexpected random option: ${randomOption}`);
        }
        break;
      case 'scissors':
        switch (randomOption) {
          case 'rock':
            resultMessage = 'I won.';
            break;
          case 'paper':
            resultMessage = 'You won!';
            break;
          case 'scissors':
            resultMessage = 'Draw.';
            break;
          default:
            throw new Error(`Unexpected random option: ${randomOption}`);
        }
        break;
      default:
        throw new Error(`Unexpected user choice: ${userChoice}`);
    }

    message.reply(resultMessage);
  } catch (err) {
    console.error(err);
    message.reply('An unexpected error occurred. The game has been cancelled.');
  }
}

module.exports = { rockPaperScissors };