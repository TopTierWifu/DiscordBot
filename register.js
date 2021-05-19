// Config file
const config = require("./src/config.json");

// Tokens
const debug = config.debug;

const auth = debug ? require("../tokens/debug-bot-auth.json") : require("../tokens//bot-auth.json");

// Command "client"
const slashCommands = new (require("./src/util/commands"))(auth);

const testGuildID = "604719438805205004";

(async () => {
    try {
        /* Edit commands here
        *
        * Command require example
        * const command = require("./src/commands/commandList/test");
        */

        console.log(JSON.stringify(await slashCommands.getAllGuild(testGuildID), null, 3));
    } catch (e) {
        console.error(e);
    }
})();