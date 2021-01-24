const Base = require("./Base")
const User = require("./User");

module.exports = class Message extends Base{

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