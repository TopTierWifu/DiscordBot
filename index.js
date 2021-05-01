const Master = require("eris-sharder").Master;
const { token } = require("../tokens/bot-auth.json");

const sharder = new Master(token, "/src/bot.js", {
    stats: true,
    name: "Bot",
    clientOptions: {
        defaultImageFormat: "png",
        defaultImageSize: 1024,
        intents: 771,
        messageLimit: 0,
        allowedMentions: {
            everyone: false,
            roles: false,
            repliedUser: false
        }
    }
});