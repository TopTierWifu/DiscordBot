const CommandHander = require("../commands/CommandHandler")

module.exports = class MessageCreate{
    constructor(bot){
        this.bot = bot;
        this.prefix = bot.prefix;
        this.command = new CommandHander(bot);
    }

    handle(msg){
        if(msg.author.bot) {return;}
        msg.args = this.getArgs(msg.content);
        if(msg.args){
            this.command.execute(msg.args[0],msg);
        }
    }

    getArgs(msg){
        if(isCommand(msg)){
            return msg.trim().slice(this.prefix.length).split(/ +/g);
        }
    }
    
    isCommand(msg){
        if(msg.toLowerCase().trim().startsWith(this.prefix)){
            return true;
        }
        return false;
    }
}