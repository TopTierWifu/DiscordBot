const WebSocketManager = require("./ws/WebSocketManager");
const RestAPIManager = require ("./rest/RestAPIManager");
const EventHandler = require("./event/EventHandler");
const CommandHandler = require("../src/commands/commandHandler");

module.exports = class Client{
        
    constructor(token) {
        this.token = token;
        this.rest = new RestAPIManager(this);
        this.gateway = new WebSocketManager(this);
        this.eventHandler = new EventHandler(this);
        this.commandHandler = new CommandHandler(this);

        this.users = new Map();
    }

    login() {
        this.gateway.connect();
    }

    debugLog(event, outgoing){
        const now = new Date().toLocaleTimeString("it-IT");
        console.log(`[${now}] ${this.gateway.sequence_number}${outgoing?">":"<"} ${event}`);
    }

}
