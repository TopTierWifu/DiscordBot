const requireDir = require('require-dir');
const dir = requireDir('./commandList', { recurse: true });
const CommandInterface = require("./commandInterface");

const commands = {};
const categories = {};

module.exports = class CommandHandler{
	constructor(main){
        this.main = main;
        this.prefix = main.prefix;
        registerCommands();
	}
	
	async execute(msg){
        let args = hasPrefix(this.main, msg);   //Check if has prefix => get args
        if(!args) return;   //If there was no prefix, then args would be undefined

        let command = args.shift().toLowerCase();   //Gets first arg (command name) and takes it out of the args array

        if(!commands[command]) return; //If it is not in the command list, return

        let param = getParams(msg, command, args, this.main);   //Adds all neccesary properties to param

        await executeCommand(this.main, param); //It's a real command, now for final checks
	}
}

async function executeCommand(main, p){
    //Add cooldown/ban checks here
    await commands[p.command].execute(p);
}


//Gives the p variable all the properties it needs
function getParams(msg, command, args, main){
    let param = {
        "msg":msg,
        "args":args,
        "command": command,
        "client": main.bot,
        "sender": msg.author,
        "db": main.db,
        "config": main.config,
        "commands": commands,
        "categories": categories
    }

    param.send = function(message){
        return param.client.createMessage(param.msg.channel.id, message);
    }

    param.warn = function(message){
        return param.client.createMessage(param.msg.channel.id, ":warning: **|** " + message)
        .then(msg => setTimeout(function(){
            try{msg.delete();}catch(e){}
        }, 5000));
    }

    param.embed = function(name, iconURL){
        let embed = {
            "color": 13679088,
            "author": {
                "name": name,
                "icon_url": iconURL
            },
            "thumbnail": {},
            "fields": [],
            "footer": {}
        }
        return embed;
    }

    return param;
}

//Adds commands to const object 
function registerCommands(){
    let addCommand = function(command){
        let aliases = command.alias;    //Get the alias array of a command
        if(aliases){    //If it exists
            if(command.category){
                if(!categories[command.category]) {categories[command.category] = [];}  //If it doesn't exist, make it
                categories[command.category].push(aliases[0]);  //Categories => {categoryName: [command0, command1, command2]}
            } 
            for(let i=0;i<aliases.length;i++){  //For each alias
                commands[aliases[i]] = command; //Add the command instance under the property with the name of the alias
            }
        }
    }
    for(let file in dir){   //For every file in the directory
        if(dir[file] instanceof CommandInterface){  //If it is of the command class  
            addCommand(dir[file]); 
        } else{
            for(let file2 in dir[file]){ //For sub files in folders
                if(dir[file][file2] instanceof CommandInterface){   //If it is of the command class
                    addCommand(dir[file][file2]);
                }
            }
        }
    }
}

function hasPrefix(main, msg){
    const content = msg.content.toLowerCase();  //Makes command case-insensitive
    if(content.startsWith(main.prefix)){    //If it starts with the prefix
        return msg.content.slice(main.prefix.length).trim().split(/ +/g);   //Return array of message split by spaces minus the prefix
    }
}