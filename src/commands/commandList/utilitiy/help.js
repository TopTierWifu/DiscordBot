const CommandInterface = require("../../CommandInterface");
const requireDir = require('require-dir');
const dir = requireDir('../../commandList', { recurse: true });

module.exports = new CommandInterface({

    arguments:"{command}",
  
    description: "Gives more information on the Wifu's commands",
  
    examples: ["help explore", "help"],

    category: "Utility",

    execute: async function(p){
        if(!p.args[1]){
            sendCommands(p);
        } else if(p.commands[p.args[1]]){
            sendCommandDescription(p, p.args[1]);
        } else {
            p.send("That is not a command");
        }
    }
});

function sendCommands(p){

    let embed = {
        "color": 13679088,
        "author": {
        "name": "Commands",
        "icon_url": p.user.avatarURL
        },
        "fields": []
    };

    let index = 0;
    for(category in p.categories){
        embed.fields[index] = {};
        embed.fields[index].name = category;
        for(command in p.categories[category]){
            if(!embed.fields[index].value){
                embed.fields[index].value = "`" + p.categories[category][command] + "` ";
            } else {
                embed.fields[index].value += "`" + p.categories[category][command] + "` ";
            }
        }
        index++;
    }

    p.send({embed});
}

function sendCommandDescription(p, command){

    let info = p.commands[command];
    if(info.arguments){
        command += " "
    }

    let embed = {
        "color": 13679088,
        "author": {
            "name": command.replace(/^./, command[0].toUpperCase()),
            "icon_url": p.user.avatarURL
        },
        "fields": [
            {
                "name": "`" + p.prefix + command + info.arguments + "`",
                "value": info.description + "\n"
            },
            {
                "name": "Examples",
                "value": ""
            }
        ]
    };

    for(example in info.examples){
        embed.fields[1].value += "`" + p.prefix + info.examples[example] + "` "
    }

    p.send({embed});
}