// Config file
const config = require("./src/config.json");

// Tokens
const debug = config.debug;

const auth = debug ? require("../tokens/debug-bot-auth.json") : require("../tokens//bot-auth.json");

// Eris-Sharder
const Sharder = require("eris-sharder").Master;

// Start Bot
try {
    const sharder = new Sharder(auth.token, config.sharder.path, {
        stats: true,
        name: config.sharder.name,
        allowedMentions: config.sharder.allowedMentions,
        clientOptions: config.eris.clientOptions
    });
} catch (e) {
    console.error("Failed to start eris sharder");
    console.error(e);
}