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

async function sell(p, item){
    if(!ItemUtil.isItem(item)){p.warn("That is not a real item"); return;}
    item = ItemUtil.isItem(item);
    let inv = (await p.db.User.findById(p.sender.id)).items;
    if(!inv.length) {p.warn("You do not have any items"); return;}

    if(inv.includes(item)){
        inv.splice(inv.indexOf(item), 1);
        await p.db.User.updateOne({_id: p.sender.id}, {$inc: {gold: Items[item].value}, $set: {items: inv}});
        p.send("Sold " + Items[item].icon + " for " + Items[item].value + " gold")
    } else {
        p.warn("You do not have " + Items[item].icon);
    }
}