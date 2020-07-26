const CommandInterface = require("../../CommandInterface");
const requireDir = require('require-dir');
const dir = requireDir('../../commandList', { recurse: true });

let categories = {};
let commandList = [];

module.exports = new CommandInterface({

    category: "Utility",

    execute: async function(p){
        if(!p.args[1]){
            sendCommands(p);
        } else if(commandList.includes(p.args[1])){
            sendCommandDescription(p, p.args[1]);
        } else {
            p.send("That is not a command");
        }
    }
});

function parseCommands(commands){
    for(command in commands){
        if(!categories[commands[command].category]){categories[commands[command].category] = [];}
        categories[commands[command].category].push(command);
        commandList.push(command);
    }
}

function sendCommands(p){
    parseCommands(p.commands);

    let embed = {
        "color": 13679088,
        "author": {
        "name": "Commands",
        "icon_url": p.user.avatarURL
        },
        "fields": []
    };

    let index = 0;
    for(category in categories){
        embed.fields[index] = {};
        embed.fields[index].name = category;
        for(command in categories[category]){
            if(!embed.fields[index].value){
                embed.fields[index].value = "`" + categories[category][command] + "` ";
            } else {
                embed.fields[index].value += "`" + categories[category][command] + "` ";
            }
        }
        index++;
    }


    p.send({embed});
}

function sendCommandDescription(p, command){
    console.log(p.commands[command]);
    p.send(command);
}