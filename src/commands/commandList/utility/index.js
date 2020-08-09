const CommandInterface = require("../../commandInterface");
const ItemUtil = require("../util/itemUtil");

module.exports = new CommandInterface({

    alias:["index", "i"],

    usage: "{item}",

    desc: "View all the details of items",

    examples: ["index 6dh2", "index sjdf"],

    category: "Utility",

    execute: async function(p){
        if(p.args[0]) oneItem(p, p.args[0].toLowerCase());
        else p.warn("Please specify an item")
    }
});

async function oneItem(p, dbID){
    item = await ItemUtil.getItem(p, dbID);
    if(!item){p.warn("That item does not exist"); return;}

    let N = "\n";

    let embed = p.embed(item.base.name);
    embed.thumbnail.url = `https://cdn.discordapp.com/emojis/${ItemUtil.getIcon(item).slice(-19,-1)}.png`;
    embed.description = "**Type:** " + item.base.type + N;
    embed.description += "**Rarity:** " + ItemUtil.getRarity(item) + N;
    embed.description += "**Value:** " + item.base.value + N;
    embed.description += "**Stats:**" + N;

    let i = 1;
    for(stat in item.base.stats){
        embed.description += p.config.emoji.stats[stat] + " `" + item.base.stats[stat] + "`";
        if(i%3==0){embed.description += N;}
        i++;
    }
    
    p.send({embed});
}