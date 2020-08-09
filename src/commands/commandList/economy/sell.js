const CommandInterface = require("../../commandInterface");
const ItemUtil = require("../util/itemUtil");

module.exports = new CommandInterface({

    alias:["sell"],

    usage: "{item}",

    desc: "Sell your items for gold",

    examples: ["sell 5gdf", "sell 8ifs"],

    category: "Economy",

    execute: async function(p){
        if(p.args[0]) sell(p, p.args[0].toLowerCase());
        else p.warn("Please specify an item!");
    }
});

async function sell(p, dbID){
    let item = await ItemUtil.getItem(p, dbID);
    if(!item){p.warn("That is not a real item"); return;}
    let pf = await p.db.User.findById(p.sender.id);
    let inv = pf.items;
    
    if(ItemUtil.isUsing(await ItemUtil.getItems(p, pf), dbID)) {
        p.warn("You cannot sell something you are using");
    } else if(inv.includes(dbID)){
        inv.splice(inv.indexOf(dbID), 1);
        await p.db.User.updateOne({_id: p.sender.id}, {$inc: {gold: item.base.value}, $set: {items: inv}});
        p.send("Sold " + ItemUtil.getIcon(item) + " for " + item.base.value + " gold")
    } else {
        p.warn("You do not have " + ItemUtil.getIcon(item));
    }
}