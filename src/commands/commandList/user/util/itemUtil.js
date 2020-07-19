const Items = require("../../../../data/items.json");

exports.addItem = async function(fullInv, itemType, itemIcon, amount){
  let invPart = await fullInv.get(itemType);
  if(getIndex(invPart, itemIcon)){
    invPart[getIndex(invPart, itemIcon)].amount += amount;
  } else{
    invPart.push({icon: itemIcon,amount: amount});
  }
  fullInv.save();
}

exports.getItem = function(invPart, itemIcon){
  if(getIndex(invPart, itemIcon)){
    return invPart[getIndex(invPart, itemIcon)];
  }
}
  
function getIndex(invPart, itemIcon){
  for(itemIndex in invPart){
    if(invPart[itemIndex].icon == itemIcon){
    return itemIndex;
    }
  }
}