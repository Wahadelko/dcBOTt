const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

function tiktaktoe(msg) {
  // Define the initial state of the board
  const tab = [
    ['-', '-', '-'],
    ['-', '-', '-'],
    ['-', '-', '-']
  ];

  // Create a new message with buttons for each cell
  const boardMessage = new MessageEmbed()
    .setTitle('TicTacToe')
    .setDescription('Click a cell to make a move.');

  const row1 = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setCustomId('cell_00')
        .setLabel(tab[0][0])
        .setStyle('PRIMARY'),
      new MessageButton()
        .setCustomId('cell_01')
        .setLabel(tab[0][1])
        .setStyle('PRIMARY'),
      new MessageButton()
        .setCustomId('cell_02')
        .setLabel(tab[0][2])
        .setStyle('PRIMARY')
    );
  
  const row2 = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setCustomId('cell_10')
        .setLabel(tab[1][0])
        .setStyle('PRIMARY'),
      new MessageButton()
        .setCustomId('cell_11')
        .setLabel(tab[1][1])
        .setStyle('PRIMARY'),
      new MessageButton()
        .setCustomId('cell_12')
        .setLabel(tab[1][2])
        .setStyle('PRIMARY')
    );

  const row3 = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setCustomId('cell_20')
        .setLabel(tab[2][0])
        .setStyle('PRIMARY'),
      new MessageButton()
        .setCustomId('cell_21')
        .setLabel(tab[2][1])
        .setStyle('PRIMARY'),
      new MessageButton()
        .setCustomId('cell_22')
        .setLabel(tab[2][2])
        .setStyle('PRIMARY')
    );

  const rows = [row1, row2, row3];
  msg.reply({ embeds: [boardMessage], components: rows });

  // Create a listener for button clicks
  const filter = i => {
    return i.isButton() && i.user.id === msg.author.id;
  };

  const collector = msg.channel.createMessageComponentCollector({ filter, time: 15000 });

  collector.on('collect', i => {
  const [rowIndex, colIndex] = i.customId.split('_').slice(1).map(Number);

  if (tab[rowIndex][colIndex] === '-') {
    tab[rowIndex][colIndex] = 'X'; // TODO: replace with your game logic

    // Update the label of the clicked button and disable it
    i.update({ label: tab[rowIndex][colIndex], disabled: true }).catch(console.error);
  } else {
    console.error(`Invalid move: ${i.customId}`);
    msg.reply('This move is not valid! Please choose another cell.');
  }
});
}

module.exports = { tiktaktoe };