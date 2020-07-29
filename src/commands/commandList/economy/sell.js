const CommandInterface = require("../../commandInterface");
const ItemUtil = require("../util/itemUtil");
const Items = require("../../../data/items.json");

module.exports = new CommandInterface({

    alias:["sell"],

    usage: "{item}",

    desc: "Sell your items for gold",

    examples: ["sell shirt", "sell ring"],

    category: "Economy",

    execute: async function(p){
        if(p.args[0]) sell(p, p.args[0].toLowerCase());
        else p.warn("Please specify an item!");
    }
});

async function sell(p, itemName){
    if(!ItemUtil.isItem(itemName)){p.warn("That is not a real item"); return;}
    itemName = ItemUtil.isItem(itemName);
    let inv = (await p.db.User.findById(p.sender.id)).items;
    if(!inv.length) {p.warn("You do not have any items"); return;}

    if(inv.includes(itemName)){
        inv.splice(inv.indexOf(itemName), 1);
        await p.db.User.updateOne({_id: p.sender.id}, {$inc: {gold: Items[itemName].value}});
        await p.db.User.updateOne({_id: p.sender.id}, {$set: {items: inv}});
        p.send("Sold " + Items[itemName].icon + " for " + Items[itemName].value + " gold")
    } else {
        p.warn("You do not have " + Items[itemName].icon);
    }
}