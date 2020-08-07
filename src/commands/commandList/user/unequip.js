const CommandInterface = require("../../commandInterface");
const ItemUtil = require("../util/itemUtil");

module.exports = new CommandInterface({

    alias:["unequip"],

    usage: "{item}",

    desc: "Unequip items to put better ones on",

    examples: ["unequip 4fzl", "unequip h8xc"],

    category: "User",
    
    execute: async function(p){
        if(p.args[0]) unequip(p, p.args[0].toLowerCase());
        else p.warn("Please specify an item!");
    }
});

async function unequip(p, dbID){
    let user = await p.db.User.findById(p.sender.id);
    let items = await ItemUtil.getItems(p, user);

    let equipment;

    for(item in items){
        if(items[item] && items[item].data._id == dbID) {equipment = items[item]};
    }

    if(!equipment) {p.warn("You are not using `" + dbID + "`"); return;}

    let type = equipment.base.type;
    let newSettings = {};
    if(type == "Helmet"||type == "Chestplate"||type == "Pants"){
        newSettings[type] = undefined;
        await p.db.User.updateOne({ _id: p.sender.id}, {$set: newSettings});
        p.send("Unequipped " + ItemUtil.getIcon(equipment));
    } else if(type == "Accessory" || type == "Weapon"){
        newSettings[type] = user[type];
        newSettings[type].splice(newSettings[type].indexOf(dbID), 1);
        await p.db.User.updateOne({ _id: p.sender.id}, {$set: newSettings});
        p.send("Unequipped " + ItemUtil.getIcon(equipment));
    }
}