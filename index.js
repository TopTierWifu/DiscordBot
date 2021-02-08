const {readdirSync} = require("fs");

const Wifu = require("wifu");
const {TOKEN, OPTIONS} = require("./secret");

const BOT = new Wifu(TOKEN, OPTIONS);

readdirSync("./src/commands").forEach(file => {
    const command = require(`./src/commands/${file}`);
    BOT.addCommand(command);
});