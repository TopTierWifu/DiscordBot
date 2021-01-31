const WebSocketManager = require("./handlers/WebSocketManager");
const RestAPIManager = require ("./handlers/RestAPIManager");
const EventHandler = require("./handlers/EventHandler");
const CommandHandler = require("./handlers/CommandHandler");

const Collection = require("./structures/Collection");
const User = require("./structures/User");
const Presence = require("./structures/Presence");
const Guild = require("./structures/Guild");

/**
 * The Client
 * @extends RestAPIManager
 * @prop {String} token The Bot token
 * @prop {WebSocketManager} gateway The Gateway connection
 * @prop {EventHandler} eventHandler Responsible for handling Dispatch events
 * @prop {CommandHandler} commandHandler Responsible for handling Interaction events
 * @prop {Collection} guilds Guilds the bot is in
 * @prop {Collection} users Users in the guilds the bot is in
 * @prop {Collection} presences Presences of the users the bot caches
 */
class Client extends RestAPIManager{
    constructor(token) {
        super(token);
        this.token = token;
        this.gateway = new WebSocketManager(this);
        this.eventHandler = new EventHandler(this);
        this.commandHandler = new CommandHandler(this);

        this.guilds = new Collection(Guild);
        this.users = new Collection(User);
        this.presences = new Collection(Presence);

        this.login();
    }

    login() {
        this.gateway.connect();
    }

}

module.exports = Client;