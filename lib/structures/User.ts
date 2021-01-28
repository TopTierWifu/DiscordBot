import { Base } from "./Base";

export class User extends Base{

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
        const properties = `username discriminator avatar`;
        for(property of properties.split(" ")){
            if(data[property] !== undefined) {
                this[property] = data[property];
            }
        }
    }

    toString(){
        return this.mention;
    }

}