module.exports = class User {

    constructor(user){
        this.id = user.id;
        this.username = user.username;
        this.discriminator = user.discriminator;
        this.avatar = user.avatar;
        this.createdAt = Date.now((this.id/4194304) + 1420070400000);
        this.bot = user.bot ? true : false;
        this.mention = `<@${this.id}>`;
    }

    avatarURL(size){
        size = size ? size : 1024;
        return `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}?size=${size}`
    }

}