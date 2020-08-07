const CommandInterface = require("../../commandInterface");
const ItemUtil = require("../util/itemUtil");
const MAX = {Accessory: 3, Weapon: 2};

module.exports = new CommandInterface({

    alias:["equip"],

    usage: "{item}",

    desc: "Put on some equipment to be ready for the dangers of the world",

    examples: ["equip 2cv9", "equip q5xu"],

    category: "User",
    
    execute: async function(p){
        if(p.args[0]) equip(p, p.args[0].toLowerCase());
        else p.warn("Please specify an item!");
    }
});

async function equip(p, dbID){
    let user = await p.db.User.findById(p.sender.id);
    if(!user?.items.length) {p.warn("You do not have any items"); return;}
    let item = await ItemUtil.getItem(p, dbID);
    
    if(user.items.includes(dbID)){
        let type = item.base.type;
        let newSettings = {};
        if(type == "Helmet"||type == "Chestplate"||type == "Pants"){
            newSettings[type] = dbID;
            await p.db.User.updateOne({ _id: p.sender.id}, {$set: newSettings});
            p.send("Equipped " + ItemUtil.getIcon(item));
        } else if(type == "Accessory" || type == "Weapon"){
            let equipment = user[type];
            if(equipment.includes(dbID)){p.warn("You are already using `" + dbID + "` " + ItemUtil.getIcon(item)); return;}
            else {equipment.push(dbID);}
            if(equipment.length > MAX[type]){
                equipment.shift();
            }
            newSettings[type] = equipment;
            await p.db.User.updateOne({ _id: p.sender.id}, {$set: newSettings});
            p.send("Equipped " + ItemUtil.getIcon(item));
        }
    } else {
        p.warn("You do not have `" + dbID + "` " + (ItemUtil.getIcon(item) ?? ""));
    }
}