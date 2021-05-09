const debug = require("../tokens/bot-auth.json").debug;
const auth = require("../tokens/bot-auth.json");
const botAuth = debug ? auth.testBotAuth : auth.botAuth;
const Master = require("eris-sharder").Master;
const commandEditor = false;

const sharder = new Master(botAuth.token, commandEditor ? "/src/commandEditor.js" : "/src/bot.js", {
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
        restMode: true
    }
});

const testGuildID = "604719438805205004";

module.exports = class SlashCommands {
    /**@param {import("./src/commandEditor")} base */
    constructor(base) { this.command = base.slashCommand; }

    async execute() {

    }
}