const Items = require("../../../data/items.json");
let highestIndex;

exports.addItem = async function(p, itemID, quality){
    if(!highestIndex) {await initHighestIndex(p);}
    if(!Items.items[itemID]) {p.warn("There is no item with the id `" + itemID + "`"); return;}
    if(!Items.quality[quality]) {p.warn("`" + quality + "` is not a real weapon quality"); return;}

    let index = highestIndex++;

    await p.db.Item.create({
        _id: index.toString(36),
        index: index,
        itemID: itemID,
        quality: quality ?? 0
    });

    await p.db.User.updateOne(
        {_id: p.sender.id},
        {$push: {items: index.toString(36)}, $addToSet: {index: itemID}},
        {upsert: true}
    );

    p.send("Added `" + index.toString(36) + "` " + Items.items[itemID].icons[quality] + " to " + p.sender.mention + "'s inventory");
}

exports.getItem = async function(p, dbID){
    let q = await p.db.Item.findById(dbID);
    if(q) return {data: q, base: Items.items[q.itemID]};
    else return;
}

exports.getItems = async function(p, pf){
    return items = {
        "h": await exports.getItem(p, pf.Helmet),
        "c": await exports.getItem(p, pf.Chestplate),
        "p": await exports.getItem(p, pf.Pants),
        "w0": await exports.getItem(p, (pf.Weapon) ? pf.Weapon[0] : undefined),
        "w1": await exports.getItem(p, (pf.Weapon) ? pf.Weapon[1] : undefined),
        "a0": await exports.getItem(p, (pf.Accessory) ? pf.Accessory[0] : undefined),
        "a1": await exports.getItem(p, (pf.Accessory) ? pf.Accessory[1] : undefined),
        "a2": await exports.getItem(p, (pf.Accessory) ? pf.Accessory[2] : undefined)
    };
}

exports.getIcon = function(item){
    return item?.base.icons[item.data.quality];
}

exports.getRarity = function(item){
    return Items.quality[item?.data.quality]?.name;
}

exports.getBonusStats = function(items, stat){
    let bonus = 0;
    for(item in items){
        bonus += items[item]?.base.stats[stat] ?? 0; //Change this to do math with item.data.quality for higher tier items to have more stats
    }
    return bonus;
}

exports.getItemPreview = function(item){
    let s = "\n`" + item.data._id + "` ";
    s += exports.getIcon(item) + " ";
    s += item.base.name;
    //Add more stat data later
    return s;
}

exports.isUsing = function(items, dbID){
    for(item in items){
        if(items[item]?.data._id == dbID) {return true;}
    }
}

async function initHighestIndex(p){
    highestIndex = (await p.db.Item.find({}).sort({index: "-1"}).limit(1))[0]?.index ?? 0;
    if(highestIndex != 0) highestIndex++;
}