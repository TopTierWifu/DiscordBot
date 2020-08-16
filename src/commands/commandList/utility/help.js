const CommandInterface = require("../../commandInterface");

module.exports = new CommandInterface({

    alias:["help"],

    usage: "{command}",

    desc: "Displays a list of my commands or specific information on a specific command",

    examples: ["help explore", "help"],

    category: "Utility",

    execute: async function(p){
        if(!p.args[0]) sendHelpMessage(p)
        else if(p.commands[p.args[0].toLowerCase()]) sendCommandDescription(p, p.commands[p.args[0].toLowerCase()]);
        else p.send("I don't know that command");
    }
});

function sendHelpMessage(p){
    p.embed.author.name = "Commands";
    p.embed.author.icon_url = p.sender.avatarURL;
    let i = 0;
    for(category in p.categories){
        p.embed.fields[i] = {name: category, value: ""};
        for(command in p.categories[category]){
            p.embed.fields[i].value += "`" + p.categories[category][command] + "` ";
        }
        i++
    }

    let embed = p.embed;
    p.send({embed});
}

function sendCommandDescription(p, command){
    let N = "\n";

    p.embed.author.name = command.alias[0].replace(/^./, command.alias[0][0].toUpperCase());
    p.embed.author.icon_url = p.sender.avatarURL;
    p.embed.description = "";
    
    p.embed.description += "**Usage:** `" + p.config.prefix + command.alias[0];
    if(command.usage) {p.embed.description += " " + command.usage;}
    p.embed.description += "`";
    p.embed.description += N + command.desc + N

    if(command.alias.length > 1){
        p.embed.description += "**Aliases:**" + N;
        for(alias in command.alias) {p.embed.description += "`" + command.alias[alias] + "` ";}
        p.embed.description += N;
    }

    if(command.examples){
        p.embed.description += "**Examples:**" + N;
        for(example in command.examples) {p.embed.description += "`" + p.config.prefix + command.examples[example] + "` ";}
        p.embed.description += N;
    }

    let embed = p.embed;
    p.send({embed});
}