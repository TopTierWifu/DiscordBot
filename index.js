require('dotenv').config();

const testing = true;

const config = require("./src/data/config.json");

const Sharder = require('eris-sharder').Master;
const sharder = new Sharder((testing) ? process.env.TEST_BOT_TOKEN : process.env.BOT_TOKEN, process.env.SHARDER_PATH, {
    name: (testing) ? process.env.TEST_NAME : process.env.NAME,
    clientOptions: config.clientOptions
}); //This starts the bot