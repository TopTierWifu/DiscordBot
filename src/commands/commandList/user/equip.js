const CommandInterface = require("../../CommandInterface");
const Profile = require("../../../models/user/profile");
const Inventory = require("../../../models/user/inventory");
const Items = require("../../../data/items.json");
const ItemUtil = require("../util/itemUtil");

module.exports = new CommandInterface({

    arguments:"{item}",
  
    description: "Allows you to equip the gear you have",
  
    examples: ["equip test2", "equip grinning"],

    category: "User",

    execute: async function(p){
    if(p.args[1] && ItemUtil.isItem(p.args[1])){
        equipItem(p, ItemUtil.isItem(p.args[1]));
    } else if(p.args[1]) {
        p.send("That is not an item!");
    } else {
        p.send("Please specify an item!")
    }
  }
});

async function equipItem(p, itemName){
    let fullInv = await Inventory.get(p.user.id);
    let items = fullInv.get("items");
    let profile = await Profile.get(p.user.id);

    if(items.includes(itemName)){
        let type = Items[itemName].type;
        if(type == "helmet"||type == "chestplate"||type == "pants"){
            let oldItem = profile[type];
            profile[type] = itemName;
            items.splice(items.indexOf(itemName), 1);
            await fullInv.save();
            await ItemUtil.addItem(p, oldItem);
            await profile.save();
            p.send("Equipped " + Items[itemName].icon);
        } else if(type == "weapon"){
            if(profile[type].length < 2){
                profile[type].push(itemName);
                items.splice(items.indexOf(itemName), 1);
                await fullInv.save();
                await profile.save();
                p.send("Equipped " + Items[itemName].icon);
            } else {
                let oldItem = profile[type].shift();
                profile[type].push(itemName);
                items.splice(items.indexOf(itemName), 1);
                await fullInv.save();
                await ItemUtil.addItem(p, oldItem);
                await profile.save();
                p.send("Equipped " + Items[itemName].icon);
            }
        } else if(type == "accessory"){
            if(profile[type].length < 3){
                profile[type].push(itemName);
                items.splice(items.indexOf(itemName), 1);
                await fullInv.save();
                await profile.save();
                p.send("Equipped " + Items[itemName].icon);
            } else {
                let oldItem = profile[type].shift();
                profile[type].push(itemName);
                items.splice(items.indexOf(itemName), 1);
                await fullInv.save();
                await ItemUtil.addItem(p, oldItem);
                await profile.save();
                p.send("Equipped " + Items[itemName].icon);
            }
        } else {
            p.send("You can't wear that, silly");
        }
    } else {
        p.send("You do not have " + Items[itemName].icon);
    }
}