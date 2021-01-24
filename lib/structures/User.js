const Base = require("./Base");

module.exports = class User extends Base{

    constructor(data){
        super(data.id);
        this.username = data.username;
        this.discriminator = data.discriminator;
        this.avatar = data.avatar;
        this.bot = data.bot ? true : false;
        this.mention = `<@${this.id}>`;
    }

    avatarURL(size){
        size = size ? size : 1024;
        return `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}?size=${size}`
    }

    update(data){
        if(data.username !== undefined) {
            this.username = data.username;
        }
        if(data.discriminator !== undefined) {
            this.discriminator = data.discriminator;
        }
        if(data.avatar !== undefined) {
            this.avatar = data.avatar;
        }
    }

    toString(){
        return this.mention;
    }

}