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

async function equipItem(p, name){
    let fullInv = await Inventory.get(p.user.id);
    let items = fullInv.get("items");
    let profile = await Profile.get(p.user.id);

    if(items.includes(name)){
        oldItem = profile[Items[name].type];
        profile[Items[name].type] = name;
        items.splice(items.indexOf(name), 1);
        await fullInv.save();
        await ItemUtil.addItem(p, oldItem);
        await profile.save();
        p.send("Equipped " + Items[name].icon);
    } else {
        p.send("You do not have " + Items[name].icon);
    }
}