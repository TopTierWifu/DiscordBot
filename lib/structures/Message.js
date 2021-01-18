const User = require("./User");

module.exports = class Message {

    constructor(message, client){
        this.id = message.id;
        this.channel_id = message.channel_id;
        this.guild_id = message.guild_id;
        this.author = new User(message.author);
        this.createdAt = Date.now((this.id/4194304) + 1420070400000);
        this.client = client;
    }

    async delete(){
        return await this.client.rest.deleteMessage(this.channel_id, this.id);
    }

    async edit(message){
        return await this.client.rest.editMessage(this.channel_id, this.id, message);
    }

}