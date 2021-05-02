const debug = require("../tokens/bot-auth.json").debug;

const token = debug ? require("../tokens/bot-auth.json").testToken : require("../tokens/bot-auth.json").token;
const Master = require("eris-sharder").Master;

const sharder = new Master(token, "/src/bot.js", {
    stats: true,
    name: "Bot",
    allowedMentions: {
        everyone: false,
        roles: false,
        repliedUser: false,
        user: true
    },
    clientOptions: {
        defaultImageFormat: "png",
        defaultImageSize: 1024,
        intents: 771,
        messageLimit: 0,
        restMode: true,
    }
});