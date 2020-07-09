const config = require('./config.json');
const Sharder = require('eris-sharder').Master;
const sharder = new Sharder(config.token, "/src/bot.js", {
  stats: true,
  debug: true,
  guildsPerShard: 1500,
  name: "Wifu Bot",
  clientOptions: {
      messageLimit: 150,
      defaultImageFormat: "png"
  }
});
 
sharder.on("stats", stats => {
  console.log(stats);
});