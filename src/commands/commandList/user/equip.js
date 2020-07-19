const CommandInterface = require("../../CommandInterface");
const Profile = require("../../../models/user/profile");
const Inventory = require("../../../models/user/inventory");
const Items = require("../../../data/items.json");
const ItemUtil = require("./util/itemUtil");

module.exports = new CommandInterface({
  execute: async function(p){
    if(p.args[1] && Items[p.args[1]]){
        equipItem(p, p.args[1]);
    } else if(p.args[1]) {
        p.send("That is not an item!");
    } else {
        p.send("Please specify an item!")
    }
  }
});

async function equipItem(p, itemIcon){
    let invPart = (await Inventory.get(p.user.id)).get(Items[itemIcon].type);
    let profile = await Profile.get(p.user.id);
    let invItem = ItemUtil.getItem(invPart, itemIcon);

    if(invItem && invItem.amount >= 1){
        profile.helmet = itemIcon;
        profile.save();
        p.send("Equipped " + itemIcon);
    } else {
        p.send("You do not have " + itemIcon);
    }
}