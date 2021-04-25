const Base = require("eris-sharder").Base;

module.exports = class Bot extends Base {
    constructor(bot){
        super(bot);

        //To remove the Interaction Response warning messages with an unknown type (20) 
        this.bot.removeAllListeners("warn");

        this.eventHandler = new (require("./events/eventHandler"))(this);

        /**@type Map<`${bigint}`, import("./commands/command")> */
        this.commands = new Map();
        this.commandHandler = new (require("./commands/commandHandler"))(this);

        /**
         * Typed rest request function (mainly for interaction responses)
         * @param {"GET" | "POST" | "PUT" | "DELETE" | "PATCH"} method 
         * @param {string} route 
         * @param {*} body 
         */
         this.requestREST = async (method, route, body) => {
            await this.bot.requestHandler.request(method, route, true, body);
        }
    }

    launch(){

    }
}