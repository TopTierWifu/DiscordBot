require('dotenv').config();
const config = require("./src/data/config.json");

const Sharder = require('eris-sharder').Master;
const sharder = new Sharder(process.env.TOKEN, process.env.SHARDER_PATH, {
    name: process.env.NAME,
    clientOptions: config.clientOptions
}); //This starts the bot