const Master = require("eris-sharder").Master;
const { token } = require("../tokens/bot-auth.json");

const sharder = new Master(token, "/src/bot.js", {
    allowedMentions: {
        everyone: false,
        roles: false,
        repliedUser: false
    },
    defaultImageFormat: "png",
    intents: 771,
    messageLimit: 1,
    stats: true,
    name: "Bot"
});