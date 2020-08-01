const Items = require("../../../data/items.json");

exports.getBonusStats = function(p, stat){
  let bonus = 0;
  if(Items[p.helmet]?.stats[stat]){bonus += Items[p.helmet].stats[stat];}
  if(Items[p.chestplate]?.stats[stat]){bonus += Items[p.chestplate].stats[stat];}
  if(Items[p.pants]?.stats[stat]){bonus += Items[p.pants].stats[stat];}
  if(Items[p.weapon[0]]?.stats[stat]){bonus += Items[p.weapon[0]].stats[stat];}
  if(Items[p.weapon[1]]?.stats[stat]){bonus += Items[p.weapon[1]].stats[stat];}
  if(Items[p.accessory[0]]?.stats[stat]){bonus += Items[p.accessory[0]].stats[stat];}
  if(Items[p.accessory[1]]?.stats[stat]){bonus += Items[p.accessory[1]].stats[stat];}
  if(Items[p.accessory[2]]?.stats[stat]){bonus += Items[p.accessory[2]].stats[stat];}
  return bonus;
}