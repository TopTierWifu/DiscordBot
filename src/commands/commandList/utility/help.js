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
    let embed = p.embed("Commands", p.sender.avatarURL);
    let i = 0;
    for(category in p.categories){
        embed.fields[i] = {name: category, value: ""};
        for(command in p.categories[category]){
            embed.fields[i].value += "`" + p.categories[category][command] + "` ";
        }
        i++
    }
    p.send({embed});
}

function sendCommandDescription(p, command){
    let N = "\n";

    let embed = p.embed(command.alias[0].replace(/^./, command.alias[0][0].toUpperCase()), p.sender.avatarURL);
    embed.description = "";
    
    embed.description += "**Usage:** `" + p.config.prefix + command.alias[0];
    if(command.usage) {embed.description += " " + command.usage;}
    embed.description += "`";
    embed.description += N + command.desc + N

    if(command.alias.length > 1){
        embed.description += "**Aliases:**" + N;
        for(alias in command.alias) {embed.description += "`" + command.alias[alias] + "` ";}
        embed.description += N;
    }

    if(command.examples){
        embed.description += "**Examples:**" + N;
        for(example in command.examples) {embed.description += "`" + p.config.prefix + command.examples[example] + "` ";}
        embed.description += N;
    }

    p.send({embed});
}