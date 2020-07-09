const CommandHander = require("../commands/CommandHandler")

module.exports = class MessageCreate{
    constructor(main){
        this.main = main;
        this.prefix = main.prefix;
        this.command = new CommandHander(main);
    }

    handle(msg){
        if(msg.author.bot) {return;}
        msg.args = this.getArgs(msg.content);
        msg.bot = this.main.bot;
        if(msg.args){
            this.command.execute(msg.args[0],msg);
        }
    }

    getArgs(msg){
        if(this.isCommand(msg)){
            return msg.trim().slice(this.prefix.length).split(/ +/g);
        }
    }
    
    isCommand(msg){
        return msg.toLowerCase().trim().startsWith(this.prefix);
    }
}