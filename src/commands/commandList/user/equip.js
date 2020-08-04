const CommandInterface = require("../../commandInterface");
const ItemUtil = require("../util/itemUtil");
const Items = require("../../../data/items.json");

module.exports = new CommandInterface({

    alias:["equip"],

    usage: "{item}",

    desc: "Put on some equipment to be ready for the dangers of the world",

    examples: ["equip bag", "equip smiley"],

    category: "User",
    
    execute: async function(p){
        if(p.args[0]) equip(p, p.args[0].toLowerCase());
        else p.warn("Please specify an item!");
    }
});

async function equip(p, itemName){
    if(!ItemUtil.isItem(itemName)){p.warn("That is not a real item"); return;}
    itemName = ItemUtil.isItem(itemName);
    let user = await p.db.User.findById(p.sender.id);
    if(!user?.items.length) {p.warn("You do not have any items"); return;}
    
    if(user.items.includes(itemName)){
        let type = Items[itemName].type;
        if(type == "helmet"||type == "chestplate"||type == "pants"){
            equipArmor(p, user, type, itemName);
        } else if(type == "accessory" || type == "weapon"){
            let max = {accessory: 3, weapon: 2};
            equipItem(p, user, type, itemName, max)
        } else {
            p.warn("You can't wear that, silly");
        }
    } else {
        p.warn("You do not have " + Items[itemName].icon);
    }
}

async function equipArmor(p, user, type, itemName){
    let inv = user.items;
    inv.splice(inv.indexOf(itemName), 1);
    let newSettings = { items : inv };
    newSettings[type] = itemName;
    await p.db.User.updateOne({ _id: p.sender.id}, {$set: newSettings});
    await ItemUtil.addItem(p, user[type]);  //Look into splice 3nd arg of replace value to remove this line
    p.send("Equipped " + Items[itemName].icon);
}

async function equipItem(p, user, type, itemName, max){
    let newSettings = {};   //Init new object 
    let inv = user.items;   //Get the inventory array
        inv.splice(inv.indexOf(itemName), 1);   //Remove the item to be equiped from inv
        newSettings.items = inv;    //Apply to newSettings Object
    let items = user[type]; //Get array of equipment
        items.push(itemName);   //Add new item to array of equipment
    let oldItem;    //In case the equipment is full
    if(items.length > max[type]) {  //If the array is above capacity
        oldItem = items.shift();    //Grab the item to be shifted out of equipment array
    }
    newSettings[type] = items;
    await p.db.User.updateOne({ _id: p.sender.id}, {$set: newSettings});    //Apply new settings to user's doc
    if(oldItem) {await ItemUtil.addItem(p, oldItem);} //Add shfited item to inv
    p.send("Equipped " + Items[itemName].icon); //Confirmation message
}