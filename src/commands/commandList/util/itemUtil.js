const Items = require("../../../data/items.json");

exports.addItem = async function(p, itemName){
  itemID = exports.isItem(itemName);  //Get id from possible alias
  if(!itemID){ //If it is a not real item
    if(itemID != undefined){p.warn("That is not a real item!");}  //Ignore for unequip
    return false; //Boolean return for equip
  }
  let user = await p.db.User.findById(p.sender.id, "items");   //Get items section
  if(!user || user.items.length < 30){  //If the inventory is empty or has less than 30 items
    await p.db.User.updateOne(
        {_id: p.sender.id},
        { $push: {items: itemID}, $addToSet: {index: itemID}},
        { upsert: true }
    );  //Push the item to the items array
    p.send("Added " + Items[itemID].icon + " to your inventory!");    //Confirmation
    return true;    //Boolean return for equip
  }
  p.warn(p.sender.username + "'s inventory is full! Could not add " + Items[itemID].icon);    //Error message
  return false; //Boolean return for equip
}

exports.isItem = function(name){
  if(Items[name]){return name;}
  for(id in Items){
    for(alias in Items[id].aliases){
      if(Items[id].aliases[alias] == name){
        return id;
      }
    }
  }
}