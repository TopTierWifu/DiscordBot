const Items = require("../../../data/resources.json");

exports.addItem = async function(p, itemID, amount){
    if(!Items[itemID]) {p.warn("There is no resource with the id `" + itemID + "`"); return;}
    if(!amount) {p.want("Please specify an amount"); return;}

    let inv = (await p.getDoc("User")).inventory;

    let hasItem = `inventory.${itemID}`;
    let newSettings = {};

    for(item in inv){
        if(item == itemID && inv[item]) {newSettings[hasItem] = parseInt(amount);}
    }

    if(newSettings[hasItem]){
        await p.db.User.updateOne(
            {_id: p.sender.id},
            {$inc: newSettings},
            {upsert: true}
        );
    } else {
        newSettings[hasItem] = parseInt(amount);
        await p.db.User.updateOne(
            {_id: p.sender.id},
            {$set: newSettings},
            {upsert: true}
        );
    }
    
    p.send("Added `" + amount + "` " + Items[itemID].icon + " to " + p.sender.mention + "'s inventory");
}