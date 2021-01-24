const WebSocketManager = require("./handlers/WebSocketManager");
const RestAPIManager = require ("./handlers/RestAPIManager");
const EventHandler = require("./handlers/EventHandler");
const CommandHandler = require("../src/commands/commandHandler");
const Users = require("./structures/Users");

module.exports = class Client{
        
    constructor(token) {
        this.token = token;
        this.rest = new RestAPIManager(this);
        this.gateway = new WebSocketManager(this);
        this.eventHandler = new EventHandler(this);
        this.commandHandler = new CommandHandler(this);

        this.users = new Users();
        
        this.Message = require("./structures/Message");
        this.User = require("./structures/User");
    }

    login() {
        this.gateway.connect();
    }

    debugLog(event, outgoing){
        const now = new Date().toLocaleTimeString("it-IT");
        console.log(`[${now}] ${this.gateway.sequence_number}${outgoing?">":"<"} ${event}`);
    }

}
