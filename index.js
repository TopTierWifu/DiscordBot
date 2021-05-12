// node . {debug?} {command editor mode?}
const [debug, commandEditor] = process.argv.slice(2);

const auth = require("../tokens/bot-auth.json");
const botAuth = (debug === "true") ? auth.debugBotAuth : auth.botAuth;
const Master = require("eris-sharder").Master;

const sharder = new Master(botAuth.token, (commandEditor === "true") ? "/src/commandEditor.js" : "/src/bot.js", {
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