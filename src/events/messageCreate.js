const CommandHander = require("../commands/CommandHandler")

class MessageCreate{
    constructor(bot){
        this.bot = bot;
        this.prefix = bot.config.prefix;
        this.command = new CommandHander(bot);
    }

    handle(msg){
        if(msg.author.bot) {return;}
        msg.args = getArgs(msg.content)
        if(msg.args){
            command.execute(msg.args[0],msg)
        }
    }

    getArgs(msg){
        if(isCommand(msg)){
            return msg.trim().slice(prefix.length).split(/ +/g);
        }
    }

    isCommand(msg){
        if(msg.toLowerCase().trim().startsWith(prefix)){
            return true;
        }
        return false;
    }
}

module.exports = MessageCreate;