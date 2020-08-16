const CommandInterface = require("../../commandInterface");
const ItemUtil = require("../util/itemUtil");

module.exports = new CommandInterface({

    alias:["items"],

    desc: "View your equipable items",

    category: "User",
    
    execute: async function(p){
        listItems(p);
    }
});

async function listItems(p){
    let items = (await p.getDoc("User")).items;
    
    p.embed.author.name = p.sender.username + "'s Items";
    p.embed.author.icon_url = p.sender.avatarURL; 

    for(dbID in items){
        p.embed.description += ItemUtil.getItemPreview(await ItemUtil.getItem(p, items[dbID]));
    }

    let embed = p.embed;
    p.send({embed});
}