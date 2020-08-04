const CommandInterface = require("../../commandInterface");
const ItemUtil = require("../util/itemUtil");
const Items = require("../../../data/items.json");

module.exports = new CommandInterface({

    alias:["index", "i"],

    usage: "{item}",

    desc: "View all the details of items and monsters you have encountered",

    examples: ["index shorts", "index"],

    category: "Utility",

    execute: async function(p){
        if(p.args[0]) oneItem(p, p.args[0].toLowerCase());
        else allItems(p);
    }
});

async function oneItem(p, item){
    itemID = ItemUtil.isItem(item);
    if(!itemID){p.warn("That is not a real item"); return;}
    let user = await p.db.User.findById(p.sender.id, "index");
    let index = user?.index ?? [];
    if(!index.includes(itemID)){p.warn("You have no data on that item"); return;}

    let n = "\n";

    let embed = p.embed();
    embed.thumbnail.url = `https://cdn.discordapp.com/emojis/${Items[itemID].icon.slice(-19,-1)}.png`;
    embed.fields[0] = {name: Items[itemID].name, value: "**Type:** " + Items[itemID].type + n};
    embed.fields[0].value += "**Rarity:** " + Items[itemID].rarity + n;
    embed.fields[0].value += "**Value:** " + Items[itemID].value + n;
    embed.fields[0].value += "**Stats:**\n";

    let i = 1;
    for(stat in Items[itemID].stats){
        embed.fields[0].value += p.config.stats[stat] + " `" + Items[itemID].stats[stat] + "`";
        if(i%3==0){embed.fields[0].value += n;}
        i++;
    }
    
    p.send({embed});
}

function allItems(p){

    let embed = p.embed(p.sender.username + "'s Index", p.sender.avatarURL);
    embed.fields[0] = {name: "Test"};
    for(item in Items){
        embed.fields[0].value += Items[item].icon
    }

    p.send({embed});
}