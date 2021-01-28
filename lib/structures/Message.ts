import { Base } from "./Base";
import { User } from "./User";
import { Client } from "../client";

export class Message extends Base{

    channel_id: string;
    author: User;
    client: Client;

    constructor(data, client){
        super(data.id);
        this.channel_id = data.channel_id;
        this.author = new User(data.author);
        this.client = client;
    }

    async delete(){
        return await this.client.rest.deleteMessage(this.channel_id, this.id);
    }

    async edit(message){
        return await this.client.rest.editMessage(this.channel_id, this.id, message);
    }

}