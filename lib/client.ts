import { WebSocketManager } from "./handlers/WebSocketManager";
import { RestAPIManager } from "./handlers/RestAPIManager";
import { EventHandler } from "./handlers/EventHandler";
import { CommandHandler } from "./handlers/CommandHandler";

import { Collection } from "./structures/Collection";
import { User } from "./structures/User";
import { Presence } from "./structures/Presence";
import { Guild } from "./structures/Guild";

export class Client{
        
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

    debugLog(event, outgoing){
        const now = new Date().toLocaleTimeString("it-IT");
        console.log(`[${now}] ${this.gateway.sequence_number}${outgoing?">":"<"} ${event}`);
    }

}
