const CommandInterface = require("../../commandInterface");
const ItemUtil = require("../util/itemUtil");

module.exports = new CommandInterface({

    alias:["inventory", "inv"],

    desc: "View the items in your inventory",

    category: "User",
    
    execute: async function(p){
        openInv(p);
    }
});

async function openInv(p){
    let items = (await p.db.User.findById(p.sender.id, "items"))?.items ?? [];
    
    let embed = p.embed(p.sender.username + "'s Inventory", p.sender.avatarURL);
    embed.description = "";

    for(dbID in items){
        embed.description += ItemUtil.getItemPreview(await ItemUtil.getItem(p, items[dbID]));
    }

    p.send({embed});
}