exports.addItem = async function(fullInv, itemType, itemIcon, amount){
  let invPart = await fullInv.get(itemType);
  if(getIndex(invPart, itemIcon)){
    invPart[getIndex(invPart, itemIcon)].amount += amount;
  } else{
    invPart.push({icon: itemIcon,amount: amount});
  }
  fullInv.save();
}
  
function getIndex(invPart, itemIcon){
  for(itemIndex in invPart){
    if(invPart[itemIndex].icon == itemIcon){
    return itemIndex;
    }
  }
}

//Add some sort of check to addItem() to make sure that it is a part of the items.json list