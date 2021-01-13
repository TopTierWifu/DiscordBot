const fs = require('fs');
const CommandInterface = require("./commandInterface");

const commands = {};

module.exports = class CommandHandler{

	constructor(client){
		registerCommands();
	}
	
	async executeCheck(data){
		const {id} = data

        if(!commands[id]) return;

        await commands[id].execute(data);
	}

}

async function registerCommands(){
	fs.readdirSync("./src/commands/commandList/").forEach(file => {
		const command = require(`./commandList/${file}`);
		if(command instanceof CommandInterface) {commands[command.id] = command;}
	});
}