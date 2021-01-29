const WebSocketManager = require("./handlers/WebSocketManager");
const RestAPIManager = require ("./handlers/RestAPIManager");
const EventHandler = require("./handlers/EventHandler");
const CommandHandler = require("./handlers/CommandHandler");

const Collection = require("./structures/Collection");
const Guild = require("./structures/Guild");

module.exports = class Client{
        
    constructor(token) {
        this.token = token;
        this.rest = new RestAPIManager(this);
        this.gateway = new WebSocketManager(this);
        this.eventHandler = new EventHandler(this);
        this.commandHandler = new CommandHandler(this);

        this.guilds = new Collection(Guild);
    }

    login() {
        this.gateway.connect();
    }

}
