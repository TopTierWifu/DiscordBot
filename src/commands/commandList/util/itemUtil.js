const Items = require("../../../data/items.json");

exports.addItem = async function(p, itemName){
  if(!exports.isItem(itemName)){ //If it is a not real item
    if(itemName != undefined){p.warn("That is not a real item!");}  //Ignore for unequip
    return false; //Boolean return for equip
  }
  itemName = exports.isItem(itemName);  //Get name from possible alias
  let user = await p.db.User.findById(p.sender.id, "items");   //Get items section
  if(!user || user.items.length < 30){  //If the inventory is empty or has less than 30 items
    await p.db.User.updateOne(
        {_id: p.sender.id},
        { $push: { items: itemName}},
        { upsert: true }
    );  //Push the item to the items array
    p.send("Added " + Items[itemName].icon + " to your inventory!");    //Confirmation
    return true;    //Boolean return for equip
  }
  p.warn(p.sender.username + "'s inventory is full! Could not add " + Items[itemName].icon);    //Error message
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