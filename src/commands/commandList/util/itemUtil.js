const Inventory = require("../../../models/user/inventory");
const Items = require("../../../data/items.json");

exports.addItem = async function(p, itemName){
  if(!exports.isItem(itemName)){
    if(itemName != undefined){p.send("That is not a real item!");}
    return;
  }
  itemName = exports.isItem(itemName);
  let fullInv = await Inventory.get(p.user.id);
  let invPart = await fullInv.get("items");
  if(invPart.length < 30){
    invPart.push(itemName);
  } else{
    p.send("Your inventory is full!");
    return;
  }
  fullInv.save();
  p.send("Added " + Items[itemName].icon + " to your inventory!");
  return true;
}

exports.isItem = function(name){
  if(Items[name]){return name;}
  for(item in Items){
    for(alias in Items[item].aliases){
      if(Items[item].aliases[alias] == name){
        return item;
      }
    }
  }
}