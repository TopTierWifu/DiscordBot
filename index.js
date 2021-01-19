const Client = require("./lib/client");
const TOKEN = require("./secret.json").TOKEN;

const BOT = new Client(TOKEN);
BOT.login();