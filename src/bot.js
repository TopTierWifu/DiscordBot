const Base = require("eris-sharder").Base;

/**
 * @typedef {import("./typings/eris").Client} Client
 * @typedef {import("./typings/bot").Commands} Commands
 * @typedef {import("./typings/bot").HTTPMethods} HTTPMethods
 */

module.exports = class Bot extends Base {
    /**
     * @param {Client} bot
     */
    constructor(bot) {
        super(bot);

        /**@type {Client} */
        this.bot;

        //To remove the warning for messages with an unknown type (20) resulting from Interaction Responses 
        this.bot.removeAllListeners("warn");
        //To remove the error Connection reset by peer
        this.bot.removeAllListeners("error");

        this.eventHandler = new (require("./events/eventHandler"))(this);

        /**@type {Commands} */
        this.commands = new Map();
        this.commandHandler = new (require("./commands/commandHandler"))(this);

        this.db = new (require("./util/mySQL"));
        this.query = this.db.query.bind(this.db);

        /**
         * Typed rest request function (mainly for interaction responses)
         * @param {string} route 
         * @param {HTTPMethods} [method] 
         * @param {*} [body] 
         */
        this.requestREST = async (route, method = "GET", body) => {
            // @ts-ignore
            return await this.bot.requestHandler.request(method, route, true, body);
        }

        //Game items
        this.items = require("../../tokens/items.json");

        //Util classes
        this.get = new (require("./util/get"))(this.bot);
        this.format = new (require("./util/format"));
        this.send = new (require("./util/send").Send)(this);
    }

    launch() {

    }
}