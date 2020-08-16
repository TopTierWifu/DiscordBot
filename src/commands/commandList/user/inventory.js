const CommandInterface = require("../../commandInterface");
const Items = require("../../../data/resources.json");

module.exports = new CommandInterface({

    alias:["inventory", "inv"],

    desc: "View the items in your inventory",

    category: "User",
    
    execute: async function(p){
        openInv(p);
    }
});

async function openInv(p){
    let inv = (await p.getDoc("User")).inventory;

    p.embed.author.name = p.sender.username + "'s Inventory";
    p.embed.author.icon_url = p.sender.avatarURL; 

    for(item in inv){
        if(inv[item]) p.embed.description += Items[item].icon + inv[item] + " ";
    }

    let embed = p.embed;
    p.send({embed});
}