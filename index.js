const { listener } = require('./F_listener.js');
const { tiktaktoe } = require('./tiktaktoe.js');
const { rockPaperScissors } = require('./rockPaperSissors.js');
const { connection} = require('./connect.js');
const { disconnect } = require('./disconnect');

require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES]
});

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async msg => {
  if(msg.content === "$tiktaktoe")tiktaktoe(msg);
//
  if(msg.content === "$rps") await rockPaperScissors(msg);
//
  if(msg.content === "$join")connection(msg);
  else if(msg.content === "$out")disconnect(msg);
  listener(msg);
});

client.login(process.env.key);