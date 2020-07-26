const CommandInterface = require("../../CommandInterface");
const Profile = require("../../../models/user/profile");
const Items = require("../../../data/items.json");
const ItemUtil = require("../util/itemUtil");

module.exports = new CommandInterface({

    arguments:"{item}",

    description: "Allows you to unequip the gear you are wearing",

    examples: ["unequip smiley", "unequip grinning"],

    category: "User",

    execute: async function(p){
        if(p.args[1] && ItemUtil.isItem(p.args[1])){
            unequipItem(p, ItemUtil.isItem(p.args[1]));
        } else if(p.args[1]) {
            p.send("That is not an item!");
        } else {
            p.send("Please specify an item!")
        }
    }
});

async function unequipItem(p, itemName){
    let profile = await Profile.get(p.user.id);
    let t = Items[itemName].type;

    if(t == "helmet" || t == "chestplate" || t == "pants" ){
        if(profile[t] == itemName){
            if(ItemUtil.addItem(p, itemName)){
                profile[t] = undefined;
                profile.save();
                p.send("Unequipped " + Items[itemName].icon);
            }
        } else {
            p.send("You are not wearing " + Items[itemName].icon);
        }
    } else if(t == "weapon" || t == "accessory") {

    } else {
        p.send("You can't wear that, silly");
    }
}