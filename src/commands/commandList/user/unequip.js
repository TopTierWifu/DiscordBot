const CommandInterface = require("../../commandInterface");
const ItemUtil = require("../util/itemUtil");
const Items = require("../../../data/items.json");

module.exports = new CommandInterface({

    alias:["unequip"],

    usage: "{item}",

    desc: "Unequips items and puts them in your inventory",

    examples: ["unequip knife", "unequip ring"],

    category: "User",
    
    execute: async function(p){
        if(p.args[0]) unequip(p, p.args[0].toLowerCase());
        else p.warn("Please specify an item!");
    }
});

async function unequip(p, itemName){
    if(!ItemUtil.isItem(itemName)){p.warn("That is not a real item"); return;}
    itemName = ItemUtil.isItem(itemName);
    let type = Items[itemName].type;
    let user = await p.db.User.findById(p.sender.id);
    if(!user[type]) {p.warn("You can't wear that, silly"); return;}

    if(user[type].includes(itemName)){
        if(type == "helmet"||type == "chestplate"||type == "pants") unequipArmor(p, type, itemName);
        else unequipItem(p, user, type, itemName)
    } else {
        p.warn("You are not using " + Items[itemName].icon);
    }
}

async function unequipArmor(p, type, itemName){
    if(await ItemUtil.addItem(p, itemName)){
        let newSettings = {}
        newSettings[type] = undefined;
        await p.db.User.updateOne({ _id: p.sender.id}, {$set: newSettings});
    }
}

async function unequipItem(p, user, type, itemName){
    if(await ItemUtil.addItem(p, itemName)){
        let items = user[type];
        items.splice(items.indexOf(itemName), 1);
        let newSettings = {}
        newSettings[type] = items;
        await p.db.User.updateOne({ _id: p.sender.id}, {$set: newSettings});
    }
}