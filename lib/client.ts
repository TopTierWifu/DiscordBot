import { WebSocketManager } from "./handlers/WebSocketManager";
import { RestAPIManager } from "./handlers/RestAPIManager";
import { EventHandler } from "./handlers/EventHandler";
import { CommandHandler } from "./handlers/CommandHandler";

import { Collection } from "./structures/Collection";
import { Guild } from "./structures/Guild";

export class Client{

    token: string;
    rest: RestAPIManager;
    gateway: WebSocketManager;
    eventHandler: EventHandler;
    commandHandler: CommandHandler;

    guilds: Collection;
        
    constructor(token: string) {
        this.token = token;
        this.rest = new RestAPIManager(this);
        this.gateway = new WebSocketManager(this);
        this.eventHandler = new EventHandler(this);
        this.commandHandler = new CommandHandler(this);

        this.guilds = new Collection(Guild);
    }

    login(): void{
        this.gateway.connect();
    }

    debugLog(event: any, outgoing = false): void{
        const now = new Date().toLocaleTimeString("it-IT");
        console.log(`[${now}] ${this.gateway.sequence_number}${outgoing?">":"<"} ${event}`);
    }

}
