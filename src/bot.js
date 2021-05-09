const Base = require("eris-sharder").Base;

module.exports = class Bot extends Base {
    /**
     * @param {import("eris").Client} bot
     */
    constructor(bot) {
        super(bot);

        /**@type {import("eris").Client} */
        this.bot;

        //To remove the warning for messages with an unknown type (20) resulting from Interaction Responses 
        this.bot.removeAllListeners("warn");

        this.eventHandler = new (require("./events/eventHandler"))(this);

        /**@type Map<`${bigint}`, import("./commands/command")> */
        this.commands = new Map();
        this.commandHandler = new (require("./commands/commandHandler"))(this);

        /**
         * Typed rest request function (mainly for interaction responses)
         * @param {string} route 
         * @param {"GET" | "POST" | "PUT" | "DELETE" | "PATCH"} [method] 
         * @param {*} [body] 
         */
        this.requestREST = async (route, method = "GET", body) => {
            // @ts-ignore
            return await this.bot.requestHandler.request(method, route, true, body);
        }

        //Util classes
        this.get = new (require("./util/get"))(this);
        this.format = new (require("./util/format"));
        this.send = new (require("./util/send").Send)(this);
    }

    launch() {

    }
}