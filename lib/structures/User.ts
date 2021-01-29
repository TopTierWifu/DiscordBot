import { Base } from "./Base";

export class User extends Base{

    username: string;
    discriminator: string;
    avatar: string;
    bot: boolean;
    mention: string;

    constructor(data: any){
        super(data.id);
        this.username = data.username;
        this.discriminator = data.discriminator;
        this.avatar = data.avatar;
        this.bot = data.bot ? true : false;
        this.mention = `<@${this.id}>`;
    }

    avatarURL(size: number){
        size = size ? size : 1024;
        return `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}?size=${size}`
    }

    update(data: any){
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

    toString(): string{
        return this.mention;
    }

}