const requireDir = require('require-dir');
const dir = requireDir('./commandList', { recurse: true });
const CommandInterface = require("./CommandInterface");

const commands = {};

module.exports = class CommandHandler{
	constructor(main){
		this.main = main;
		this.registerCommands();
	}
	
	execute(command, msg){
        if(commands[command]){
			commands[command].execute(this.getParams(msg));
		} else {
			this.main.bot.createMessage(msg.channel.id, "That is not a command!");
		}		
	}

	getParams(msg){
		let param = {
			"msg":msg,
			"args":msg.args,
			"main":msg.main,
			"bot":msg.main.bot
		}

		param.send = function(message){
			param.bot.createMessage(param.msg.channel.id, message);
		}

		return param;
	}
	
	registerCommands(){
		for(let file in dir){
			if(dir[file] instanceof CommandInterface){
				commands[file] = dir[file];
			} else{
				for(let file2 in dir[file]){
					if(dir[file][file2] instanceof CommandInterface){
						commands[file2] = dir[file][file2];
					}
				}
			}
		}
	}
}